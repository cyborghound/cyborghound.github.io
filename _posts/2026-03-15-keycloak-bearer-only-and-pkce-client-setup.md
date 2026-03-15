---
layout: post
title: "Keycloak Client Setups: Bearer-Only Resource Server + PKCE Frontend Client (Keycloak 26)"
date: 2026-03-15 21:00:00 +0100
categories: [Keycloak, IAM]
tags: [keycloak, oauth2, oidc, pkce, bearer-only, security, iam, authorization]
toc: true
comments: true
mermaid: true
image:
  path: /assets/img/headers/keycloak-bearer-pkce.png
---

When securing a modern web application that has a **JavaScript frontend** talking to a **protected REST API**, you need two distinct Keycloak client configurations. A common mistake is reusing one client for both roles — this creates security gaps and blurs the trust boundaries in your architecture.

This post walks through the correct pattern: a **bearer-only resource server client** for the backend API, and a **PKCE public client** for the frontend, with role-based access wired together through a dedicated client scope.

---

## The Two-Client Pattern

The architecture is straightforward:

| Component | Keycloak Client Type | Access Type | Purpose |
| --------- | -------------------- | ----------- | ------- |
| Backend API | Bearer-only | Confidential | Validates incoming JWTs, never issues tokens |
| Frontend SPA | Public + PKCE | Public | Exchanges user credentials for tokens |

The backend **never participates in a login flow** — it only validates tokens. The frontend drives the entire OAuth2 Authorization Code flow with PKCE and receives a token that carries the roles the backend will check.

---

## Step 1: Create the Resource Server (Bearer-Only) Client

In the Keycloak Admin Console, navigate to your realm and create a new client for your backend API.

**Settings:**

- **Client ID:** `my-api`
- **Client authentication:** `On`
- **Authentication flow:** Disable *Standard flow*, *Direct access grants*, and all other flows

With all flows disabled, Keycloak will refuse to issue tokens for this client but will still validate incoming tokens — this is the modern equivalent of the old `bearer-only` access type.

### Create a Role on the Resource Server Client

Inside the `my-api` client, navigate to the **Roles** tab and create a role:

- **Role name:** `api-reader` (or whatever matches your API's access model)

This role represents the permission required to call your protected API endpoints.

---

## Step 2: Create the Frontend (PKCE Public) Client

Create a second client for your Single Page Application.

**Settings:**

- **Client ID:** `my-frontend`
- **Client authentication:** `Off` (Public — no client secret, safe for browser-based apps)
- **Authentication flow:** Enable *Standard flow* only
- **Valid redirect URIs:** `http://localhost:3000/*` (your SPA's origin)
- **Web origins:** `http://localhost:3000` (for CORS)

> Never enable *Direct access grants* (Resource Owner Password Credentials) on a public client facing the browser. This bypasses the consent and PKCE protections.
{: .prompt-warning }

### Enable PKCE

Under **Advanced Settings** for `my-frontend`:

- **Proof Key for Code Exchange Code Challenge Method:** `S256`

This forces the authorization code flow to require a `code_verifier` / `code_challenge` pair, preventing authorization code interception attacks in the browser.

---

## Step 3: Add the Resource Role to the Frontend Client's Dedicated Scope

Instead of building a separate client scope with a mapper, add the `api-reader` role directly to the `my-frontend` client's **assigned roles** (dedicated scope). This tells Keycloak: *only include this role in tokens issued for this client, and only if the authenticated user actually has it*.

1. Go to `my-frontend` → **Client Scopes** → select the **Dedicated** tab
2. Click **Assign role** → switch the filter to **Filter by clients**
3. Select `my-api` / `api-reader` and confirm

The role will now appear in the access token under `resource_access.my-api.roles` whenever a user who holds it logs in through `my-frontend`. No custom scope, no extra mapper needed.

---

## Step 4: Create a Group and Assign the Role

Assigning roles directly to individual users does not scale. The standard approach is to create a **group**, assign the role to the group, and then manage access purely by group membership.

### Create the Group

1. Go to **Groups** → **Create group**
2. **Name:** `api-readers`

### Assign the Role to the Group

1. Open `api-readers` → **Role mapping** → **Assign role**
2. Filter by **clients**, select `my-api` / `api-reader`, and confirm

### Add Users to the Group

1. Go to **Users** → open a user → **Groups** → **Join group** → select `api-readers`

From this point on, any user in `api-readers` who logs in via `my-frontend` will receive an access token with the `my-api:api-reader` role included automatically — no per-user role assignment required.

---

## The Full Auth Flow

Here is the complete sequence from browser login to a protected API call:

```mermaid
sequenceDiagram
    actor User
    participant SPA as Frontend SPA<br/>(my-frontend)
    participant KC as Keycloak
    participant API as Backend API<br/>(my-api)

    User->>SPA: Opens application
    SPA->>SPA: Generate code_verifier + code_challenge (PKCE S256)

    SPA->>KC: GET /auth<br/>client_id=my-frontend<br/>scope=openid<br/>code_challenge=...

    KC->>User: Redirect to Login Page
    User->>KC: Submit credentials

    KC->>KC: Authenticate user<br/>Resolve group membership<br/>User is in api-readers group
    KC->>KC: Build token claims<br/>api-reader role is in my-frontend dedicated scope
    KC->>SPA: Redirect with authorization code

    SPA->>KC: POST /token<br/>grant_type=authorization_code<br/>code + code_verifier

    KC->>KC: Verify code_verifier matches code_challenge
    KC-->>SPA: Access Token (JWT) + ID Token<br/>resource_access.my-api.roles: [api-reader]

    SPA->>API: GET /api/protected<br/>Authorization: Bearer access_token

    API->>API: Validate JWT signature<br/>Check issuer + expiry<br/>Verify resource_access.my-api.roles contains api-reader

    API-->>SPA: 200 OK + Protected Data
    SPA-->>User: Render Data
```

---

## Token Claims: What the Backend Sees

When the backend receives the access token and decodes the JWT payload, it will find the role nested under `resource_access`:

```json
{
  "exp": 1710503000,
  "iat": 1710502700,
  "iss": "https://keycloak.example.com/realms/my-realm",
  "aud": "my-api",
  "sub": "a1b2c3d4-...",
  "scope": "openid",
  "resource_access": {
    "my-api": {
      "roles": [
        "api-reader"
      ]
    }
  }
}
```

The role appears automatically because the user is a member of the `api-readers` group, which carries the `my-api:api-reader` role, and that role is part of `my-frontend`'s dedicated scope. Your backend framework (Spring Security, Quarkus, FastAPI, etc.) can map `resource_access.<client-id>.roles` to granted authorities out of the box.

---

## Backend Validation Checklist

When your API validates an incoming token, it must verify:

- ✅ **Signature** — token is signed by your Keycloak realm's public key
- ✅ **Issuer (`iss`)** — matches your Keycloak realm URL
- ✅ **Audience (`aud`)** — contains `my-api`
- ✅ **Expiry (`exp`)** — token has not expired
- ✅ **Role** — `resource_access.my-api.roles` contains the required role

> **Never skip audience validation.** Without it, a token issued for a completely different client could be replayed against your API.
{: .prompt-warning }

---

## Why Not One Client for Both?

A common shortcut is to set up a single confidential client and use it for both the frontend and the backend. This causes several problems:

- The **client secret leaks into the browser** if used by the SPA
- The backend would need to participate in token issuance (not its job)
- PKCE cannot be combined with `bearer-only` in a single client
- Role management becomes a tangled mess as the app grows

Keeping clients separated gives you clear trust boundaries: the **public PKCE client owns authentication**, the **bearer-only client owns authorization**. Each does one thing well.

---

## Summary

| Task | Where |
| ---- | ----- |
| Define the permission (role) | `my-api` → Roles tab |
| Add role to frontend token | `my-frontend` → Client Scopes → Dedicated → Assign role |
| Group users by access level | Groups → `api-readers` → Role mapping → `my-api/api-reader` |
| Grant access to a user | Add user to `api-readers` group |
| Force PKCE for the SPA | `my-frontend` → Advanced → Code Challenge Method: S256 |
| Validate the token on every request | Backend API — signature, issuer, audience, role |

This pattern scales cleanly: to grant API access to a new user, add them to the group. To add a second frontend, create a new public client and assign the same role to its dedicated scope — no changes to the backend or the resource server client needed.

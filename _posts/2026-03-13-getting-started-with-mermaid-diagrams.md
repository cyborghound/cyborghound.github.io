---
layout: post
title: Generating Architecture Diagrams with Mermaid.js
date: 2026-03-13 23:55:00 +0100
categories: [Blogging, Tutorial]
tags: [mermaid, diagrams, architecture, markdown]
toc: true
comments: true
mermaid: true
---

As part of the **Bleeding Edge** upgrades to the blog, we have natively integrated **Mermaid.js**. This allows you to generate beautiful flowchart, sequence, class, state, and other diagrams directly within your Markdown files using simple text.

This is incredibly useful for documenting Homelab setups, Docker architectures, or Cyber Security attack paths.

## 1. Simple Flowchart

Here is a basic flowchart showing a typical homelab web request:

```mermaid
graph TD;
    User((User))-->|HTTPS| Cloudflare[Cloudflare Proxy];
    Cloudflare-->|HTTPS| Traefik[Traefik Reverse Proxy];
    Traefik-->|Internal Routing| App1[CyberChef Container];
    Traefik-->|Internal Routing| App2[Nextcloud Container];
    App2-->DB[(PostgreSQL Database)];
```

## 2. Sequence Diagram

Sequence diagrams are perfect for explaining things like the OAuth PKCE flow or authentication handshakes:

```mermaid
sequenceDiagram
    participant Alice
    participant Backend API
    Alice->>Backend API: POST /login (Credentials)
    Backend API-->>Alice: 200 OK (JWT Token)
    Alice->>Backend API: GET /secure-data (Bearer Token)
    Backend API-->>Alice: 200 OK (JSON Data)
```

## 3. Git Graph

You can even draw Git branching strategies natively:

```mermaid
gitGraph
    commit
    commit
    branch feature/mermaid-support
    checkout feature/mermaid-support
    commit
    commit
    checkout main
    merge feature/mermaid-support
    commit
```

## How to use it

To render a diagram, simply create a Markdown code block and use `mermaid` as the language. You don't need to import any scripts or install any extensions; it runs perfectly out of the box!

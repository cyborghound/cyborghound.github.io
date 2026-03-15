---
layout: post
title: Generating Architecture Diagrams with Mermaid.js
date: 2026-03-13 23:55:00 +0100
categories: [Blogging, Tutorial]
tags: [mermaid, diagrams, architecture, markdown]
toc: true
comments: true
mermaid: true
image:
  path: /assets/img/headers/mermaid_diagrams.png
---

They say a picture is worth a thousand words, and nowhere is that more true than in software architecture and documentation. However, maintaining diagram files alongside code can be a hassle, especially when trying to version control them.

That's why I've natively integrated **Mermaid.js** into the blog. Mermaid allows you to generate beautiful flowchart, sequence, class, state, and other diagrams directly within your Markdown files using simple, version-controllable text!

Whether you are documenting a Homelab setup, Docker architecture, Cyber Security attack path, or software design, Mermaid makes creating and updating visual representations incredibly simple.

## 1. Flowcharts for Infrastructure

Flowcharts are excellent for visualizing network flows, container setups, or application components. Here is a basic flowchart showing a typical homelab web request:

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background":         "#0d1117",
    "mainBkg":            "#161b22",
    "primaryColor":       "#161b22",
    "primaryBorderColor": "#00d4ff",
    "primaryTextColor":   "#e6edf3",
    "lineColor":          "#00d4ff",
    "secondaryColor":     "#161b22",
    "tertiaryColor":      "#0d1117",
    "edgeLabelBackground":"#161b22",
    "nodeTextColor":      "#e6edf3",
    "fontFamily":         "ui-monospace, monospace"
  }
}}%%
graph TD;
    User((User))-->|HTTPS| Cloudflare[Cloudflare Proxy];
    Cloudflare-->|HTTPS| Traefik[Traefik Reverse Proxy];
    Traefik-->|Internal Routing| App1[CyberChef Container];
    Traefik-->|Internal Routing| App2[Nextcloud Container];
    App2-->DB[(PostgreSQL Database)];
```

## 2. Sequence Diagrams for Workflows

Sequence diagrams perfectly illustrate how different entities interact over time, making them ideal for explaining things like the OAuth PKCE flow or authentication handshakes:

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background":            "#0d1117",
    "mainBkg":               "#161b22",
    "primaryColor":          "#161b22",
    "primaryBorderColor":    "#00d4ff",
    "primaryTextColor":      "#e6edf3",
    "lineColor":             "#00d4ff",
    "signalColor":           "#00d4ff",
    "signalTextColor":       "#e6edf3",
    "actorBkg":              "#161b22",
    "actorBorder":           "#00d4ff",
    "actorTextColor":        "#e6edf3",
    "actorLineColor":        "#4d9fff",
    "activationBkgColor":    "#0d1117",
    "activationBorderColor": "#00d4ff",
    "labelBoxBkgColor":      "#161b22",
    "labelBoxBorderColor":   "#00d4ff",
    "labelTextColor":        "#e6edf3",
    "noteBkgColor":          "#0d2233",
    "noteBorderColor":       "#00d4ff",
    "noteTextColor":         "#e6edf3",
    "sequenceNumberColor":   "#0d1117",
    "fontFamily":            "ui-monospace, monospace"
  }
}}%%
sequenceDiagram
    participant Client
    participant API Gateway
    participant Auth Service

    Client->>API Gateway: POST /login (Credentials)
    API Gateway->>Auth Service: Validate Credentials
    Auth Service-->>API Gateway: Valid (Issue Token)
    API Gateway-->>Client: 200 OK (JWT Token)

    Client->>API Gateway: GET /secure-endpoint (Bearer Token)
    API Gateway-->>Client: 200 OK (JSON Data)
```

## 3. Visualizing Git Branching Strategies

Explaining complex merge strategies? You can even draw Git branching histories natively:

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background":       "#0d1117",
    "mainBkg":          "#161b22",
    "primaryColor":     "#161b22",
    "primaryTextColor": "#e6edf3",
    "lineColor":        "#00d4ff",
    "git0":             "#00d4ff",
    "git1":             "#4d9fff",
    "git2":             "#79c0ff",
    "gitBranchLabel0":  "#0d1117",
    "gitBranchLabel1":  "#0d1117",
    "gitBranchLabel2":  "#0d1117",
    "gitInv0":          "#0d1117",
    "gitInv1":          "#0d1117",
    "commitLabelColor": "#e6edf3",
    "commitLabelBackground":"#161b22",
    "fontFamily":       "ui-monospace, monospace"
  }
}}%%
gitGraph
    commit
    commit
    branch feature/new-component
    checkout feature/new-component
    commit
    commit
    checkout main
    merge feature/new-component
    commit
```

## How to use it

If you're using this theme, rendering a diagram is effortless. Simply create a standard Markdown code block and use `mermaid` as the language tag. You don't need to import any scripts, upload images, or install any extensions—it renders perfectly on the page out of the box!

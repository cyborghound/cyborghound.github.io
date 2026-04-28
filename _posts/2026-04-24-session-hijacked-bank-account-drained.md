---
layout: post
title: "Session Hijacked, Bank Account Drained: A Forensic Breakdown"
date: 2026-04-24 12:00:00 +0100
categories: [Security, Incident Response]
tags: [session-hijacking, oauth, claude-code, incident-response, psd2, forensics, devsecops]
toc: true
comments: true
published: true
image:
  path: /assets/img/headers/claude.png
---

On April 17, 2026, I was standing at a checkout in a store when my card was declined. I knew I had enough money. I hadn't spent anything significant in days. The decline made no sense.

Back home, I found out why: someone had purchased $341.12 worth of Claude gift subscriptions using my account. Three purchases. Three different recipients. Two at 18:28, one at 18:29. All automated. By the time my card was declined, the balance had already been gone for nearly two hours.

This post is a full forensic breakdown of what happened, how I figured it out, and what Anthropic's platform allowed that made it possible. It's also a warning — because this isn't just happening to me.

---

## The Attack Pattern

The fraud was discovered at 20:05 when my card was declined at a checkout. Back home I pulled up the Claude billing history and saw the purchases immediately. The invoices didn't add up — three gift subscriptions I never bought. Before touching anything else, I collected the evidence — billing history, kernel logs, Google security logs, timestamps — everything that would later form this report. Only then did I lock everything down: signed out all Claude sessions, deleted all skills and connectors, removed the Claude Chrome extension, deactivated every active session, and blocked my card. On the Google side I signed out all active sessions — that action triggered a **Critical Security Alert** from Google, and when I looked at the security log, the Windows session was right there. I don't own a Windows machine. I never have.

Looking back at the Claude billing history, the picture became clear immediately:

| Time | Product | Amount | Status |
| --- | --- | --- | --- |
| 18:28 | Gift Max 20X – 1 month | $213.20 | REDEEMED |
| 18:28 | Gift Max 5X – 1 month | $106.60 | REDEEMED |
| 18:29 | Gift Pro – 1 month | $21.32 | REDEEMED |
| **Total** | | **$341.12** | |

Three purchases across two minutes. Three different gift tiers. All codes redeemed instantly by attacker-controlled accounts — two on Proton Mail, one on Yahoo. The total — $341.12 — roughly matches the card balance at the time. The attacker worked down through gift tiers until the balance was exhausted.

> The attacker didn't guess randomly. They systematically tried Max 20X → Max 5X → Pro, each time consuming the remaining balance. The two most expensive purchases hit at 18:28, the final one at 18:29. Three purchases, two minutes, balance exhausted. This is a script, not a person clicking around.
>
> This technique is known as [**card testing**](https://stripe.com/resources/more/what-are-bin-attacks-heres-what-businesses-should-know) — automated scripts probe a stolen payment method with descending transaction amounts to determine the available balance before fully draining it. It's a well-documented fraud pattern that payment processors are supposed to detect. Anthropic's platform imposed no such detection.
{: .prompt-warning }

---

## Possible Attack Vectors

The exact exfiltration method is unconfirmed. The forensic evidence shows what happened and when — not how the token was obtained. Two attack surfaces were present that are directly relevant to this incident.

### Vector 1: OAuth credentials file on a Linux VPS

On Linux, Claude Code stores its OAuth credentials in plaintext at:

```text
~/.claude/.credentials.json
```

This file contains an `accessToken`, `refreshToken`, and expiry — everything needed to authenticate as you from any machine. On macOS the token goes into the Keychain instead, but on Linux it sits in an unencrypted plaintext JSON file. The file is restricted to the user by default, but any process running as that user — or anyone who gains filesystem access — can read it directly.

The VPS had its firewall enabled and was a fresh Hetzner install, so direct server compromise is unlikely. The more probable scenario is that the credentials file was exfiltrated before the VPS was deleted — either through a compromised process or through Claude Code's own behaviour.

### Vector 2: Browser session theft

The official Claude Chrome extension was installed and had access to authenticated claude.ai sessions. Separately, Malwarebytes documented active campaigns in early 2026 distributing an infostealer called **Amatera** through [fake Claude Code install pages](https://www.malwarebytes.com/blog/news/2026/03/fake-claude-code-install-pages-hit-windows-and-mac-users-with-infostealers). Amatera specifically targets browser cookies and session tokens — the exact credentials needed to hijack a claude.ai session without a password.

Whether the vector was the extension, a stolen browser session, or the VPS credentials file, the outcome is the same: a valid OAuth token in the attacker's hands.

---

The confirmed issue across all vectors is the same: **revoking all sessions via claude.ai does not invalidate tokens already issued.** This is documented in Anthropic's own issue tracker — [GitHub issue #43801](https://github.com/anthropics/claude-code/issues/43801) confirms tokens remain valid after "Log out all sessions", verified after 3–4 days and a full VM cold boot. This is consistent with a [well-documented pattern](https://thehackernews.com/expert-insights/2026/04/session-cookie-theft-you-showed-your-id.html): changing a password does not invalidate active session tokens — the attacker retains access until the token expires or is explicitly revoked at the identity provider level.

> The forensic evidence shows *what* happened and *when*. How the token was obtained remains unconfirmed. Both vectors above are real, documented attack surfaces — not speculation.
{: .prompt-warning }

---

## The Full Timeline

| Time | Event |
| --- | --- |
| April 16 | VPS deleted — OAuth token in `~/.claude/.credentials.json` potentially already exfiltrated |
| April 17 – 17:19:30 | MacBook physically closed — kernel log: `isClamshelled=1`, `DisplayOn=0` |
| April 17 – 18:28 | Gift Max 20X + Gift Max 5X purchased and redeemed |
| April 17 – 18:29 | Gift Pro purchased and redeemed — card balance exhausted |
| April 17 – 17:19 → 20:33 | Zero machine activity — no display events for 3h14m |
| April 17 – 20:05 | Card declined at checkout — account balance gone — fraud discovered |
| April 17 – 23:16 | Google flags Windows session as suspicious — Critical Security Alert |
| April 17 – 23:16 → 23:43 | Claude incident response: signed out all sessions, deleted skills and connectors, removed Chrome extension, deactivated all active sessions |
| April 17 – 23:16 → 23:43 | Google incident response: sign out all → password change → passkey reset |
| April 17 – 23:43 | All steps completed — attacker's OAuth token still valid due to unpatched revocation bug |

---

## Forensic Evidence

What made this case documentable was macOS's kernel-level logging. The power management daemon writes immutable records of physical device state — clamshell position, display state, charger status. These are not user-space logs. They can't be modified by applications.

```bash
# Extract display activity for the incident day
pmset -g log | grep "2026-04-17" | grep -E "Wake|Sleep|Display" | grep -v "Assertion"

# Result:
# 17:19:30  Display is turned off     ← machine closed, fraud window begins
# 20:33:59  Display is turned on      ← first activity after 3h14m gap
```

```bash
# Verify clamshell state via unified log
log show --predicate 'process == "powerexperienced"' \
  --start "2026-04-17 17:00:00" --end "2026-04-17 21:00:00" \
  | grep -E "isClamshelled|DisplayOn"

# Result at 17:19:30:
# isClamshelled=1  DisplayOn=0  isPluggedIn=1
```

The Google security log told the rest of the story:

| Date | Event | Device |
| --- | --- | --- |
| April 9 | New sign-in — normal baseline | Desktop |
| April 17 | **Suspicious activity in your account** | **Windows** ← the attacker |
| April 17 | Incident response actions taken | Desktop |

The only Windows activity ever recorded in this Google account was the attacker's session. Every legitimate session — before and after the incident — was from my own devices. Google flagged it themselves. This isn't my interpretation — it's the platform's own anomaly detection.

---

## Anthropic's Security Gap

Here's what made this attack trivially easy to execute:

- No MFA or step-up authentication required for purchases
- No email confirmation sent before charging the card
- No rate limiting on gift purchases
- No anomaly detection on bulk purchases within the same minute
- No spend cap or purchase limit per session

An authenticated session — however obtained — had full, unlimited purchasing power with zero friction. The attacker's script could drain an account completely in under two minutes with no interruption.

During incident response I signed out all Claude sessions, deleted all skills and connectors, removed the Chrome extension, and deactivated every active session. None of it mattered. Due to the token revocation bug, the attacker's OAuth token remained valid through all of it.

> This is not an isolated incident. GitHub issue [**#49741**](https://github.com/anthropics/claude-code/issues/49741) (opened April 17, 2026 — the same day) documents another victim. A separate report describes 5 unauthorized gift subscriptions totalling €870, purchased via the same automated pattern. Multiple users on Trustpilot reported identical charges around April 9–17, 2026. Reddit has many more — search for *"Claude gift fraud"* and you will find them. The stolen codes are resold on gray market platforms. This is an organised operation.
{: .prompt-info }

---

## The Legal Angle

In the EU, **PSD2 Article 73** (implemented in Dutch law as Article 7:527 BW) requires payment service providers to refund unauthorized transactions by the end of the next business day — unless they have reasonable grounds to suspect the account holder committed the fraud themselves.

The forensic evidence made that impossible to argue:

- Attacker used a Windows device — victim doesn't own one
- Google independently flagged the session as suspicious
- Automated purchase pattern inconsistent with normal use
- Machine provably inactive during the fraud window (kernel logs)

A formal police report was filed with a cybercrime specialist. Applicable law: **Art. 138ab Sr** (unauthorized computer access), **Art. 326 Sr** (fraud), **Art. 139d Sr** (data interception).

---

## What Happened Next

The first thing I did after locking everything down was contact Anthropic. Their support starts with an AI agent called Finn — it goes through standard troubleshooting until you say the word *fraud*. Then it pivots: "I'll create a case for you." Case created. What I didn't know at the time is that based on reports from other victims, it takes roughly a month before a real human actually picks up the case.

The bank was next. Also an AI agent, but a more direct one — they took my story and asked for a police report. So I filed one. A cybercrime specialist took the full account: the purchase timeline, the Windows session, the token exfiltration vectors, the kernel log evidence. Then back to the bank with the report number.

As of publishing: I'm still waiting on both. Eleven days into the Anthropic case, and the bank's process is ongoing.

> **I will update this post when there is a final outcome from Anthropic and the bank.**
{: .prompt-info }

---

## What You Should Do Right Now

### If you use Claude Code on a VPS or remote server

- Check `~/.claude/.credentials.json` — on Linux this file contains your live OAuth token in plaintext
- **Don't rely on "Log out all sessions" via claude.ai** — due to a confirmed bug ([#43801](https://github.com/anthropics/claude-code/issues/43801)), this does not actually invalidate issued tokens
- To force token invalidation, revoke Anthropic's access via your **Google account security settings** → Third-party apps → remove Claude Code
- Don't assume deleting the VPS invalidates the token — **it doesn't**
- Treat OAuth tokens like SSH private keys: rotate frequently, revoke on decommission

### Limit your blast radius before an attack happens

Connect your Claude payment method to a **dedicated bank account with a near-zero balance** — bunq and Revolut make this trivial. Only transfer the exact subscription amount before renewal. If a session is compromised, there is nothing to drain.

### If you've already been hit

- Sign out all Claude sessions immediately via Settings → Active Sessions
- Revoke Anthropic's access via **Google account security settings → Third-party apps** — this is the only reliable way to invalidate issued tokens
- Rotate your Google password and add a passkey
- Remove the Claude Chrome extension and audit remaining extensions for cookie access
- File a chargeback under PSD2 Art. 73 with your bank — you have a strong legal basis
- Contact Anthropic support with your invoice numbers and a clear fraud description
- File a police report — cybercrime specialists understand session hijacking
- Report recipient email addresses to their providers (Proton: `abuse@proton.me`, Yahoo: `abuse@yahoo.com`)

---

Forensic commands and log output are real and reproducible on macOS. GitHub issue #49741 is publicly verifiable at github.com/anthropics/claude-code/issues/49741

One week after this incident, a second fraud case occurred — Klarna was used to purchase PSN gift cards in my name. That case is documented in [Klarna Identity Theft: How the 'Klarna Method' Exploits Stolen Data](/posts/klarna-psn-gift-card-fraud).

---

## Sources

- [Fake Claude Code install pages hit Windows and Mac users with infostealers – Malwarebytes](https://www.malwarebytes.com/blog/news/2026/03/fake-claude-code-install-pages-hit-windows-and-mac-users-with-infostealers)
- [GitHub issue #43801 – Claude Code token revocation bug](https://github.com/anthropics/claude-code/issues/43801)
- [GitHub issue #49741 – Claude gift fraud victim report](https://github.com/anthropics/claude-code/issues/49741)
- [Session Cookie Theft: You Showed Your ID at the Door – The Hacker News](https://thehackernews.com/expert-insights/2026/04/session-cookie-theft-you-showed-your-id.html)
- [What Are BIN Attacks? – Stripe](https://stripe.com/resources/more/what-are-bin-attacks-heres-what-businesses-should-know)

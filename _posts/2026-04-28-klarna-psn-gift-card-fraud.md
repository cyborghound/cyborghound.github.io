---
layout: post
title: "Klarna Identity Theft: How the 'Klarna Method' Exploits Stolen Data"
date: 2026-04-28 12:00:00 +0100
categories: [Security, Incident Response]
tags: [fraud, klarna, identity-theft, gift-cards, incident-response, psd2, odido]
toc: true
comments: true
published: true
image:
  path: /assets/img/headers/klarna-fraud.png
---

On April 24, 2026, I received three emails in the span of a single minute that I never triggered. Two Klarna payment confirmations — €77.75 each — and a welcome email from ShopTo.Net: "You're now a Bronze member."

I had never visited ShopTo.Net in my life.

---

## What Happened

Two identical purchases were placed through **Klarna Express** at [ShopTo.Net](https://www.shopto.net), a UK-based digital game key retailer:

| Time | Product | Amount |
| --- | --- | --- |
| April 24 – 14:02 | $100 PlayStation Store Gift Card – PSN USA | €77.75 |
| April 24 – 14:02 | $100 PlayStation Store Gift Card – PSN USA | €77.75 |
| **Total** | | **€155.50** |

The codes were delivered digitally to a fresh ShopTo.Net account created in my name. The Bronze membership email confirmed it was the account's first and only purchase.

---

## The Likely Attack Vector: The Odido Breach

In February 2026, Dutch telecom **Odido** suffered a massive breach affecting [6.5 million customers](https://www.techzine.eu/news/security/139178/all-data-from-dutch-telco-odido-65m-customers-leaked-online/). As a customer, my exposed data included my full name, address, phone number, date of birth, and bank account number (IBAN).

This is the exact dataset required for the [**"Klarna Method"**](https://frankonfraud.com/the-klarna-glitch-that-isnt-inside-the-new-viral-trend/) — a documented fraud pattern in which attackers use stolen personal data to push through Klarna’s Pay Later flow. Klarna runs a soft credit check against name, email, date of birth, and address. No existing Klarna account or login is required. The transaction is approved against the victim’s creditworthiness and the invoice lands in their inbox.

My Klarna activity log for April 24 shows no login events, no SMS challenges, and no email verifications before the purchases. The first entries are the two transactions themselves — consistent with a Pay Later checkout using personal data rather than an authenticated session.

> **Klarna’s stated reason for rejecting my fraud report:** the purchase was made from a "recognized device." Their own activity log shows no authentication event before the purchases. If this was a Pay Later transaction using stolen personal data, there was no device login to log.
{: .prompt-danger }

---

## PSD2 and the Failure of Risk Analysis

Under **PSD2 (Strong Customer Authentication)**, remote payments over €30 generally require two-factor authentication. At €77.75, these transactions should have triggered a challenge.

Klarna can bypass SCA using a [**Transaction Risk Analysis (TRA)** exemption](https://blog.mangopay.com/en/home/psd2-sca-exemptions-transaction-risk-analysis-tra) — permitted only if the payment provider maintains sufficiently low fraud rates and applies real-time risk checks. TRA is specifically designed to catch unusual patterns. Two identical purchases for digital gift cards at a brand-new merchant, placed within the same minute, is a textbook fraud signal. If Klarna’s TRA allowed these through without an SMS or app challenge, the exemption was misapplied.

---

## Action Taken

1. **Disputed with Klarna:** Reported both payments as fraud immediately.
2. **Challenged Rejection:** When Klarna rejected one claim citing "device recognition," I formally requested the technical evidence (IP logs, device fingerprints) and opened a secondary dispute.
3. **Account Closure:** Contacted ShopTo.Net; they confirmed the account was fraudulent and closed it immediately. On April 25 — the day the account was closed — a Silver membership notification arrived, suggesting the codes may not have been fully delivered until that day. If so, closing the account in time may have blocked redemption.
4. **Account Hardening:** Enabled all available Klarna security options — passkey, SMS 2FA, and email 2FA — until the dispute is resolved.
5. **Police Report:** Added this incident to my existing identity theft report with the Dutch police.

---

## What to Do If This Happens to You

* **Check your Activity Log:** In the Klarna app, go to *Settings → Login & Security → Activity*. If purchases appear without a "Login" event immediately preceding them, you are likely a victim of the "Pay Later" guest checkout exploit.
* **Invoke PSD2 Rights:** Under **Art. 7:527 BW** (in the Netherlands), payment providers are generally required to refund unauthorized transactions by the end of the next business day while they investigate.
* **Demand Evidence:** If a claim is rejected based on "recognized devices," demand the IP address and metadata. If it doesn't match your home or mobile network, use that as leverage for an appeal.
* **Force MFA:** Do not rely on Klarna's default settings. Manually enable "App Lock" and multi-factor options in the settings menu.
* **Report to the AP:** If Klarna refuses to cooperate, file a complaint with the **Autoriteit Persoonsgegevens (AP)** regarding the misuse of your leaked personal data.

---

*This incident and the [April 17 Claude session hijack](/posts/session-hijacked-bank-account-drained) are covered under a single police report filed with a cybercrime specialist. Whether both incidents share a common origin is unknown. Updates will follow as the Klarna dispute progresses.*

---

## Sources

* [The Klarna Glitch That Isn't: Inside The New Viral Trend – Frank on Fraud](https://frankonfraud.com/the-klarna-glitch-that-isnt-inside-the-new-viral-trend/)
* [All data from Dutch telco Odido's 6.5M customers leaked online – Techzine](https://www.techzine.eu/news/security/139178/all-data-from-dutch-telco-odido-65m-customers-leaked-online/)
* [Class-action suit started against Odido over data leak – NL Times](https://nltimes.nl/2026/04/20/class-action-suit-started-odido-data-leak-affecting-62-million-dutch)
* [PSD2 SCA exemptions: Transaction Risk Analysis (TRA) – Mangopay](https://blog.mangopay.com/en/home/psd2-sca-exemptions-transaction-risk-analysis-tra)
* [Have I Been Pwned: Odido Data Breach](https://haveibeenpwned.com/Breach/Odido)
* [Art. 7:527 BW – Burgerlijk Wetboek (Dutch Civil Code)](https://wetten.overheid.nl/BWBR0005289/2024-01-01#Boek7_Titeld7.7A_Afdeling7.7A.5_Artikel527)

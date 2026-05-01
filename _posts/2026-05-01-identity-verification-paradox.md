---
layout: post
title: "Your Name Is Not a Secret: The Identity Verification Paradox"
date: 2026-05-01 12:00:00 +0100
categories: [Security, Privacy]
tags: [identity-theft, privacy, kba, odido, data-breach, psd2, avg, gdpr, fraud, identity-verification]
toc: true
comments: true
published: true
image:
  path: /assets/img/headers/identity-theft.png
---

After the [Klarna fraud](/posts/klarna-psn-gift-card-fraud) I documented last week, I kept coming back to one question: how did someone pass Klarna's identity check without ever logging in to my account?

The answer is simple and uncomfortable. Klarna verified my identity by asking for my name, date of birth, address, and email. The attacker had all of that, because Odido had already handed it to them.

That's not a Klarna bug. It's not an Odido bug. It's a design flaw that affects most of the digital services we rely on, and it becomes catastrophically worse every time a major breach happens.

---

## The Assumption That Breaks Everything

Knowledge-Based Authentication (KBA) is the practice of verifying identity by checking whether someone knows the right facts about a person. Your date of birth. Your postcode. Your IBAN. Your mother's maiden name.

KBA works on a single assumption: **that the knowledge is secret**.

The moment that assumption fails, when those facts become available to anyone with €10 and a Telegram account, the entire verification chain collapses. It's not weakened. It's broken. Every service still relying on KBA is now asking the attacker the same question they're asking you, and the attacker has the same answer.

---

## What Odido Leaked

In February 2026, Dutch telecom Odido suffered a breach affecting [6.5 million customers](https://www.techzine.eu/news/security/139178/all-data-from-dutch-telco-odido-65m-customers-leaked-online/). The exposed dataset included:

| Field | Why It Matters |
| --- | --- |
| Full name | Used in nearly every KBA flow |
| Date of birth | Standard identity challenge at banks, telecoms |
| Home address | Required for credit checks, shipping verification |
| Phone number | Used for SMS 2FA, now in attacker's hands |
| IBAN | Confirms identity at financial services |
| Email address | Enough to trigger account recovery at most services |

This isn't generic contact data. This is **the exact dataset that most Dutch financial and commercial services use to verify who you are**. Klarna's Pay Later flow. Credit checks. Phone number portability requests. Utility company onboarding. The attacker received a complete identity kit for six and a half million people.

I was one of them.

---

## The Klarna Case: KBA Failure in Practice

The [Klarna Method](/posts/klarna-psn-gift-card-fraud) is a documented fraud pattern that emerged directly from this type of breach. Klarna's Pay Later checkout runs a soft credit check against name, date of birth, and address. No existing Klarna account or login required. If the check passes, the purchase is approved and the invoice lands in the victim's inbox.

My Klarna activity log for April 24 shows no login event before the two €77.75 purchases. The first entries are the transactions themselves. The attacker didn't need my password. They didn't need my phone. They needed my name, my birthday, and my postcode, all of which Odido had already leaked.

> **The core problem:** Klarna used data as both the identity claim *and* the verification. The attacker presented the leaked data as the claim ("I am Michael"), and Klarna verified it against... the same leaked data. There was no independent factor.
{: .prompt-danger }

---

## This Is Everywhere

Klarna is not an outlier. KBA is the default across most consumer-facing services.

**Telecoms** use it for SIM swaps and contract changes. With your name, date of birth, and phone number (all in the Odido dataset), an attacker can request a SIM swap at most Dutch carriers. Your number lands on their SIM. Every SMS-based 2FA code now routes to them.

**Banks** use it for phone verification. Call a Dutch bank's helpline, and they will ask for your BSN, date of birth, and postcode before discussing your account. An attacker with the Odido dataset is missing only your BSN, which is included in other breaches and is increasingly findable.

**Insurance and utilities** use it for onboarding and contract changes. Switching your energy contract to a new address or adding a product to an existing policy typically requires nothing more than name, date of birth, address, and IBAN.

**Webshops and marketplaces** use it for account recovery. "Forgotten your password? Enter your date of birth and postal code." The attacker doesn't need your password if they can reset it.

The SIM swap scenario is particularly severe. Once an attacker controls your phone number, they don't just bypass SMS 2FA: they can trigger password resets on any account linked to that number. Email, banking apps, DigiD. A single KBA failure at a telecom cascades across your entire digital identity.

---

## Why Companies Still Use KBA

KBA is cheap, fast, and frictionless. It requires no infrastructure beyond a database lookup. It doesn't need an app. It works over the phone. It works in a form field. It scales to millions of customers with near-zero marginal cost.

Real identity verification using a second factor you actually possess introduces friction, dropout, and support overhead. Sending someone an app push, requiring a physical ID scan, or issuing a hardware token all cost money and lose customers at the signup step.

So companies accept a calculated risk. The assumption built into that calculation is that KBA data stays private. What nobody adequately priced in is what happens when one large database breach invalidates that assumption for six million people simultaneously.

---

## The Legal Landscape

Dutch and EU law provides some protection, but it's fragmented and slow.

**For the attacker:**

- **Art. 231b Sr (Identiteitsfraude)**: criminal offense since 2014, specifically covering the fraudulent use of another person's identity data. Maximum five years imprisonment.
- **Art. 326 Sr (Oplichting/fraud)**: purchases made using a stolen identity fall under this.
- **Art. 138ab Sr (Computervredebreuk)**: applies if the attacker accessed systems to obtain the data.

**For you as a victim:**

- **Art. 7:527 BW (PSD2 Art. 73)**: payment service providers must refund unauthorized transactions by the end of the next business day. The burden of proof sits with them: they must demonstrate you authorized or negligently enabled the transaction. You don't have to prove the negative.
- **Art. 6:162 BW (Onrechtmatige daad)**: if a company's insufficient verification caused your loss, you can hold them liable for damages in civil court.
- **AVG Art. 82 (GDPR Art. 82)**: you have a right to compensation from the organization that leaked your data if you can demonstrate material or immaterial harm.

**The structural gap:**

The law treats the breach (Odido) and the fraud (Klarna) as separate incidents. Odido is liable under the AVG for inadequate data protection. Klarna is accountable under PSD2 for approving an unauthorized transaction without proper SCA. But no provision directly forces Odido to bear the downstream fraud costs that their breach enabled.

The [class-action suit against Odido](https://nltimes.nl/2026/04/20/class-action-suit-started-odido-data-leak-affecting-62-million-dutch), filed in April 2026, is attempting to close this gap using AVG Art. 82, arguing that the breach caused demonstrable harm precisely because KBA-dependent services used that data to authorize transactions.

> **If you've been defrauded after the Odido breach**, the refund path runs through your payment provider under PSD2, not through Odido. But documenting the causal link ("the fraud was possible because of the breach") strengthens both a fraud dispute and a potential AVG claim.
{: .prompt-info }

---

## What Actual Identity Verification Looks Like

The fundamental principle is simple: **verify identity using something the claimant possesses or is, not something they know**.

| Factor type | Examples | Survives a data breach? |
| --- | --- | --- |
| Something you know | Password, DOB, postcode | No, this is exactly what leaks |
| Something you have | Phone (TOTP/push), hardware token, passport | Yes, attacker can't replicate the physical object |
| Something you are | Biometrics (Face ID, fingerprint) | Yes, but raises its own privacy concerns |

Strong identity verification requires combining at least two factors from different categories. A password plus a date of birth is still single-factor: both are knowledge. A password plus an authenticator app is genuine two-factor.

For high-stakes flows like contract changes, financial transactions, or account recovery, the bar should be higher still: a live possession check (push notification to a registered device) or a physical identity document scan. The Dutch government's DigiD High system, which requires a verified ID upload and a BSN check, is an example of what this looks like in practice.

What it should never look like is "enter your date of birth and postcode", because that stopped being secret information for six and a half million Dutch people in February.

---

## What You Can Do Right Now

The systemic problem is not yours to fix. But you can limit your exposure.

**Audit your KBA attack surface.** Think about which services hold accounts in your name and how they verify identity. Anything that relies solely on name, DOB, address, or IBAN is vulnerable. Prioritize changing recovery methods on email, banking, and telecom accounts.

**Lock your phone number.** Contact your carrier and ask about SIM lock or port freeze options. T-Mobile/Odido, KPN, and Vodafone all offer some form of this. It stops SIM swaps initiated via KBA.

**Replace SMS 2FA with an authenticator app.** SMS codes depend on your phone number staying yours. TOTP apps (Google Authenticator, Aegis, 1Password) generate codes locally and are not affected by SIM swaps.

**Use unique email addresses per service.** A dedicated address for financial services means a compromised inbox at one service doesn't become account recovery leverage at another.

**Check whether you were in the Odido breach.** You can verify at [Have I Been Pwned](https://haveibeenpwned.com/Breach/Odido). If you were, treat your date of birth, address, and IBAN as publicly known information and act accordingly.

**Know your PSD2 rights.** If a payment is made in your name without your authorization, you are entitled to a refund under Art. 7:527 BW. File a dispute immediately, and file a police report with the cybercrime unit, not because you expect a rapid arrest, but because the report number is often required to escalate disputes and to support an eventual AVG claim.

---

## The Underlying Problem

Data breaches are permanent. Once your date of birth is in a leaked dataset, it stays leaked. Changing your password doesn't fix it. Closing the breached account doesn't fix it. The information is out there, and it will remain out there for years, appearing in new credential combo lists, traded on forums, used in fraud patterns we haven't named yet.

Every service that continues to verify identity using that static data is effectively relying on a key that was copied in February. The locks are still on the doors. The keys are in circulation.

The question worth asking of every service that holds something valuable (your money, your contracts, your medical records) is: *if all of my personal data is already public, what stops someone from being me here?*

If the answer is "nothing," that's the vulnerability.

---

*This post is part of a series on the fraud cases that followed the Odido breach. See also: [Session Hijacked, Bank Account Drained](/posts/session-hijacked-bank-account-drained) and [Klarna Identity Theft: How the 'Klarna Method' Exploits Stolen Data](/posts/klarna-psn-gift-card-fraud).*

---

## Sources

- [All data from Dutch telco Odido's 6.5M customers leaked online – Techzine](https://www.techzine.eu/news/security/139178/all-data-from-dutch-telco-odido-65m-customers-leaked-online/)
- [Class-action suit started against Odido over data leak – NL Times](https://nltimes.nl/2026/04/20/class-action-suit-started-odido-data-leak-affecting-62-million-dutch)
- [Have I Been Pwned: Odido Data Breach](https://haveibeenpwned.com/Breach/Odido)
- [The Klarna Glitch That Isn't: Inside The New Viral Trend – Frank on Fraud](https://frankonfraud.com/the-klarna-glitch-that-isnt-inside-the-new-viral-trend/)
- [Art. 7:527 BW – Burgerlijk Wetboek](https://wetten.overheid.nl/BWBR0005289/2024-01-01#Boek7_Titeld7.7A_Afdeling7.7A.5_Artikel527)
- [Art. 231b Sr – Wetboek van Strafrecht (Identiteitsfraude)](https://wetten.overheid.nl/BWBR0001854/2024-01-01#BoekTweede_TitelXII_Artikel231b)
- [GDPR Art. 82 – Right to compensation – EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)
- [Knowledge-Based Authentication: Why It's Not Enough – NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [SIM Swap Fraud Explained – KPN Veilig](https://www.kpn.com/zakelijk/blog/wat-is-simswap-fraude.htm)

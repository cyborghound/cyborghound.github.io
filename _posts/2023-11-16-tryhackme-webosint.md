---
layout: post
title: "TryHackMe: WebOSINT"
date: 2023-11-16 23:56 +0100
categories: TryHackMe OSINT
tags: tryhackme osint
image:
  path: /assets/img/headers/webosint.png
---

# When A Website Does Not Exist

What's the first thing you do when you are given the name of a business to check out? Fire up the ol' web browser, find the website and check it out, right?
What if the website, or even the entire business, no longer exists?
That does NOT mean it's the end of the road.
OSINT researchers may still be able to connect the dots and find useful information on such organizations.
Your job is to find as much information as you can about the website RepublicofKoffee.com.
\<Spoiler alert\> the website doesn't exist, and if it does by the time you read this, the website in its current form is not our target.
One way to collect information about a website without directly visiting it is to simply do a search for it.
Note: Sometimes plugging a website into the search bar will send you directly to the site. Avoid this by putting the site in quote marks. Also note that this will only return results where the full domain name is written out on the website.
Go ahead and google "RepublicOfKoffee.com" with and without quote marks, just to see what happens.

# Whois Registration
Just because nothing shows up when you visit 'RepublicOfKoffee.com,' doesn't mean that someone doesn't own the domain. In fact, if there is any kind of landing page at all, even a spammy one, then you can be sure that someone does, in fact, own it. But is it currently owned by the same person that used it for the time period we are interested in? We may or may not be able to figure that out, but it's worth a look.
We can confirm current registration status with a whois lookup.
A 'whois' lookup is the most basic form of domain recon available. There are multiple websites that will do it for you as well.
Personally, I recommend just going directly to lookup.icann.org. This should tell you the current hosting company used and name servers. Looking at the raw data option will show further details.
We're looking for any data we might be able to use as pivot points. Maybe an email address? Or better yet, a physical address or phone number?
Technically these are required in order to register any domain, but most domain registrars offer some kind of privacy protection for a trivial fee, if not free.
Anyway, let's see what we can find out!

1. What is the name of the company the domain was registered with?
>- Namecheap Inc

2. What phone number is listed for the registration company? (do not include country code or special characters/spaces)
>- 6613102107

3. What is the first nameserver listed for the site?
>- redacted for privacy

4. What country is listed for the registrant?
>- Panama
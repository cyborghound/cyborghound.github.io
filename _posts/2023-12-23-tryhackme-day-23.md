---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 23"
date: 2023-12-23 21:39 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 coerced-authentication
image:
  path: /assets/img/headers/aoc2023.svg
---

McSkidy is unable to authenticate to her server! It seems that McGreedy has struck again and changed the password! We know it’s him since Log McBlue confirmed in the logs that there were authentication attempts from his laptop. Online brute-force attacks don’t seem to be working, so it’s time to get creative. We know that the server has a network file share, so if we can trick McGreedy, perhaps we can get him to disclose the new password to us. Let’s get to work!

# Questions

> What is the name of the AD authentication protocol that makes use of tickets?
>- Kerberos

> What is the name of the AD authentication protocol that makes use of the NTLM hash?
>- NetNTLM

> What is the name of the tool that can intercept these authentication challenges?
>- responder

> What is the password that McGreedy set for the Administrator account?
>- GreedyGrabber1@

> What is the value of the flag that is placed on the Administrator’s desktop?
>- THM{Greedy.Greedy.McNot.So.Great.Stealy}

> If you enjoyed this task, feel free to check out the Compromising Active Directory module!
>- No answer needed
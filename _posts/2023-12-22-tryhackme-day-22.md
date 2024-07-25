---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 22"
date: 2023-12-22 21:17 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 ssrf
image:
  path: /assets/img/headers/aoc2023.svg
---

As the elves try to recover the compromised servers, McSkidy's SOC team identify abnormal activity and notice that a massive amount of data is being sent to an unknown server (already identified on Day 9). An insider has likely created a malicious backdoor. McSkidy has contacted Detective Frost-eau from law enforcement to help them. Can you assist Detective Frost-eau in taking down the command and control server?

# Questions

> Is SSRF the process in which the attacker tricks the server into loading only external resources (yea/nay)?
>- nay

> What is the C2 version?
>- 1.1

> What is the username for accessing the C2 panel?
>- mcgreedy

> What is the flag value after accessing the C2 panel?
>- THM{EXPLOITED_31001}

> What is the flag value after stopping the data exfiltration from the McSkidy computer?
>- THM{AGENT_REMOVED_1001}

> If you enjoyed this task, feel free to check out the SSRF room.
>- No answer needed
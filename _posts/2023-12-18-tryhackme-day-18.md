---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 18"
date: 2023-12-18 19:27 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 eradication
image:
  path: /assets/img/headers/aoc2023.svg
---

McGreedy is very greedy and doesn't let go of any chance to earn some extra elf bucks. During the investigation of an insider threat, the Blue Team found a production server that was using unexpectedly high resources. It might be a cryptominer. They narrowed it down to a single unapproved suspicious process. It has to be eliminated to ensure that company resources are not misused. For this, they must find all the nooks and crannies where the process might have embedded itself and remove it.

# Questions

> What is the name of the service that respawns the process after killing it?
>- a-unkillable.service

> What is the path from where the process and service were running?
>- /etc/systemd/system/

> The malware prints a taunting message. When is the message shown? Choose from the options below.
> 1. Randomly
> 2. After a set interval
> 3. On process termination
> 4. None of the above
>- 4

> If you enjoyed this task, feel free to check out the Linux Forensics room.
>- No answer needed
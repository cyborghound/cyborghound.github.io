---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 19"
date: 2023-12-19 19:40 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 memory-forensics
image:
  path: /assets/img/headers/aoc2023.svg
---

The elves are hard at work inside Santa's Security Operations Centre (SSOC), looking into more information about the insider threat. While analysing the network traffic, Log McBlue discovers some suspicious traffic coming from one of the Linux database servers. 

Quick to act, Forensic McBlue creates a memory dump of the Linux server along with a Linux profile in order to start the investigation.

# Questions

> What is the exposed password that we find from the bash history output?
>- NEhX4VSrN7sV

> What is the PID of the miner process that we find?
>- 10280

> What is the MD5 hash of the miner process?
>- 153a5c8efe4aa3be240e5dc645480dee

> What is the MD5 hash of the mysqlserver process?
>- c586e774bb2aa17819d7faae18dad7d1

> Use the command strings extracted/miner.<PID from question 2>.0x400000 | grep http://. What is the suspicious URL? (Fully defang the URL using CyberChef)
>- hxxp[://]mcgreedysecretc2[.]thm

> After reading the elfie file, what location is the mysqlserver process dropped in on the file system?
>- /var/tmp/.system-python3.8-Updates/mysqlserver

> If you enjoyed this task, feel free to check out the Volatility room.
>- No answer needed
---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 9"
date: 2023-12-09 11:05 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 malware-analysis
image:
  path: /assets/img/headers/aoc2023.svg
---

Having retrieved the deleted version of the malware that allows Tracy McGreedy to control elves remotely, Forensic McBlue and his team have started investigating to stop the mind control incident. They are now planning to take revenge by analysing the C2's back-end infrastructure based on the malware's source code.

# Questions

> What HTTP User-Agent was used by the malware for its connection requests to the C2 server?
>- Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15

> What is the HTTP method used to submit the command execution output?
>- POST

> What key is used by the malware to encrypt or decrypt the C2 data?
>- youcanthackthissupersecurec2keys

> What is the first HTTP URL used by the malware?
>- http://mcgreedysecretc2.thm

> How many seconds is the hardcoded value used by the sleep function?
>- 15

> What is the C2 command the attacker uses to execute commands via cmd.exe?
>- shell

> What is the domain used by the malware to download another binary?
>- stash.mcgreedy.thm

> Check out the Malware Analysis module in the SOC Level 2 Path if you enjoyed analysing malware.
>- No answer needed
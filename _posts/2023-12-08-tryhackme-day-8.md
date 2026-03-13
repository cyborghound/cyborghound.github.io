---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 8"
date: 2023-12-08 16:23 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 disk-forensics
image:
  path: /assets/img/headers/aoc2023.svg
---

The drama unfolds as the Best Festival Company and AntarctiCrafts merger wraps up! Tracy McGreedy, now a grumpy regional manager, secretly plans sabotage. His sidekick, Van Sprinkles, hesitantly kicks off a cyber attack – but guess what? Van Sprinkles is having second thoughts and helps McSkidy's team bust McGreedy's evil scheme!

# Questions

Folder "DO_NOT_OPEN" -> File secretchat.txt ->
[23:47] Gr33dYsH4d0W: Just finalizing the malware C2 setup. The server is good to go at mcgreedysecretc2.thm.
> What is the malware C2 server?
>- mcgreedysecretc2.thm

Folder "DO_NOT_OPEN" -> Right click JuicyTomaTOY.zip and click export files.
Save it somewhere and open the .zip file.
Check the file for it's name.
> What is the file inside the deleted zip archive?
>- JuicyTomaTOY.exe

Go to folder [root] and find the file portrait.png.
When open search for "THM{" with CTRL + F in the text part down below.
You'll find the answer.
> What flag is hidden in one of the deleted PNG files?
>- THM{byt3-L3vel_@n4Lys15}

Right click on the drive and choose verify drive/image.
After this is done, you'll find the SHA1 hash.
> What is the SHA1 hash of the physical drive and forensic image?
>- 39f2dea6ffb43bf80d80f19d122076b3682773c2

> If you liked today's challenge, the Digital Forensics Case B4DM755 room is an excellent overview of the entire digital forensics and incident response (DFIR) process!
>- No answer needed
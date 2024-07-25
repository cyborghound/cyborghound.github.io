---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 17"
date: 2023-12-17 16:17 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 traffic-analysis
image:
  path: /assets/img/headers/aoc2023.svg
---

Congratulations, you made it to Day 17! The story, however, is just getting started. There are more things to discover, examine, and analyse! 

Until now, you have worked with multiple events, including prompt injection, log analysis, brute force, data recovery, exploitation, data exfiltration, suspicious drives, malware, injection, account takeover, phishing, and machine learning concepts. Yes, there are tons of anomalies, indicators of attack (IoA), and indicators of compromise (IoC). Santa's Security Operations Centre (SSOC) needs to see the big picture to identify, scope, prioritise, and evaluate these anomalies in order to manage the ongoing situation effectively.

So, how can we zoom out a bit and create a timeline to set the investigation's initial boundaries and scope? McSkidy decides to focus on network statistics. When there are many network artefacts, it's a good choice to consider network in & out as well as load statistics to create a hypothesis.

Now it's time to help the SSOC team by quickly checking network traffic statistics to gain insight into the ongoing madness! Let's go!

# Questions

> Which version of SiLK is installed on the VM?
>- 3.19.1

> What is the size of the flows in the count records?
>- 11774

> What is the start time (sTime) of the sixth record in the file?
>- 2023/12/05T09:33:07.755

> What is the destination port of the sixth UDP record?
>-  49950

> What is the record value (%) of the dport 53?
>- 35.332088

> What is the number of bytes transmitted by the top talker on the network?
>- 735229

> What is the sTime value of the first DNS record going to port 53?
>- 2023/12/08T04:28:44.825

> What is the IP address of the host that the C2 potentially controls? (In defanged format: 123[.]456[.]789[.]0 )
>- 175[.]175[.]173[.]221

> Which IP address is suspected to be the flood attacker? (In defanged format: 123[.]456[.]789[.]0 )
>- 175[.]215[.]236[.]223

> What is the sent SYN packet's number of records?
>- 1658

> We've successfully analysed network flows to gain quick statistics. If you want to delve deeper into network packets and network data, you can look at the Network Security and Traffic Analysis module.
>- No answer needed
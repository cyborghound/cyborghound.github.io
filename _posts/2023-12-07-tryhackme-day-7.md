---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 7"
date: 2023-12-07 15:12 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 log-analysis
image:
  path: /assets/img/headers/aoc2023.svg
---

To take revenge for the company demoting him to regional manager during the acquisition, Tracy McGreedy installed the CrypTOYminer, a malware he downloaded from the dark web, on all workstations and servers. Even more worrying and unknown to McGreedy, this malware includes a data-stealing functionality, which the malware author benefits from!

The malware has been executed, and now, a lot of unusual traffic is being generated. What's more, a large bandwidth of data is seen to be leaving the network.

Forensic McBlue assembles a team to analyse the proxy logs and understand the suspicious network traffic.

# Questions

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f2 access.log | sort | uniq | wc
      9       9     119
```
> How many unique IP addresses are connected to the proxy server?
>- 9

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f3 access.log | cut -d ':' -f1 | sort | uniq | wc
    111     111    2376
```
> How many unique domains were accessed by all workstations?
>- 111

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f3 access.log | cut -d ':' -f1 | sort | uniq -c| sort -n | head -n 1
     78 partnerservices.getmicrosoftkey.com
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f3,6 access.log | sort | uniq -c | grep partnerservices.getmicrosoftkey.com
     78 partnerservices.getmicrosoftkey.com:80 503
```

> What status code is generated by the HTTP requests to the least accessed domain?
>- 503

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f2,3 access.log | sort | uniq -c | sort -nr | head -n 1 | cut -d ':' -f1
   1581 10.10.185.225 frostlings.bigbadstash.thm
```
> Based on the high count of connection attempts, what is the name of the suspicious domain?
>- frostlings.bigbadstash.thm

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f2,3 access.log | cut -d ':' -f1 | grep frostlings.bigbadstash.thm | uniq   
10.10.185.225 frostlings.bigbadstash.thm
```
> What is the source IP of the workstation that accessed the malicious domain?
>- 10.10.185.225

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ cut -d ' ' -f2,3 access.log | cut -d ':' -f1 | grep frostlings.bigbadstash.thm | wc  
   1581    3162   64821
```
> How many requests were made on the malicious domain in total?
>- 1581

```shell
ubuntu@tryhackme:~/Desktop/artefacts$ grep frostlings.bigbadstash.thm access.log | cut -d '=' -f2 | cut -d ' ' -f1| base64 -d | grep THM
72703959c91cb18edbefedc692c45204,SOC Analyst,THM{a_gift_for_you_awesome_analyst!}
```
> Having retrieved the exfiltrated data, what is the hidden flag?
>- THM{a_gift_for_you_awesome_analyst!}

> If you enjoyed doing log analysis, check out the Log Analysis module in the SOC Level 2 Path.
>- No answer needed
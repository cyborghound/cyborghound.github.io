---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 16"
date: 2023-12-16 15:49 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 machine-learning
image:
  path: /assets/img/headers/aoc2023.svg
---

McGreedy has locked McSkidy out of his Elf(TM) HQ admin panel by changing the password! To make it harder for McSkidy to perform a hack-back, McGreedy has altered the admin panel login so that it uses a CAPTCHA to prevent automated attacks. A CAPTCHA is a small test, like providing the numbers in an image, that needs to be performed to ensure that you are a human. This means McSkidy can’t perform a brute force attack. Or does it?

After the great success of using machine learning to detect defective toys and phishing emails, McSkidy is looking to you to help him build a custom brute force script that will make use of ML to solve the CAPTCHA and continue with the brute force attack. There is, however, a bit of irony in having a machine solve a challenge specifically designed to tell humans apart from computers.

# Questions

> What key process of training a neural network is taken care of by using a CNN?
>- Feature extraction

> What is the name of the process used in the CNN to extract the features?
>- Convolution

> What is the name of the process used to reduce the features down?
>- Pooling

> What off-the-shelf CNN did we use to train a CAPTCHA-cracking OCR model?
>-  Attention OCR

> What is the password that McGreedy set on the HQ Admin portal?
>- ReallyNotGonnaGuessThis

> What is the value of the flag that you receive when you successfully authenticate to the HQ Admin portal?
>- THM{Captcha.Can't.Hold.Me.Back}

> If you enjoyed this room, check out our Red Teaming learning path!
>- No answer needed
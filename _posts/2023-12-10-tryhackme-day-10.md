---
layout: post
title: "TryHackMe: Advent Of Cyber 2023 - Day 10"
date: 2023-12-10 11:36 +0200
categories: TryHackMe AdventOfCyber2023
tags: tryhackme adventofcyber2023 sql-injection
image:
  path: /assets/img/headers/aoc2023.svg
---

The Best Festival Company started receiving many reports that their company website, bestfestival.thm, is displaying some concerning information about the state of Christmas this year! After looking into the matter, Santa's Security Operations Center (SSOC) confirmed that the company website has been hijacked and ultimately defaced, causing significant reputational damage. To make matters worse, the web development team has been locked out of the web server as the user credentials have been changed. With no other way to revert the changes, Elf Exploit McRed has been tasked with attempting to hack back into the server to regain access.

# Questions

> Manually navigate the defaced website to find the vulnerable search form. What is the first webpage you come across that contains the gift-finding feature?
>- /giftsearch.php

> Analyze the SQL error message that is returned. What ODBC Driver is being used in the back end of the website?
>- ODBC Driver 17 for SQL Server

> Inject the 1=1 condition into the Gift Search form. What is the last result returned in the database?
>- THM{a4ffc901c27fb89efe3c31642ece4447}

> What flag is in the note file Gr33dstr left behind on the system?
>- THM{b06674fedd8dfc28ca75176d3d51409e}

> What is the flag you receive on the homepage after restoring the website?
>-  THM{4cbc043631e322450bc55b42c}

> If you enjoyed this task, feel free to check out the Software Security module.
>- No answer needed
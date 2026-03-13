---
layout: post
title: "Kase Scenarios: Betrayal"
date: 2023-12-21 16:51 +0200
categories: KaseScenarios OSINT
tags: kase-scenarios betrayal osint
image:
  path: /assets/img/headers/betrayal-poster.jpg
---

When a body turns up inside a prominent Georgian lawyers home, cops believe it is an open and shut case. The Assistant District Attorney reaches out to you in hopes of gathering the necessary information through open source intelligence to put the right person behind bars.

# Difficulty: Beginner

# Guiding hints
>- Easier data pivots within challenges
>- 1 report

# OSINT Training Objectives:

>- Evidence analysis
>- Documentation
>- Image analysis
>- Social media analysis
>- Reporting

# Intro

This write-up is a summary of how I found the answers to the questions asked in the case. This is purely a guide to help you with some tips and techniques if you're stuck. I am not putting all of the information and pictures or answers from the case in this write-up.

# The Case Files
Before the first question I reviewed the case files and found some hints to stuff I could do a search on. I found a Facebook page id which I visited, and it looked like the brother from Victor Blackwood which likes cars. Not much information on there for now. I also found the adress from Connie and looked it up on Google Maps. I also found the house on a listing website were you could do a 3D tour in the house.

This is the same 3D tour I found out is offered before the first question in the case.

I saved all the documents into a markdown editor, so I could keep track of all the evidence I have and could easily check back later.

# Scene of the Crime
Q: I need to note down the brand name of the alarm system
>- While I am in the 3D tour I looked at the front door for an alarm system, because most of the times the alarm control panel is in the entrance hall. This time I had no luck, and looked further. While browsing the main floor I found a device with the text "Coastal Burglar Alarm" on it and the brand name. It also had two modes, alarm and ready. The state at the moment was ready. So the answer to the first question I have.

Q: How many computers are there in the house?
>- While walking through all the rooms I found an office space on the main floor with two computers. Then I went upstairs and also found a desk in a bedroom with a computer. That are all the computers I could find.

Q: What is the password to the flash drive?
>- The first thing I did was searching on Google and pasting the whole quote on there from the piece of paper I got. I also focused on the snake drawing and made a note of that. I clicked on the images tab on Google and found that this was a quote from a writer named "Arthur Conan Doyle", which wrote books from Sherlock Holmes. In the search results on Google I already found hints to Sherlock Holmes and especially the story of "The Adventure of the Speckled Band". Then I used the power of ChatGPT and asked what this quote meant. Then I asked further about what the snake had to do with the story, as I remembered the snake drawing. ChatGPT told me that the snake killed someone in the book that was evil, which ofcource had something to do with the meaning of the quote. With the focus on this snake I asked ChatGPT to give me some more information about this snake and it told me "It's identified as a deadly Indian swamp adder, a highly venomous snake.". Then I started trying passwords like "deadly Indian swamp adder", "Indian swamp adder" and "swamp adder" with no result. Then I asked ChatGPT what a person could use as password with this information. The first asnwer was "SwampAdder1892" which I tried with no result. Then I removed 1892 and that worked. I almost had the password earlier. Just didn't try enough.

Q: Using the ruler, I need to measure the stairs from top to the bottom. (Round to the nearest whole number in US imperial system(feet))
>- For this I went to the hall in the 3D tour and initiated the measurement mode. After measuring I got 5,12 meters which is like 16.79 feet. I needed to round it up. So there is the answer.

# Late Night Escape Challenges
Q: [Type the make and model below to search DA records]
>- After the new interview I got a picture of a street with a car in front of Connie Blackwood's house. There is a hint to the car in the interview and the question is about a car. After doing a Google Lens search and selecting the car, I found the brand and model. My first answer did not work, so I did cut something of the model name which worked. I thern remembered the same car on the Facebook-page from Victor Blackwood his brother named Rhett Blackwood. Maby something to look into at a later point in time. Why is a car spotted at Connie Blackwood her house at the time of the murder which is also on the Facebook-page from Rhett Blackwood. Maby it is his car?

Q: What sort of social media account(s) does Rhett Blackwood have?
>- This was easy for me because I already found a Facebook-page from Rhett in the case files I got at the start of the case. I didn't find anything else by using Google.

The next question has no question, but the question is in the dialogue. I have to find a picture of this car on the Facebook-account from Rhett Blackwood and note the post id. And yes, he has a picture of this car and the post id is: 173176402377063

Q: What is the post id from the car picture on the Facebook-page from Rhett Blackwood as seen in the picture from Mrs. Barrera.
>- Yes, this car is on the Facebook-page from Rhett Blackwood so I found the post id very fast.

Q: What is the time that the photo was taken?
>- Then I downloaded the photo to my computer and uploaded it to a website which could retrieve all the metadata for me. The field "date_time_original" showed me the time the picture was taken.

# Content On The Drive Challenges
Q: Enter the password*
>- I downloaded the files from the flash drive to my computer and needed to enter a password. This was the password I found earlier.

Q: What is the amount of the life insurance for Connie Blackwood?
>- While I looked through the files, I found a file about life insurance. It went from a low amount to a very high amount, which is very strange to do before your wife is murdered. And Victor Blackwood increased it. Find the file and you find the amount.

Q: Who do we see in this picture?*
>- When looking at the pictures on the flash drive you'll see that there is something going on between Connie Blackwood and Rhett Blackwood. They're in the picture together and someone took it, with them not noticing.

# Online Troll
Q: Who's behind this username?
>- Then I got a call which was leading to an interview were I got some more information. It was a Youtube-account.
When looking at the Youtube-account I found a Facebook-page in the about section of the page, which was from Rhett Blackwood. So the Youtube-account must be from him. A Facebook-page about cars with a lot of pictures from cars like the one he owns.

Q: Connie's social media
> Enter the username of any social media account found belonging to Connie
>- After checking all the social media accounts I had from Rhett I could not find anything about a link to Connie Blackwood or her social media. So I went back to my evidence and found something I missed. The only thing I didn't check yet was the url from the business card from Victor Blackwood which he provided after his interview.

While looking around on the website, I found an url in the FAQ, with a url to a form. Then I arrived in a folder on the website mega.nz with two files. The files were nothing useful but the interesting thing is you can open the sidebar on the left. This did show me some other folders which were not protected by any password.

There was one folder with the name "Security" which contained one video from a TikTok-account. After checking the video I found out it was from Connie Blackwood. Victor Blackwood must have saved the video into this folder on mega.nz. So I now have the username from Connie Blackwood on TikTok.

Q: Find the post id from the latest video on Connie Blackwood her TikTok-account
>- Then I needed to find the latest video from Connie her TikTok-account because the answer to the next question is the video id of that video.

# Final Report

After finding all this evidence I got a new interview and this time with Rhett Blackwood. It resulted in a very strange situation were it looks like Victor and Rhett worked together.

The final report is about wether Victor Blackwood could have killed Connie at 10:45 pm and get back to the Lone Wolf Lounge at 10:53 pm. I looked both locations up again, and Google Maps tells me it is like 22 minutes driving with a car. So 8 minutes would not be enough, even if he drove twice as fast as he legally could, then it would take 16 minutes. So he would need to drive at least 3 times the speed limit which could be 70 miles per hour or higher, which is absolutely insane. He was even drinking at the Lone Wolf Lounge so that would definitly be a diaster.

It also much more feasable that Rhett killed Connie, because of the pictures Victor possibly had of the duo. Which he could use to blackmail Rhett into killing his wife. Then he would get a lot of money which he could use to pay off all his debt. Also Rhett claims he could get away with murder and that Connie her death was not an accident in the discussion Rhett had with the second witness named Jared Foster.
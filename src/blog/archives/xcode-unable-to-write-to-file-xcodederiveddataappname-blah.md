---
title: "Xcode Unable to write to file Xcode/DerivedData/appname-blah"
date: "2013-02-09"
coverImage: "../images/writetofile.jpg"
slug: "xcode-unable-to-write-to-file-xcodederiveddataappname-blah"
---

Admittedly I have taken a break from coding Objective-C for a little while to learn MOAI and Symfony in separate unrelated projects. Side note: Symfony2 makes PHP fun again. Anyway, I decided to get back to work on my sftp code editor setting the "troublesome" syntax highlighting aside until later.

I updated Xcode and its SDKs, only to get the error seen in the title of this post when I tried to run my app in the simulator.

After a quick google, I came across this blog post: [http://blog.aitrus.com/2013/01/04/xcode-unable-to-create-snapshot-unable-to-write-to-file-plist/](http://blog.aitrus.com/2013/01/04/xcode-unable-to-create-snapshot-unable-to-write-to-file-plist/)

His mentioning of Git made me wonder if Xcode was having issues with the multiple repos I have in my project.

It turns out that I had not done a commit of the work I had done previously. Some files needed to be added to the repo. After a "commit -am" my errors were clear.

### TLDR: Check your git repos

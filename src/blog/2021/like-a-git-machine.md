---
title: "Like a Git Machine"
date: "2021-04-01"
slug: "like-a-git-machine"
coverImage: "../images/music-hq-uSNXqaRWFng-unsplash.jpg"
---

Do you ever find yourself stuck in the monotony of "git status", "git commit", blah, blah, blah? I just got tired typing that out. There has to be a better way.

Well, I looked and couldn't find it. So, I took inspiration from pioneers like the creator of the [Rockstar programming language](https://codewithrockstar.com/). It actually isn't related at all, but I still think its cool.

Anyway, what were we talking about? Oh yeah, git-machine. This is the future. Using git should be as expressive as everything else you do.

Examples:

- ~~git push~~ -> `just get on up`
- ~~git commit~~ -> `lets hear ya say -m "ain't it funky"`
- ~~git status~~ -> `just look at this mess`

Here is a link: [https://cmgriffing.github.io/git-machine/](https://cmgriffing.github.io/git-machine/)

and the github repo is here:
[https://github.com/cmgriffing/git-machine](https://github.com/cmgriffing/git-machine)

![Let the disco ball of productivity consume you](../images/greyson-joralemon-ORSGQc-2Ef8-unsplash.jpg)

How does it work? Lets dig into it. It uses Go and a faux pattern matching library. It is not quite as robust as you would expect from a language with proper pattern matching but it was surprisingly easy to use. Here is a link to the library we used for that: [https://github.com/alexpantyukhin/go-pattern-match](https://github.com/alexpantyukhin/go-pattern-match)

You might also wonder how we made such an amazing install process. Well, sorry, its just [godownloader](https://install.goreleaser.com/) and [goreleaser](https://goreleaser.com/). They are the number one reason I prefer to make cli tools with Go. I actually spent a day making my own script for all of that before a viewer told me it existed. Don't be like me, just use it.

At the end of the day, we actually have a usable tool for making git commands more fun. You don't have to use it. Nobody is going to force you but, damnit, you owe it to yourself to let your git commands flow through you. In the future, we may even make it so that the "grammar" is plugin based.

![Cartoonish James Brown figurine](../images/start-digital-EgEjFesJMlg-unsplash.jpg)

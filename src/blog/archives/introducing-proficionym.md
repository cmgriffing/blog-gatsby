---
title: "Introducing Proficionym"
date: "2015-02-14"
coverImage: "../images/proficionym-blue.png"
slug: "introducing-proficionym"
---

I tend to use little app ideas to try out various JS frameworks. This time, my sights were on React. I am also thinking of applying to a company that uses React to speed up their "legacy" Angular app. So, I decided to use Angular and React together to pad my portfolio a bit.

I already had an idea for an app. I was ready to start coding it. However, I needed to name it. Someone once described "naming" as the hardest part of programming. This is even more problematic with domain names since the registry is literally a global namespace.

So in the midst of trying to think of a name for one app idea, I realized I needed a tool to help me name apps. That is [Proficionym](http://proficionym.com).

You give proficionym a word like "guard" and it will go look up the synonyms. Then, it uses the synonyms to create domains and then queries the whois registry. It is basically the same process I have been using to name apps, but now it is automated and it saves me a lot of time.

I managed to hit a couple speed bumps along the way. Some of them had to do with learning new tools. One thing that stood out was that I had planned to do the whole app client-side, but the thesaurus API was not set up for CORS. So, since I hadn't done an API with Express before, I decided to use that instead of my usual Symfony/PHP. It added yet another new tool, but now I see what all the fuss is about. It is really fast to get a simple API up and running with Express.

I feel like I am rambling, but all in all I think it is a useful app and I think it was a good learning experience.

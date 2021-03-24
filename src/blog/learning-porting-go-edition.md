---
title: "Learning by Porting: Go Edition"
date: "2017-01-22"
coverImage: "./images/golang.png"
slug: "learning-porting-go-edition"
---

I'm back again with the second in my series of posts chronicling my adventures as I try different backend languages for writing a simple but real API. Admittedly, I did this quite some time ago and have been slacking when it came to actually writing the blog post. However, I don't think any of the issues I had have changed. (I could be wrong.)

## First Impressions

Reading docs and looking at blog posts, the language and syntax was immediately somewhat familiar looking. I love the lack of exceptions. I like tuples. People keep ranting and raving about goroutines. Coming from Rust, it was kind of nice not having to research how I wanted to handle concurrency. With Go, there are just goroutines. No decision to worry about.

## Things I Didn't Like

I didn't really have that many problems. The problems I did have, were definitely my own fault. There may have been a pothole or two in the road, but my finger was on the trigger so it was my fault.

![pulp-fiction-car](images/pulp-fiction-car-768x419.jpg)

For the most part, my biggest problems and issues arose from the use of convention over configuration. The first instance of this was the "workspace". I found that quite annoying. I have heard that this is getting or going to be getting better.

The next issue was the usage of Capitalizing public functions. When I realized that was the issue, someone's remark was "Read the documentation". While valid, it is not a good introduction to the language and I found the documentation poorly organized and laid out compared to Rust.

I think one major way they could improve that is with compiler errors and messaging. For instance, the compiler should have been able to tell me that my module didn't expose a CapitalizedFunction. It could also check if the first letter is capitalized where I am calling it and maybe give me a hint. This is another place where Rust really shined in comparison.

## Things I did like

Despite the issues I had above, it still felt like things were going to work out well. I may have been covered in blood but I was starting to understand that I didn't have to like everything about it. Go wasn't there to waste time and play games, it was there to help me be productive.

![pulp-fiction-wolf](images/pulp-fiction-wolf-768x325.jpg)

It might seem like I didn't enjoy my time with Go. That would be a false assumption. There are just so many things that Go does well.

The most confusingly good thing about Go is that despite my issues and bottlenecks I completed it in less time than the Rust implementation. If I had not been spinning my wheels on the convention issues it would have been even quicker.

The places that I found lacking in the core documentation were more than made up for in various resources scattered across the internet. There is also a lot of really cool things being done with Go right now which always makes for interesting reading.

Great standard lib. Rust has a good one too, but I think there is something to be said for a robust standard library. With Rust, you are burdened with choice. There is nothing wrong with that unless you just want to start productively writing code. Go's net/http package is a shining example of the standard lib being the go-to choice for something integral to almost any web api.

Last but not least, goroutines. I see what the hype is about. They are so easy to use. Channels took a minute or two to understand, but not too bad.No lies, I still prefer async...await as a concurrency mechanism, but goroutines are growing on me.

## Wrapping Up

Go helped me be very productive and the only cost was feeling like a dork a couple times.

![pulp-fiction-dorks](images/pulp-fiction-dorks-768x326.jpg)

So, is Go my choice for what I want to write backends in for side projects for the foreseeable future? That is a bit hard to say. I think it has a very real place for microservices and it is fast. The ecosystem is also large and growing steadily. (the meetups hosted by Tune are great)

That said, every Go talk I have been to has had to mention the Garbage Collector pause and how they are dealing with it. For the most part, that is a problem most people would love to have because it means you are serving a lot of requests for that to be a real issue. However, when it becomes an issue, I'm not sure how you fix it.

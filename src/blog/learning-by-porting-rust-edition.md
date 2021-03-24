---
title: "Learning by Porting: Rust Edition"
date: "2016-04-19"
coverImage: "./images/rust.png"
slug: "learning-by-porting-rust-edition"
---

I decided to make Rust the first language in a series of rewrites to a Node.js API. My goal is to learn a decent amount about the language while finding the particular things I like and don't like about them. You can read more about the how and why [here](http://chrisgriffing.com/coding/2016/04/19/learning-new-languages-by-porting/).

I chose Rust as the first rewrite because the Seattle Rust group was very inviting and one of their meetups really delved into the ownership and borrowing system. Without that, I would have taken quite a bit longer to understand why some things work the way they do.

You can see the source code of the rewrite [here](https://github.com/appropont/proficionym-api-rust).

## Things I liked:

### Safety

For the most part, I really like Rust. After toying around with it, the ownership and lifetime system definitely feels like it will prevent a lot of memory issues. The compiler also helped me find so many errors that I would have only found after running the Node app (or maybe not at all). There is just something about all these checks and warnings that makes it easy to feel confident you have a somewhat working app before you even have to test it.

### Crates

The Rust package manager is called crates. I think they really took some notes when they watched NPM unfold because it seems like it solves a lot of those issues. I am not familiar enough to specify exactly what that is but one example is something I heard at a recent meetup. Basically, the whole Left Pad crisis would not have been possible with crates. I'm sure it isn't perfect but the crates team definitely saw the growing pains that NPM had to go through and they put their best efforts into making a robust system.

## Things I didn't like:

### Hand-waving in tutorials

There are some really good tutorials around like [this one from Auth0](https://auth0.com/blog/2015/11/30/build-an-api-in-rust-with-jwt-authentication-using-nickelrs/). The problem is that they do a bit of hand waving when it comes to some of the implementation details. I had a tricky time figuring out how I should handle environment variables. I started out with this config module. It worked great for getting a value.

The tricky part came when I wanted that value accessible throughout my app. Some of the warnings hinted that I needed it to be static. I spent a good while messing around with that and just ran into issue after issue. I was finally able to find the [env part of the docs](https://doc.rust-lang.org/std/env/). From there it was a simple task of reading my value using config and then storing it into the env module.

Granted, the bulk of the issue has to do with me jumping into Rust haphazardly instead of reading ["The Book"](https://doc.rust-lang.org/book/) diligently. The point still stands that something that is very easy with modules in Node was a little trickier in Rust do to the lifetimes.

### Implicit returns

Once again, this is something that I probably would have found if I had read the book cover to cover, but I'm not that kind of learner. I remember reading about and hearing about the fact that Rust will return the last statement in a function. I spun my wheels for a little while not understanding why this endpoint was giving me a "Not Found" in the browser.

Seasoned Rust developers would be able to spot why immediately. For the rest of us, the issue was the semicolon. To make the implicit return work properly you need to omit the semicolon on the last statement of a endpoint. This likely has to do with the fact that the endpoint is done using a macro instead of a function which probably messes with the compiler's ability to catch that.

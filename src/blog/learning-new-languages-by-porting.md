---
title: "Learning New Languages by Porting"
date: "2016-04-18"
coverImage: "./images/Judge-Dredd-Still-Image-012.jpg"
slug: "learning-new-languages-by-porting"
---

.follow-up { border: thin solid #dd5424; padding: 0.4em; width: 80%; margin: 0 auto 1em; } .follow-up p { margin: 0; } .follow-up ul { margin-bottom: 0; }

Update: Here are the follow up posts about my experiences trying out various languages.

- [Learning by Porting: Rust Edition](http://chrisgriffing.com/coding/2016/04/19/learning-by-porting-rust-edition/)

I have an API that I wrote in Node.js, [Proficionym](http://proficionym.com/). I like it and it was really fun to make, but the deployment process for Node apps is as bad as the one for Ruby apps, in my opinion, due to the single-threaded nature of JavaScript. I dont want to worry about maintaining a script that spins up a Node instance per core of the cpu.

## The Premise:

There are several newer languages that are the new hotness as far as server-side and general programming are concerned. I am specifically looking at [Rust](https://www.rust-lang.org/), [Go](https://golang.org/), and [Elixir](http://elixir-lang.org/)/[Phoenix](http://www.phoenixframework.org/) right now, but who knows, there could be more popping up every day. I need a way that I can evaluate some of them and find out what I like and don't like about them. I might even be able to jump in on their ecosystems early and get a bunch of internet points.

## Why rewrite this API?

This API is a pretty good tool to see how much I will like a language. This is because one of the APIs it works with only outputs XML. Parsing that manually would be brutal but doable, so evaluating the ecosystem and language constructs for prebuilt parsing as well as manual parsing are great metrics.

Another thing it does is make a call to the whois database. There are Restful APIs that can take care of this, but the whois database is free and open anyway. For the node version of the API, I just used the best looking node package. For other languages I might be better off just calling out to the linux command line. How easy this is with other languages is definitely something to judge them by since some things are going to require blackbox style integration with libs that might not be compatible with the language I'm currently using.

## Keeping DRY with testing:

So now that I know what I want to learn with, I have to find out how I'm going to easily make sure they output the same thing. A set of self-contained integration tests would do the trick. They could be written in any language since they won't need to talk to the actual code of the API, just the RESTful endpoints. After looking at my options and doing some thinking, I realized I wanted to document the API too. The tool I ended up settling on meets both of my requirements even though they say not to use it that way.

I used [Dredd](https://github.com/apiaryio/dredd) and the API blueprint syntax. Dredd adds some extra syntax to API blueprint that allows it to parse the blueprint and run actual tests using just the markdown files. Their main goal is to provide a way of making sure that your documentation stays up to date against your API. I can understand them not wanting to let Dredd be the whole kit and caboodle, but in my case it is just so convenient to let Dredd handle multiple test cases per endpoint. The only harm is the wall of warnings from Dredd.

[![Judge Dredd Still Image](images/Judge-Dredd-Still-Image-012-768x461.jpg)](http://chrisgriffing.com/wp-content/uploads/2016/04/Judge-Dredd-Still-Image-012.jpg) Those of you who are unaware, when Dredd gives you a warning, you should usually listen. Maybe a suite of API tests can be an exception.

I have a suite of tests. Now I just need to start rewriting the API in various languages. I will update this post with links to details regarding each of my rewrite adventures. Thanks for reading.

Follow up posts:

- [Learning by Porting: Rust Edition](http://chrisgriffing.com/coding/2016/04/19/learning-by-porting-rust-edition/)

---
title: "Koa.js: A happy path to async/await"
date: "2016-03-14"
coverImage: "../images/11718379-it-business-man-in-network-server-room-have-problems-and-looking-for-disaster-situation-solution1.jpg"
slug: "koa-js-a-happy-path-to-async-await"
---

With the future of Express uncertain, a lot of people are looking for another framework to take its place. There are numerous options to choose from with the top 2 being [Hapi.js](http://hapijs.com) and [Koa.js](http://koajs.com). This post isn't going to claim one is better than the other because the Hapi ecosystem is awesome and thriving. However, I do think Koa provides an easier upgrade path to async/await once it is supported in Node. An important thing to note is that you could use Babel to get async/await today. However, I am not comfortable running server code through Babel. I am not alone. There are dozens of us. DOZENS!!!

To get the most out of this post, you should familiarize yourself with [ES6 Generators](https://www.promisejs.org/generators/) and [Async/Await](https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html). The gist is that they allow you to treat asynchronous code like synchronous code. The important aspect is that they only block execution of the enclosing function. The thread remains open to process other incoming requests.

The whole source code for this demonstration can be found here: [https://github.com/cmgriffing/gens2aa](https://github.com/cmgriffing/gens2aa) For brevity I am just going to be showing diffs of the relevant endpoint of this extremely simple single-endpoint demo app.

## Step 1: Express to Koa

So, first things first. We need to port an Express endpoint to Koa.js. [![Computed_Diff_-_Diff_Checker-1](images/Computed_Diff_-_Diff_Checker-1-1.png)](http://chrisgriffing.com/wp-content/uploads/2016/03/Computed_Diff_-_Diff_Checker-1-1.png)

It isn't the prettiest yet because we haven't fully embraced ES6 generators. However it is the closest we can get to the exact same mostly-promise-based functionality in Koa. Some of you may be noticing the assignment of "this" to "ctx". This is an "anti-pattern", but as you will see later, it allows a clean migration path from Koa1 to Koa2.

## Step 2: Promises to Generators

Next, we change the promise-based flow to a generator based flow. The yield here is important. It is blocking the function while not blocking the thread. We can now treat async logic in a synchronous fashion. [![Computed_Diff_-_Diff_Checker-2](images/Computed_Diff_-_Diff_Checker-2-1.png)](http://chrisgriffing.com/wp-content/uploads/2016/03/Computed_Diff_-_Diff_Checker-2-1.png)

Look at how clean that is now. I have heard very smart people say that generators are not the answer when talking about Koa, but this diff right here says a lot. This contrived example doesn't show how to deal with error logic flows but it is still a good start.

## Step 3: Generators to Async/Await

The final step is what the refactor process will look like when you want to switch to Koa2 and async/await when Node finally supports it. [![Computed_Diff_-_Diff_Checker-3](images/Computed_Diff_-_Diff_Checker-3-1.png)](http://chrisgriffing.com/wp-content/uploads/2016/03/Computed_Diff_-_Diff_Checker-3-1.png)

Look at that. It is basically a series of find and replace statements.

I will admit that fundamentally generators might not be an ideal fit for generic async flow control, but when you look at the migration path to async/await it starts to make a whole lot of sense.

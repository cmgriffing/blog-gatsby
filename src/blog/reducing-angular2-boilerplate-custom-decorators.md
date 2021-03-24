---
title: "Reducing Angular2 Subscription Boilerplate with Custom Decorators"
date: "2016-09-09"
coverImage: "./images/angular.png"
slug: "reducing-angular2-boilerplate-custom-decorators"
---

I recently started giving Angular2 a solid look and decided try it out on a greenfield prototype project for work. Since the project is a proof of concept, I'm not too worried about yet another Router deprecation.

My initial impression is that Observables are really cool and TypeScript makes tooling like code completion actually work right. However, I started noticing that I was repeating myself a lot in some of my component lifecycle events.

At the moment, I am using an architecture that uses top-level smart components for handling subscriptions. Then, they just pass data down to the presentational components. In those top-level components I was adding a subs array property, pushing subscriptions into that property in ngOnInit, and then iterating over and unsubscribing from them in ngOnDestroy.

I was about to use inheritance and create a wrapper class to reduce this boilerplate. Then I found an article explaining Decorators and how to make my own. I decided that I would at least give it a shot since I had the wrapper class as a fallback.

If you are unfamiliar, Decorators are syntax sugar for higher order functions that transform or operate on other functions. They are a spec proposed by Yehuda Katz of EmberJS fame.

It turns out that they are really easy to implement. They are just functions after all. I had help though. I highly recommend reading these posts for more information about decorators.

- [http://blog.wolksoftware.com/decorators-reflection-javascript-typescript](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript)
- [http://myrighttocode.org/blog/typescript/angular2/decorators/angular2-custom-decorators](http://myrighttocode.org/blog/typescript/angular2/decorators/angular2-custom-decorators)
- [https://medium.com/@ttemplier/angular2-decorators-and-class-inheritance-905921dbd1b7](https://medium.com/@ttemplier/angular2-decorators-and-class-inheritance-905921dbd1b7)

By now, you are probably tried of reading and you are ready for me to just show you the decorators.

Without further ado here is the github repo. Example of usage in README: [https://github.com/cmgriffing/angular2-subscriber-component-decorators](https://github.com/cmgriffing/angular2-subscriber-component-decorators)

I think there is definitely more work to do, especially if they are to be made more robust for general use, but I am using them in my app and they work great so far.

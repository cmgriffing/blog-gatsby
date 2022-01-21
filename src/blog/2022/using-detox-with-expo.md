---
title: "E2E Testing Expo Apps with Detox"
date: "2022-01-21"
slug: "e2e-test-expo-apps-with-detox"
coverImage: "../images/alex-kondratiev-H9t723yPjYI-unsplash.jpg"
description: "Detox does not officially support Expo apps. However, it is still possible to get it to work and its easier than getting Appium up and running. The solution isn't ideal, but it could be worse."
---

TL;DR: Build your Expo app with EAS and make Detox use that app file instead of Expo.

I'm working on a React Native app using the Expo managed flow. There are plenty of reasons why you might use Expo and there are plenty of other reasons why you might choose ejected React Native. This article will not go into those reasons. I will just assume that you are here because you are using the Expo managed flow as well.

When looking for E2E solutions to test your Expo app, your search will yield Appium and Detox. Detox is made by Wix and it makes the same optimization that Cypress and TestCafe have made for web e2e testing. That optimization is ditching WebDriver and it's opaque server/client process. By doing so, there is less (but still a non-zero) need for timeouts to handle flakiness of tests.

![Lady doing science stuff](../images/julia-koblitz-RlOAwXt2fEA-unsplash.jpg)

The problem is that Detox does not support the Expo managed flow and they don't plan on doing so as far as I know. Doing some searching, you will find articles about how to make it work, but in my experience they are usually outdated and the techniques they mention no longer work. Some of them even use stuff like `detox-expo-helpers`, but that repo hasn't seen an update in 3 years. I found a github repo that sets up some detox testing, but it resorts to a forked version of `detox-expo-helpers` as well as a timeout in the beforeAll. It just felt dirty to me.

The exact problem I was running into was that Detox would timeout because its synchronization was never seeing the onReady event get called even after I tried the hacky timeout approach. I'm guessing it's because it was trying to listen for the Expo app itself rather than my app inside Expo.

![Beakers of random chemicals](../images/pawan-parihar-Q7ngZ0oKIfc-unsplash.jpg)

My "fix" is to build the application using EAS and then use that built app file instead of Expo for Detox. This isn't ideal but it works and without hacky timeouts. The downside is that I need to wait for the build queue in EAS.

Easy Peasy.

![Einstein toy. Eureka!](../images/andrew-george-g-fm27_BRyQ-unsplash.jpg)

This then poses some complications for CI/CD. My plan is this:

- Make code change and push to trigger CI/CD
- CircleCI checks for app file in changes, if not present, trigger build.
- Use server to handle Build Webhook from EAS and commit that to retrigger CI/CD
- Since app is now part of changes, run Detox tests in pipeline using newest build

Is it perfect? No. But, it will work for me. I hope some of this was interesting and if you have some suggestions let me know on Twitter or in my Twitch stream.

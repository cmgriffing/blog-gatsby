---
title: "Why Feature Flags?"
date: "2020-12-17"
slug: "why-feature-flags"
coverImage: "../images/steve-johnson-U8XpuqGEO0I-unsplash.jpg"
description: "Feature flags allow us to change how an app behaves without having to redeploy. That decoupling is powerful and lets us iterate quickly."
---

Feature flags are a great way to decouple feature releases from your deploy. You can deploy on a schedule or on the fly throughout the day. It won't matter. Whenever you want to turn on that one feature, you just go and update and your apps handle it at runtime.

When could this be useful? One major place is in mobile apps. Imagine you have a holiday themed UI you want to show for only one day. It is not possible to expect a turnaround on the iOS App Store within a day. It can take up to a week and that's only if there are no significant change requests during the review process.

![Light bulbs turned on](../images/omer-sonido-LEMtekMLW4o-unsplash.jpg)

Another great example is that your deploy process could take a while. Some testing suites are rumored to run for days in extreme cases.

If time is not important to you just consider how much it might cost you in services from a cloud provider. Another rumor I have heard is that Angular runs \$10k worth of hardware in GCP for every Pull Request. I understand a PR is not the same as a deploy and your deploys will likely cost much less, but waste is waste.

As you start adopting feature flags, you even gain the power to do A/B Testing. After all, A/B Testing is just analytics applied to feature flags when you break it down.

![Construction work](../images/shivendu-shukla-3yoTPuYR9ZY-unsplash.jpg)

You are convinced now, right? Cool. So you might ask, "what tools are available?". It turns out that a lot of the services cost a pretty penny. It makes sense when you think about how much effort it is to maintain and run the hardware.

- [LaunchDarkly](https://launchdarkly.com)
- [Optimizely](https://optimizely.com)
- [Split.io](https://split.io)
- [ConfigCat](https://configcat.com/)

Luckily, there are some open source self-hosted solutions you can use if you want to put in the effort. The nice part is that these open source projects also have their own hosted solutions so you can start there and migrate to your own self hosting when you are ready.

- [Flagsmith](https://github.com/Flagsmith/flagsmith)
- [Unleash](https://github.com/Unleash/unleash)

![More lights turned on](../images/luis-tosta-XpEIpQ6JDKY-unsplash.jpg)

I needed something even simpler because I don't want to maintain any servers for it besides the apps themselves. So, I came up with [Vexilla](https://vexilla.github.io). It is open source as well, but it is statically hosted. So, you just fetch a json file on whatever interval you want.

It turns out ConfigCat does something similar. I just found out about them. However, I feel like it is worth working on Vexilla more just because it has been a lot of fun. My favorite part was making the client libraries for various languages. I haven't had a chance to see how language support compares to ConfigCat but that might be something I can focus on to stand out.

![Various pluggable fuses](../images/living-smarter-_ls5G4ewAo8-unsplash.jpg)

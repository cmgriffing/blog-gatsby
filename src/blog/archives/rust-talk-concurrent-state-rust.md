---
title: "Rust Talk: The Concurrent State of Rust"
date: "2016-08-10"
coverImage: "../images/600_338792062.jpeg"
slug: "rust-talk-concurrent-state-rust"
---

Yesterday, I gave a talk at the Seattle Rust meetup.

Here is a link to the slides: [https://cmgriffing.github.io/rust-concurrency-talk/](https://cmgriffing.github.io/rust-concurrency-talk/)

To start off, I might not be very qualified to give a talk about Rust. However, I was going to research concurrency and the various ways of accomplishing that with Rust. I figured I might as well share that research with my fellow Seattleites.

By no means was I able to cover everything, but I think I was able to successfully demo a good variety of code based off the standard library as well as some code based off of interesting third-party libraries. (futures, coroutines, async/await)

I gave the talk and didn't have any benchmarks, though. I decided that was no good so I added benchmarks. I had to change the code from using seconds to using milliseconds for the sake of time, but I think it provides some useful stats:

```rust

test slide_01_setup::benchmark_the_operation ... bench: 5,890,521 ns/iter (+/- 440,129)
test slide_02_standard_library::benchmark_channels ... bench: 3,839,737 ns/iter (+/- 285,787)
test slide_02_standard_library::benchmark_join ... bench: 3,816,445 ns/iter (+/- 279,266)
test slide_03_coroutines::benchmark_mioco_coroutines ... bench: 16,135,118 ns/iter (+/- 2,343,957)
test slide_04_futures::benchmark_futures ... bench: 3,822,760 ns/iter (+/- 314,886)
test slide_04_futures::benchmark_promises ... bench: 5,964,280 ns/iter (+/- 456,764)
test slide_05_async_await::benchmark_async_await ... bench: 3,828,543 ns/iter (+/- 276,901)
```

If you look closely you will see a couple issues.

The first issue is that my mioco coroutines implementation is dreadfully slow. I'm really not sure why, but I am almost certain that it is something I did wrong.

The second issue is that my promises implementation runs in similar time to the non-async version. This is caused by the fact that event loop for promises is single threaded. This means that the sleep method also puts the event loop to sleep which is not ideal. However, You can basically subtract the time of the raw operation from the promises implementation time to get a useful delta of how much overhead is added by the promises lib.

All in all, I was happy to present to the group. It was humbling and I definitely felt foolish trying to teach anything to people much more knowledgeable than me, but hopefully they were able to gain some useful links and ideas from the process.

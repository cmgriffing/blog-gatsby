---
title: "How To Flush W3 Total Cache Programmatically"
date: "2014-03-14"
coverImage: "./images/Money-in-the-Toilet.jpg"
slug: "flush-w3-total-cache"
---

When working with Wordpress you will likely need to create custom post types and you will also probably be working with a caching plugin. The problem is that caching plugins typically only flush the cache when normal posts and pages are published.

When I hit the search to find out how to programmatically flush the cache (of W3 Total Cache), I found nothing. I gave a quick glance at the structure of the plugin and realized, hunting down the flush cache method could take a while.

One more search and I found a [pdf](http://bacsoftwareconsulting.com/blog/wp-content/uploads/2011/01/w3totalcache/frequently-asked-questions-w3tc.pdf) that contained this code snippet: `if (function_exists('w3tc_pgcache_flush')) { w3tc_pgcache_flush(); }`

Just put that inside of a "save_post" hook, and your cache will be flushed on each post save.

I leave it to the reader to go find the snippet to filter out auto-drafts.

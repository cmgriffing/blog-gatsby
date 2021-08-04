---
title: "neovim-treesitter is Awesome"
date: "2021-03-12"
slug: "neovim-treesitter-is-awesome"
coverImage: "../images/aaron-burden-b9drVB7xIOI-unsplash.jpg"
---

Code Biscuits was so much fun to work on and I use it every day. I hope other people feel the same. The tool that made Assorted Biscuits possible, Tree Sitter, ends up being really well utilized in neovim as well. Neovim has a deep API to allow extensions and Tree Sitter with it was no different.

So, even though I don't use neovim, I know enough people who do and figured, "Why not?". I did a bit of Lua 8 years ago. How hard could it be?

![Oblivious Sloth](../images/sophia-muller-5t9T6hQ2Cn0-unsplash.jpg)

Despite the foreboding nature of my previous sentences, it worked out pretty well. Lua tends to feel a lot like JS, just with 1 based indexes. I know there are many more differences but, for this, that's all I really noticed.

The Neovim docs were great. I just wish the web documentation were more easily navigated besides just using the browser search. The great [TJ](https://github.com/tjdevries), teej_dv [on Twitch](https://twitch.tv/teej_dv), stopped into the stream and pointed out that the best way to consume the Neovim docs is actually inside of neovim, which makes sense.
However, I was writing this in VSCode. Let me also add that I used nano to edit my nvim config.

![Schocked faced bird](../images/rick-rogers-QxpnfLTHlTo-unsplash.jpg)

The initial version worked fine and supported a bunch of languages. However, some of them ended up needing their own specific handlers for annotating things. Such cases include Vue files which mix html and js.

At the end of a few of those that needed special attention, we counted and realized we support more languages in neovim than the original Assorted Biscuits plugin. This is due to being able to use the native grammars instead of relying on the WASM compilation process.

Overall, we have seen some good usage. The user base is much more vocal than the VSCode extension's which has led to the neovim plugin having a few extra features. 10/10 would nvim plugin again.

You can get the plugin here:
[https://github.com/code-biscuits/nvim-biscuits](https://github.com/code-biscuits/nvim-biscuits)

![Bench by a tree on the beach](../images/aidan-formigoni-ZNh2lhVaEqw-unsplash.jpg)

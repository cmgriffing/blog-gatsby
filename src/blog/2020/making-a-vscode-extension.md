---
title: "Have yourself a VSCode Biscuit"
date: "2020-09-27"
slug: "have-yourself-a-vscode-biscuit"
coverImage: "../images/james-lee-4ujY2rb7KOQ-unsplash.jpg"
---

TL;DR: We have a series of VSCode plugins that make code easier to read without having to lose your current context.

- Assorted Biscuits [Marketplace](https://marketplace.visualstudio.com/items?itemName=CodeBiscuits.assorted-biscuits) - [Github](https://github.com/code-biscuits/assorted-biscuits)
- HTML Biscuits [Marketplace](https://marketplace.visualstudio.com/items?itemName=CodeBiscuits.html-biscuits) - [Github](https://github.com/code-biscuits/html-biscuits)
- CSS Biscuits [Marketplace](https://marketplace.visualstudio.com/items?itemName=CodeBiscuits.css-biscuits) - [Github](https://github.com/code-biscuits/css-biscuits)
- JS/TS Biscuits [Marketplace](https://marketplace.visualstudio.com/items?itemName=CodeBiscuits.js-ts-biscuits) - [Github](https://github.com/code-biscuits/js-ts-biscuits)

This story starts like many others. The idea sprang from a completely unrelated project. We were working on some Flutter and the extension for Flutter adds some really nice annotations to improve the legibility of the nested component syntax.

I don't know what they call the annotations, but I wanted the same kind of functionality in more than just flutter. HTML and div soup was an obvious first problem to solve. When I thought about the use case, it reminded of breadcrumbs helping me navigate my code. But, bigger and better, so they became biscuits.

![Kneading dough](../images/theme-photos-Hx7xdwhj2AY-unsplash.jpg)

Visual Studio Code makes it incredibly easy to customize the functionality of the whole thing. There are even some boilerplates to help get up and running quicker.

One of the nice things is that VSCode includes a Language Server for HTML out of the box so I didn't have to do too much extra dependency bundling. If you are not familiar with the LSP(Language Server Protocol) it is an effort to standardize how all editors can interact with compilers. Many of them expose direct access the Abstract Syntax Tree.

What this means, is that I can crawl the the entire tree of source code and reference all the awesome metadata that the compiler has access to.

![Fresh and melty chocolate chip cookie](../images/food-photographer-jennifer-pallian-OfdDiqx8Cz8-unsplash.jpg)

Next, we needed to figure out how to annotate the lines. I figured that the Flutter plugin already does and so does Git Lens. So, we know there is an API. It turns out that VSCode calls those "[Decorations](https://vscode.rocks/decorations/)"

After that, we just made sure the user can configure the important things about the Biscuits. Their prefix text, max length, minimum block lines, and color. Yes, the prefix supports emoji.

The HTML plugin opened up more ideas. What other languages did we have Language Servers for in VSCode. CSS Biscuits just uses the SCSS language server under the hood. We also have a JS/TS one, but it is the buggiest of the bunch.

![Multiple cookies in container](../images/mae-mu-kID9sxbJ3BQ-unsplash.jpg)

We ran into some trouble when I tried to do the C# extension. For the life of me, I could not figure out how to get the Language Server working. It could have been missing build tools etc, but if I was bissing them, other people would be too. This needed to be a smooth install process.

A viewer on my stream mentioned Tree Sitter.At first it seemed unrelated because it is at the same level as any other build tool you would need out of the box. However, then we discovered web-tree-sitter, a WASM compiled version of tree sitter itself. Its maintained in the same repo as a sub package.

![Cookie with bite taken out](../images/carlos-derecichei-FsFeN06h_sQ-unsplash.jpg)

Armed with that, we needed to find "grammars" to allow tree sitter to parse our code in the editor.These grammars end up also needing to be compiled to WASM and some of them just didnt work. The problem most likely existed between the keyboard and the chair. However, we ended up still getting the ability to support these languages to varying degrees:

- C
- C#
- Elm
- Go
- Java
- JSON
- Kotlin
- Lua
- PHP
- Python
- Rust
- TOML
- YAML

It was a lot of fun and a huge adventure digging into the APIs and tools available for estension developers. I have seen more downloads for HTML biscuits than I ever expected.

![Slightly broken chef statue giving thumbs up](../images/carlos-derecichei-FsFeN06h_sQ-unsplash.jpg)

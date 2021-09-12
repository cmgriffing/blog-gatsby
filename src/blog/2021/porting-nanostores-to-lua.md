---
title: "Porting nanostores to lua"
date: "2021-09-12"
slug: "porting-nanostores-to-lua"
coverImage: "../images/kobby-mendez-d0oYF8hm4GI-unsplash.jpg"
---

I needed a state management library in lua. I didn't find what I was looking for, so I decided to port something. TypeScriptToLua made it really easy to make an automated nanostores port for lua.

The resulting Github repo and luarocks page can be found here:

- [https://github.com/cmgriffing/nanostores_lua](https://github.com/cmgriffing/nanostores_lua)
- [https://luarocks.org/modules/cmgriffing/nanostores_lua](https://luarocks.org/modules/cmgriffing/nanostores_lua)

## How it started

I wanted to make a game with [Solar2d](https://solar2d.com/). It's a lua game framework with some nice publishing related features. Gestures, navigation, and other aspects went swimmingly but when I wanted to handle state management it seemed like globals were the way to go. I also didn't find much on Luarocks. [Rings](https://keplerproject.github.io/rings/) was waaaaay more than I needed.

There were plenty of libraries to choose from but my decision boiled down to [XState](https://xstate.js.org/) or [nanostores](https://github.com/nanostores/nanostores). My deciding factor was just the amount of code. nanostores is really just 10ish files with less than 30ish lines of code in each. The [author](https://github.com/ai) is also well known for some awesome libraries and tools such as: [nanoid](https://github.com/ai/nanoid), [autoprefixer](https://github.com/postcss/autoprefixer), and so many more.

I heavily considered porting it by hand. That would have worked but sounds like a lot more maintenance.
Luckily, I remembered [teej_dv](https://twitch.tv/teej_dv) mentioning that it was possible to port TypeScript to Lua and the library was creatively named [TypeScriptToLua](https://typescripttolua.github.io/).

![Confusing children's toy](../images/national-cancer-institute-tNCs873NiXY-unsplash.png)

## Hacking it into place

At first, I just wanted to make it work. We started by just pulling down nanostores itself and hacking at it in a branch.

The process stalled for a bit when I just couldn't get it to use the raw `.js` files that nanostores is written with. Whatever, I renamed them. We gradually went through a few other steps similar to this and eventually had a working compile process.

I copied and pasted that into the Solar2d project and it worked after updating the require paths. That was not expected to be as smooth as it was. Well, it turns out that there were a few things that were less than ideal. The require statements for specific functions looked like `require("nanostores.getValue.index")`. Using them looked like this, `getValue:getValue(store)`. Ooof.

## Making it sustainable

Those steps that worked were done by hand. I didn't want to do that every time a new nanostores version gets released. TypeScriptToLua actually has examples of how to transform source code by hand. I've dabbled with ASTs before. "How hard could it be?"

It actually wasn't bad. As an example, if you wanted to iterate all top level nodes of your source files you would do something like this:

```typescript
project.addSourceFilesAtPaths(["./src/**/*.ts"]).forEach(sourceFile => {
  sourceFile.forEachChild(child => {
    // ....
  })
})
```

We ended up implementing a bunch of transformations of the nodes before I realized that the based level nanostores `index.lua` file worked just fine.

So, instead our usage could look like this, `nanostores:getValue(store)`, with no change to what we did.

![Printing press type faces](../images/bruno-martins-OhJmwB4XWLE-unsplash.jpg)

## Pivoting transformation goals

We still had some fixes to make. The require statement was still looking like this, `require("nanostores.index")`. And the need to use a semicolon made no sense to me either. The functions didn't even use the implicit self context.

First fix was a script to rename the files to have ts extension and use the init.lua convention. Second fix was for removing the implicit self which just turned out to be a tsconfig flag for TypeScriptToLua. I also realized I forgot about the tsconfig fixes I needed to make and added those to the pre-build step.

Welp, seems that Solar2d is pulling some shenanigans because it didn't obey the `init.lua` semantics properly. So, we were left with requiring looking like this, `require("nanostores.init")`. Gross. Even if it was just a Solar2d issue, I'm the only user of this thing so far and I want it to be clean.

![Moon becoming full](../images/sanni-sahil-cSm2a_-25YU-unsplash.jpg)

## Wrapping up

Back to the transformations. I opted for renaming and restructuring things. We would have a top level `nanostores.lua` file and inside of a sub folder we would have our functions as the names of the files. eg: `get-token.lua`

The process was a success for me. We have a library I can use in any of my lua projects that end up needing subscribable state management. I think this opens the door for a lot more sharing of libraries from the npm ecosystem into lua which has a much smaller open source community.

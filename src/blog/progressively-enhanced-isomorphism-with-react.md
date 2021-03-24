---
title: "Progressively Enhanced Isomorphism with React"
date: "2015-03-16"
coverImage: "./images/logo_og.png"
slug: "progressively-enhanced-isomorphism-with-react"
---

**Notice:** This post is outdated. The React community has settled on Redux as the main Flux implementation. That said, the idea of changing form output based on render target is still valid. A better solution would be to code the form in a way that the markup doesn't change but works in both targets.

I recently attended a meetup where a good presentation was given about Fluxible and making isomorphic apps with React.

Here is their repo: [https://github.com/porchdotcom/isomorphic-porch-demo](https://github.com/porchdotcom/isomorphic-porch-demo)

## The Idea

It was interesting. I love that the server is able to send out static html on the initial request. This means that theoretically people without JS enabled could still be able to use the app.

This idea breaks down in practice. Non-JS users are able to get an initial page load but they are unable to do any actions since they still require JS. The use-case for non-JS users might actually be pretty narrow, but in developing countries users might browse without JS for a number of reasons: saving mobile bandwidth, reducing page load times, old hardware/software constraints.

Well, that stuck with me for a bit and I realized that the app can find out whether it is being rendered client-side or server-side. From there, it would be a simple process of serving up a standard HTML form for users with JS disabled.

## My Implementation

Well, I made some edits to the demo app that you can find here: [https://github.com/cmgriffing/isomorphic-porch-demo](https://github.com/cmgriffing/isomorphic-porch-demo)

The process wasn't as straight forward as I initially thought, but I got it working. The app needed a body-parser to be able to handle a url-encoded form, but I also needed to create another parser that coerced the body format into what Fluxible was expecting.

My demo isn't complete in the sense that I couldn't figure out how to make the api endpoint redirect the user if the form was submit as url-encoded instead of JSON. I feel like that is something that Fluxible would need to fix so that the "res" object is available inside the "project-service". However, I think it is close enough for others to learn from and make actually practicable.

## Steps Toward Generic Use

Update 04/10/2015: I have it fully functional and you can see a demo at: [http://isomorphic-forms.appropont.com](http://isomorphic-forms.appropont.com) The implementation is still a bit hacky in a few places. To make a proper general solution, there are a couple key steps that need to happen.

Firstly, the place I am initiating the redirect is inside of fetchr's middleware function. This isn't ideal and the most logical place would be in the "project-service", however there is no response object available to the service. I have created an issue with the maintainers of Fetchr to see if that is truly the best place but I have yet to hear back from them.

Secondly, I need to create a proper parser that converts the url-encoded form body into the format that Fluxible is expecting. At this time, I am just manually coercing it, but I need to familiarize myself with Fluxible more to see how they are doing it in a general sense.

Lastly, I need to create a React plugin that renders the form based on context. It could draw inspiration from Meteor-AutoForm. This is probably the nest step I will try to tackle. However, I'm not confident in my ability to write an open source plugin like that. So, if anyone would like to help me co-author it, I am open to suggestions.

## Wrapping Up

All in all, it was fun getting this idea working because I wasn't even sure it was possible at first. I'm really hoping someone smarter than me can take the idea and run with it to create a proper implementation that the world can use to make progressively enhanced javascript apps. We will see if anyone else thinks it is a battle worth fighting.

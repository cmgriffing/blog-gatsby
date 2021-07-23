---
title: "Introducing Nimbuscam"
date: "2016-04-13"
coverImage: "../images/nimbuscam-8e67ed86bc40a41fb4c9db6eed05409d.png"
slug: "introducing-nimbuscam"
---

Meet [Nimbuscam](https://appropont.github.io/nimbuscam), a client-side, serverless security camera application that uploads frames to the cloud.

## Some history:

With the creation of the WebRTC spec there are a lot of cool things you can do with the browser these days. I wanted to do something with webcams so I created something that uses image diffing to check for motion and then upload the frames to Amazon S3.

I originally created a proof of concept using knockout and Addy Osmani's [getUserMedia shim](https://github.com/addyosmani/getUserMedia.js/) called s3cam. That was fun but it was just kind of hacked together and I wanted to implement new features like:

- Support for other cloud storage providers.
- A frame buffer to upload frames from before the motion is detected.
- A keep alive buffer to keep capturing frames for an arbitrary amount of time after motion has stop being detected detected and then resetting that keep-alive if motion is detected before the timer runs out.
- Easy viewing of recorded images instead of having to go to the cloud provider.
- and more...

Getting all that into the proof of concept app would have been rough. I needed a rewrite and I decided to use a different JS framework to handle the app logic. At the time, Angular and Ember were the most promising options. I had done a little Angular and didn't like it much. (Oh the irony that I do a lot of Angular in my day job...). So, I settled on Ember. I'm glad I did because the Seattle Ember meetup group has been awesome.

## Plans:

At this point I think the app is ready for a public "beta". I have not enabled the buffers yet, but there is a page for previewing uploaded images as well as underlying support for multiple cloud providers. Right now, I just have S3 and local storage (indexedDB technically), but I plan to implement one for Azure sometime soon. If anyone wants to create a Github issue or Pull Request for other providers, they are more than welcome. The buffers are almost ready, I just need to do some more testing.

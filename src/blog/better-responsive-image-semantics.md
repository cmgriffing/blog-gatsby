---
title: "Better Responsive Image Semantics"
date: "2014-01-31"
coverImage: "./images/fundraise.com-responsive.png"
slug: "better-responsive-image-semantics"
---

Responsive Images are a tough nut to crack. The W3C is currently considering several possible implementations. Until a standard is reached, people are using various client-side and server-side solutions.

## The Current Landscape

Many client-side solutions end up downloading two copies of an image, the placeholder and then the fetched "responsive" image. Many server-side solutions resort to User-Agent sniffing.

## One Useful Library

I found a client-side library/technique that eliminates the "double download" effect. [Riloadr (https://github.com/tubalmartin/riloadr)](https://github.com/tubalmartin/riloadr)

## One Issue

The thing that bugged me is the semantics of having 2 img tags. The tab sat in my browser for a couple weeks. Then, today while cleaning up old tabs, I found Riloadr again. I realized that there was a very simple way to improve its semantics.

The technique used by riloadr is fairly straight-forward and you could just as well implement the "src replacement" yourself. However, the library has some other nice features so I created an [issue on the repo](https://github.com/tubalmartin/riloadr/issues/17) instead.

## My Fix

Since the simplifying of the markup can apply to more than just the Riloadr library I will outline it here.

The original HTML:

The fixed HTML:

The JS:

```js
  .each( $('.responsive-noscript') , function(i, noscript) {
    //wraps current noscript as jquery object
    var $noscript = $(noscript);
    //wraps noscript tag in temporary div
    $noscript.wrap("
  ");

  //Replace innerHTML of the newly created temporary div wrapper
  $noscript.parent().html($noscript.html());

});

//Remove temporary div wrapper
$.each( $('.responsive') , function(i, img) {
  var $img = $(img);
  $img.unwrap();
});

```

Now to explain things a bit.

My fix removes the empty img and adds a class to the noscript tag. This has to be done since any element inside of a noscript tag is inaccessible in JS. So, `$('.responsive')` was giving an empty result.

Then the JS goes and wraps the noscript in a temporary div. After that the div is filled with the innerHTML of the noscript tag. At this point, the .responsive that was inaccesible is now usable in JS.

I go through and select all the .responsive images and then unwrap() them to remove the temporary wrapper div.

## Conclusion

So, even if you don't use the library, Riloadr, you can roll your own responsive images using the same technique. Now you can do so without too much extra markup. The noscript tags are a bit "unsemantic" but still better than before.

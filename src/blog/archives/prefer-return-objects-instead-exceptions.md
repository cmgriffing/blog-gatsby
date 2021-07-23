---
title: "Prefer return objects instead of exceptions"
date: "2016-06-25"
coverImage: "../images/RantModeOn.jpg"
slug: "prefer-return-objects-instead-exceptions"
---

I have been toying with several other languages lately like Rust and Go. The thing I love about these languages is a lack of exceptions. Things are easier to reason about and no try/catch. It seems to me, with generators and async/await, that try/catch is turning into the preferred error handling style for JavaScript. I said as much in response to a comment when I spoke at the Seattle Node.js meetup. The room collectively groaned, and internally I groaned with them. However, it is hard to deny the way async stuff is currently shaping up in the specs.

I feel like there is a way to improve this. Go uses tuples and Rust uses Results/Options structs as their standard error handling techniques. I think we can combine the two ideas in JS using some of the newer features of ES2015 and ES2016 for an elegant way of writing code.

## The Foundation

The underlying thing for this to work is for every function to return a special standard object with a set of result and error properties. An example function might look like this:

```js
const exampleFunction = function(something) { let resultValue, errorObject; if(!something) { errorObject = new Error("An error has occurred."); } else { resultValue = something + something; } return { result: resultValue, //required if error null or undefined error: errorObject //required if result null or undefined }; };
```

## What about existing code that still uses Exceptions?

One thing that throws (pun intended) a monkey wrench into things are existing modules that use exceptions. For that I propose a very simple wrapper method that might look like this:

```js
const wrap = function (functionToWrap, argsArray = []) {
  try {
    return { result: functionToWrap(...argsArray) }
  } catch (e) {
    return { error: e }
  }
}
```

## And Async?

If you want to do something similar with promises you might have this function:

```js
const wrapAsync = async function (functionToWrap, argsArray = []) {
  try {
    return { result: await functionToWrap(...argsArray) }
  } catch (e) {
    return { error: e }
  }
}
```

## Final examples

When you put it all together you get code that might look like this:

```js
;(function () {
  const { result, error } = wrap(exampleFunction, ["testing"])
  if (error) {
    //do something with the error
  } else {
    //do something with the result
  }
})()
;(async function () {
  const { result, error } = await wrapAsync(exampleAsyncFunction, ["testing"])
  const { result2, error2 } = await wrapAsync(exampleAsyncFunction, ["testing"])
  if (error || error2) {
    //do something with the error
  } else {
    //do something with the result
  }
})()
```

Realistically, there is a performance hit for using many try/catch statements instead of a big one at the top level. Wrapping everything like this could be impactful. Try/catch also keeps the compiler from optimizing the wrapped code, however the code inside of functions you are wrapping can still be optimized, so I think that is ok.

The only way to know the performance impact is to test it in a real (albeit small and simple) api or app, which is just what I will do. I will update this post with results when I have them.

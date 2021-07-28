---
title: "First Impressions: Code sharing between React Native and React"
date: "2016-06-18"
coverImage: "../images/ReactNative-feature.png"
slug: "code-sharing-between-react-native-and-react"
---

**Notice:** This post is outdated. The router for React Native has changed significantly.

I have an almost complete React project that was written a while ago using Reflux before Redux was well known. I decided I needed to port the app over to Redux as a learning exercise. Not only that, but I wanted to learn some React Native along the way and figure out how to share business logic between the various platforms.

## One boilerplate to rule them all?

In the beginning, I sought out a boilerplate. Luckily, someone has taken the time to put together a really good tool for filtering existing boilerplates: [http://andrewhfarmer.com/starter-project/](http://andrewhfarmer.com/starter-project/). Recently someone also posted this: [http://habd.as/awesome-react-boilerplates/](http://habd.as/awesome-react-boilerplates/). I landed on [Este](https://github.com/este/este) as a good starting point. One minor hurdle was the fact that I pulled it down one day, messed with it. Then a week later I was on a different machine and it wouldn't compile after a fresh pull. It was resolved a couple days after due to a bugfix in one of the dependencies, but it was a little annoying.

While it wasn't compiling, I decided to trace the source code anyway. I really liked the way the actions and reducers were common and the platforms just implemented their own routing, components, and views on top of them.

## Down the rabbit hole

When I was able to compile a few days later, I started hacking away to figure things out. I mostly just tested in the browser. This was a bit of a bummer because the app I am making is really hindered by CORS. So, after getting a very minimum viable web app, I started hacking away on the React Native code. This led to my first major issue.

## React Native router woes

I wasn't a fan of the way the router has to be passed around in most of the code I have seen. I decided to create a singleton service to wrap the router. (a little Angular-y, i know, don't hate me) Part of my reasoning was the way the Native router isn't available until after the app does some initialization. It became simple to allow the service to be bootstrapped at whatever point the navigator became available. Note: A singleton like this would normally be a very bad thing if you wanted to do server-side rendering however, this is strictly for React Native code that will only ever be run under a single user at a time. So I think it is safe to make this decision. I am completely open to criticism about it though. Maybe I could have done this in a more React/Redux-y way.

Basically, there is one Navigator who sits at the top where he can see everything. This service simply relays orders to the Navigator from me, the Captain, wherever I am in the app, my ship. I decided to call the service... First Mate. I know... please hold the applause. Here is an initial version of First Mate. I'm sure it will change but the changed code will be available as part of the project this was done for [Watchdogr](https://github.com/appropont/watchdogr). Eventually it might justify being abstracted into an independent npm module, but right now the concept is incredibly simple and not battle tested at all.

```js
// TODO: Should probably refactor this into a class at some point and then export an instance of it.
// TODO: Wiring this up into the whole action/reducer pattern would be a good idea.
const FirstMate = (function () {
  // private
  let gotoCallback = function () {
    console.log("gotoCallback not wired up")
    throw new Error(
      "gotoCallback not wired up. You must wire up a callback from a parent component that has access to the navigator."
    )
  }
  let backCallback = function () {
    console.log("backCallback not wired up")
    throw new Error(
      "backCallback not wired up. You must wire up a callback from a parent component that has access to the navigator."
    )
  }
  let getCurrentRouteCallback = function () {
    console.log("getCurrentRouteCallback not wired up")
    //
    throw new Error(
      "getCurrentRouteCallback not wired up. You must wire up a callback from a parent component that has access to the navigator."
    )
    return ""
  }

  // public
  return {
    setGotoCallback: function (callback) {
      gotoCallback = callback
    },
    setBackCallback: function (callback) {
      backCallback = callback
    },
    setGetCurrentRouteCallback: function (callback) {
      getCurrentRouteCallback = callback
    },
    goto: function (route) {
      gotoCallback(route)
    },
    back: function () {
      backCallback()
    },
    getCurrentRoute: function () {
      return getCurrentRouteCallback()
    },
  }
})()

export default FirstMate
```

Here is the part of the AppPage where the navigator becomes available and we bootstrap the callback methods:

```js

onNavigatorRef(component) {
  this.navigator = component;

  console.log('Wiring up FirstMate');

// wire up FirstMate to allow child routes some access to Navigator without having to pass it everywhere.

  FirstMate.setGotoCallback((route) => {
    console.log('gotoCallback fired from AppPage reference with route: ', route);
    this.navigator.push(routes[route]);
  });
    FirstMate.setBackCallback(() => {
      console.log('backCallback fired from AppPage reference with route'); this.navigator.pop();
    });
    FirstMate.setGetCurrentRouteCallback(() => {
      console.log('getCurrentRouteCallback fired from AppPage reference with routes: ', this.navigator.getCurrentRoutes());
      const routes = this.navigator.getCurrentRoutes();
      const currentRoute = routes[routes.length - 1];
      if(currentRoute) {
        return currentRoute.name;
      } else {
        return '';
      }
      });
    }

```

## LocalStorage by another name, AsyncStorage

LocalStorage wasn't available, or at least not working right for me, in React Native. After some thinking I came up with an idea of how to create a wrapper and inject the platform specific storage object into the common code. My second thought was to see what open source solution was available to keep from reinventing the wheel. I found something that looked promising. I installed it, restarted the the dev servers, and was immediately met with a compilation error. It seemed that maybe this lib wasn't compatible with ES6 syntax or there was just a bug. Either way, it seemed like something that wouldn't resolve itself on its own.

I went and played a game for a little bit and came back to decide that writing my simple wrapper would suffice for now. One of the first steps was wrapping the browser's LocalStorage into a promise to make the common storage wrapper more agnostic of what is being used, since AsyncStorage (for Native) already used promises:

```js
// Custom Storage injection
const promiseStorage = {
  getItem: function (key) {
    return new Promise(function (resolve, reject) {
      resolve(localStorage.getItem(key))
    })
  },
  setItem: function (key, value) {
    return new Promise(function (resolve, reject) {
      resolve(localStorage.setItem(key, value))
    })
  },
}
Storage.setStorage(promiseStorage)
```

Here is how the Storage wrapper in the common code ended up looking at the time of this writing:

```js
const Storage = (function () {
  let storage

  return {
    getItem: async function (key) {
      if (!storage) {
        const errorMessage =
          "Storage.getItem Failed: Storage has not been set up yet."
        console.log(errorMessage)
        throw new Error(errorMessage)
      } else {
        const result = await storage.getItem(key)
        return result
      }
    },
    setItem: async function (key, value) {
      if (!storage) {
        const errorMessage =
          "Storage.setItem Failed: Storage has not been set up yet."
        console.log(errorMessage)
        throw new Error(errorMessage)
      } else {
        const result = await storage.setItem(key, value)
        return result
      }
    },
    setStorage: function (store) {
      storage = store
    },
  }
})()

export default Storage
```

With that out of the way, I was able to get back to making something basic work for react native. The UI wasn't pretty but it was doing basically the same stuff when I finally ran into another major hurdle.

## CORS is standing right behind me, isn't it...?

![right-behind-me](../images/right-behind-me.gif) One major selling point of native apps is that they are not bound by CORS issues. Sadly, this is untrue when using the simulator for iOS and Android. Note: I would be so happy if someone tells me I am wrong and I just need to fix a setting somewhere. The quickest way to get the right answer it to loudly proclaim the wrong answer.

At this point I didn't actually have a dev license, so I was a little blocked. I had to wait til I got an android to test with or until my DUNS number was available. And really, I think this is quite enough for one blog post. I'm sure I will have some more things that crop up that others might benefit from hearing about. I will update this post with a link to my continued ramblings when I have had more time to figure things out.

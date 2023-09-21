---
title: "Code Locality Concerns"
date: "2023-09-20"
slug: "code-locality-concerns"
coverImage: "../images/2023/elena-mozhvilo-yyBzyiGEh6s-unsplash.jpg"
description: "Recently, on stream, I needed to focus an element. It wasn't focusing until I kicked the focus to the next iteration of the event loop. There are a few ways to do such a thing and it brought up a concern I had about code locality vs being idiomatic."
---

Recently, on stream, I needed to focus an element. It wasn't focusing until I kicked the focus to the next iteration of the event loop. There are a few ways to do such a thing and it brought up a concern I had about code locality vs being idiomatic.

In this particular case, it came down to a useEffect vs a setTimeout with a timeout value of 0.

## The Problem

I have a search button on the marketing and documentation site for Vexilla at [https://vexilla.dev](https://vexilla.dev). After a recent co-stream with [GrahamTheDev](https://twitter.com/grahamthedev) and [Todd Libby](https://twitter.com/toddlibby), I discovered that there was a focus issue with my "Search" functionality. When a user tabs to the button and activates, they can search using Pagefind. If they close the modal, it should refocus the button that they used to show the modal.

It turns out that this was not as simple as it should have been. I made a `useRef` and attached it to the button. The ref itself was resolving to the HTML element as expected, but the `focus()` wasn't actually focusing the button.

First, we made sure that the element could be focused via dev tools and `focus()`. Yup. Worked as expected. So it wasn't just an issue of the button not being the right ref.

## The fix

I'm not 100% certain about the "why" of the problem. It seems like maybe `cmdk` is doing something funky with their backdrop when the dialog is showing. A viewer suggested a useEffect which ended up working. Once I knew that a useEffect fixed it it became apparent what was happening. We were trying to focus something that may have been currently unfocusable due to the backdrop.

Here is an example of the `useEffect` approach:

```tsx
export function Search() {
  const [open, setOpen] = useState(false);
  // ...
  useEffect(() => {
    if (!open) {
      searchButtonRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <Button>
      /* ... */
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          if (open === true) {
            // nothing to do here
          } else {
            setOpen(false);
          }
        }}
      >
      // ...
```

Here is an example of the `setTimeout` code:

```tsx
export function Search() {
  const [open, setOpen] = useState(false);
  // ...

  return (
    <>
      <Button ref={searchButtonRef}>
      /* ... */
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          if (open === true) {
          } else {
            setOpen(false);

            // need to kick the focus to next iteration of the event loop
            // similar to a useEffect with open as the dependency
            setTimeout(() => {
              if (searchButtonRef.current) {
                searchButtonRef.current.focus();
              }
            }, 0);
          }
        }}
      >
// ...
```

## The Concern

Since we knew what the issue was now, it was down to a matter of preference.

The "idiomatic" approach would indeed be the `useEffect`. However, I feel like this introduces a layer of indirection. Rather than being able to see the focus happen in the context of the close event, it became something you would have to venture outside of that context to understand.

Another approach would be to use a `setTimeout` with a timeout of 0 to kick the `focus()` to the next iteration of the event loop. I prefer this approach because it exists within the event handler's context.

You could make the argument that a `useEffect` makes sense because the focus is a side effect of state changing. I think that the event was already its own side effect because user interaction (and an event caused by it) is a side effect by definition when thinking about functional programming. The user itself is a side effect.

## Code Locality

In my opinion, code locality becomes more important than being idiomatic sometimes, especially in this case. The moment you have to look outside of the event's context you have introduced a context switch to the developer. You can find all sorts of articles about general context switching on the internet. They often focus on the context switch of going from your code editor to your email client or a meeting/etc. I think it is an underappreciated version of context switch to go from one part of the codebase to another.

In the same way that every abstraction incurs a cost, so does every indirection, for the same reasons. Leaving your original context forces you to maintain that state in working memory. In the case of this exact problem, the context is the event that is triggered when changing opened/closed state. Needing to go to a `useEffect` that is outside the scope of that event is a needless indirection that actually ONLY relates to the event in the first place.

So, how do you feel about it? Am I wrong? No, its the kids that are wrong... Just kidding, but that was a good reference, right?

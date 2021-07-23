---
title: "New CSS border spec idea: Extra-border"
date: "2013-11-13"
coverImage: "../images/css-is-awesome-20090407-142244.jpg"
slug: "new-css-border-spec-idea-extra-border"
---

The idea behind an "extra-border" css specification is to allow specific visual styles without requiring non-semantic markup or :before/:after hacks. I also think multiple extra-borders per element would be a good idea if possible. The layering of extra-borders could produce very interesting effects.

## The Spec

#### Declaration

`extra-border:`

#### Properties

Note: The properties below should all be "Parenable". This made-up term is meant to say that they can accept a series of values in parentheses to alter border sides individually, just like "margin" does.

- **border-width:** Same as Css Border spec but "Parenable"
- **border-style:** Same as Css Border spec but "Parenable"
- **border-color:** Same as Css Border spec but "Parenable"
- **border-spacing:** This is similar to margin and padding, but instead accepts a positive or negative value to allow for inner and outer borders.
- **border-radius:** This is a tricky one. The easy way would be to make it a single value, but a mre useful way would be to make it parenable to have different radii at each corner. How this would be done is up for debate.
- **render-phase:** This one might be a longshot but some people would want the extra border positioned over the element's text, some might want it under. The same goes for Images. This actually depends on browser vendors and I am unclear on the order that they actually render it all in. Some possible values could be: pre-image, pre-text, pre-border, post-border (maybe more).

## Example 1A: Basic Use-Case Implemented Non-Semantically

First, I demonstrate one possible use-case implemented with current specs using non-semantic markup.

```css
.element {
  background: white;
  padding: 0.5em;
  margin: 1em;
  border-radius: 0.5em;
}
.inner-wrapper {
  border: thin dashed #888;
  padding: 0.5em;
}
```

#### Demo element

Styles were added inline because Wordpress is a too opinionated about what it wants to wrap in paragraph tags.

## Example 1B: Basic Use-Case Implemented With Proposed 'Extra-border'

```css
.element {
  background: white;
  padding: 1em;
  /* To keep the same padding as it had before with 0.5em on element and wrapper */
  margin: 1em;
  border-radius: 0.5em;
  extra-border: thin dashed #888 -0.5em;
}
```

## Example 2A: More Complicated Use-Case Implemented Non-Semantically

This second set of examples shows off how the "Parenable" properties would work

```css
.element {
  background: white;
  padding: 0.5em;
  margin: 1em;
  border-radius: 0.5em;
}
.inner-wrapper {
  border-top: 1px solid #888;
  border-right: 2px solid #666;
  border-bottom: 3px solid #444;
  border-left: 4px solid #222;
  padding: 0.5em;
}
```

#### Demo element

Styles were added inline because Wordpress is a too opinionated about what it wants to wrap in paragraph tags.

## Example 2B: More Complicated Use-Case With Proposed 'Extra-border'

```css
.element {
  background: white;
  padding: 1em;
  /* To keep the same padding as it had before with 0.5em on element and wrapper */
  margin: 1em;
  border-radius: 0.5em;
  extra-border: (1px, 2px, 3px, 4px) solid (#888, #666, #444, #222) -0.5em;
}
```

---

## Multiple Declarations

This aspect of the spec seems like it might be the most difficult. Having multiple declarations allowed per element means that you wouldn't be able to simply write over an inherited `extra-border`.

- One possible solution would be to make it so only one extra-border can be assigned to each render-phase. This might be the simplest solution but it would be far from ideal.
- Another option would be to also add a "clear-extra-borders" spec that would take render-phase as a value with an optional "all" value to clear all extra-borders.
- Any other ideas? I know I haven't exhausted all possibilities, so if you think of a good one please comment and I will add it.

## Is it Necessary?

I know I consider this spec a good idea, though my implementation may be far from perfect. What do you think?

---
title: "KnockoutJS and Progressive Enhancement for Select Form Fields"
date: "2013-10-01"
coverImage: "./images/icon.png"
slug: "knockoutjs-and-progressive-enhancement-for-select-form-fields"
---

### Some Background Info

I'm working on a mobile hybrid app that uses knockoutJS for it's forms. There is really no need to worry about progressive enhancement for a mobile app. At least less need.

Then in another related project, I had to make a form for the app's website. I wanted to use some more of that Knockout goodness. For a website though, progressive enhancement is key.(IMHO)

As per usual, I fired off a google search to see the most implemented solution. Stackoverflow didn't seem to yield much. So I decided I would make a post for someone else who follows suit and googles the answer before thinking about it.

I say that last bit, because progressive enhancement with knockoutJS is remarkably simple. My examples will be using Twig as the server-side templating language. There is no reason why the idea wouldn't work in other template systems or even pure php.

---

### On to the code:

```php
{% for serverSideFoo in serverSideFoos %}
    {{ serverSideFoo }}
{% endfor %}
```

```js
var clientSideFoos = {{ serverSideFoosJson | raw }};

var FooViewModel = function() {
    this.clientSideFoo = ko.observable();
    this.clientSideFoos = ko.observableArray(clientSideFoos);
}

ko.applyBindings(new FooViewModel(), document.getElementById('fooForm'));
```

Basic php code sending the variables to twig could look like this:

```php
    //Your ORM or other data storage methods are irrelevant for this to work.
    $serverSideFoos = $modelRepository->getFoos();
    $serverSideFoosJson = json\_encode($serverSideFoos);

    return $twig->render(
                            "index.html.twig",
                            array(
                                'serverSideFoos'     => $serverSideFoos,
                                'serverSideFoosJson' => $serverSideFoosJson
                            )
                        );
```

I'm not really sure I even need to explain the code line by line, so I will just sum things up. Your server-side template goes in and renders the option elements for itself. The elements are then rendered to the html page that the user sees.

Then after the DOM has loaded, Knockout comes in and fills the select with the fields that it thinks should be there. In this case the fields are the same, so there is no difference as far as option elements are concerned to the end-user.

Thanks for stopping by. Feel free to comment or ask questions.

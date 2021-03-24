---
title: "Useful Magento Template Methods"
date: "2014-04-20"
coverImage: "./images/logo_magento.png"
slug: "useful-magento-template-methods"
---

Magento is, in my opinion, the most powerful e-commerce platform available for PHP. The community edition is completely free, but that comes with a downside. The documentation and the forum are not very helpful. StackOverflow is definitely a great resource for fixing bugs. However, there aren't very many general resources that go beyond the basics.

So, I decided to dive into the source to figure out which methods were available to be used in templates(.phtml files).

## The Methods

I will list the available methods by class from which they were inherited. This is by no means a list of all the available methods. It is just the ones that I found most useful. All of them are accessible using: `$this->methodName();`

### class: Mage_Page_Block_Html

Source file: app/code/core/Mage/Page/Block.php

#### getBaseUrl()

returns the base url of your site starting with http:// and ending with a /

#### getBaseSecureUrl()

returns the base url of your site starting with https://

#### getCurrentUrl()

returns the url after what the base URL returns, starting with a slash**Note: this method returns unexpected results in header.phtml and probably several other blocks**

### class: Mage_Core_Block_Template

Source file: app/code/core/Mage/Core/Block/Template.php

#### getSkinUrl()

returns the full url to the skin directory starting with http://

#### escapeHtml($data, $allowedTags)

escapes html tags in a string

**\$data** : the string to be parsed

**\$allowedTags** : an array of strings(tags without brace characters) to skip escaping

#### stripTags($data, $allowedTags, \$allowHtmlEntities)

strips html tags and provides option for removig html entities as well

**\$data** : the string to be stripped

**\$allowedTags** : an array of strings(tags without brace characters) to skip removing

**\$allowHtmlEntities** : a boolean deciding whether to skip or strip html entities

#### escapeUrl(\$data)

returns a url-encoded string

**\$data** : the url to encode

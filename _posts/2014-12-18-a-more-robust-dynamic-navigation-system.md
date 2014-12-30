---
title: "A more robust dynamic navigation system"
meta: "How to handle dynamic, multi hierarchical navigation"
layout: posts
pageClass: Posts
category: JavaScript
---

This post builds upon the article I wrote earlier
 [Handling responsive navigation with dynamic content](http://rbrtsmith.com/2014/12/handling-responsive-navigation/)
The solution there works just fine for a simple form of navigation, but what
if the navigation contains children or even grandchildren? What happens if there is
other content inline with the navbar such as an image or a search field. Quite clearly
it will break the script that dynamically generates the breakpoint, and then there's
the small matter that child navs are not accounted for.

##A more powerful solution
It's important that in the collapsed state that everything is accessible,
child pages, parent pages should be easy to navigate to.

To fix this there should be an area inside a parent that is specifically there for 
the purpose of toggling children.  On larger screens this can be hidden and the visibility
of the children can be toggled by a hover or focus event.
To start with on large screens the child elements can be positioned offscreen

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--snippet-1 %}

And then on hover it will get pulled back into view by setting the left value to zero.

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--snippet-2 %}

The toggle area is also positioned offscreen, we can use the same class for the main toggle and those
that toggle children.

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--snippet-3 %}

In the navigations collapsed state it needs to be ensured that hover and focus events do not toggle the visibility of child blocks,
This will result in a confusing UI.  This can be achived by removing the offscreen positioining (used on larger screens) using `Position: static`
and hiding it this way:

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--snippet-4 %}

To bring it back into view `height: auto` can be used. This will also push down the rest of the navigation underneath, this provides
a superior ux to absolute positioning which would have resulted in the child overlaying the rest of the navigation.


##Dealing with inline content
It's quite common to have content inline with a navigation.  It's quite simple to fix the issue of it's width not being accounted for,
We can just use JavaScript to calculate for the total width of the non-nav items and the navigation itself.  The result is then compared
to the width of the container to determine the breakpoint.  In this example, non-nav content is given the class of `.js-non-nav-content`

__N.B. Always prefix JavaScript class hooks with__ `js-`

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--snippet-5 %}


##Result
Here's the resulting navbar.  In this example I've added a very basic 'skin' to the navbar for visual purposes
and thrown in 3 small images of yours truly, each one being a seperate *non-nav-item* You can take this example
and extend it with any kind of visual styles that you like.  You can also check out a version I used in production
here: [http://bartenderbolaget.se/](http://bartenderbolaget.se/).

<p data-height="550" data-theme-id="10596" data-slug-hash="ZYWrxp" data-default-tab="result" data-user="rbrtsmith" class='codepen'>See the Pen <a href='http://codepen.io/rbrtsmith/pen/ZYWrxp/'>Auto collapse navbar part 2</a> by Robert Smith (<a href='http://codepen.io/rbrtsmith'>@rbrtsmith</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


##All the code

&nbsp;

###HTML

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--full-html %}

&nbsp;

###SCSS

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--full-scss %}

&nbsp;

###JavaScript Inc. jQuery

{% gist 4ef4217d3787e15c6e75 a-more-robust-dynamic-navigation-system--full-javascript %}

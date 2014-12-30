---
title: "Handling responsive navigation with dynamic content"
meta: "We look at a solution to fix the issue with fixed width navigation breakpoints"
layout: posts
pageClass: posts
category: JavaScript
---

It's very common with the popular frameworks such as [Bootstrap](http://getbootstrap.com/)
and [Foundation](http://foundation.zurb.com/) to have fixed width breakpoints,
in most cases this isn't a problem and we can easily change them through
the Sass or Less variables supplied.

The most profound problem lies within the navigation &mdash; you have to pick a fixed breakpoint, and anything
below this breakpoint will render the navigation in it's collapsed state.  

While this doesn't necessarily pose a problem for a site with static content, the same cannot be said
 for a dynamic site.  If you add more items to the navigation you will have to go and manually
update the breakpoint.  While this might not appear to be a major burden, imagine the scenario where
you have built a site for a client and they were to add in the additional item.  What if you had
many clients..


##A better solution
Clearly this is a very bad way to operate.  Your website is supposed to be responsive and dynamic right?
Why don't we just use our trusted old friend &mdash; JavaScript to calculate this breakpoint for us.
First we can wrap the navbar inside a wrapper.  Then calculate the width of the wrapper using
jQuery's ´outerWidth()´ method and then use the same method to get the width of the navigation.  The navigation
should have a width that collapses to fit it's contents, so it should either be floated or given a display
property of table (Inline block adds weird margins so we won't be using it).
If the two widths are equal then we can collapse the navigation.

**This is how we could create the navbar**

##HTML
{% gist 276260d77b003abfd8d8 handling-responsive-navigation-with-dynamic-content--html %}

&nbsp;

##SCSS
{% gist 276260d77b003abfd8d8 handling-responsive-navigation-with-dynamic-content--scss %}

&nbsp;

##JavaScript
{% gist 276260d77b003abfd8d8 handling-responsive-navigation-with-dynamic-content--javascript %}

##Result

<p data-height="342" data-theme-id="10596" data-slug-hash="RNrBWb" data-default-tab="result" data-user="rbrtsmith" class='codepen'>See the Pen <a href='http://codepen.io/rbrtsmith/pen/RNrBWb/'>Auto collapse navbar</a> by Robert Smith (<a href='http://codepen.io/rbrtsmith'>@rbrtsmith</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


**Note:** This navbar has been expanded upon here &ndash; [rbrtsmith.com/2014/12/a-more-robust-dynamic-navigation-system/](http://rbrtsmith.com/2014/12/a-more-robust-dynamic-navigation-system/) to show how we could nest children inside the navigation.
   
    
    

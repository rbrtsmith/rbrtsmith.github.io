---
title: "How to style a select box"
meta: "How to style a select box -- properly."
date: 2014-12-04
layout: posts
pageClass: posts
category: css
---

I had, for quite some time wondered how to go about styling a select box, as we are
aware, they are Inherently troublesome to style, there's many threads on 
[Stackoverflow](http://stackoverflow.com/search?q=style+a+select+box) posing this very
question.

About 6 months ago I had the idea of wrapping the select-box in a container, making the select box
about 60px wider than this container, and setting the containers style to be overflow hidden in 
order to hide the arrow however this had issues in some browsers, especially iOS.

There are solutions such as [this](http://getbootstrap.com/components/#dropdowns) one provided by
[Twitter Bootstrap](http://getbootstrap.com/).  However this isn't using a select-box at all, it's merely
an unordered list styled to look like a select-box and as such can be styled further in any way you choose.
However, there is a downside to this solution: You loose the native select-box UI on mobile and tablet.  That
can't be a great experience for users on those devices who are used to seeing their native UI, I'd put
money on this slightly damaging the conversion rate for users from these devices.

We need some way to style a select-box &mdash; properly.  Something that works cross browser and doesn't hinder
the native UI of the touch devices.

Then this thought crossed my mind: What if we were to set the opacity of the select-box to zero, then
style a label underneath to look like the select-box we intend. I was pessimistic as I assumed that
the select-box would remain translucent even once open.  But I was wrong, the container itself remains
translucent but the options are visible.

Now because the select-box is invisible we wouldn't be able to see what selection had been made,
but that's a simple fix with JavaScript.  We can just extract the selected option into a variable and inject
it into the label.  The label should underneath the select box which can then be styled.


##HTML
Wrap the label and select-box inside a wrapping div.  The 'js-styled-select__select' class is a JavaScript
hook, we should always prefix JS hooks with js-.

The label should come first to ensure the select box is layered at the top.

{% gist 441c98abaf42013dfefd %}


<p>&nbsp;</p>

##SCSS
    .styled-select {
        position: relative;
        height: 40px;
        &__select,
        &__label {
            // ensure select-box and label to fill the container
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }
        &__select {
            background: none;
            opacity: 0;
            width: 100%;
            cursor: pointer;
        }
        &__label {
            // style the select box
            border: 1px solid #45d296;
            border-radius: 3px;
            line-height: 40px;
            padding: 0 10px;
            color: #333;
            background: white;
            &:before {
                // create the triangle
                position: absolute;
                top: 50%;
                right: 10px;
                margin-top: -3px;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #45d296;
                content: " ";
            }
        }
    }

<p>&nbsp;</p>

##JavaScript
Bind an onchange event to any selected boxes with a matching hook.  Once that
event occurs take the value of the selected option  and inject it into the label.

    (function() {
        if ( 'querySelector' in document && 'addEventListener' in window ) {
            // check query selector is recognised by the browser IE9+
            var value;
            document.querySelector('.js-styled-select__select').onchange = function() {
                value = this.options[this.selectedIndex].value;
                var sibling = this.parentNode.children[0];
                sibling.innerHTML = value;
            };
        }
    }());

##And the result
<p data-height="268" data-theme-id="0" data-slug-hash="azvywm" data-default-tab="result" data-user="rbrtsmith" class='codepen'>See the Pen <a href='http://codepen.io/rbrtsmith/pen/azvywm/'>azvywm</a> by Robert Smith (<a href='http://codepen.io/rbrtsmith'>@rbrtsmith</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

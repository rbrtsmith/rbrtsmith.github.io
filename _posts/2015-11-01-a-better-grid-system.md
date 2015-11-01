---
title: "A better grid system"
meta: "A grid system that offers equal heights, vertical alignment, no bloat."
date: 2015-11-01
layout: posts
pageClass: posts
category: css
---

Until recently I've been using a 12 column grid system that is very similar
to the one Bootstrap uses, with an almost identical API.  In the majority
of cases this grid system is suffice and works pretty well.

However it does have some major shortcomings

* No ability for equal heights, you must use JavaScript to set the heights of
the columns
* When you have tiling rows of columns all must be the same height otherwise
the layout breaks unless you do some nth-child clearfix trickery.
* It's bloated, you end up with a whole group of grid classes added to your
compiled stylesheet when you are only using a portion of them.
* No option to have larger, smaller or zero gutters, you need to extend the grid
and make hacks.
* Requires a wrapping element to prevent the right side of the grid going 
off-screen.
* A fixed number of columns: 12 - how do we do a 5 column grid? Hack.

The three biggest problems for me is the equal heights bloat and fixed
columns, because I really care about performance&mdash;And so should you.  
Adding in JavaScript to create equal heights adds to the size of your JS file, 
but worst of all DOM manipulation in JavaScript is extremely 
expensive&mdash;especially on events like a screen resize.  
You can throttle the resize event but it's still not ideal.

The issue of a bloated CSS file is the fact we're serving up styles to our
users that will never be used.  All those width classes at every breakpoint,
the same for push, pull and offset classes&mdash; it all adds up!

Having a 12 column grid becomes a problem when a client now wants 5 equally 
spaced boxes, the only way around this is to hack.  The `col-sm-{n}` API
just won't work here, so your class name will make little sense.  

##We need a more flexible solution.
So i checked out [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids) 
by Harry Roberts.  This is a fantastic little grid system and it solves a lot
of these issues:

* API based on fractions from halves upto twelfths so we can have our five
column grid without having to hack away at the grid system / breaking the API
and everything in between.  Yay flexibility!
* Uses inline-blocks instead of floats - this has the benefit of no clearfixing
issues, so our tiled grid of rows and columns wont break if they're different
heights.  That's that problem solved.  
The main drawback with inline blocks is
unwanted whitespace around the items, caused by whitespace in your HTML, which
can be commented out but this is a *little* messy.  Perhaps there's an 
alternative&hellip;
* Sets the gutters in a single direction only. So no need for a wrapping
container with padding to stop page overflow, when elements overflow to the left
wont generate scrollbars.

Harry's grid also adds in some pretty nifty features

* Ability to reverse the horizontal order of columns - made possible thanks
to inline blocks.
* Inline blocks can also be vertically aligned&hellip;
* And aligned horizontally via text-align.
* Ability to remove the gutter.
* The width push and pull classes are not directly tied to the grid so can be
re-used anywhere in the project.

So by switching to Harry's grid we already have a vast improvement over 
Bootstrap's offering.
But we're still missing equal heights, I'd like an even further reduction on
bloat&mdash;Harry's grid does a great job, but can it be take further?
And what about variable breakpoints?

##rbtsmith grid
There's hundreds of weird and crazy names for grid systems out there so I
took the lazy option and just named it after my blog - and my own name.

This grid does in fact offer equal heights using flexbox.  It has the drawback
of equal heights only working in IE10+.  I did experiment with using 
`display:table` and that does give equal heights, but that itself has drawbacks:

* Guttering has to be done using borders, which do not render subpixel unlike
margins and padding.
* Grid items cannot tile into rows.
Of the two I have gone with Flexbox and now see equal heights as a form of
progressive enhancement.  <IE10 fallback to using inline-blocks which will still
tile nicely despite uneven heights.

I have also added the ability to chose between Large, standard, small or zero
gutters, all of which are customizable.

To get varying numbers of and values for grid breakpoints I employ a Sass list
and it's default value can be overridden.  The breakpoint name becomes part
of the class name API and value will be compiled to generate corresponding 
classes.  This not only adds flexibility&mdash;it reduces bloat.

To keep bloat even lower rwsmith grid comes with a large `feature toggle` list
that can be overridden to turn off width, push, pull classes and grid modifiers
too.  It might take a **little** more time to get things setup, but your 
resulting CSS will contain very little bloat.

To read more about rwsmith grid, see the API and download please check out the
[GitHub Repository](https://github.com/rbrtsmith/rbrtsmith-grid)  
it can be downloaded via bower: `bower install rbrtsmith-grid`

Also check out the [demo](http://codepen.io/rbrtsmith/full/VvdGMp/)

If you have any comments about how this could be improved or bugs that you
might come across please comment below or fire me a tweet!








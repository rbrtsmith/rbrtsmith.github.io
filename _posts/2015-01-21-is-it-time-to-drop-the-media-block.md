---
title: "Is it time to drop the media object?"
meta: "With strong browser support for more powerful abstractions should we drop the media object?"
layout: posts
pageClass: posts
category: CSS
---

In June 2010 [Nicole Sulivan](http://twitter.com/stubbornella) wrote a hugely 
influential [blogpost](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) 
that quite literally changed how developers structured their CSS.  She introduced 
to us what is widley known as **The Media Object** and with that the whole concept
 of  <abbr title="Object-Oriented CSS">OOCSS</abbr> was brought into the mainstream.

**TL:DR;** OOCSS is a method of **grouping common design
 patterns into individual entities** that can be re-used throughout your
 project.  Done correctly this can 
 greatly reduce duplication and because the code is now more modular it allows
 things to be rapidly and efficiently scaled, as well as reducing maintenance
 overhead.

&nbsp;

##The media object##
The media object is a fixed-width image and fluid-width textual
 content laid out side by side. Unlike a typical floating scenario the fluid 
 content does not wrap around the image it simply expands downwards.
 This article is assuming your knowledge of the Media object so I suggest you
 read Nicole's [post]((http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) before you procede.

<figure>
	<img src="/img/build/posts/2015/01-05/screen-1.jpg" alt>
	<figcaption>The media object</figcaption>
</figure>

This incredibly simple abstraction literally changed the way we think about
architecting our CSS, but it does have one small limitation &mdash; 
**vertical alignment** What if we wanted the textual content to be vertically 
centered in relation to the image, or vice versa?  Well it's only possible
using magic numbers on paddings/margins which should be avoided at all costs.
Of course we could use JavaScript, but that's just going to over complicate things.
fortunatley there is an equally simple, yet even more powerful abstraction we can
use. **The flag object**

&nbsp;

##The flag object##
Early 2013 Harry Roberts introduced us to, what he has coined the flag object,
it's intention is to fix the problem of vertical alignment.  It does so using a 
table cells ability to vertically center it's content.
This article also assumes you have a full understanding of how the Flag  Object works. I also recommend that you read through Harry's 
[article](http://csswizardry.com/2013/05/the-flag-object/)  
before you procede any further.
<figure>
	<img src="/img/build/posts/2015/01-05/screen-2.png" alt>
	<figcaption>Using the flag object to vertically center the image.</figcaption>
</figure>

&nbsp;

##The Flag Object vs the Media Object##
Assuming you have read and understood both articles you may be left thinking
that with the **Flag Object being considerably more powerful for layout**, why was
the Media Object was not made redundant.  The simple answer was browser support.
The Media Object will work in browsers right back to IE6.  The Flag Object
uses the properties `display: table` and `display: table-cell which is only
supported in IE8+ and back in 2013 when the Flag Object was introduced most of us were still supporting IE7.

&nbsp;

##Should we drop support for the media object?##

In short the answer is a resounding **YES!**

It's now 2015 and I think the time has come to drop the Media Object, IE7 useage is now so low that apart from some edge cases there is no real need to support IE7, which means the flag object is going to work across the board.  

I personally stopped using the Media object about half a year ago, and since then I have found many more uses for the flag object that go far beyond it's initial intended use.

In my next blogpost I will be looking at extending the Flag object and demonstrating how this versatile bit of code can be used for far more than simply centering Images and text.




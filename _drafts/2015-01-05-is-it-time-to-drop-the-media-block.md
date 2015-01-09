---
title: "Is it time to drop the media object?"
meta: "With strong browser support for more powerful solutions should we drop the media object?"
layout: drafts
pageClass: posts
category: CSS
---

In June 2010 [Nicole Sulivan](http://twitter.com/stubbornella) wrote a hugely 
influential [blogpost](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) 
that quite literally changed how developers structured their CSS.  She introduced 
to us what is widley known as **The Media Object** and with that the whole concept
 of  <abbr title="Object-Oriented CSS">OOCSS was brought into the mainstream.

TL:DR; OOCSS is a method of grouping common design patterns into individual
 entities that can be re-used throughout your project.  Done correctly this can 
 greatly reduce filesize and because the code is now more modular it allows
 things to be rapidly and efficiently scaled, as well as reducing maintenance
 overhead.

&nbsp;

##The media object##
The media object is a fixed-width image and fluid-width textual
 content laid out side by side. Unlike a typical floating scenario the fluid 
 content does not wrap around the image it simply expands downwards, the image 
 staying and text vertically aligned to the top.
 This article is assuming your knowledge of the Media object so I suggest you
 read Nicole's post before you procede.

![The media object](/img/build/posts/2015/01-05/screen-1.jpg)

This incredibly simple abstraction literally changed the way we think about
architecting our CSS, but it does have one small limitation &mdash; 
**vertical alignment** What if we wanted the textual content to be vertically 
centered in relation to the image, or vice versa?  Well it's only possible
using magic numbers on paddings/margins which should be avoided at all costs.
Of course we could use JavaScript, but that's just going to over complicate things.
fortunatley there is an equally simple, yet even more powerful abstraction we can
use.

&nbsp;

##The flag object##
Early 2013 Harry Roberts introduced us to, what he has coined the flag object,
it's intention is to fix the problem of vertical alignment.  It does so using a 
table cells ability to vertically center it's content.
I also recommend that you read through Harry's 
[article](http://csswizardry.com/2013/05/the-flag-object/)  
before you procede any further.


##The Flag Object vs the Media Object##
Assuming you have read and understood both articles you may be left thinking
that with the Flag Object being considerably more powerful for layout, why was
the Media Object not made redundant.  The simple answer is browser support.
The Media Object will work in browsers right back in IE6.  The Flag Object
uses the properties `display: table` and ´display: table-cell´ which is only
supported in IE8+ and in 2013 most of us were still supporting IE7.

It's now 2015 and I think the time has come to drop the Media Object, in 99%
of cases there is no real need to support IE7, which means the flag object is
going to work across the board.  I've now worked on a number of projects using
the Flag Object in place of the media object


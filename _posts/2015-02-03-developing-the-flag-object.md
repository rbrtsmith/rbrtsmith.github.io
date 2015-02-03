---
title: "Developing the flag object"
meta: "The flag object can be used in a wide variety of scenarios, here we take a look at some of them"
layout: drafts
pageClass: posts
category: CSS
---

This is a continuation from the previous post: 
[Is it time to drop the media object?](http://rbrtsmith.com/2015/01/is-it-time-to-drop-the-media-block/)

Having dropped the media object in favour of the flag object I've come to find
that the uses for this abstraction reach far beyond it's initial purpose of
vertically centering images and text side by side.  For a start it doesn't
have to be images and text, it could be form elements, two bodies of text and
much more.

With this in mind I propose changing the classnames.  Here is the original
code for the [Flag object](http://csswizardry.com/2013/05/the-flag-object/):


{% highlight scss %}
.flag {
   display: table;
   width: 100%;

   &__image,
   &__body {
      display: table-cell;
      vertical-align: middle;

      &--top {
         vertical-align: top;
      }

      &--bottom {
         vertical-align: bottom;
      }
   }

   &__image {
      padding-right: 10px;

      >img {
         display: block;
         max-width: none;
      }

      .flag--rev & {
         padding-right: 0;
         padding-left: 10px;
      }
   }

   &__body {
      width: 100%;
   }
}
{% endhighlight %}


**N.B.** The code has changed very slightly with use of the 
[parent selector suffix](http://thesassway.com/news/sass-3-3-released#a-nameparent-selector-suffixes-classanchoraparent-selector-suffixes)
which was introduced in Sass 3.3 It allows us to append to a parent selector,
in my opinion this 'ghost nesting' makes the code easier to read, demonstrating
nesting without any increase in specificity.  It also plays very nicely with 
[BEM](https://bem.info/).

As you can see here, some of the classnames are assuming that we are using an
image, which as I mentioned earlier might not always be the case.  It makes good 
sense to have more extraneous classnames.  Perhaps in some way describing their
behaviour, rather than what they contain.

> I use this abstraction multiple times in literally every project, and you should too.

I propose renaming `flag__body` and `flag__image` with names that better describe their
behaviour. Simply because one takes up a fixed width, dictated by it's content and
the other takes up the remaining space I propose the following classnames:
`flag__solid-cp` and `flag__fluid-cp`.
The classnames now sort of mimik their pysical properties. 
The hyphenated `-cp standing for component.

Here is how the flag now looks with my proposed changes
{% highlight scss %}
/* FLAG */
/*  1. The fluid component takes up all the remaining space
    2. The width of the solid component is dictated by the
       width of it's contents, in this case the image
       No padding added like the original flag
       object, if required we can add a padding helper class 
       in instances where that is needed like this example having
       the class of .soft--right being added.
    3. Because we are all now building responsive websites we have
       ensure that this image retains it's natural size. Otherwise
       the container simply collapses.
*/
.flag {
      display: table;
      width: 100%;

   &__solid-cp,
   &__fluid-cp {
      display: table-cell;
      vertical-align: middle;
      &--top {
         vertical-align: top;
      }

      &--bottom {
         vertical-align: bottom;
      }
   }

   &__fluid-cp {
      /*1*/
      width: 100%;
   }

   &__solid-cp {
      /*2*/

      >img {
         /*3*/
         display: block;
         max-width: none;
      }
   }
}
{% endhighlight %}

&nbsp;

##Example uses for the flag object##

<p data-height="338" data-theme-id="10596" data-slug-hash="qEPNKG" data-default-tab="result" data-user="rbrtsmith" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

&nbsp;

<p data-height="266" data-theme-id="10596" data-slug-hash="qEPPLY" data-default-tab="result" data-user="rbrtsmith" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

&nbsp;

<p data-height="310" data-theme-id="10596" data-slug-hash="raGGXG" data-default-tab="result" data-user="rbrtsmith" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

&nbsp;

<p data-height="486" data-theme-id="10596" data-slug-hash="bNooZN" data-default-tab="result" data-user="rbrtsmith" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

##Some final words##

As you can see from the examples above there are far more applications for the flag object than it was initially designed for, we don't
even have to use all of the flag object's components, as in the example with text vertically centered over a banner iamge, that doesn't
make any use of the solid component at all.

Like the Media Object, this abstraction could literally save hundreds, maybe even thousands of lines of code
in a large project due to it's versatility.  I use this abstraction multiple times in literally every project, and you should too.

---
title: "Building a high performance lazy load module"
meta: "Lazy loading often negatively affects scroll performance, here I demonstrate how I solved them."
layout: posts
pageClass: posts
category: JavaScript
---

For those who are not familiar lazy loading means to only load in the content
that is inside the users viewport, when the user scrolls down more content is
loaded in.  This has a number of benefits:

* Reduces load on the server, especially on taller single page sites
* Saves bandwidth for the user, especially good for those users on limited
and often expensive data plans.
* The load event will fire sooner.  While technically the page load time has
been reduced it won't be so noticeable to the user, as the page will render
before all the images have downloaded.

First I will create a very rudamentary, very low performance 
lazy load with the use of some data attributes and some JavaScript.  Then
I will demonstrate how we can vastly improve the performance.

With the images we populate the src with a blank GIF, it inavlidates the 
markup if you leave the src attribute blank.  Then you would put the
location of the image into the lazy-src sata attribute.  Put a JavaScript
hook into the classname, and don't forget to put some drescriptive text
on the alt attribute.

{% highlight html %}

<div>
   <img src="blank.gif"
      data-lazy-src="img/photo-1"
      class="js-lazy-load"
      alt="Stood overlooking the city of New York">
</div>
<div>
   <img src="blank.gif"
   data-lazy-src="img/photo-2"
   class="js-lazy-load"
   alt="A view over the San Francisco Bay">
</div>

{% endhighlight %}

&nbsp;


Firstly we should create an [IIFE]({{site.url }}/2015/02/javascript-patterns-the-iife/)
to ensure that none of our variables leak out into the global scope.

**N.B.** Never omit the var keyword or else that variable will instead be bound
to the global scope.  This is bad.

{% highlight javascript %}

(function(){
   // lazy load module goes here    
}());

{% endhighlight %}

&nbsp;

Next we need to bind a scroll event handler to the window object, declare
an anomynous function to be called on the scroll event.
Then store the current window Y position.  in other words how far we have
scrolled from the top of the document.  We also store the height of the window,
and use that value to determine the position of the bottom of the window.  This
will be used to see if the images are inside the viewport.


{% highlight javascript %}

(function(){
   window.onscroll = function() {
      var scrollOffset = $(window).scrollTop(),
         winHeight = $(window).height(),
         windowBottomOffset = scrollOffset + winHeight;
   };
}());

{% endhighlight %}

&nbsp;

Loop through all the lazy images by targeting the `.js-lazy-load` hook inside
of the loop we store the images offset and compare that with the window bottom
offset to determine if the image is within the viewport.
We also store the lazy-src attribute value.

{% highlight javascript %}

(function(){
   window.onscroll = function() {
      var scrollOffset = $(window).scrollTop(),
         winHeight = $(window).height(),
         windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var imgOffset = $(this).offset().top,
            lazySrc = $(this).data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            
         }
      });
   };
}());

{% endhighlight %}

&nbsp;

Finally inside the if statement we apply set the src attribute to the lazySrc
value.

{% highlight javascript %}

(function(){
   window.onscroll = function() {
      var scrollOffset = $(window).scrollTop(),
         winHeight = $(window).height(),
         windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var imgOffset = $(this).offset().top,
            lazySrc = $(this).data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            $(this).attr('src', lazySrc);       
         }
      });
   };
}());

{% endhighlight %}

&nbsp;

So that is a basic lazy load function.  it works but there's huge room for improvement
in terms of performance, the poor performance of this would be noticeable if there's
many lazy-loaded images, and other effects bound to scroll events such as parallax.
Even more so on lower powered devices.

##Micro optimisations##
There are a few things we can do to the code to slighty improve the speed of execution.


Declare scrollOffset, winHeight and windowBottom offset outside of the scroll event.

{% highlight javascript %}

(function(){
   var scrollOffset = null,
      winHeight = $(window).height(),
      windowBottomOffset = null;
   window.onscroll = function() {
      scrollOffset = $(window).scrollTop(),
      windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var imgOffset = $(this).offset().top,
            lazySrc = $(this).data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            $(this).attr('src', lazySrc);       
         }
      });
   };
}());

{% endhighlight %}

&nbsp;

inside the jQuery each loop we access `$(this)` three times, we should store
`$(this)` inside of a variable for faster access.

{% highlight javascript %}

(function(){
   var scrollOffset = null,
      winHeight = $(window).height(),
      windowBottomOffset = null;
   window.onscroll = function() {
      scrollOffset = $(window).scrollTop(),
      windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var el = $(this);
            imgOffset = el.offset().top,
            lazySrc = el.data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            el.attr('src', lazySrc);       
         }
      });
   };
}());

{% endhighlight %}

&nbsp;

These *mico optimisations* will help speed up the execution but compared to other
optimisations we can make, their influence will be minimal, still it's good to
follow best practices and code sensibly in this manner.

##DOM interactions are the enemy of performance##
Any query or manipulation of the DOM is very expensive, if we are building with
performance in mind we need to ensure we need to reduce the amount of DOM
interraction.
First off the scroll event fires incredibly rapidly, this can be clearly seen if you
console log out a value on the scroll event.

{% highlight javascript %}

(function(){
   var i=0;
   window.onscroll = function() {
      console.log(i++);
   };
}());

{% endhighlight %}

&nbsp;

There are a number of ways to reduce this, one of them is known as 
[throttling](http://davidwalsh.name/javascript-debounce-function) where we create
a debounce function to reduce the number of times the callback function in the scroll
event is called.

But my preffered method for this is just simply using a setInterval to fire every
200ms, then we could compare the current scroll position with the previous to determine
if the user has scrolled.

The code below implements this, and you will see the scroll position is only logged
to the console if the user has scrolled, while being simultaneously throttled.
The reason I choose the setInterval method is because most mobile browsers,
especially those on iOS will ignore scroll events during the scroll animation.  This
circumvents that issue.

{% highlight javascript %}

(function(){
   var scrollOffset = $(window).scrollTop(),
      intervalDuration = 200;
   setInterval(hasScrolled, intervalDuration);
   function hasScrolled() {
      var newScrollOffset = $(window).scrollTop();
      if (newScrollOffset !== scrollOffset) {
         scrollOffset = newScrollOffset;
         console.log(scrollOffset);
      }
   };
}());

{% endhighlight %}

&nbsp;

Now we can combine this with the lazy load code function we wrote earlier.

{% highlight javascript %}

(function(){
   var scrollOffset = $(window).scrollTop(),
      intervalDuration = 200,
      winHeight = $(window).height(),
      windowBottomOffset = null;
   setInterval(hasScrolled, intervalDuration);
   function hasScrolled() {
      var newScrollOffset = $(window).scrollTop();
      if (newScrollOffset !== scrollOffset) {
         scrollOffset = newScrollOffset;
         lazyLoad();
      }
   };
   function lazyLoad() {
      windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var el = $(this);
            imgOffset = el.offset().top,
            lazySrc = el.data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            el.attr('src', lazySrc);       
         }
      });
   }
}());

{% endhighlight %}


So now the scroll is throttled , this in iself greatly improves the performance
but we are still making DOM querys.  Every time the `lazyLoad()` function is called
we have to calculate the images offset.  It would be more efficient to determine the
offset once and store that value.

##Determining the position of the images##
Initially this sounds very simple, we can just test the offsetTop of the images
and store the values in the array, but upon further investigation this presents
a problem.  When we scroll to an image and it loads in, it pushes the content below
further down the page, rendering the remaning offset values invalid.

With JavaScript we cannot determine an images size until it has been loaded.  However
we could use the server side to populate a set of data-attributes with the 
dimensions and use those to create a placeholder, meaning that once the image
loads in, it won't take up any more space on the document.

Responsive design makes this a little more complex because the images can scale
to their container with `max-width: 100%;` and `height:auto;` set.  

It is possible to make a HTML block element maintain it's aspect ratio when scaled using
the padding-bottom percentage hack.  This is how we will build our placeholder.

{% highlight html %}

<div class="lazy-load-wrap">
   <div class="lazy-load-wrap__inner">
      <img src="blank.gif"
         class="js-lazy-load"
         data-lazy-src="img/photo-1"
         width="400"
         height="300"
         alt="Stood overlooking the city of New York">
   </div>
</div>

<div class="lazy-load-wrap">
   <div class="lazy-load-wrap__inner">
      <img src="blank.gif"
         class="js-lazy-load"
         data-lazy-src="img/photo-2"
         width="400"
         height="300"
         alt="A view over the San Francisco Bay">
   </div>
</div>

{% endhighlight %}

&nbsp;

Lets create the necessary CSS for this to work.  We force the image to be
contrained to the wrapping element's proportions.  The padding-bottom and width
to be added to `.lazy-load-wrap` will be calculated in the JavaScript and applied
there via jQuery's `.css method.

{% highlight css %}

.lazy-load-wrap__inner {
    position: relative;
    background: #eee;
    
}

.lazy-load-wrap img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

{% endhighlight %}

&nbsp;

First loop through all the lazy-load images, get the width and height attributes
and use this to calculate the aspect ratio as a percentage which then gets applied
to the parent element in the padding-bottom property, then that element's parent
gets it's max-width attribute augmented witht the images width.  
This forces the block to behave like a responsive image of those dimensions.  

So we now have our placeholders.

{% highlight javascript %}

function generatePlaceholders() {
   $('.js-lazy-load').each(function() {
      var el = $(this),
         width = el.data('width'),
         height = el.data('height'),
         paddingBottom = (height/width) * 100;
      el.parent().css('padding-bottom', paddingBottom + '%')
         .parent().css('max-width', width + 'px');
   });
};

{% endhighlight %}

&nbsp;

the full code should now look like this:

{% highlight javascript %}

(function(){
   var scrollOffset = $(window).scrollTop(),
      intervalDuration = 200,
      winHeight = $(window).height(),
      windowBottomOffset = null;
      setInterval(hasScrolled, intervalDuration);
      
   //add new generate placeholders function
   function generatePlaceholders() {
      $('.js-lazy-load').each(function() {
         var el = $(this),
            width = el.data('width'),
            height = el.data('height'),
            paddingBottom = (height/width) * 100;
         el.parent().css('padding-bottom', paddingBottom + '%')
            .parent().css('max-width', width + 'px');
      });
   };
   generatePlaceholders();
   
   
   function lazyLoad() {
      windowBottomOffset = scrollOffset + winHeight;
      $('.js-lazy-load').each(function(){
         var el = $(this);
            imgOffset = el.offset().top,
            lazySrc = el.data('lazy-src');
         if (imgOffset < windowBottomOffset) {
            el.attr('src', lazySrc);       
         }
      });
   }

   function hasScrolled() {
      var newScrollOffset = $(window).scrollTop();
      if (newScrollOffset !== scrollOffset) {
         scrollOffset = newScrollOffset;
         lazyLoad();
      }
   };
}());

{% endhighlight %}

&nbsp;

##Precalculating the offsets##
One benefit I forgot to mention of the placeholder is that once the image loads
the page will not have to be repainted unlike before because the placeholder already
takes up that space so another +1 for the performance, but we're not there yet.

We're still calculating the image offset with every scroll.  Lets determine those
in a seperate function and store that data in an array that can be accessed 
when we scroll.

It's **Much** faster to loop through an array of values than it is to pull 
them from the DOM.

First we have to set an empty array that can be later accessed

{% highlight javascript %}

(function(){
   var scrollOffset = $(window).scrollTop(),
      intervalDuration = 200,
      winHeight = $(window).height(),
      windowBottomOffset = null,
      // add empty image array.
      images = [];
      
      ...
      ...

}());

{% endhighlight %}

&nbsp;

Next we should augment the `generatePlaceholders() function, while inside the
each loop we should also get the image `imgOffset` and `lazySrc` values,
then we can push the element reference, imgOffset and lazySrc as a single object 
to the images array which can be accessed later then the user scrolls.  

Maybe we should now rename this function to initialize seen as 
generatePlaceholders is no longer descriptitve of it's function.

{% highlight javascript %}

function initialize() {
   $('.js-lazy-load').each(function() {
      var el = $(this),
         width = el.data('width'),
         height = el.data('height'),
         paddingBottom = (height/width) * 100,
         imgOffset = el.offset().top,
         lazySrc = el.data('lazy-src');
      images.push({
         el: el,
         imgOffset: imgOffset,
         lazySrc: lazySrc
      });
      el.parent().css('padding-bottom', paddingBottom + '%')
         .parent().css('max-width', width + 'px');
   });
}
initialize();

{% endhighlight %}

&nbsp;

Now we can re-write the `lazyLoad()` function, instead of querying the DOM
for the images we loop through the images array and test the stored offset value
against the window scroll positon, if the element is within the viewport it loads
the image.

{% highlight javascript %}
function lazyLoad() {
   var item = null;
   windowBottomOffset = scrollOffset + winHeight;
   for (var i=0,l=images.length; i < l; i++) {
      item = images[i];
      if (item.imgOffset < windowBottomOffset) {
         item.el.attr('src', item.lazySrc);  
      }
   }
}
{% endhighlight %}

&nbsp;

This is now far more optimised than it was prevuously, but there's a little more
we can do.  After an image has been loaded there's no need to keep looping over
it's data in the array, so we should remove it from the array.

We can do that with the Array's splice method.

{% highlight javascript %}
function lazyLoad() {
   var item = null;
   windowBottomOffset = scrollOffset + winHeight;
   for (var i=0,l=images.length; i < l; i++) {
      item = images[i];
      if (item.imgOffset < windowBottomOffset) {
         item.el.attr('src', item.lazySrc);
         // remove from array
         images.splice(i, 1);
         /* recursively call the lazyLoad() fn until all images 
         for current scroll are loaded. */
         lazyLoad();  
      }
   }
}
{% endhighlight %}


##Putting it all together##

This is now pretty much about as optimised as it can get.  We could offer different
image sizes for smaller screens, but that is beyond the scope of this post.
I'm currenlty running this on projects that include parallax effect and everything
now typically runs at 60FPS or better.  My old lazy-loading script was the bottleneck
stopping me from acheiving that kind of frame rate.

Here is all the completed code:

{% highlight html %}

<div class="lazy-load-wrap">
   <div class="lazy-load-wrap__inner">
      <img src="blank.gif"
         class="js-lazy-load"
         data-lazy-src="img/photo-1"
         width="400"
         height="300"
         alt="Stood overlooking the city of New York">
   </div>
</div>

<div class="lazy-load-wrap">
   <div class="lazy-load-wrap__inner">
      <img src="blank.gif"
         class="js-lazy-load"
         data-lazy-src="img/photo-2"
         width="400"
         height="300"
         alt="A view over the San Francisco Bay">
   </div>
</div>

{% endhighlight %}

&nbsp;

{% highlight css %}

.lazy-load-wrap__inner {
    position: relative;
    background: #eee;
    
}

.lazy-load-wrap img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

{% endhighlight %}

&nbsp;

{% highlight javascript %}

(function(){
   var k = 0;
      var scrollOffset = $(window).scrollTop(),
      intervalDuration = 200,
      winHeight = $(window).height(),
      windowBottomOffset = null,
      images = [];
   
   setInterval(hasScrolled, intervalDuration);
   
   function initialize() {
      $('.js-lazy-load').each(function() {
         // loop through images and populate array with data
         var el = $(this),
            width = el.data('width'),
            height = el.data('height'),
            paddingBottom = (height/width) * 100,
            imgOffset = el.offset().top,
            lazySrc = el.data('lazy-src');
         images.push({
            el: el,
            imgOffset: imgOffset,
            lazySrc: lazySrc
         });
         // set placeholder dimensions
         el.parent().css('padding-bottom', paddingBottom + '%')
         .parent().css('max-width', width + 'px');
      });
   }
   initialize();


   function hasScrolled() {
      var newScrollOffset = $(window).scrollTop();
      if (newScrollOffset !== scrollOffset) {
         // user has scrolled
         scrollOffset = newScrollOffset;
         lazyLoad();
      }
   }


   function lazyLoad() {
      var item = null;
      windowBottomOffset = scrollOffset + winHeight;
      for (var i=0,l=images.length; i<l; i++) {
         item = images[i];
         if (item.imgOffset < windowBottomOffset) {
            item.el.attr('src', item.lazySrc);
            images.splice(i, 1);
            lazyLoad();
         }
      }
   }
}());

{% endhighlight %}

**N.B.** The module should, of course be placed within a DOM ready event.

##Demo##

&nbsp;

<p data-height="490" data-theme-id="10596" data-slug-hash="JoZXyx" data-default-tab="result" data-user="rbrtsmith" class='codepen'></p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
---
title: "Using Sass @if to reduce bloat"
meta: "Keep your compiled css free of redundant bloat using Sass @if"
layout: posts
pageClass: posts
category: CSS
---

A long running problem in <abbr title="Front-end Development">FED</abbr> is that the popular frameworks such as Bootstrap are laden with bloat.
Straight out of the box the Bootstrap CSS is a wopping 126kb before GZip.  And if we're building with performance in mind this goes completely against our principles.  
Why should users be forced into downloading all those bytes, many
of which are actually redundant?  It's unecessary and is a contributing to reason why I don't use a framework &mdash;
*product being a more accurate description* such as Bootstrap.  The primary reason I don't use Bootstrap it is that it 
makes far too many design decisions, but that's not the topic of this post.

&nbsp;

##The good parts
There are, however some good parts of Bootstrap &ndash; namely their grid system, which itself contains bloat,
however, at the same time it does have some very powerful functionality that allows developers to build complex layouts incredibly quickly.
If you see good parts of a framework, there's no reason why you can't use those parts in your own in-house framework.  My 
own framework largely consists of the good parts from other frameworks.  Many of them originate from 
[Inuit.css](https://github.com/inuitcss) Inuit has many incredibly useful objects and abstractions, I highly recommend
you check it out.

&nbsp;

##Reducing the redundancy
As I've already stated, redundancy is bad.  Even if we take only the grid from Bootstrap &ndash; [that in itself includes a
large amount of bloat](https://gist.github.com/rbrtsmith/56bc62247acf3ce48019#file-using-sass-if-to-reduce-bloat-grid-example), as previously mentioned.  With the use of Sass this bloat can be sensibly reduced, or even removed altogether.

An incredibly useful feature of Sass is @if which works in the same manner as if statements in programming languages, an if statement
simply tests against a condition and returns a boolean.  
`@if (condition) { // if result is true execute code here }`<br>
If the statement returns false then the code inside the parentheses won't be compiled.
Knowing this we can wrap each part of the grid inside @if's and have full control over what gets compiled.

###Using a list of variables acting as switches
It doesn't make much sense to have to scroll through the grid file to find the partial you wish to activate 
this is the reason why I don't just comment out the code I don't want compiled.
It makes best sense for speed and organisation to make a list of variables that can be used as on/off switches to
take advantage of the `@if` boolean behaviour.
This list of variables could look something like this:

**N.B. It makes sense to prefix switch variables to set them apart from the other variables used in your project**

{% gist 56bc62247acf3ce48019 using-sass-if-to-reduce-bloat--options-example %}

It's possible take this a step further and use a variable for quite literally every single grid segment or class, 
I'd say that depends on how important development time is vs absolute code efficiency.  In most of my projects I think that it's overkill and the small amount of options I listed above be suffice.

&nbsp;

##Helpers
In my projects I have a huge number of helper classes, things like push--left to give the component some margin-left,
I have push--left--screen-sm which applies the margin on screens smaller than my `$screen-sm` breakpoint.  I found
I was using over 30kb of helpers, so again using the method described above, I wrapped them all inside ´@if´ blocks
and labled their corresponding switch in the options file to match the classname, this alows me to rapidly turn it on
while writing my HTML using a few [Sublime](http://www.sublimetext.com/3) keyboard shortcuts.

&nbsp;

Using the techniques above I've massivley reduced the amount of bloat in my projects.  I recommend you experiment yourself
and reduce the amount of redundant code you are forcing your users to download.

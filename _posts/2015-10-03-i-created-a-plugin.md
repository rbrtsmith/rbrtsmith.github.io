---
title: "I created a plugin!"
meta: "Block slider, adapts directly to your CSS grid"
date: 2015-10-03
layout: posts
pageClass: posts
category: javascript
---

On a project I was recently working on I came across a problem, one that I've encountered on numerous occasions before.  
The problem was I had a client who wanted to display an unknown quantity of logos along a single row.  And it needed to stay on a single row at all screen sizes, we didn't want to have to scroll down past a big heap of logos to reach the content.

So I decided to build a slider for them, one that will adapt to the grid system I am using, which is a highly improved version of Twitter Bootsrap's.  So if I was running the following classnames on my items: `col-lg-2 col-md-3 col-sm-4 col-xs-6`.  
We would have the following number of items visible 6 on large screens, 4 on medium, 3 on small and 2 on extra small.  It will also allow you to write your own custom widths - so long as they are percentage based divide equally into 100.

I created a public API that allows for easy control over the classnames, interval and transition timing.  There are no user controls as this is for a very specific use case and there are many other sliders out there that do just that.  It's also a tiny 2k when minified.

I came across some Browser bugs &ndash; I'm looking at you.. Safari! that seems to render layout very slowly so had to fix the width calculations using timeouts aimed specifically at that browser in order to fix the issue.  
Although it means on Safari you have a 1.2s delay on the slider visually adjusting to the resize I think that it's acceptable as it should be a rare occurrence that you resize the screen.

##Demo
I created a demo page on CodePen to show the plugin in action [http://codepen.io/rbrtsmith/pen/ZbeXqa](http://codepen.io/rbrtsmith/pen/ZbeXqa)

##Repository
You can get the source files here [https://github.com/rbrtsmith/BlockSlider](https://github.com/rbrtsmith/BlockSlider)

Please feel to contribute, and log any issues you may have :)
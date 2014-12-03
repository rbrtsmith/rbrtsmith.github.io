---
title: "CSS Specificity Graph Generator"
meta: "I've built a CSS Specificity Graph Generator"
date: 2014-11-30
layout: posts
pageClass: posts
category: css
---

I recently attended the [Trondheim developer Conference](http://trondheimdc.no/) and
watched a talk titled __Managing CSS Projects with ITCSS__ by [Harry Roberts](https://twitter.com/csswizardry).
In his talk he mentioned a method of assessing a websites CSS codebase, specifically the selector specificities.
We all know the kinds of specificity issues that often occur on large CSS projects which can then be compunded even further when you add in multiple developers..

__TL;DR &mdash; Specificity wars.__

The ITCSS system has been developed to help teams to organise CSS into specificity order.  To get
a good overview of the health of a website's CSS specificity we can create what's known as a specificity
graph.  Harry mentioned in his talk that he had to manually do this, which involes going through all the 
selectors in a project and listing their specificities in order.  This is incredibly time consuming and 
seen as no tool existed to automate this I thought I'd build one in JavaScript.

[And here is what I came up with](http://codepen.io/rbrtsmith/full/oJHDl/)

The idea is for the graph to trend upwards, a graph with a lot of spikes is a clear sign of specificity
issues within your codebase, there will always be some anomolies so don't try to aim for a perfectly flat line
but, you should investigate all the spikes and troughs to see if they can be refactored.  The graph is a very
crude representation and as such does not contain any units, it's more of an illustration than anything.

Below the graph you will find a table with all your selectors along with their specificietes and whether or not
they contain any !importants within thier rulesets.  While important rulesets do not directly influence a selectors
specificity they can, and often do cause havoc when used inappropriately.  Which is why I list them within this table.

You can find more about the CSS Specificity Graph here [http://csswizardry.com/2014/10/the-specificity-graph/](http://csswizardry.com/2014/10/the-specificity-graph/).


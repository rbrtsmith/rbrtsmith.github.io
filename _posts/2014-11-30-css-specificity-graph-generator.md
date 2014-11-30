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
We all know the kinds of problems than ensue with large CSS projects and multiple developers..

__TL;DR__ &mdash; Specificity wars.

The ITCSS system has been developed to help teams to organise css into specificity order.  To get
a good overview of the health of a website's CSS specificity we can create what's known as a specificity
graph.  Harry mentioned in his talk that he had to manually do this, which for a large project could
be very time consuming.  No automated tool existed, so I took it upon myself to create one while I was
tinkering around in [Codepen](http://codepen.io)

[And here is what I came up with](http://codepen.io/rbrtsmith/full/oJHDl/)


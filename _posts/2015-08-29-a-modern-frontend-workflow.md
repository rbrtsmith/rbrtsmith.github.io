---
title: "A modern Frontend workflow"
meta: "See the tools I use as a part of my daily workflow as a Frontend Developer"
date: 2015-08-29
layout: posts
pageClass: posts
category: frontend
---

    
The workflow of a modern front-end developer has changed **vastly** in the past four or five years.  The days of using a cumbersome IDE such as Dreamweaver and
drag n drop solutions are (thankfully) long gone.  
We've got a vast array of tools that allow us to build well organized, 
scalable web applications by abstracting out many of the complexities and automating repetitive tasks.

In this post I shall give an overview of the tools that I currently use in my
front-end workflow.  

**N.B.** This is a **highly** opinionated overview of what works well for me, it's likely there are better ways of doing things, and I encourage you to share your thoughts in the comments below.
This is a continuous learning process for all of us.

&nbsp;

##Sass
Sass is a CSS preprocessor. A CSS preprocessor allows you to write your CSS in  
a more programmatic manner, it allows for things like variables, mixins,
functions, loops and other features you typically get from a programming
language.  One of it's best features is the ability to structure your code into separate files which can then be imported into a single file upon compilation.  The fact we can now have modularity, mixins and variables allows us to keep our code much dryer, more modular than was possible with plain CSS.  This leads to a reduction in bugs and CSS that can easily scale.

Your Sass code is compiled into CSS using a Ruby compiler (Although there's alternatives now such as Libsass written in C++) [Hugo Giraudel's blog](http://hugogiraudel.com/blog/) is a great place to see the full capabilities of Sass.

I also encourage you to read through the [Sass guidelines](http://sass-guidelin.es/).  It's important that we follow a style guide, especially if working as part of a team.

In my workflow I have my Sass compilation handled by my task runner (Gulp) which I shall talk about later in this post.

In addition to pre-processors we also have post-processors, which also form a critical part of the build process.  A post processor will process a CSS file and perform a particular task.  
I use [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) to handle all my vendor prefixes it's something that I no longer even have to think about.  I also use a CSS minifier as part of my post-processing.  I will talk more about how all this fits together when I talk about [Automated task runners](#task-runners)

&nbsp;

##Emmet
Emmet, originally called Zen coding is a plugin that will work on all modern IDEs / text editors that will vastly speed up your ability to write HTML and CSS/Sass.  In HTML the syntax sort of mimics that of CSS.  For example if I wanted to create an navigation list component I could write this:    
`nav.site-nav>ul.bare-list>li*4>a`  
and then hit tab. Which will produce:
{% highlight html %}
<nav class="site-nav">
    <ul class="bare-list">
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
    </ul>
</nav>
{% endhighlight %}

In CSS / Sass it works like with abbreviations so `posa` then hit tab will produce `position: absolute;`  `w200` will equal `width: 200px;` You can probably guess what `tac` does..  I learnt Emmet by printing out a cheatsheet and referring to it as I was coding.

The [Emmet documentation](http://docs.emmet.io/abbreviations/syntax/) is a good place to get started.

&nbsp;

##IDE's &amp; text editors
Honestly, in front-end development there is no real need for a weighty IDE environment.  A text editor will do just fine.  The most popular right now are Sublime Text 3, Vim, Emacs and Atom.  There are some IDE's that are used and are still very good - one of those is [webstorm](https://www.jetbrains.com/webstorm/).
I personally use [Sublime text 3](http://www.sublimetext.com/3), out of the box it's very simple but has an incredible ecosystem of plugins and is highly customizable.  With it's well thought out keyboard shortcuts and when combined with Emmet you can write and edit code **blazingly fast**

Here's some plugins that I use with Sublime text 3  

* [Seti UI](https://packagecontrol.io/packages/Seti_UI) - my theme
* Emmet
* Sass highlighter

And my [user preferences JSON file](https://github.com/rbrtsmith/Sublime-preferences/blob/master/preferences.json)

When I'm working in terminal - I use VIM, which is installed by default on every Mac & Unix based machine.  My skills with VIM are limited at best, but over time they'll improve.

Ultimately use the text editor / IDE that you feel most comfortable with, but don't be afraid to try alternatives once in a while!

&nbsp;

##Terminal
With a increasing array of tools being built specifically for the command line and the fact that it's much faster than clicking around with a mouse inside of a GUI making it an essential tool for any productive developer.
Like Emmet I learnt with a cheatsheet consisting a few basic commands like how to move around the filesystem create / remove files and directories and move them around.  Over time I've gradually improved my terminal knowledge, but I am probably still only just scratching the surface, which in most cases is sufficient as a front-end developer.

I use [Iterm2](https://www.iterm2.com/) as my terminal application, for windows you wanna get something that simulates the UNIX command line system - or ideally use something like Mac or Linux.  I had no end of issues trying to get things working on windows - many tools and applications aren't officially supported and as a result either don't work at all, or require workouts - which wastes time and is potentially unstable.

[A good introduction to the Unix terminal (Mac, Ubuntu)](http://computers.tutsplus.com/tutorials/40-terminal-tips-and-tricks-you-never-thought-you-needed--mac-51192)

&nbsp;

<h2 id="task-runners">Automated task runners</h2>
An automated task runner runs in the background watching for changes to files in specified directories, then executing predefined tasks as a part of your build process.  Gulp and Grunt are the two most popular at the time of writing.

They are both JavaScript based and run on-top of [Node.js](https://nodejs.org/).   Node JS based applications such as these are executed from the terminal.

I use [Gulp](http://gulpjs.com/) and it helps me automate tasks such as  

* [Sass compilation](https://www.npmjs.com/package/gulp-sass)
* [Sass linting](https://www.npmjs.com/package/gulp-scss-lint)
* [CSS autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [CSS minfication](https://www.npmjs.com/package/gulp-cssmin)
* [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [ES6 - ES5 transpilation (Babel)](https://www.npmjs.com/package/gulp-babel)
* [Eslint - linting for ES6](https://www.npmjs.com/package/gulp-eslint)
* [JS file concatenation](https://www.npmjs.com/package/gulp-concat)
* [JS minification](https://www.npmjs.com/package/gulp-uglify)
* [Image compression](https://www.npmjs.com/package/imagemin)
* [SVG sprite generation](https://www.npmjs.com/package/gulp-svgstore)
* [SVG minification](https://www.npmjs.com/package/gulp-svgmin)
* placing files in a common build destination.

As you can see that's a lot of tasks that are completely automated.

In order for all this to work you first have to find the packages you want and download them via NPM which stands for Node Package Manager.  A simple Google search will bring you to the page with required commands for downloading and implementing it into your gulpfile - for example [Gulp Sass](https://www.npmjs.com/package/gulp-sass).
The syntax in a Gulpfile is very similar to that of NodeJs, heavily based on functions that pipe from one to another.  
I find this to be much cleaner than Grunt's declaration based syntax.

I also recommend you read the official docs over on the Gulp JS website.  
You can also checkout my example [gulpfile](https://github.com/rbrtsmith/gulptest/blob/master/gulpfile.js).

&nbsp;

##JavaScript frameworks
One thing we're not short of in JavaScript is frameworks, there's almost a framework or library for everything.  
  
One thing I think is very, very important before you start using libraries and frameworks is learning the language first - in it's entirety.  If you don't understand Closure, this, prototypes and so on then they should be learnt first.  It's common to find developers who rely on a framework so much they'd be lost without it.  
Don't be that developer!

The most popular framework right now is Angular, although React, the new kid on the block is kicking up a stir and it's component based architecture using a virtual DOM is allowing for super fast rendering and is definitely worth checking out.

In my projects though I very rarely make use of these frameworks, my code is organized into different files and using the [module pattern](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) helps eep me from polluting the global namespace.
This choice isn't because I dislike frameworks, but because what I've being building hasn't been to such a scale that it would benefit from using one.  

Knowing when to use a framework is a useful skill, and understanding that a framework, like a library is a tool designed for a specific purpose there's no best one.

In terms of libraries I use [Lodash](https://lodash.com/) which comes loaded with useful utilities, although a quite a few of it's functions have been made obsolete with the introduction of ES6.

I also use jQuery for DOM manipulation.  There's a growing school of thought that you don't need jQuery.  Well it's true &ndash; you don't!  **But** The DOM API is absolutely the worst API ever conceived by man.

jQuery abstracts that nasty interface into something far more manageable.  There's also the bonus that it normalizes the browser differences and renders something like Ajax to be trivially easy.  jQuery also has fantastic [documentation](http://api.jquery.com/)  

It's important to note that you should not rely on jQuery for every single project, like Angular and React it is a tool.  If your app or website's JavaScript literally consists of a few click handlers there's no need to use it and you are wasting your users bandwidth.    
Those who like to avoid it even in applications with complex DOM manipulation, I feel a prematurely optimizing and that time could be more effectively spent elsewhere.  Like image optimization *hint hint* Of course there are going to be instances were every byte counts, but this isn't the norm.

&nbsp;

##Javascript module bundlers
These aren't something that I'm using in any live projects such as those in my place of work, but they are something that I've been experimenting with so thought I'd talk a little about them.

A module bundler allows us to write our JavaScript using one of various JavaScript module formats, one being Common JS which is used heavily in Node applications. Or more the more modern ES6 module.
Common JS / ES6 modules(At the time of writing) don't work in web browsers so a bundler compilers these modules into code that will work in the browser.

This allows use also use packages intended for Node in the browser and write universal (isomorphic) Javascript that can execute both in the browser and on the server.
There are two main bundlers and they are [Browserify](http://browserify.org/) and [webpack](http://webpack.github.io/)

I've been spending most of my time playing with webpack but I'm yet to fully get the hang of it, beyond the very basics at least.  I plan to write more about webpack as I improve my understanding of the tool.

[Here](http://survivejs.com/) is a book introducing Webpack - and also covers ReactJs

&nbsp;

##Test driven development
Firstly I'll admit to not having tested much of my code, it's only recently that I came across TDD libraries such as [Mocha](https://mochajs.org/) but I can see the importance of testing - Especially for a project that is making use of Scrum and continuous delivery.

TDD is something I'm actively working at to make a part of my workflow, the general thought process is that you write a test for a function before you actually write that function.  It will all fail because you have no code.  
Then to write the function and (hopefully) the test passes.  Writing testable code in itself is a challenge and a big reason that I am studying functional programming  - In true functional programming functions are very small and should have a single responsibility.  This makes them easy to test, reason about and are highly reusable.

[Here](http://build-podcast.com/mocha/) is a great podcast covering the basics of Mocha which is a JavaScript test library.

I plan to write a lot more about TDD in Javascript and the Front-end as I learn more.

&nbsp;

##Version control
Version control is a now critical part of a developers (and even designers) workflow.  Not only does it allow you to step back in history and see or revert to previous *commits* but it allows for large teams to effectively collaborate on a single codebase.  
Using a remote repository hosted somewhere like [Github](https://github.com/) will allow for remote collaboration and of course - code sharing across the globe.
I cannot stress enough the importance of learning Git if you are to be an effective developer, even if working alone.  CodeSchool have a great [free course](https://www.codeschool.com/courses/try-git) to help teach you the basics of Git, it's highly recommended.

&nbsp;

##Chrome developer tools
The major reason why I develop in Chrome is because of their excellent developer tools you can:  

* Debug and edit your CSS and JavaScript - even when minified using sourcemaps.
* log variables, values, objects etc to the console.
* View timelines such as the page render and asset loading to quickly find bottlenecks.
* throttle the network connection to simulate things like 3G.
* You can also record timelines in real time to see the framerate, locate and eliminate page jank.

This, like other areas in this post this is only really scratching the surface of the features that the Chome dev tools offer.  CodeSchool released an [in-depth course](https://www.codeschool.com/courses/discover-devtools) on the Chrome dev tools.  I recommend you take it.

&nbsp;

##Final words
As this post illustrates, there's a huge amount of useful tools available in the front-end and it can be extremely difficult to choose the right tools for you - and then learn how to use it properly.  
I hope this overview can help you improve your workflow.  My workflow is continually evolving and I have no doubt if I were to re-write this post in a years time it would be quite different.

Thanks for reading!

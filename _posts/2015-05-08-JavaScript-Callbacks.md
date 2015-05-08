---
title: "JavaScript: Callbacks"
meta: "Undestand higher order functions, otherwise known as callbacks"
date: 2015-05-08
layout: posts
pageClass: posts
category: javascript
---
Callbacks are a key feature of JavaScript, otherwise known as higher order functions, a callback is a function
that is passed to a function to be called at a later time.  This allows for us to build programs that execute
asynchronously, also known as non-blocking and is the primary reason that Node.js has gained is reputation for
being fast.

Most of us are familiar with the `setTimeout()` function.  `setTimeout()` accepts a callback function, take this
example below: 
{% highlight javascript %}

setTimeout(function() {
  console.log('foo');
});

console.log('bar');

{% endhighlight %}
    
Many would assume that the output would be:

{% highlight javascript %}

//...wait 1 second...
"foo"
"bar"

{% endhighlight %}

This is because the setTimeout function pauses execution for a second before executing the `console.log('foo');`
right?  **Wrong!**

What actually happens is the body of the `setTimeout()` is skipped and then the program continues to execute
so what actually happens in this example is:

{% highlight javascript %}
"bar"
//...wait 1 second...
"foo"
{% endhighlight %}

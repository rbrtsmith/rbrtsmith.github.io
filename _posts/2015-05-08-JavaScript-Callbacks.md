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

Here's another common function that is built into JavaScript as of ES5

##For Each

{% highlight javascript %}

var myArray = ["Foo", "Bar", "Baz"];

myArray.forEach(function(value, index, array) {
  console.log(index);
  console.log(value);
  console.log(array);
});

{% endhighlight %}

The 'forEach' function iterates over an array, executing a callback function on each item, as you can see from
the example above there are 3 parameters that we can access, the current value, the current index and the array itself.  This is demonstrated from the output of the above program:

{% highlight javascript %}
0
"Foo"
["Foo", "Bar", "Baz"]
1
"Bar"
["Foo", "Bar", "Baz"]
2
"Baz"
["Foo", "Bar", "Baz"]
{% endhighlight %}

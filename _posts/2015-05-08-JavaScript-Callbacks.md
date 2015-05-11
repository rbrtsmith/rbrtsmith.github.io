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

Most of us are familiar with the `setTimeout()` function.  `setTimeout()` accepts a callback function
as an argument, take this example below that passes an anomynous function (a callback) as an arguemnt to `setTimeout()`:
{% highlight javascript %}

setTimeout(function() {
  console.log('foo');
}, 1000);

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

What actually happens is the body of the `setTimeout()` is skipped and then the program continues to execute before jumping back to the `setTimeout()` body, executing that, then jumping back to where it previously left.  This is made possible by something known as the **call stack**
so what actually happens in this example is:

{% highlight javascript %}
"bar"
//...wait 1 second...
"foo"
{% endhighlight %}

Here's another common function that is built into JavaScript as of ES5


##ForEach

{% highlight javascript %}

var myArray = ["Foo", "Bar", "Baz"];

myArray.forEach(function(value, index, array) {
  console.log(index);
  console.log(value);
  console.log(array);
});

{% endhighlight %}

The `forEach` function iterates over an array, executing a callback function on each item, as you can see from
the example above there are 3 parameters that we can access: the current value, the current index and the array itself.  This is demonstrated from the output of the above program:

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


##Creating our own function that accepts a callback as an argument##

So what is actually happening inside the forEach function?  We can start by building our own,
we'll call it **myForEach**. 
First we must augment the JavaScript Array prototype with out new function.  for the callback to execute we must pass it as an argument to our newly created function:

<small>
**Note** &mdash; *Augmenting a native object's prototype is generally frowned upon because it's possible to override native methods.  I'm only doing it here to illustrate how forEach works*
</small>

{% highlight javascript %}
Array.prototype.myForEach = function(callback) {
};
{% endhighlight %}

Because we are calling the function as a method on the Array prototype the `this` value will always reference the array that it is called upon.  So we can loop over the array using the `this` value
{% highlight javascript %}
Array.prototype.myForEach = function(callback) {
  for (var index = 0; index < this.length; index++) {

  }
};
{% endhighlight %}

Then inside of our loop we can execute the passed callback.  in order to replicate the functionality of the
native `forEach()` we must pass in three arguments to the callback: the current value, the current index, and the
array itself:

{% highlight javascript %}
Array.prototype.myForEach = function(callback) {
  for (var index = 0; index < this.length; index++) {
    callback(this[index], index, this);
  }
};
{% endhighlight %}

That's the completed function, now we can use it, just like the native function:

{% highlight javascript %}
var myArray = ["Foo", "Bar", "Baz"];

myArray.myForEach(function(value, index, array) {
  console.log(index);
  console.log(value);
  console.log(array);
});

{% endhighlight %}

The output will be:
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


##Nesting callbacks##

Callbacks can be nested within one another, we can look to the `setTimeout()` function again to demonstrate.

{% highlight javascript %}
setTimeout(function() {
  console.log(1);
  setTimeout(function() {
    console.log(2);
    setTimeout(function() {
      console.log(3);
    }, 1000);
  }, 1000);
}, 1000);

console.log(0);
{% endhighlight %}

The output will be:
{% highlight javascript %}
0
//...wait 1 second...
1
//...wait another second..
2
//...wait another second..
3
{% endhighlight %}

As you can see when we start to nest callbacks inside one another the code can become difficult to read, and is
commonly referred to as callback hell.  I will talk about how to avoid callback hell in a later post, but for now
have some fun playing around with callbacks, they are a very powerful JavaScript feature!

---
title: "JavaScript patterns Closure"
meta: "See and understand one of JavaScript's most powerful mechanisms - Closure"
layout: posts
pageClass: posts
category: JavaScript
---

This is a continuation of the post 
[JavaScript patters the iife](http://rbrtsmith.com/2015/02/javascript-patterns-the-iife/)
Closure is one of the most important mechanisms in the JavaScript langauge, without
closure we would be unable to pass functions around as parameters in the manner that
we do.  Closure allows us to write JavaScript with huge expressive power and 
as a result the whole language opens up.

>"Closure is when a function can remember and access it's lexical scope, 
>even when the 
>function is executed outside of that lexical scope."
><br>&mdash; [Kyle Simpson](https://twitter.com/getify)

As we saw in the previous [article](http://rbrtsmith.com/2015/02/javascript-patterns-the-iife/) 
because of lexical scope a function defined within a function has access to the
wrapping functions scope.

{% highlight javascript %}

function foo() {
	var bar = "baz";

   function bam() {
      console.log(bar); // "baz"
   }

   bam();

}

foo();

{% endhighlight %}

The capability for the inner function to continue to reference the outer functions
scope even when it is executing outside of the wrapping function is what gives
us **closure.**

&nbsp;

##A very rudamentary example of closure##
Here instead of `bam()` being executeed inside of `foo()` it is returned.
We declare a variable named *closure* and assign the function `foo()` to that
variable and immediately execute it, resulting in the returned function `bam()` being
stored in the variable *closure*. 

On the final line we execute the `bam()` function stored in *closure* and
the value *baz* gets logged to the console. So even though `bam()` is being
executed from outside of the function `foo()` it still has access to it's scope.

**N.B.** it's not a copy of the scope it's an actual reference to the existing scope
and is not garbage collected unless that reference is removed.

{% highlight javascript %}
function foo() {
	var bar = "baz";

   function bam() {
      console.log(bar);
   }

   return bam;

}

var closure = foo(); 

closure(); // 'baz';
{% endhighlight %}

Closures can literally be found everywhere in JavaScript, jQuery usees closure
in event handlers like `click()`.

For languages with first class functions, the closure 
mechanism is essential for it to be useful.

*A first class function is a function that can be stored as a value, because
in Javascript all functions are objects that means they are first class*.


##Final words##
Without closure we would not be able to execute callback functions the way that
we do.  Callbacks are dependant on closure to have that lexical reference.
Closure is the reason why in JavaScript we pass functions around, without closure
this pattern would not be useful.

**N.B.** You can have any number of closures over the same scope, there is no limit.

The next post on this topic will be about callback functions, stay tuned!
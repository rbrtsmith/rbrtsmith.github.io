---
title: "Wrapping your head around the JavaScript 'this' keyword"
meta: "Understanding JavaScript's this binding mechanism"
date: 2015-08-15
layout: posts
pageClass: posts
category: javascript
---

One of the most crucial yet confusing aspects of JavaScript is the `this`
keyword. We often just resort to console logging out it's value to figure
out what the hell it is bound to.

Some will assume that the `this` keyword is bound to where the function is
declared, but it isn't.  The ´this´ keyword is bound at the call site of the 
function.  
*The call site being where you actually invoke the function*

{% highlight javascript %}
var baz = function baz() { // function declaration
    // function body 
};


baz(); // the call site of baz() 
{% endhighlight %}

&nbsp;


##The four rules of *this* ##
There are four rules, in order of precedence that can be used to determine 
what `this` gets bound to.

###Rule 1###
Function invocation (Default binding) - When you invoke a function declaration 
or a function expression the `this` keyword will be bound to the global object, which 
in the browser is the window object.

{% highlight javascript %}
var baz = function baz() {
    console.log(this); 
};

baz(); // window | global
{% endhighlight %}

**N.B.** this behavior has been seen by many as unwanted and has since been 
fixed in ES6 where `this` will instead get the value `undefined`

&nbsp;

###Rule 2###
Method invocation (Implicit binding) - When you invoke a method the `this` 
value will be bound to that object.  
&mdash; A method is a function that is a property of an object.

{% highlight javascript %}
var baz = {
    foo : function() {
        console.log(this); 
    }
};
baz.foo(); // baz{}
{% endhighlight %}

I will also note that it does not matter where `foo` is declared, the following 
will still yield the same results, even though `func` is declared outside of
the object.

{% highlight javascript %}
var func = function func() {
   console.log(this);
};

var baz = {
    foo : func
};
baz.foo(); // baz{}
{% endhighlight %}

&nbsp;

###Rule 3 ###
Explicit binding - We can explicitly set what the `this` keyword will be bound
to using one of the following: ´.call()´, ´.apply()´, ´.bind()´.  
First we look at *soft binding*

####Soft binding####
For this article the `.call()` and ´.apply()´ methods essentially handle `this` 
binding the same way, they differ in their handling of subsequent arguments, but 
we'll look at that in a future post.  
For this example we will just be using `.call()`

`.call()` will invoke the function that it is called upon, allowing us to pass
in an argument that `this` will be bound to

{% highlight javascript %}
var func = function func() {
   console.log(this);
};

var baz = {
    foo : 10
};

func.call(baz.foo); // 10
{% endhighlight %}

So as we can see here the `foo` property of the object `baz` was passed as the
`this` binding to `func` which consequently logged out the value 10.

With ´.call()´ we can also pass in additional arguments:

{% highlight javascript %}
var func = function func(num1, num2) {
   console.log(this + num1 + num2);
};

var baz = {
    foo : 10
};

func.call(baz.foo, 10, 20); // 40
{% endhighlight %}

####Hard binding####
Unfortunately under certain circumstances it's possible for an implicitly 
bound function to lose it's `this` binding and revert back to default binding,
this is especially common with callback functions.
A way around this is with hard binding.  `.bind()` which cannot be overridden 
in this manner.  ´.bind()´ unlike ´.call()´ does not invoke the function, 
instead it returns it, to be later invoked:

{% highlight javascript %}
var func = function func() {
   console.log(this);
};

var baz = {
    foo : 10
};

var boundFunc = func.bind(baz.foo);
boundFunc(); // 10
{% endhighlight %}

We can add further parameters like this:

{% highlight javascript %}
var func = function func(num1, num2) {
   console.log(this + num1 + num2);
};

var baz = {
    foo : 10
};

var boundFunc = func.bind(baz.foo);

boundFunc(5, 20); // 35
{% endhighlight %}

&nbsp;

###Rule 4###
Constructor invocation (New binding) - The fourth and final rule.  
When a function invocation is proceeded by the `new` keyword `this` will be 
bound to the newly created object.

{% highlight javascript %}
var Bird = function Bird() {
   this.wings = 2;
};

var seagull = new Bird();

console.log(seagull.wings); // 2
{% endhighlight %}

As we know from rule 1, if we were to invoke the constructor without the `new` 
keyword ´this´ would get bound to the global object &ndash; so in the browser
the window object would now have a wings property.. not very desirable.  
This is why by convention constructors should always have the initial character 
of their name capitalized so we know it's a constructor and will then check that 
it is invoked with the `new keyword`.
That said I would always recommend factories over constructors for creating 
objects, but that's for another post.

##Final words##
So now we know the four rules of `this` binding we can always determine what
`this` will be bound to by looking at the call site and determining which of 
the rules applies.  Like I put earlier, they are in order of precedence meaning 
that the first rule - default binding being the weakest and new being the 
strongest.

I hope this post helps clear up some of the confusions surrounding `this` in
JavaScript, please comment below if you have further questions or add me on 
Twitter [@robertwilliam_s](http://twitter.com/robertwilliam_s).
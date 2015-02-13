---
title: "JavaScript patterns The IIFE"
meta: "Create a new scrope context with the IIFE (Immediately Invoked Functiom Expression)"
layout: posts
pageClass: posts
category: JavaScript
---

The **Immediately Invoked Functiom Expression** or shorter **IIFE** is one of
the most widely used JavaScript patterns.  Here I'll explain why it is useful
and how you can use it in your projects.  The IIFE is an important construct
for modularising and organising your code into something that's far more robust.


##Scope in JavaScript##
The JavaScript language uses what is known as **lexical scope.**  Lexical scope means
that scopes are created at compile time and cannot be changed during run time.
Most of the languages you've ever coded in use lexical scope, the other is known
as dynamic scope used in languages like Lisp.  Dynamic scope doesn't concern us
as web developers so I'll swiftly move on.

Firstly a scope is an area in the program where variables and function definitions
are bound to.  Scope gives us ecapsulation, which means we can not access variables
that are outside of the current scope chain.

> The IIFE allows you to quickly and easily encapsulate your code
> and avoids you from polluting the global scope.

The lexical scoping mechanism used in JavaScript gives us what is known as
function scope.  Now this is one of the *many* confusions common to the language. 
Many programmers with a background in languages such as Java, C++ etc are used to
block scope.  Because syntatically JavaScript is quite similar to these languages
they assume JavaScript also has block scope.  **It doesn't.**

###Block scope
Block scope means that any variable declared inside curly braces `{}` is bound
to that block, and as such can only be accessed from within.  Once the
block has executed the remaining variable declarations inside are garbage 
collected.
So a variable that lives inside of a loop, say like a counter, cannot be accessed
from outside of the loop.  Remember **this is not the scoping mechanism found in
JavaScript.**


###Function scope
Function scope is what we find in JavaScript.  With this mechanism, as the name
suggests, variables and function definitions are bound to their parent function.
So if you need to create a new scope you will have to create a function.
If you try to access a variable outside of that functions scope it will return a
reference error.

{% highlight javascript %}

function foo() {
   var bar = "baz";
   console.log(bar) // "baz"
}

foo();

console.log(bar) // "Reference error, bar not defined"

{% endhighlight %}

Because JavaScript has lexical scope it means that it is possible to look up the 
scope tree.
This means that if you make a reference to a variable from within a scope that 
cannot be found the compiler will look up the tree too see if it is found in it's 
parent's scope.It will keep working it's way up the tree until it hits the **global 
scope** this is essentially the root of the scope tree. if it's not found here 
then a reference error is returned.  **It is not possible to look down the scope tree**

{% highlight javascript %}

var bar = "baz";

function foo() {

   function bam() {
      var thud = "qux";
      
      console.log(bar) // "baz"
      console.log(thud) // "qux"
   }
   bam();

   console.log(bar) // "baz"
   console.log(thud) // "Reference error, thud not defined"
}

foo();

console.log(bar) // "baz"

{% endhighlight %}

As you can see from this example you cannot access a functions scope from outside
of that function, this has the obvious benefit of keeping our variables private
to that function and thus avoid polluting the global scope, which should be
avoided at all coses.

**N.B.** Always use the `var` keyword to declare variables, if you omit this keyword
JavaScript won't throw an error, even worse it will bind the variable to the 
global scope.  Avoid this terrible behaviour by never omitting the var keyword.

##The IIFE##
So the name **Immediately Invoked Function Expression** tells us two things, that
its a function expression and not a function declaration.  The simple way to know
if a function is an expression or not is if the first thing you see in the declaration
is the keyword **function** then it is a function declaration. If anything else 
&mdash; any other character comes before the function keyword then it is a 
function expression.
The second thing we can determine from the name is that it is **Immediately invoked.**
In other words, it executes immedately and cannot be called at a later time.

Here is the basic construct for an IIFE
{% highlight javascript %}

(function() {
   var foo = "bar";

   console.log(foo) // "bar"
}());

console.log(foo) // "Reference error, foo not defined"

{% endhighlight %}

The whole function is wrapped in parenthesis which as we described earlier, the 
openening paren `(` before the **function** keyword makes this a function expression.
Because the function expression in this example does not have a name, it is known as an
**anomynous function expression** 
The function calls itself with the line `}());`

It is considered good practice to give a name to our functions (Even IIFEs)
for debugging purposes because then we have a reference to the function where
the error has occured.  If we take the above code and give the function a name
we get..

{% highlight javascript %}
(function baz() {
   var foo = "bar";

   console.log(foo) // "bar"
}());

console.log(foo) // "Reference error, foo not defined"

{% endhighlight %}

**N.B.**  the following is not a named function, even if the variable that it
is assigned to is named:
{% highlight javascript %}

var bar = function() {
   
};
bar();
{% endhighlight %}

To make a named function expression we would just simply name it. Remeber as I 
mentioned earlier &ndash; it's important to name our functions so we have a
function reference when we are debugging.
{% highlight javascript %}

var bar = function baz() {
   
};
bar();
{% endhighlight %}

##Final words##
So there we have it: The IIFE allows you to quickly and easily encapsulate your 
code and avoids you polluting the global scope.

In my next post I will be taking this a little further and talking about 
Closure, Closure being one of the best features of JavaScript.

Stay tuned!

---
title: "A word on premature optimization"
meta: "What is premature optimization, why does it cause problems and how is it best avoided?"
date: 2015-11-16
layout: posts
pageClass: posts
category: programming
---

Those of us who have done our fair share share of programming have studied and 
try to use best practices.  But one area of confusion and continual debate,
especially in the web is performance, or more specifically writing optimized 
code.

It's true that we want our applications to load as fast as possible and consume 
as few resources as possible.  However I strongly believe that this must be 
balanced with code readability and maintainability.  It's great having a super
efficient application but at what cost?  Are we adding complexity to our 
codebase to achieve this, and exactly how much has our newly optimized code really
affected the performance in real terms&mdash;that users actually notice?

There are some optimizations that should always take place, such as file
concatenation, image compression, Gzip and minification.

In this article I will be focusing more on code optimization as it's here where
we most often see premature optimization.

I am a big believer in building out abstractions for common patterns, many of
these have become a part of the JavaScript language.  Examples being the array
methods such as `.map()`, `.reduce()` and `.filter()` each of them abstract out
common task that we perform on arrays, such as reducing it down to a single
value.  
They are much preferred to manually coding out the loop and all of it's logic as
we're only really concerned with the function that is performed on each item.

Here's an example of a function that maps over each item of an array and doubles
it.  First using a for loop.  The function takes an array, creates a new array
and loops over the passed array and pushing each doubled value to the new array
which is then returned.

{% highlight javascript %}

const doubleAll = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i+=1) {
    newArr.push(arr[i] * 2);
  }
  return newArr;
}

doubleAll([1,2,3,4,5]); // [2,4,6,8,10]

{% endhighlight %}

Next up is the functional version that has exactly the same net result as the
much more verbose function above.

Here goes&hellip;

{% highlight javascript %}

const doubleAll = (arr) => 
  arr.map((val) => 
  val * 2);

doubleAll([1,2,3,4,5]); // [2,4,6,8,10]

{% endhighlight %}

That's it you ask me?  Yes.  The  higher order map function we see on the second 
line conveniently abstracts away the loop, so we don't even have to concern
ourselves with that, systematically **reducing the cyclomatic complexity** of
tje doubleAll function.  
All we see now is our primary concerns&mdash;the doubling of each array item.

**N.B.** those of you who are not yet familiar with ES2015 you can paste both of the 
above examples into the [Babel repl](http://babeljs.io/repl/) and see it's 
ES5 equivalent.

Another added benefit that each function call is added to the call stack
and thus can be traced.  This makes for much easier debugging - especially if we
name our functions.  The example above is using anonymous functions.
Finally we get composability.  The ability to compose and chain functions 
together is incredibly powerful.  Take this example where we compose a reduce
function that returns the total of the doubled items.  This way of writing
programs is not only elegant but it is self documenting and far easier for other
developers to reason about.

{% highlight javascript %}

const doubleAllTotal = (arr) => 
  arr.map((val) => 
  val * 2)
  .reduce((acc, val) => {
  acc + val}, 0);

doubleAllTotal([1,2,3,4,5]); // 30

{% endhighlight %}

However there's an argument against these abstractions.  The argument being that
the second example is considerably slower than the first.  The reason for this
is that function calls are more costly than loops.  
So for reasons of efficiency should we just forget the abstractions, despite 
their clear benefits in order to maximize the efficiency of our code?

Well just how much slower are high order functions? well on a modern machine 
we're talking microseconds, or perhaps even nanoseconds&hellip;
we'd have to be iterating over a HUGE amount of data to see any difference that
could be noticed by the user.  
When optimizing our codebase we have to look at and measure where the real 
bottlenecks are and optimize those first.  If our application is then passing
our performance budget tests then we've avoided the issue of premature 
optimization.  
In the very rare case that we've optimized everything else and
we're still not hitting that budget then we can look at abstracting only those
higher order functions that are causing a problem.  
Optimizing these abstractions back into loops is dangerous and likely has no 
real benefit to us or our users.

##Final words##

As with many things in programming it's a compromise. Readability, composability
vs performance.  We need to be smart about our decisions when it comes to 
finding the right balance.  A lot of time and money is wasted trying to work
with and reason about code that has been prematurely optimized.






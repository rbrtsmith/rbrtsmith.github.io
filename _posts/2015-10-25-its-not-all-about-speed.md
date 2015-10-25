---
title: "It's not all about speed"
meta: "Being able to close tickets really fast is not true indicator of a developer's ability"
date: 2015-10-25
layout: posts
pageClass: posts
category: javascript
---

This is a short post or even a slight rant about the issue of coding speed and
the perception that a 10 x developer who closes tickets super fast is somehow
better than those that take their time to do things right&mdash;properly testing,
documenting and reasoning about their work.

I was recently queried by a client (who shall remain anonymous) regarding the 
time I was estimating for various changes within a project I was working on.

I was told that my estimations were unreasonable and that a good developer could
in fact complete these kinds of changes in a fraction of the time.  I was told
the developer on their old website made changes live during a meeting as they
proposed ideas to him.

I think they are missing something vital here, and I am sure many developers
throughout their careers are pushed into closing tickets fast, as let's face it
time equals money.  
But there's something else that potentially costs even more money&hellip;

&nbsp;

##Technical debt
Technical debt is a result of poorly written code&mdash;without 
proper structure or documentation that just leaves other developers bewildered
as to what the function / component actually does and what the previous 
developer's thought process was.  It's also likely to contain bugs due to 
the likelihood of it not being properly tested in various browsers and 
environments.

This isn't always the developers fault.  Often developers are pressured into
meeting unrealistic deadlines and as a result take shortcuts.  But often the 
developers who choose work in this fashion are lauded by their employers, 
while the other developers are left to clean up the mess.

Badly written code is typically more difficult to
reason about and any further changes are likely to exacerbate the problem, and 
before you know it things have spiraled out of control.  Your project then
requires a large (and costly) refactor or in extreme cases a complete rebuild&ndash;
all while your project is potentially offline and losing money.  
It really pays dividends in the long term to have a well structured codebase
and to do things the right way from the outset.

I'm sure we can all fire up the Chrome Dev tools and make changes very, very
quickly.  But we would be unwise to actually put this code into production.  We
have to reason about it, see if there's a less bloated and more logical solution
Once that's done we need to test the changes, and then deploy them.
This isn't even taking into account the time taken to fire back up the 
environment of the other project we were previously working on and regain our 
thought context.

So while we *can make changes very fast.  Clients and employers
must realise that this doesn't mean we should.  
when we are putting code into production the process is far
more involved than that demonstration we just did of a feature.  What took
30 seconds will probably take more like 30 minutes, and maybe longer if you
take into account the time taken read the email and discuss the idea / 
alternatives.

So to you other developers&mdash;don't feel like you are coding too slowly
because one of your colleagues is closing tickets extremely fast, chances are
they are leaving technical debt behind.  This does not mean you should 
deliberately work slowly or take advantage of your clients / employers time
but you should not take shortcuts in the development process.

Don't be that 10 x developer!


---
title: "Getting acquainted with Browserify"
meta: "An introduction Browserify, a tool that bundles up Node-style modules for the browser."
date: 2015-09-12
layout: posts
pageClass: posts
category: javascript
---

This weekend I decided I'd take a deep dive and immerse myself in a tool called [Browserify](http://browserify.org/).  
Browserify allows you to bundle up Node-JS modules that can be executed in the browser environment.  This enables what is commonly referred to as **isomorphic JavaScript**, or more recently **universal JavaScript** &mdash; where the same code can execute in both the server and the browser.

&nbsp;

##Why is Browserify useful?
The lack of modularisation in JavaScript is something that has plagued developers for the past two decades.  Without a module system it becomes increasingly arduous to manage large applications, especially with JavaScript's dependency on the global scope.
Browserify allows us to use Node's module system, but within the browser environment.

Before we go any further into Browserify we need to do a little ground work to ensure we have a least a basic understanding of Node and NPM.

&nbsp;

##Node
[Node](https://nodejs.org/en/) is a server-side JavaScript environment that runs in Google Chrome's highly optimised V8 engine.
This post won't go into great detail about Node, but two important aspects of Node that can really help us with code organisation are [NPM](https://docs.npmjs.com/getting-started/what-is-npm) and Modules.

###NPM
NPM is a synonym for **Node Package Manager**, it is now the world's most popular programming ecosystem, allowing developers to publish and share code and manage project dependencies.
Assuming you have Node installed on your machine, you must initialise NPM in your project's root using the command:

{% highlight text %}
    npm init
{% endhighlight %}

You should then follow the instructions as you are prompted, giving your project a name, license, linking to a GIT repository and so forth.  
This process will generate a **package.json** file &ndash; you can think of it like a global settings file that NPM is able to reference.
As you install dependencies they will stored inside of a folder named **node_modules** Your dependencies will likely contain their own node_modules folder too, containing their dependencies.  Node will cleverly recurse down the tree and load in all of the required assets to run a module.  It's not something you ever have to worry about, and is one of NPM's best features.

You can install dependences and publish modules via the command line.
An example to install [Lodash](https://lodash.com/) as a dependency would be:

{% highlight text %}
    npm i --save lodash
{% endhighlight %}

The `i` is shorthand for install and the `--save` flag tells NPM to make a reference to this dependency in the package.json file.
If you open up your package.json file now it should read something like this:

{% highlight javascript %}
{
  "name": "myProject",
  "description": "myDescription",
  "version": "0.1.0",
  "author": "Robert Smith",
  "url": "http://rbrtsmith.com",
  "license": "ISC",
  "dependencies": {
    "lodash": "^3.10.1"
  }
}
{% endhighlight %}

Note that Lodash has now been added as a dependency - The numbers represent the version number using [semantic versioning](http://semver.org/).  You can explicitly choose which version of a package you want to install with the -v flag followed by the version number.

*So what is the reason we add our modules as project dependencies?*
The reason is to allow us to publish our projects to remote repositories which will allow for collaboration and sharing without polluting the environment with all of our dependencies.  
The package.json file can be read by NPM to download all of the required packages from NPM with the following command.

{% highlight javascript %}
    npm i
{% endhighlight %}

Pretty neat huh?
That's NPM in a nutshell.  We will come back to package.json a little later as it has a few more tricks up it's sleeve that happen to be especially useful for running tools like Browserify.

###Modules
Node ships with a module system known as *Common JS*
Common JS modules allow us to import both modules downloaded from NPM and our own locally created modules into our project.  We can import files via the require statement:

{% highlight javascript %}
//main.js
    var _ = require('lodash');
{% endhighlight %}

The lodash function will then be assigned to the underscore character.  **Note - the `_` character has no special meaning, it is a valid variable name just like `$` is.**
There's no need to specify a path for the module as Node instinctively knows to look inside the node_modules folder for the module.  
Our module is likely to have it's own require statements to pull in it's own dependencies from it's own node_modules folder.  
This who process completes recursively - it's not something you need to ever concern yourself with, such is the brilliance of NPM.

The require method is slightly different if we are to pull in our own local dependencies, say we had a function named multiply that we wanted to pull in we could do so with the following:

{% highlight javascript %}
//main.js
    var multiply = require('./multiply');
    console.log(multiply(5,10));
{% endhighlight %}

Where the dot represents the current directory.

In order to create a module we have to use the `exports` function.  We will do this with our multiply function:

{% highlight javascript %}
//multiply.js
    module.exports = function(a,b) {
        return a * b;
    };
{% endhighlight %}

Our file structure should look a little something like this:

{% highlight text %}
    /project
    |--main.js
    |--multiply.js
    |--package.json
    |--node_modules
        |--lodash
            |--array.js
            |--chain.js
            |--collection.js
            |....
{% endhighlight %}

Using Node we can execute our program:
{% highlight text %}
    node main.js // 50
{% endhighlight %}

The value of the value returned from our multiply function will get logged to the console.

However if we tried to run this directly in the browser we will get the following reference error: 
`Uncaught ReferenceError: require is not defined`
As mentioned earlier, the browser (At the time of writing) does not have a module system such as require.  This will gradually change as browsers implement ES6 modules.
In the meantime we can use a tool like Browserify to bundle up these modules into a file that can be executed in the browser.

&nbsp;


##Browserify
Let's install browserify into our project as a dependency using NPM

{% highlight text %}
    npm i --save browserify
{% endhighlight %}

and now our package.json will look something like this:

{% highlight javascript %}
{
  "name": "myProject",
  "description": "myDescription",
  "version": "0.1.0",
  "author": "Robert Smith",
  "url": "http://rbrtsmith.com",
  "license": "ISC",
  "dependencies": {
    "lodash": "^3.10.1",
    "browserify": "^11.1.0",
  }
}
{% endhighlight %}

Now Browserify is installed we can run it from our CLI and use it to bundle our modules into a file for the browser, we'll call it *bundle.js*

{% highlight text %}
    browserify main.js >  bundle.js
{% endhighlight %}

if you now open up bundle.js you will see the output file the Browserify has generated.  If you load this file into the browser:
{% highlight html %}
<script src="bundle.js"></script>
{% endhighlight %}

.. and open up the console you will see the result of calling the multiply function.
Let's import jquery to our project..
{% highlight text %}
    npm i --save jquery
{% endhighlight %}

Then we can require jQuery and use it to output our result to the DOM:

{% highlight javascript %}
var multiply = require('./multiply');
var $ = require('jquery');

$(document.body).html(multiply(10,5));
{% endhighlight %}

refresh your page and you will see 50 get logged to the browser.  Pretty neat.

By now I hope you're beginning to see the usefulness of Browserify and NPM, we can very quickly pull down any dependencies and serve them up, without having to really worry about scopes, namespacing or any of that.

Of course we can do much more with Browserify, we can use the ´-d´ flag to specify a sourcemap for debugging.

{% highlight text %}
    browserify main.js >  bundle.js -d
{% endhighlight %}

We can install plugins for Browserify such as [Watchify](https://github.com/substack/watchify) which watches for changes in required files, [Babelify](https://github.com/babel/babelify) which allows us to use ES6, transpiling it into ES5 compatible code before piping which it then pipes to Browserify.

They are the plugins that I've tried so far, and the command to run it all is getting a little verbose:
{% highlight text %}
    watchify main.js -t babelify -o bundle.js -d
{% endhighlight %}

Fortunately Node has another feature that can help us out here.

&nbsp;

##Scripts
In our package.json we can declare scripts or commands that can aliased to something a little more sensible.  For example I will show a package.json with the command highlighted in the previous section aliased to 'watch'.  We can also see the recently installed dependencies

{% highlight javascript %}
    {
      "name": "myProject",
      "description": "myDescription",
      "version": "0.1.0",
      "scripts": {
        "watch": "watchify main.js -t babelify -o bundle.js -d"
      },
      "author": "Robert Smith",
      "url": "http://rbrtsmith.com",
      "license": "ISC",
      "dependencies": {
        "babelify": "^6.3.0",
        "browserify": "^11.1.0",
        "jquery": "^2.1.4",
        "lodash": "^3.10.1",
        "watchify": "^3.4.0"
      }
    }
{% endhighlight %}

Now to execute the script/command we can use `npm run` plus the script name
{% highlight text %}
    npm run watch
{% endhighlight %}

You can add any number of scripts to your package.json, and they're not restricted to Browserify.  They can be used to execute any bash script / command but are typically used for Node related tasks that are commonly executed.

&nbsp;

##Final words
Although this post doesn't really give any examples of **universal JavaScript** you should be able to see how you could for example write some data validation that could execute in the client and the server.  
This is useful for two reasons:

1. There's no context switching between languages with JavaScript used on both ends.
2. Code reuse - universal JavaScript is DRYer and now there's only a single validation module to maintain, the benefits of that should be quite clear.

You can find the repository for the example used in this article [here](https://github.com/rbrtsmith/Browserify-test)

We're only really scratching the surface here of what is possible with Browserify, It can be combined with a task runner such as [Gulp](http://gulpjs.com/) so you can use Gulp to run Browserify along with other tasks such as Sass Compilation, Bundle minfication and many other things.  
I talk about Gulp in my previous post [A modern frontend workflow](http://rbrtsmith.com/2014/12/2015-08-29-a-modern-frontend-workflow)

Browserify also isn't the only module system, more recently [Webpack](https://webpack.github.io/) has been gaining traction within the community and is a viable alternative to Browserify.

I should also mention that in future posts I will be gradually introducing ES6 code into my examples.  Some may find it harder to follow, but ES6 is now an official standard that we all **must** learn at some point.  I believe that point is now.  I also don't like the idea of my posts going quickly out of date.  So from here on out &mdash; **It's time to embrace ES6**





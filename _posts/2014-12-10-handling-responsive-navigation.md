---
title: "Handling responsive navigation with dynamic content"
meta: "We look at a solution to fix the issue with fixed width navigation breakpoints"
layout: posts
pageClass: posts
category: JavaScript
---

It's very common with the popular frameworks such as [Bootstrap](http://getbootstrap.com/)
and [Foundation](http://foundation.zurb.com/) to have fixed width breakpoints,
in most cases this isn't a problem and we can easily change them through
the Sass or Less variables supplied.

The most profound problem lies within the navigation &mdash; you have to pick a fixed breakpoint, and anything
below this breakpoint will render the navigation in it's collapsed state.  

While this doesn't necessarily pose a problem for a site with static content, the same cannot be said
 for a dynamic site.  If you add more items to the navigation you will have to go and manually
update the breakpoint.  While this might not appear to be a major burden, imagine the scenario where
you have built a site for a client and they were to add in the additional item.  What if you had
many clients..


##A better solution
Clearly this is a very bad way to operate.  Your website is supposed to be responsive and dynamic right?
Why don't we just use our trusted old friend &mdash; JavaScript to calculate this breakpoint for us.
First we can wrap the navbar inside a wrapper.  Then calculate the width of the wrapper using
jQuery's ´outerWidth()´ method and then use the same method to get the width of the navigation.  The navigation
should have a width that collapses to fit it's contents, so it should either be floated or given a display
property of table (Inline block adds weird margins so we won't be using it).
If the two widths are equal then we can collapse the navigation.

**This is how we could create the navbar**
	
	<nav class="navbar" id="navbar">
	  <div class="navbar__toggle" id="navbar__toggle">
	    NAVIGATION
	  </div>
	  <ul class="navbar__nav" id="navbar__nav">
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li>
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li>
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li>
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li>
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li> 
	    <li>
	      <a href="#" class="navbar__item">Item</a>
	    </li>
	  </ul>
	</nav>

&nbsp;

	.navbar {
	  background: #bbb;
	  &__nav {
	    display: table;
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    &:after {
	      // clearfix
	      display: table;
	      clear: both;
	      content: " ";
	    }
	    > li {
	      float: left;
	    }
	  }
	  &__toggle {
	    display: none;
	  }
	  &__item {
	    display: block;
	    padding: 15px 25px;
	    color: white;
	    text-decoration: none;
	    &:hover {
	      background: darken(red, 10%);
	    }
	  }
	  &--collapsed {
	    .navbar__nav {
	      display: block;
	      height: 0;
	      overflow: hidden;
	      > li {
	        width: 100%;
	      }
	    }
	    .navbar__item {
	      width: 100%;
	      opacity: 0;
	      transition: opacity 0.3s linear;
	    }
	    .navbar__toggle {
	      display: block;
	      padding: 15px 0;
	      cursor: pointer;
	      text-align: center;
	      color: white;
	      border-bottom: 1px solid #999;
	    }
	  }
	  &--open {
	    .navbar__nav {
	      height: auto;
	    }
	    .navbar__item {
	      opacity: 1;
	    }
	  }
	}

&nbsp;

	(function($) {
	  // cache appropiate nodes.
	  var navbar = $('#navbar'),
	      navbar__toggle = navbar.find('#navbar__toggle'),
	      navbar__nav = navbar.find('#navbar__nav'),
	      navbarWidth,
	      navbar__navWidth;

	  function calculateBreakpoint() {
	  	// Momentarially removed collapsed state
	    navbar.removeClass('navbar--collapsed');
	    // get the width of the wrapper and the nav
	    navbarWidth = navbar.outerWidth();
	    navbar__navWidth = navbar__nav.outerWidth();
	    if (navbar__navWidth === navbarWidth) {
	      navbar.addClass('navbar--collapsed');
	    } else {
	      navbar.removeClass('navbar--collapsed');
	    }
	  }

	  function toggleNav(){
	    navbar.toggleClass('navbar--open');
	  }

	  $(window).on('resize', calculateBreakpoint);
	  navbar__toggle.on('click', toggleNav);
	  calculateBreakpoint();

	}(jQuery));




##Result

<p data-height="342" data-theme-id="10596" data-slug-hash="RNrBWb" data-default-tab="result" data-user="rbrtsmith" class='codepen'>See the Pen <a href='http://codepen.io/rbrtsmith/pen/RNrBWb/'>Auto collapse navbar</a> by Robert Smith (<a href='http://codepen.io/rbrtsmith'>@rbrtsmith</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>



   
    
    

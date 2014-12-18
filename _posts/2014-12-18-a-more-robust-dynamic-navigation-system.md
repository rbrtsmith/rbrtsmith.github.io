---
title: "A more robust dynamic navigation system"
meta: "How to handle dynamic, multi hierarchical navigation"
layout: drafts
pageClass: Posts
category: JavaScript
---

This post builds upon the article I wrote earlier
 [Handling responsive navigation with dynamic content](http://rbrtsmith.com/2014/12/handling-responsive-navigation/)
The solution there works just fine for a simple form of navigation, but what
if the navigation contains children or even grandchildren? What happens if there is
other content inline with the navbar such as an image or a search field. Quite clearly
it will break the script that dynamically generates the breakpoint, and then there's
the small matter that child navs are not accounted for.

##A more powerful solution
It's important that in the collapsed state that everything is accessible,
child pages, parent pages should be easy to navigate to.

To fix this there should be an area inside a parent that is specifically there for 
the purpose of toggling children.  On larger screens this can be hidden and the visibility
of the children can be toggled by a hover or focus event.
To start with on large screens the child elements can be positioned offscreen

    &__child {
        position: absolute;
        top: 100%;
        left: -99999px;
        white-space: nowrap;
        background: $navbarBackground;
    }

And then on hover it will get pulled back into view by setting the left value to zero.

    &__parent {
        position: relative;
        &:hover,
        &:focus {
            .navbar__child {
                left: 0;
            }
        }
    }

The toggle area is also positioned offscreen, we can use the same class for the main toggle and
the toggle of children.

    &__toggle {
        position: absolute;
        left: -999999px;
        top: 0;
        height: $navbarHeight;
        width: $navbarHeight;
    }

In the collapsed state it needs to be ensured that hover and focus events do not toggle the visibility of child events,
This will result in a confusing UI.  This can be achived by removing the offscreen positioining using `Position: static`
and hiding it this way:

        .navbar__nav,
        .navbar__child {
            position: static;
            overflow: hidden;
            height: 0;
        }

To bring it back into view with `height: auto` This will also push down the rest of the navigation underneath, this provides
a superior ux to absolute positioning which would have resulted in the child overlaying the rest of the navigation.


##Dealing with inline content
It's quite common to have content inline with a navigation.  It's quite simple to fix the issue of it's width not being accounted for,
We can just use JavaScript to calculate for the total width of the non-nav items and the navigation itself.  The result is then compared
to the width of the container to determine the breakpoint.  In this example, non-nav content is given the class of `.js-non-nav-content`

__N.B. Always prefix JavaScript class hooks with__ `js-`

    function calculateBreakpoint() {
        navbar.removeClass('navbar--collapsed'); // ensure nav isn't collapsed before grabbing width values.
        navbarWidth = navbar.outerWidth();
        navbar__navWidth = navbar__nav.outerWidth();
        function calculateNonNavItemsWidth() {
            var temp = 0;
            navbar.find('.js-non-nav-content').each(function() {
                temp += $(this).outerWidth();
            });
            return temp; // return total width of non-nav-content
        }
        nonNavWidth = calculateNonNavItemsWidth();
        if (navbar__navWidth >= navbarWidth - nonNavWidth) {
            navbar.addClass('navbar--collapsed');
        } else {
            navbar.removeClass('navbar--collapsed');
        }
    }


##Result
Here's the resulting navbar.  In this example I've added a very basic 'skin' to the navbar for visual purposes
and thrown in 3 small images of yours truly, each one being a seperate *non-nav-item* You can take this example
and extend it with any kind of visual styles that you like.  You can also check out a version I used in production
here: [http://bartenderbolaget.se/](http://bartenderbolaget.se/).

<p data-height="550" data-theme-id="10596" data-slug-hash="ZYWrxp" data-default-tab="result" data-user="rbrtsmith" class='codepen'>See the Pen <a href='http://codepen.io/rbrtsmith/pen/ZYWrxp/'>Auto collapse navbar part 2</a> by Robert Smith (<a href='http://codepen.io/rbrtsmith'>@rbrtsmith</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


##All the code

###HTML
    <div class="wrap">
      <nav class="navbar clearfix" id="navbar">
        <div class="navbar__non-nav-content js-non-nav-content">
         <img src="http://rbrtsmith.com/img/build/robert.jpg">
        </div>
        <div class="navbar__non-nav-content js-non-nav-content">
         <img src="http://rbrtsmith.com/img/build/robert.jpg">
        </div>
        <div class="navbar__non-nav-content js-non-nav-content">
         <img src="http://rbrtsmith.com/img/build/robert.jpg">
        </div>
        <div class="navbar__toggle js-navbar__toggle">
          Menu
        </div>
        <ul class="navbar__nav bare-list clearfix" id="navbar__nav">
          <li>
            <a href="#" class="navbar__item">Item 1</a>
          </li>
          <li class="navbar__parent">
            <div class="navbar__toggle js-navbar__toggle">
              S-Menu
            </div>
            <a href="#" class="navbar__item">Item parent</a>
            <ul class="navbar__child bare-list">
              <li>
                <a href="#" class="navbar__item">Child item 1</a>
              </li>
              <li>
                <a href="#" class="navbar__item">Child item 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="navbar__item">Item 2</a>
          </li>
          <li>
            <a href="#" class="navbar__item">Item 3</a>
          </li>
          <li>
            <a href="#" class="navbar__item">Item 4</a>
          </li> 
          <li>
            <a href="#" class="navbar__item">Item 5</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="wrap wrap--button">
      <button id="addItem">Add item to navbar</button>
      <button id="removeItem">Remove item from navbar</button>
    </div> 


###CSS

    /**************************\
       #RESET
    /**************************/
    * { box-sizing: border-box; }


    .clearfix:after {
      // clearfix
      display: table;
      clear: both;
      content: " ";
    }

    img {
      max-width: 100%;
      height: auto;
    }

    .wrap {
      // page wrapper
      max-width: 800px;
      margin: 0 auto;
      &--button {
        margin-top: 50px;
      }
    }

    .bare-list {
      // remove list styling
      margin: 0;
      padding: 0;
      list-style: none;
    }



    /**************************\
       #NAVBAR
    /**************************/
    $navbarHeight: 50px;
    $itemSpacing: 25px;
    $navbarBackground: #BBB;
    $itemHoverBackground: darken(red, 10%);
    $toggleBackground: #555;
    $textColor: #FFF;

    .navbar {
      position: relative;
      background: $navbarBackground;
      color: $textColor;
      &__non-nav-content {
        // height shouldn't be greater than navbar.
        float: left;
        width: 50px;
        height: $navbarHeight;
      }
      &__nav {
        float: right;
        > li {
          float: left;
        }
        li {
          &:hover > .navbar__item,
          &:focus > .navbar__item {
            background: $itemHoverBackground;
          }
        }
      }
      &__toggle {
        position: absolute;
        left: -999999px;
        top: 0;
        line-height: $navbarHeight;
        height: $navbarHeight;
        width: $navbarHeight;
        text-align: center;
        background: $toggleBackground;
        cursor: pointer;
        font-size: 10px;
      }
      &__item {
        display: block;
        padding: 0 $itemSpacing;
        line-height: $navbarHeight;
        text-decoration: none;
        color: inherit;
      }
      &__parent {
        position: relative;
        &:hover,
        &:focus {
          .navbar__child {
            left: 0;
          }
        }
      }
      &__child {
        position: absolute;
        top: 100%;
        left: -99999px;
        white-space: nowrap;
        background: $navbarBackground;
      }
      &--collapsed {
        .navbar__nav,
        li,
        .navbar__item {
          width: 100%;
        }
        .navbar__nav,
        .navbar__child {
          position: static;
          overflow: hidden;
          height: 0;
        }
        .navbar__toggle {
          left: auto;
          right: 0;
        }
      }
      &--open {
        .navbar__nav {
          height: auto;
        }
      }
      &__parent.navbar--open {
        background: $itemHoverBackground;
        > .navbar__child {
          height: auto;
          background: darken($navbarBackground, 10%);
        }
      }
    }


###JavaScript Incl. jQuery

    (function($) {
        // cache appropiate nodes.
        var navbar = $('#navbar'),
            navbar__toggle = navbar.find('.js-navbar__toggle'),
            navbar__nav = navbar.find('#navbar__nav'),
            navbarWidth,
            nonNavWidth,
            navbar__navWidth;
        
        function calculateBreakpoint() {
          navbar.removeClass('navbar--collapsed');
          navbarWidth = navbar.outerWidth();
          navbar__navWidth = navbar__nav.outerWidth();
          function calculateNonNavItemsWidth() {
            var temp = 0;
            navbar.find('.js-non-nav-content').each(function() {
              temp += $(this).outerWidth();
            });
            return temp;
          }
          nonNavWidth = calculateNonNavItemsWidth();
          if (navbar__navWidth >= navbarWidth - nonNavWidth) {
            navbar.addClass('navbar--collapsed');
          } else {
            navbar.removeClass('navbar--collapsed');
          }
        }
        
        function toggleNav(){
            $(this).parent().toggleClass('navbar--open');
        }
        
        function addItemToNav() {
          var item = '<li><a href="#" class="navbar__item">Item</a></li>';
          navbar__nav.append(item);
          calculateBreakpoint();
        }
        
        function removeItemFromNav() {
          var item = navbar__nav.children('li').last();
          item.remove();
          calculateBreakpoint();
        }
        
        $(window).on('resize', calculateBreakpoint);
        navbar__toggle.on('click', toggleNav);
        $('#addItem').on('click', addItemToNav);
        $('#removeItem').on('click', removeItemFromNav);
        
        calculateBreakpoint();
    }(jQuery));

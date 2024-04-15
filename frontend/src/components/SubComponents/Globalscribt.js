
import jQuery from 'jquery';

(function($) {
    "use strict";
  
      jQuery(document).ready(function(){
        
       
    
          var $window = $(window),
          $body = $('body');
  
          (function () {
              var $ltn__utilizeToggle = $('.ltn__utilize-toggle'),
                  $ltn__utilize = $('.ltn__utilize'),
                  $ltn__utilizeOverlay = $('.ltn__utilize-overlay'),
                  $mobileMenuToggle = $('.mobile-menu-toggle');
              $ltn__utilizeToggle.on('click', function (e) {
                  e.preventDefault();
                  var $this = $(this),
                      $target = $this.attr('href');
                  $body.addClass('ltn__utilize-open');
                  $($target).addClass('ltn__utilize-open');
                  $ltn__utilizeOverlay.fadeIn();
                  if ($this.parent().hasClass('mobile-menu-toggle')) {
                      $this.addClass('close');
                  }
              });
              $('.ltn__utilize-close, .ltn__utilize-overlay').on('click', function (e) {
                  e.preventDefault();
                  $body.removeClass('ltn__utilize-open');
                  $ltn__utilize.removeClass('ltn__utilize-open');
                  $ltn__utilizeOverlay.fadeOut();
                  $mobileMenuToggle.find('a').removeClass('close');
              });
          })();
  
          function mobileltn__utilizeMenu() {
            var $ltn__utilizeNav = $('.ltn__utilize-menu, .overlay-menu'),
                $ltn__utilizeNavSubMenu = $ltn__utilizeNav.find('.sub-menu');

            /*Add Toggle Button With Off Canvas Sub Menu*/
            $ltn__utilizeNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

            /*Category Sub Menu Toggle*/
            $ltn__utilizeNav.on('click', 'li a, .menu-expand', function (e) {
                var $this = $(this);
                if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
                    e.preventDefault();
                    if ($this.siblings('ul:visible').length) {
                        $this.parent('li').removeClass('active');
                        $this.siblings('ul').slideUp();
                        $this.parent('li').find('li').removeClass('active');
                        $this.parent('li').find('ul:visible').slideUp();
                    } else {
                        $this.parent('li').addClass('active');
                        $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                        $this.closest('li').siblings('li').find('ul:visible').slideUp();
                        $this.siblings('ul').slideDown();
                    }
                }
            });
        }
        mobileltn__utilizeMenu();
  
 
          
  
 
  
  
  
  
      });
  

  
 
  
  
    
  })(jQuery);

  
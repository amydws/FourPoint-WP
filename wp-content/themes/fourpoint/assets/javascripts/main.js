
$(document).ready(function() {

  // Home page slider init
  $('.hero-slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
  });

	// GTM for Home page carousel
	$('.hero-slider button').on('click', function(){ window.dataLayer.push(
		{event:'button click',headline:'home page carousel',label:'change slide'}
	); });

	// GTM for main nav
	$('.main_nav a').on('click', function(e){
		var buttonText = $(e.target).text();
		window.dataLayer.push(
			{event:'text link',headline:'header nav',label:buttonText}
		);
	});

  var win = $(window);

  // change slider images depending on screen sizes
  var windowWidth = win.width();

  var changeSliderImages = function(windowWidth) {
    var $slidesMobile = $('.the-slide-mobile');
    var $slideDesktop = $('.the-slide');

    $slidesMobile.each(function(index, el) {
      if(windowWidth <= 800) {
        $(el).css({
          'background-image': 'url(' + $(el).data('img-sm') + ')'
        });
      }
    });

    $slideDesktop.each(function(index, el) {
      if(windowWidth >= 801) {
        $(el).attr('src', $(el).data('img-lg'));
      }
    });

    setTimeout(function() {
      $('#page-loader').fadeOut(300).addClass('gone');
    }, 300);

  };

  changeSliderImages(windowWidth);

  // failsafe
  if($('#page-loader').hasClass('gone')) {
    setTimeout(function() {
      $('#page-loader').remove();
    }, 700);
  }

  //init fancybox
  $(".fancybox").fancybox({
      padding: 0,
      prevEffect: 'none',
      nextEffect: 'none',
      helpers: {
        title: {
          type: 'outside'
        },
        media: {},
        thumbs: {
          width: 80,
          height: 50
        }
      }
    });



  win.on('resize', function(windowWidth) {
    windowWidth = $(window).width();
    changeSliderImages(windowWidth);
  });

  // HOVER ANIMATION TRICKS

  var allMods = $("#flipper li");

  // allMods.each(function(i, el) {
  //   var el = $(el);
  //   if (el.visible(true)) {
  //     el.addClass("already-visible");
  //   }
  // });

  win.scroll(function(event) {

    allMods.each(function(i, el) {
      var el = $(el);
      if(Modernizr.touch) {
        el.addClass("come-in");
      } else {
        if (el.visible(true)) {
          el.addClass("come-in");
        }
      }
    });

  });

  //click handler for login modal close button
  $(".login-modal .close-modal").click(close_login_modal);

  function open_login_modal(evt) {
    if(evt) evt.preventDefault();
    modal_class = $(this).attr("rel");
    $(".login-modal."+modal_class).addClass("open");
  }

  function close_login_modal(evt) {
    if(evt) evt.preventDefault();
    $(".login-modal").removeClass("open");
  }

  $(".open-login").click(open_login_modal);

  // disable scrolling of google map embed on contact page, then re-enable on click
  $('.google-map iframe').addClass('scrolloff');

  $('.google-map').on('mousedown', function() {
    $(this).children('iframe').removeClass('scrolloff');
  });

  // Trigger Investors login modal
  // var loginModal = document.getElementById('login-modal');
  // document.getElementsByClassName('investors-link')[0].addEventListener('click', function() {
  //   loginModal.style.display = 'block';
  // });

  // // Close login modal
  // var closeBtn = document.querySelector('.close-modal');
  // closeBtn.addEventListener('click', function() {
  //   loginModal.style.display = 'none';
  // });

  $('#js-mobile-search-icon').on('click', function() {
    $('.secondary_search_wrap').slideToggle(250);
  });

  //nav js
  var menu = $('#main_nav');
  var menuToggle = $('#mobile_menu');
  var navWrap = $('nav');
  var moreLink = $('.menu-item-has-children');
  var subMenu = $('.sub-menu');
  var subMenuExpanded = $('.show_submenu');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      } else {
        menu.css('overflow', 'hidden');
      }
    });
  });

  $(window).on('resize', function() {
    if($(this).width() >= 1024) {
      menu.removeAttr('style');
    }
  });

  $(moreLink).on('click', function(evt) {
    var self = $(this).find(subMenu);
        currentOpen = navWrap.find(subMenuExpanded);

    // if nothing is open, open clicked, slide down nav
    if (!navWrap.hasClass('expand_down')) {
      self.toggleClass('show_submenu').prev().toggleClass('active');
      navWrap.toggleClass('expand_down');
    }

    // close the opened one if it's clicked while open
    else if (self.hasClass('show_submenu')) {
      self.toggleClass('show_submenu').prev().toggleClass('active');
      navWrap.toggleClass('expand_down');
    }

    // if one is open, then you click another one, close current and open new one.
    else if (navWrap.hasClass('expand_down') && $('.sub-menu').hasClass('show_submenu'))  {

      // close everything
      $('.sub-menu').removeClass('show_submenu').prev().removeClass('active');
      currentOpen.removeClass('show_submenu');
      self.removeClass('show_submenu');
      navWrap.removeClass('expand_down');

      // open everything
      currentOpen.addClass('show_submenu');
      self.addClass('show_submenu').prev().addClass('active');
      navWrap.addClass('expand_down');
    }
  });

  // underline under the active nav item
  $(".nav .nav-link").click(function() {
    $(".nav .nav-link").each(function() {
      $(this).removeClass("active-nav-item");
    });
    $(this).addClass("active-nav-item");
    $(".nav .more").removeClass("active-nav-item");
  });

  // GOOGLE ANALYTICS CLICK TRACKING
  /*
  $('.ga-link-track').on('click', function(event) {
    ga('send', 'event', {
      eventCategory: 'Outbound Link',
      eventAction: 'click',
      eventLabel: event.target.href,
      transport: 'beacon'
    });
  });
  */

  // Page transitions: http://git.blivesta.com/animsition/
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 350,
    outDuration: 350,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    // overlayClass : 'animsition-overlay-slide',
    // overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });


  // Do a Reverse IP Lookup for use inside gtm
  // $.get('https://extreme-ip-lookup.com/json',function(data) {
  //   window.busLookup = JSON.parse(data);
  // },'html');

});

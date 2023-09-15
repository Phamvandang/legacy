var common = {
  //hamburger menu
  hamburgerMenu: function() {
    $("body").removeClass("nav--open");
    $(".header__hamburger").click(function () {
      if ($("body").hasClass("nav--open")) {
        $("body").addClass("nav--close");
        $("body").removeClass("nav--open");
        $(".header__hamburger").removeClass("active");
        $(".header__nav--sp").fadeOut();
      } else {
        $("body").addClass("nav--open");
        $("body").removeClass("nav--close");
        $(".header__nav--sp").fadeIn();
        $(".header__hamburger").addClass("active");
      }
    });

    $(".header__nav--sp a").click(function () {
      $("body").removeClass("nav--open");
      $("body").addClass("nav--close");
      $(".header__hamburger").removeClass("active");
      $(".header__nav--sp").fadeOut();
      if ($("+div", this).css("display") == "none") {
        $("+div", this).hide();
      }
    });
  },
  //anchor link
  anchorLink: function() {
    $("body").on("click", "a[href*='#']:not([href='#']), a[xlink\\:href*='#']:not([xlink\\:href='#'])", function(e) {
      var parseURL = function(url) {
          var tag = document.createElement("a");
          tag.href = url;

          return tag;
        },
        parser = null;

      if ($(this).attr("href")) parser = parseURL($(this).attr("href"));
      else if ($(this).attr("xlink:href")) parser = parseURL($(this).attr("xlink:href"));


      if (parser && location.pathname.replace(/^\//, "") == parser.pathname.replace(/^\//, "") && location.hostname == parser.hostname && !$(this).hasClass("unsmooth")) {
        var _hash_ = this.hash || $(this).attr("href") || $(this).attr("xlink:href"),
          ptnHash = /([;?%&,+*~\':"!^$[\]()=>|\/@])/g,
          trimHash = _hash_.replace(ptnHash, "\\$1"),
          $anchor = $(trimHash);

        $anchor = $anchor.length > 0 ? $anchor : $("[name=" + trimHash.slice(1) +"]");

        if ($anchor.length) {
          e.preventDefault();
          var $offsetY = $anchor.offset().top,
                      $navOffset = $('.header').height();

          $("html, body").stop().animate({
            scrollTop: $offsetY - $navOffset
          }, 500);

          return false;
        }
      }
    });
  },
  //nav active
  navActive: function() {
    var nav = $('.header__nav .-main li a');
    $(window).on('scroll', function() {
      var winT = $(window).scrollTop();
      var targetTop = nav.position().top + 100;
      var elm = $('.section')
      
      elm.each(function() { 
        var idName = $(this).attr('id')
        var offT = $(this).position().top,
            eleH = $(this).outerHeight();
          if(winT > (offT - targetTop) && (winT + targetTop) < ( offT + eleH )){
            $('.header__nav .-main li a[href="#' + idName + '"]').addClass('active').parent().siblings().children().removeClass('active')
            return false; 
          }

          if((winT + targetTop) > ( offT + eleH ) || winT < (offT - targetTop) ){
            nav.removeClass('active')
          }
      })
    });
  },
  //validate form
  validateForm: function() {
    $("#contactForm").validate({
      rules: {
        firstname: {
          required: true,
        },
        lastname: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
        },
        content: {
          required: true,
        }
      },
      
      messages: {
        firstname: {
          required: "First Name is required.",
        },
        lastname: {
          required: "Last Name is required.",
        },
        email: {
          required: "Email is required.",
          email: "Incorrect email format.",
        },
        phone: {
          required: "Phone is required.",
        },
        content: {
          required: "Messages is required.",
        }
      },
      errorPlacement: function(error, element) {
        if(error) {
          $('.-error-message').append(error)
        }
      },
      submitHandler: function(form) {
        $(form).submit();
      }
    })
  },

  //init
  init: function() {
    this.hamburgerMenu();
    this.anchorLink();
    this.navActive();
    this.validateForm();
  }

};

common.init();

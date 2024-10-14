


$( document ).ready(function() {

  ////////////////////////////////////////
  // Highlight each step function
  ////////////////////////////////////////

  // Device screens
  var stickyDeviceStep1 = $("#sticky-device #screen-step1");
  var stickyDeviceStep2 = $("#sticky-device #screen-step2");
  var stickyDeviceStep3 = $("#sticky-device #screen-step3");
  var stickyDeviceHighlight1 = $("#sticky-device #screen-highlight1");
  var stickyDeviceHighlight2 = $("#sticky-device #screen-highlight2");
  var stickyDeviceHighlight3 = $("#sticky-device #screen-highlight3");

  ////////////////////////////////////////
  // Highlight each step function
  ////////////////////////////////////////
  function showStepsScreens(){
    //check device screen
    if($("#step1").hasClass("active")){
      $(stickyDeviceStep1).css("left", "0").siblings().css("left", "");
    }
    if($("#step2").hasClass("active")){
      $(stickyDeviceStep2).css("left", "0");
      $(stickyDeviceStep3).css("left", "");
    }
    if($("#step3").hasClass("active")){
      $(stickyDeviceStep3).css("left", "0");
    }
  }

  $("#homepage #steps .step").click(function() {
          $(this).addClass("active").siblings().removeClass("active");
          showStepsScreens();
      });

  var stepTimer;

  function carousel() {
    // get a list of *all* slides:
    var slides = $('#homepage #steps .step');
    // hide all but the first:
    slides.slice(1).removeClass("active");
    var current = 0;

  stepTimer =  setInterval(function() {
      // hide the current slide:
      slides.eq(current).removeClass("active");
      // increment the counter, wrapping around from end of the
      // list to the beginning as required:
      current = (current + 1) % slides.length;
      // show the next slide after a timeout:
      setTimeout(function () {
         // note that `current` was incremented already:
         slides.eq(current).addClass("active").siblings().removeClass("active");
         showStepsScreens();
      }, 10);

    }, 3000); // make the interval larger than the hide/show cycle
  }

  function screensOnSCroll(){

      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scroll > 0 * windowHeight) {
        $("#sticky-device .steps").removeClass("visible");
      }
      if (scroll > 0.7 * windowHeight) {
        $("#sticky-device .steps").addClass("visible");
        $("#sticky-device .highlights").removeClass("visible");
      }
      if (scroll > 1.7 * windowHeight) {
        $("#sticky-device .steps").removeClass("visible");
        $("#sticky-device .highlights").addClass("visible");
        $(stickyDeviceHighlight1).css("left", "0");
        $(stickyDeviceHighlight2).css("left", "");
      }
      if (scroll > 2.7 * windowHeight) {
        $(stickyDeviceHighlight2).css("left", "0");
        $(stickyDeviceHighlight3).css("left", "");
      }
      if (scroll > 3.7 * windowHeight) {
        $(stickyDeviceHighlight3).css("left", "0");
      }

  }

  $( window ).resize(function() {

    if ($(window).width() > 768) {

      screensOnSCroll();
      $(window).scroll(function() {
        screensOnSCroll();
      });


      carousel();
      $("#homepage #steps").hover(
        function() {
          clearInterval(stepTimer);
        }
        ,function() {
          carousel();
        }
      );

    } // Desktop only

  }); // Window resize



    ////////////////////////////////////////
    //  Slick slider (mobile)
    ////////////////////////////////////////

    //default slider Mobile
    $slick_slider = $('.slider.mobile');
    settings_slider = {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        variableWidth: true,
        infinite: true,
    }
    slick_on_mobile($slick_slider, settings_slider); //function in Design System jquery.js

    //default slider Tablet + Mobile
    $slick_slider = $('.slider.tablet');
    settings_slider = {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        variableWidth: true,
        infinite: false,
    }
    slick_on_tablet($slick_slider, settings_slider); //function in Design System jquery.js

    //steps slider
    $slick_slider_steps = $('.slider-steps.mobile');
    settings_slider_steps = {
      dots: true,
      arrows: false,
      slidesToShow: 1,
      asNavFor: '.slider-steps-screens',
    }
    slick_on_mobile($slick_slider_steps, settings_slider_steps);

    //steps screens slider
    $slick_slider_steps_screens = $('.slider-steps-screens.mobile');
    settings_slider_steps_screens = {
      slidesToShow: 1,
      arrows: false,
      asNavFor: '.slider-steps'
    }
    slick_on_mobile($slick_slider_steps_screens, settings_slider_steps_screens);

    //Lender Panel slider
    $slick_slider_lenders = $('.slider-lenders.mobile');
    settings_slider_lenders = {
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      variableWidth: true,
      infinite: true,
    }
    slick_on_mobile($slick_slider_lenders, settings_slider_lenders);




    ////////////////////////////////////////
    //  "Request a callback"
    ////////////////////////////////////////
    // "Request a callback" button
    $('body').on('click', '.btn-request-callback', function(e){
      $('.request-callback').fadeIn();
      return false;
    });

    // Submit "Request a callback"
    $('#callback-form').submit(function(e){
      var obj = {};
      $('#callback-form input').each(function(){
        obj[$(this).attr('name')] = $(this).val();
      });
      $.ajax({method: "get", url: "https://www.cloudflare.com/cdn-cgi/trace"}).done(function(r){  // get client's real IP address
        var ip = r.substr(r.indexOf("ip=")+("ip=").length,r.indexOf("ts=")-r.indexOf("ip=")-("ip=").length-("\n").length);
        $.ajax({method: "POST", url: "/request-callback", data: {contact_detail: obj, ip: ip}}).done(function(r){
            //alert(r.message);
          $('#callback-form').css("opacity", "0");
          $('#lightbox.request-callback .content').prepend("<p class='confirmation'>"+r.message+"</p>");
          setTimeout(function() {
            $('#lightbox.request-callback').fadeOut();
          }, 2000);
        });
      });
      e.preventDefault();
    });


    ////////////////////////////////////////
    //  Loan Purposes widget
    ////////////////////////////////////////

    $(window).scroll(function(){
      var $win = $(window);
      var winH = $win.height() * 0.5;   // Get the window height.
      if ($(window).scrollTop() > winH){
          $('#widget .loan_purposes').addClass('sticky');
      }else{
        $('#widget .loan_purposes').removeClass('sticky');
      }
    });

    $('#widget .loan_purposes .links a').click(function() {
      $('#widget .loan_purposes .cta').addClass("show");
      $(".links a.active").removeClass("active");
      $(this).addClass("active");

      if($('#widget .loan_purposes .links a[href="#link_equipment"]').hasClass("active")){
        $('#widget .loan_purposes .cta').attr("href", "https://application.lend.com.au/apply?product=Equipment");
      }else{
        $('#widget .loan_purposes .cta').attr("href", "https://application.lend.com.au/apply");
      }
    });
}); //Document.ready

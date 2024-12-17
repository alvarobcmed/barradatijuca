/*-----------------------------------------------------------------------------------

    Template Name: Promix 

    Note: This is Custom Js file

    01. stickyHeader
    02. accordion-item
    03. countNum
    04. loaded
    05. scrollTop
    06. mySwiper
    07. claintswiper
    08. map-pin
  
-----------------------------------------------------------------------------------*/

/* 01. stickyHeader */
$(document).ready(function () {
  var new_scroll_position = 0;
  var last_scroll_position;
  var header = document.getElementById("stickyHeader");
  window.addEventListener('scroll', function (e) {
    last_scroll_position = window.scrollY;
    if (new_scroll_position < last_scroll_position && last_scroll_position > 100) {
      header.classList.remove("slideDown");
      header.classList.add("slideUp");
    }
    else if (last_scroll_position < 100) {
      header.classList.remove("slideDown");
    }
    else if (new_scroll_position > last_scroll_position) {
      header.classList.remove("slideUp");
      header.classList.add("slideDown");
    }

    new_scroll_position = last_scroll_position;

  });
});
/* 02. accordion-item  */

$('.accordion-item .heading').on('click', function (e) {
  e.preventDefault();

  if ($(this).closest('.accordion-item').hasClass('active')) {
    $('.accordion-item').removeClass('active');
  } else {
    $('.accordion-item').removeClass('active');

    $(this).closest('.accordion-item').addClass('active');
  }
  var $content = $(this).next();
  $content.slideToggle(100);
  $('.accordion-item .content').not($content).slideUp('fast');
});

/* 03. countNum  */
function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
    animate(element);
}

function animate(element) {
  if (!element.hasClass('ms-animated')) {
    var maxval = element.data('max');
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html()
    }).animate({
      countNum: maxval
    }, {
      duration: 5000,
      easing: 'linear',
      step: function () {
        element.html(Math.floor(this.countNum) + html);
      },
      complete: function () {
        element.html(this.countNum + html);
      }
    });
  }

}

$(function () {
  $(window).scroll(function () {
    $("h2[data-max]").each(function () {
      inVisible($(this));
    });
  })
});

/* 04. loaded */
$(window).on('load', function () {
  $("body").addClass("page-loaded");
});

/* 05. scrollTop */
function scrollTopPercentage() {
  const scrollPercentage = () => {
    const scrollTopPos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
    const scrollElementWrap = $("#scroll-percentage");

    scrollElementWrap.css("background", `conic-gradient( #fff ${scrollValue}%, #000 ${scrollValue}%)`);

    // ScrollProgress
    if (scrollTopPos > 100) {
      scrollElementWrap.addClass("active");
    } else {
      scrollElementWrap.removeClass("active");
    }

    if (scrollValue < 99) {
      $("#scroll-percentage-value").text(`${scrollValue}%`);
    } else {
      $("#scroll-percentage-value").html('<i class="fa-solid fa-arrow-up-long"></i>');
    }
  }
  window.onscroll = scrollPercentage;
  window.onload = scrollPercentage;
  // Back to Top
  function scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  $("#scroll-percentage").on("click", scrollToTop);
}
scrollTopPercentage();

if (typeof Swiper !== 'undefined') {

  /* 06. mySwiper  */
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    freeMode: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      10: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  /* 07. claintswiper  */
  var swiper = new Swiper(".claintswiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    freeMode: true,
    autoplay: {
      delay: 2000,
    },
    grabCursor: true,
    effect: "creative",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
  });
}
/* 08. map-pin  */
if ($(".map-pin")[0]) {
  $('.map-pin').on('mouseover', function () {
    $('.map-pin').toggleClass('active');
    console.log("yes")
  });
}
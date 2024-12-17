import Swiper from 'swiper';
import 'swiper/css';

export function initializeScripts() {
  const $ = window.jQuery;
  if (!$) return;

  // Initialize sticky header
  $(document).ready(() => {
    let new_scroll_position = 0;
    let last_scroll_position;
    const header = document.getElementById("stickyHeader");

    window.addEventListener('scroll', function() {
      last_scroll_position = window.scrollY;

      if (new_scroll_position < last_scroll_position && last_scroll_position > 100) {
        header?.classList.remove("slideDown");
        header?.classList.add("slideUp");
      } 
      else if (last_scroll_position < 100) {
        header?.classList.remove("slideDown");
      }
      else if (new_scroll_position > last_scroll_position) {
        header?.classList.remove("slideUp");
        header?.classList.add("slideDown");
      }

      new_scroll_position = last_scroll_position;
    });
  });

  // Initialize accordion
  $('.accordion-item .heading').on('click', function(e) {
    e.preventDefault();

    const $this = $(this);
    const $parent = $this.closest('.accordion-item');

    if ($parent.hasClass('active')) {
      $('.accordion-item').removeClass('active');
    } else {
      $('.accordion-item').removeClass('active');
      $parent.addClass('active');
    }

    const $content = $this.next();
    $content.slideToggle(100);
    $('.accordion-item .content').not($content).slideUp('fast');
  });

  // Initialize Swiper
  if (typeof Swiper !== 'undefined') {
    new Swiper(".mySwiper", {
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

    new Swiper(".claintswiper", {
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

  // Initialize scroll percentage indicator
  const scrollPercentage = () => {
    const scrollTopPos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
    const scrollElementWrap = $("#scroll-percentage");

    scrollElementWrap.css("background", `conic-gradient( #fff ${scrollValue}%, #000 ${scrollValue}%)`);

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
  };

  window.onscroll = scrollPercentage;
  window.onload = scrollPercentage;

  $("#scroll-percentage").on("click", () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Initialize map pins
  if ($(".map-pin").length) {
    $('.map-pin').on('mouseover', function() {
      $('.map-pin').toggleClass('active');
    });
  }

  // Add page loaded class
  $(window).on('load', function() {
    $("body").addClass("page-loaded");
  });
}
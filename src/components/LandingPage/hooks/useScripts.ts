import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectCreative, Pagination, FreeMode } from 'swiper/modules';

export function useScripts() {
  const partnerSwiperRef = useRef<Swiper | null>(null);
  const testimonialSwiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    const $ = window.jQuery;
    if (!$) return;

    // Initialize sticky header
    let new_scroll_position = 0;
    let last_scroll_position;
    const header = document.getElementById("stickyHeader");

    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);

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

    // Initialize Swipers after a short delay to ensure DOM is ready
    setTimeout(() => {
      // Partner Swiper
      if (document.querySelector('.mySwiper')) {
        partnerSwiperRef.current = new Swiper(".mySwiper", {
          modules: [Autoplay, FreeMode],
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          freeMode: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
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
      }

      // Testimonial Swiper
      if (document.querySelector('.claintswiper')) {
        testimonialSwiperRef.current = new Swiper(".claintswiper", {
          modules: [Autoplay, EffectCreative, Pagination],
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
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
    }, 100);

    // Initialize map pins
    if ($(".map-pin").length) {
      $('.map-pin').on('mouseover', function() {
        $('.map-pin').toggleClass('active');
      });
    }

    // Add page loaded class
    const removePreloader = () => {
      $("body").addClass("page-loaded");
      $(".preloader").fadeOut(500);
    };

    // Remove preloader
    if (document.readyState === 'complete') {
      removePreloader();
    } else {
      window.addEventListener('load', removePreloader);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', removePreloader);
      
      // Cleanup Swiper instances
      if (partnerSwiperRef.current) {
        partnerSwiperRef.current.destroy(true, true);
        partnerSwiperRef.current = null;
      }
      if (testimonialSwiperRef.current) {
        testimonialSwiperRef.current.destroy(true, true);
        testimonialSwiperRef.current = null;
      }
    };
  }, []);
}
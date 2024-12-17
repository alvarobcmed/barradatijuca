import React, { useEffect } from 'react';

export function ScrollPercentage() {
  useEffect(() => {
    const $ = window.jQuery;
    if (!$) return;

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

    window.addEventListener('scroll', scrollPercentage);
    window.addEventListener('load', scrollPercentage);

    $("#scroll-percentage").on("click", () => {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    return () => {
      window.removeEventListener('scroll', scrollPercentage);
      window.removeEventListener('load', scrollPercentage);
    };
  }, []);

  return (
    <div id="scroll-percentage">
      <span id="scroll-percentage-value"></span>
    </div>
  );
}
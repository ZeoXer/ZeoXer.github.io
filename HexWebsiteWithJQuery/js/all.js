$(document).ready(function () {

  $('.product-drop').click(function (e) { 
    e.preventDefault();
    $(this).parent().siblings().find('.dropDown-open').slideUp();
    $(this).parent().siblings().find('a').removeClass('active');
    $('.product-drop').toggleClass('active');
    $('.product-drop-open').slideToggle();
  });

  $('.contact-drop').click(function (e) { 
    e.preventDefault();
    $(this).parent().siblings().find('.dropDown-open').slideUp();
    $(this).parent().siblings().find('a').removeClass('active');
    $('.contact-drop').toggleClass('active');
    $('.contact-drop-open').slideToggle();
  });

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    effect: 'slide',
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $('.top > a').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  });
});
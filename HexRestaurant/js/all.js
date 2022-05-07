$(document).ready(function () {
    
    $('.mobile-links-open').click(function (e) { 
        e.preventDefault();
        $('body').addClass('open');
    });

    $('.mobile-links-close').click(function (e) { 
        e.preventDefault();
        $('body').removeClass('open');
    });

    $('.love-it').click(function (e) { 
        e.preventDefault();
        $(this).find('.fa-heart').toggleClass('far');
        $(this).find('.fa-heart').toggleClass('fas');
        $(this).find('.fa-heart').toggleClass('animate__pulse');
        $('.animate__pulse').css('animation-duration', '0.6s');
    });

    $('.category-list > li').click(function (e) { 
        e.preventDefault();
    });

    $('.shopping-cart').click(function (e) { 
        e.preventDefault();
    });

    $('.add-to-cart').click(function (e) { 
        e.preventDefault();
    });

});
$(document).ready(function () {
    
    $('.mobile-links-open').click(function (e) { 
        e.preventDefault();
        $('body').addClass('open');
    });

    $('.mobile-links-close').click(function (e) { 
        e.preventDefault();
        $('body').removeClass('open');
    });

});
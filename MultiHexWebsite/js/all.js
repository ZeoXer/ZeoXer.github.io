$(document).ready(function () {
    $('.Q-part').click(function (e) {
        $(this).parent().siblings().find('.A-part').slideUp();
        $(this).parent().find('.A-part').slideToggle();
        // $(this).parent().siblings().find('.Q-part i').removeClass('fa-arrow-down');
        // $(this).find('i').toggleClass('fa-arrow-right');
        // $(this).find('i').toggleClass('fa-arrow-down');
    });
});
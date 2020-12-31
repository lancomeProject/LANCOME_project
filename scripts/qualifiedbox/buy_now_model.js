(function () {
    // swiper初始化
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true
    });

    // 点击 X 隐藏轮播
    $('.close_swiper').click(() => {
        $('.swiper-container').css({ display: 'none' });
        $('.close_swiper').css({ display: 'none' });
    });

})()
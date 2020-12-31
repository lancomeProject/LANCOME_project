(function () {
    // swiper初始化
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true
    });

    // 点击 X 隐藏轮播
    $('.close_swiper').click(() => {
        $('.swiper-container').css({
            display: 'none'
        });
        $('.close_swiper').css({
            display: 'none'
        });
    });


    $(".tab_lists button").on("click", function () {
        // 点击button按钮时所在的索引位置
        let index = $(this).index();
        // 获取商品数量
        let $goods_num = $(this).siblings("input").val();
        // 商品单价
        let unitPrice = $(this).parent().parent().prev().html();
        // 商品单价处理 ￥ 435 只取数字
        let unitPriceNum = parseFloat(unitPrice.slice(2, unitPrice.length));
        // 0为减号  2为加号
        if (index == 0) {
            $goods_num--;
            // 至少买1件
            $(this).siblings("input").val($goods_num < 1 ? 1 : $goods_num);
        } else {
            $goods_num++;
            // 最多买8件
            $(this).siblings("input").val($goods_num > 8 ? 8 : $goods_num);
        }
        // 给 商品小计 赋值
        if ($goods_num > 0 && $goods_num < 9) {
            $(this).parent().parent().next().html($goods_num * unitPriceNum);
        }
        statisticNum();
    });

    // 商品数量总计
    let statisticNum = () => {
        let num = 0;
        $("input[name='goods_num']").each(function () {
            num += parseFloat($(this).val());
        });
        $(".total_num span").html(num);
    }
    statisticNum();

})()
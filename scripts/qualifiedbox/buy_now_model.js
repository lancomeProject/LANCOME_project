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

    // 全选
    $("input[name='select_all']").on("click", function () {
        if ($(this).prop("checked")) {
            $("input[name='single_select']").prop({
                checked: true
            });
            $(".tips").css({
                "display": "block"
            });
        } else {
            $("input[name='single_select']").prop({
                checked: false
            });
            $(".tips").css({
                "display": "none"
            });
        }
        statisticNum();
    });

    // 单选
    $("input[name='single_select']").on("click", function () {
        statisticNum();
        if (!$(this).prop("checked")) {
            $(".tips").css({
                "display": "none"
            });
        } else {
            $(".tips").css({
                "display": "block"
            });
        }
    });

    // 点击加减按钮进行商品加减
    $(".tab_lists button").on("click", function () {
        // 点击button按钮时所在的索引位置
        let index = $(this).index();
        // 获取商品数量
        let $goods_num = $(this).siblings("input").val();
        // 商品单价
        let $unitPrice = $(this).parent().parent().prev().html();
        // 商品单价处理 ￥ 435 只取数字
        let unitPriceNum = parseFloat($unitPrice.slice(2, $unitPrice.length));
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

    // 只有商品被选中的时候，商品数量开始总计
    let statisticNum = () => {
        let goods_num = 0;
        let goods_price = 0;
        $("input[name='single_select']").each(function () {
            if ($(this).prop("checked")) {
                let $goods_num = $(this).parent("td").siblings().eq(3).children().find("input").val();
                goods_num += parseFloat($goods_num);

                let $goods_price = $(this).parent("td").siblings().eq(4).html();
                let goodsPriceNum = parseFloat($goods_price.slice(2, $goods_price.length));
                goods_price += goodsPriceNum;
            }
        });

        $(".total_num span").html(goods_num);
        $(".order_price_goods_price").html("￥ " + goods_price);
        $(".total_price_goods_price").html("￥ " + goods_price);
    }
    statisticNum();


})()
(function () {
    // swiper初始化
    var swiper = new Swiper('.text_banner', {
        loop: true,
        autoplay: true
    });

    // 点击 X 隐藏轮播
    $('.close_swiper').click(() => {
        $('.text_banner').css({
            display: 'none'
        });
        $('.close_swiper').css({
            display: 'none'
        });
    });


    var swiper = new Swiper('.number_banner', {
        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 4,
        // 在slide之间设置距离（单位px）
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiper = new Swiper('.give_banner', {
        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 4,
        // 在slide之间设置距离（单位px）
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiper = new Swiper('.courtesy_banner', {
        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 4,
        // 在slide之间设置距离（单位px）
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
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


    $('#navList li').click(function () {
        // this // 也是原生的元素
        let index = $(this).index(); // 获取当前元素对应的索引  0
        $(this).addClass('active').siblings().removeClass('active').parent().siblings().eq($(this).index()).addClass('active').siblings('div').removeClass('active')
        //  // 把当前点击的li元素加上active类名，然后在获取当前点击的元素的所有的兄弟姐妹元素，给其他清空active类名
    })

})()
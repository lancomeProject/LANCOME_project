(function () {


    let loadData = () => {
        $.ajax({
            url: "../../data/qualifiedbox/goods_cart_data.json",
            type: "get",
            async: true,
            success: (data) => {
                // table表格，选购的商品信息
                goodsInfo(data[0].goods_info);
                // 头部文字导航栏轮播
                textBanner(data[0].text_banner);
                // 忠粉会员
                numberBanner(data[0].number_banner);
                // 限时赠礼
                giveBanner(data[0].give_banner);
                // 满额礼遇
                courtesyBanner(data[0].courtesy_banner);
                // 兰蔻官方网站放心购
                serviceCont(data[0].service_cont);
            }
        });
    }
    loadData();

    // table表格，选购的商品信息
    let goodsInfo = (data) => {
        let goodsStrHTML = "";
        $.each(data, (index, item) => {
            goodsStrHTML += `<tr class="tab_lists">
                                <td><input type="checkbox" name="single_select"></td>
                                <td><img src="${item.img}" alt=""></td>
                                <td>
                                    <div>
                                        <p>${item.info}</p>
                                        <select name="" id="">
                                            <option value="">${item.options1}</option>
                                            <option value="">${item.options2}</option>
                                        </select>
                                    </div>
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <div>
                                        <button class="sub_num">-</button>
                                        <input type="text" name="goods_num" readonly value="1">
                                        <!-- 最多只能买 8 个 -->
                                        <button class="add_num">+</button>
                                    </div>
                                </td>
                                <td>${item.subtotal}</td>
                            </tr>`;
        });
        $(".tab_header").after(goodsStrHTML);

        // 调用商品统计方法统计方法
        myChecked();
    }

    // 头部文字导航栏轮播
    let textBanner = (data) => {
        let textStrHTML = "";
        $.each(data, (index, item) => {
            textStrHTML += `<div class="swiper-slide">${item.title}</div>`;
        });
        $(".text_banner div").html(textStrHTML);
        loadSwiper();
    }

    // 忠粉会员
    let numberBanner = (data) => {
        let numberStrHTML = "";
        $.each(data, (index, item) => {
            numberStrHTML += `<div class="swiper-slide">
                                <a href="">
                                    <img src="${item.img}" alt="">
                                </a>
                                <div>${item.info}</div>
                                <p>${item.integral}</p>
                            </div>`;
        });
        $(".number_banner div").html(numberStrHTML);
        loadSwiper();
    }

    // 限时赠礼
    let giveBanner = (data) => {
        let giveStrHTML = "";
        $.each(data, (index, item) => {
            giveStrHTML += `<div class="swiper-slide">
                                <a href="">
                                    <img src="${item.img}" alt="">
                                </a>
                            </div>`;
        });
        $(".give_banner div").html(giveStrHTML);
        loadSwiper();
    }

    // 满额礼遇
    let courtesyBanner = (data) => {
        let courtesyStrHTML = "";
        $.each(data, (index, item) => {
            courtesyStrHTML += `<div class="swiper-slide">
                                    <p>${item.info}</p>
                                    <a href="">
                                        <img src="${item.img}" alt="">
                                    </a>
                                </div>`;
        });
        $(".courtesy_banner div").html(courtesyStrHTML);
        loadSwiper();
    }

    // swiper插件
    let loadSwiper = () => {
        // 头部文字导航栏轮播
        var swiper = new Swiper('.text_banner', {
            loop: true,
            autoplay: true
        });
        // 忠粉会员
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
    }

    // 点击 X 隐藏轮播
    $('.close_swiper').click(() => {
        $('.text_banner').css({
            display: 'none'
        });
        $('.close_swiper').css({
            display: 'none'
        });
    });

    let myChecked = () => {
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
            // if (!$(this).prop("checked")) {
            //     $(".tips").css({
            //         "display": "none"
            //     });
            // } else {
            //     $(".tips").css({
            //         "display": "block"
            //     });
            // }
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
                $(this).parent().parent().next().html("￥ " + $goods_num * unitPriceNum);
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

            // if (goods_price === 0) {
            //     $('.immediately_go a:first-child').css({
            //         "pointer-events": "none"
            //     });
            //     $('.order_cart_all a').css({
            //         "pointer-events": "none"
            //     });
            // } else {
            //     $('.immediately_go a:first-child').css({
            //         "pointer-events": "auto"
            //     });
            //     $('.order_cart_all a').css({
            //         "pointer-events": "auto"
            //     });
            // }

            $(".total_num span").html(goods_num);
            $(".order_price_goods_price").html("￥ " + goods_price);
            $(".total_price_goods_price").html("￥ " + goods_price);
            $(".goods_cart_total").html("￥ " + goods_price);
            $(".goods_cart_actual_total").html("￥ " + goods_price);
        }
        statisticNum();
    }

    // 兰蔻官方网站放心购
    let serviceCont = (data) => {
        let serviceStrHTML = "";
        $.each(data, (index, item) => {
            serviceStrHTML += `<div class="service_time">
                                    <div class="info_box">
                                        <img src="${item.img}" alt="">
                                    </div>
                                    <div class="info_box">
                                        <p>${item.title}</p>
                                        <p>${item.info}</p>
                                    </div>
                                </div>`;
        });
        $(".service_cont").html(serviceStrHTML);
    }


    $('#navList li').click(function () {
        // let index = $(this).index(); // 获取当前元素对应的索引  0
        $(this).addClass('active').siblings().removeClass('active').parent().siblings().eq($(this).index()).addClass('active').siblings('div').removeClass('active');
        //  // 把当前点击的li元素加上active类名，然后在获取当前点击的元素的所有的兄弟姐妹元素，给其他清空active类名
    })


})()
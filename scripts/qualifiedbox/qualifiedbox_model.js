(function () {

    $.ajax({
        url: "../../data/qualifiedbox/dataCopy.json",
        async: true,
        type: "get",
        success: (data) => {
            // 绑定数据，渲染页面
            bindHTML(data);
        }
    });

    // 绑定数据，渲染页面
    let bindHTML = (data) => {
        $(".top_info_goods_num").html(data.length);
        let strHTML = "";
        $.each(data, (index, item) => {
            //                  上市时间           人气                 价格            销售
            strHTML += `<li time="${item.time}" hot="${item.hot}" price_height="${item.price}" 
                                price_low="${item.price}" sales_num="${item.sales_num}">
                            <img src="${item.img}" alt="">
                            <p>${item.title}</p>
                            <p>${item.href}</p>
                            <p>${item.href_info}</p>
                            <div class="price">
                                <h3>★★★★★</h3>
                                <span>|</span>
                                <h3>${item.price}</h3>
                            </div>
                            <div class="btn_box">
                                <a href="" class="buy_now">立即购买</a>
                                <a href="" class="learn_more">了解详情</a>
                            </div>
                        </li>`;
        });
        $(".goods_show_lists").html(strHTML);
    }

    // 选择下拉框 进行排序
    $("#sorts_name").change(() => {
        // 排序按钮
        let $selectVal = $("option:selected").val();
        let $lis = $(".goods_show_lists li");
        // 上市时间
        if ($selectVal == "time") {
            $lis.sort((m, n) => {
                return m.getAttribute($selectVal).replace(/-/g, '') - n.getAttribute($selectVal).replace(/-/g, '');
            });

        } else if ($selectVal == "price_height") {
            $lis.sort((m, n) => {
                return n.getAttribute($selectVal) - m.getAttribute($selectVal);
            });
        } else {
            $lis.sort((m, n) => {
                return m.getAttribute($selectVal) - n.getAttribute($selectVal);
            });
        }
        // 优化回流
        let frg = document.createDocumentFragment();

        for (let j = 0; j < $lis.length; j++) {
            frg.appendChild($lis[j]);
        }
        $(".goods_show_lists").html(frg);
    });

    // 鼠标移上 显示遮罩层，并显示立即购买和 了解详情
    // $(".goods_show_lists").on('mouseenter', 'li img', function (e) { })
    $(".goods_show_lists").on('mouseover', 'li img', function (e) {
        // 给img 添加类名
        // debugger;
        // $(this).addClass('');
        // 获取最后一个兄弟元素
        // $(this).siblings().last();
        $(this).siblings().last().css({
            'display': 'block',
            'position': 'absolute',
            'width': '320px',
            'height': '320px',
            'display': 'flex',
            'flex- direction': 'column',
            'justify - content': 'center',
            'top': '0',
        });
    })

    // 鼠标移出 
    $(".goods_show_lists").on('mouseleave', 'li .btn_box', function (e) {
        // 移除 img 的类名
        // $(this).siblings().first().removeClass('lists_img');
        // 遮罩层隐藏
        $(this).css({ "display": "none" });

    })

})()
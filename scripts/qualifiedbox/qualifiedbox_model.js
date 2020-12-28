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
            strHTML += `<li class="" time="${item.time}" hot="${item.hot}" price_height="${item.price}" 
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
        console.log($lis)
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


    $(".goods_show_lists").on('mouseenter', 'li', function (e) {
        e.currentTarget.setAttribute("class", "lists_li")

        $(".btn_box").css({
            "position": "absolute",
            top: "5px"
        });

    })
    $(".goods_show_lists").on('mouseleave', 'li', function (e) {

        e.currentTarget.setAttribute("class", "")
    })

})()
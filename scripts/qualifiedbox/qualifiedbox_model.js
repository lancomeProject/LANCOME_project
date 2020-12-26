(function () {
    $.ajax({
        url: "../../data/qualifiedbox/data.json",
        success: (data) => {
            // 绑定数据，渲染页面
            bindHTML(data);
        }
    });
    // 绑定数据，渲染页面
    let bindHTML = (data) => {
        $(".top_info_goods_num").html(data.length);
        let strHTML = "";
        data.forEach((item) => {
            //                  上市时间           人气                 价格            销售
            strHTML += `<li time="${item.time}" hot="${item.hot}" price_height="${item.price}" price_low="${item.price}" sales_num="${item.sales_num}">
                            <img src="${item.img}" alt="">
                            <p>${item.title}</p>
                            <p>${item.href}</p>
                            <p>${item.href_info}</p>
                            <div class="price">
                                <h3>★★★★★</h3>
                                <span>|</span>
                                <h3>${item.price}</h3>
                            </div>
                        </li>`;
        });
        $(".goods_show_lists").html(strHTML);
    }

    $("#sorts_name").change(() => {
        // 排序按钮
        let $selectVal = $("option:selected").val();
        console.log($selectVal == "price_height");
        let $lis = $(".goods_show_lists li");
        // 上市时间
        if ($selectVal == "time") {
            $lis.sort((m, n) => {
                return m.getAttribute($selectVal).replace(/-/g, '') - n.getAttribute($selectVal).replace(/-/g, '');
            });

        }else{
            $lis.sort((m, n) => {
                return m.getAttribute($selectVal) - n.getAttribute($selectVal);
            });
        }
        // // 销售数量
        // if ($selectVal == "sales_num") {
        //     $lis.sort((m, n) => {
        //         return m.getAttribute($selectVal) - n.getAttribute($selectVal);
        //     });
        // }
        // // 价格从低到高
        // if ($selectVal == "price_low") {
        //     $lis.sort((m, n) => {
        //         return m.getAttribute($selectVal) - n.getAttribute($selectVal);
        //     });
        // }
        // // 价格从高到低
        // if ($selectVal == "price_height") {
        //     $lis.sort((m, n) => {
        //         return n.getAttribute($selectVal) - m.getAttribute($selectVal);
        //     });
        // }
        // // 人气
        // if ($selectVal == "hot") {
        //     $lis.sort((m, n) => {
        //         return n.getAttribute($selectVal) - m.getAttribute($selectVal);
        //     });
        // }

        // 优化回流
        let frg = document.createDocumentFragment();

        for (let j = 0; j < $lis.length; j++) {
            frg.appendChild($lis[j]);
        }
        $(".goods_show_lists").html(frg);
    });
})()
(function () {

    // 声明变量
    let buy_now_url = "../../pages/qualifiedbox/buy_now_model.html";
    let learn_more_url = "../../pages/qualifiedbox/learn_more_model.html";

    let loadData = () => {
        $.ajax({
            url: "../../data/qualifiedbox/allData.json",
            async: true,
            type: "get",
            success: (data) => {
                // 绑定数据，渲染页面
                bindHTML(data[0].goods);
                // 产品筛选
                productHTML(data[0].product);
            }
        });
    }
    loadData();

    // 产品筛选数据渲染
    let productHTML = (product) => {
        let proHTML = "";
        $.each(product, (index, item) => {
            proHTML += `<li>
                            <input type="checkbox" name="${item.name}" id="${item.id}" />
                            <label for="${item.name}">${item.label}</label>
                        </li>`;
        });
        $(".product ul").html(proHTML);
    }

    // 当产品筛选有被选中时，上面的产品筛选隐藏
    $(".product").on("click", "input", function () {
        let inpLen = $('input[name="product"]:checked').length;
        if (inpLen > 0) {
            $(".clear_box_all").css({
                "display": "block"
            });
        } else {
            $(".clear_box_all").css({
                "display": "none"
            });
        }
    });

    // 关闭选中的筛选条件，并刷新页面
    $(".clear_box_all").on("click", function () {
        window.location.reload();
    });

    $(".filter1").on("click", () => {
        if ($(".name_add").html() == "-") {
            $(".product").css({
                "display": "none"
            });
            $(".name_add").html("+");
        } else {
            $(".product").css({
                "display": "block"
            });
            $(".name_add").html("-");
        }
    });

    $(".filter2").on("click", () => {
        if ($(".price_add").html() == "-") {
            $(".price_content").css({
                "display": "none"
            });
            $(".price_add").html("+");
        } else {
            $(".price_content").css({
                "display": "block"
            });
            $(".price_add").html("-");
        }
    });

    // 绑定数据，渲染页面
    let bindHTML = (data) => {
        $(".top_info_goods_num").html(data.length);
        let strHTML = "";
        $.each(data, (index, item) => {
            //                  上市时间           人气                 价格            销售
            strHTML += `<li time="${item.time}" hot="${item.hot}" price_height="${item.price}" 
                                price_low="${item.price}" sales_num="${item.sales_num}" id="${item.id}">
                            <img src="${item.img}" alt="">
                            <div class="info">
                                <p>${item.title}</p>
                                <p><a href="${learn_more_url}" target="_blank">${item.goods}</a></p>
                                <p><a style="cursor:pointer;">${item.goods_info}</a></p>
                            </div>
                            <div class="price">
                                <h3>${item.start}</h3>
                                <span>|</span>
                                <h3>${item.price}</h3>
                            </div>
                            <div class="btn_box">
                                <a href="${buy_now_url}" target="_blank" class="buy_now">立即购买</a>
                                <a href="${learn_more_url}" target="_blank" class="learn_more">了解详情</a>
                            </div>
                            </li>`;
        });
        $(".goods_show_lists").html(strHTML);

        // 获取随机数，绑定 爆款人气等信息  参数是li 的个数
        allData(goods_utils.unique($(".goods_show_lists li").length));
    }

    // 获取随机数，绑定 爆款人气等信息
    let allData = (data) => {
        let $lis = $(".goods_show_lists li");
        $.each($lis, (index, item) => {
            if (data.includes(parseInt(item.id))) {
                // console.log(item.id);
                let that = item;
                let res = $(that).children()[3];
                $(res).before("<div class='tag_hot' style='displack:block;width:50px;height:25px;line-height:25px;background:#000;position:absolute;top:0;right:0;color:white;'><span>人气</span></div>")
            }
        })
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
    $(".goods_show_lists").on('mouseover', 'li img', function (e) {
        // 获取最后一个兄弟元素并添加样式
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
        // 遮罩层隐藏
        $(this).css({
            "display": "none"
        });
    })

   

})()
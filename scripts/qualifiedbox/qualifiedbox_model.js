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
            strHTML += `<li>
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

    // console.log($(".goods_show_lists li").length);
})()
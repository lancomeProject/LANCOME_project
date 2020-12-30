window.onload = (function () {
    let listData,
        headSwipperData,
        recommendSwipperData,
        lists,
        listStr,
        swipperList,
        swipperListStr,
        recommendList,
        recommmendListStr1,
        recommmendListStr2,
        recommmendListStr3,
        miniHeader,
        recommentPage,
        recommentPageStr;
    miniHeader = document.querySelector(".miniHeader");
    // ajax获取头部列表数据
    listData = getData("get", "./data/index/headList.json", false);
    // 获取头部轮播数据
    headSwipperData = getData("get", "./data/index/head_swipper.json", false);
    // 获取推荐模块中的轮播1数据
    recommendSwipperData = getData("get", "./data/index/recommend_tab.json", false);

    // 渲染数据
    lists = document.getElementsByClassName("nav-left");
    swipper = document.getElementsByClassName("swipper")[0];
    recommendList = document.getElementsByClassName("wrapper");
    recommendPage = document.getElementsByClassName("pageIn");

    listStr = ``;
    swipperListStr = ``;
    recommmendListStr1 = ``;
    recommmendListStr2 = ``;
    recommmendListStr3 = ``;
    recommendPageStr1 = ``;
    recommendPageStr2 = ``;
    recommendPageStr3 = ``;

    function renderHtml(listData, headSwipperData, recommendSwipperData) {
        listData.forEach((item, index) => {
            if (index == 4 || index == 5) {
                listStr += `<li class = "hotLi"><a href="">${item.title}<span class = "hot">HOT</span></a></li>`;
                return;
            }
            listStr += `<li><a href="">${item.title}</a></li>`;
        });
        headSwipperData.forEach((item, index) => {
            swipperListStr += `<div class="slide"><img src="${item.url}" alt=""></div>`;
        })
        recommendSwipperData.forEach((item, index) => {
            if (index == 0) {
                item.swipper.forEach((item, index) => {
                    recommmendListStr1 += `<a><img src="${item.url}" alt=""><span class="title">${item.title}</span><span class="price">${item.price}</span></a>`;
                    recommendPageStr1 += `<span class="oldForm"></span>`;
                })
                recommmendListStr1 += `<a><img src="${item.swipper[1].url}" alt=""><span class="title">${item.swipper[1].title}</span><span class="price">${item.swipper[1].price}</span></a>`;
                recommmendListStr1 += `<a><img src="${item.swipper[2].url}" alt=""><span class="title">${item.swipper[2].title}</span><span class="price">${item.swipper[2].price}</span></a>`;

            } else if (index == 1) {
                item.swipper.forEach((item, index) => {
                    recommmendListStr2 += `<a><img src="${item.url}" alt=""><span class="title">${item.title}</span><span class="price">${item.price}</span></a>`;
                    recommendPageStr2 += `<span class="oldForm"></span>`;

                })
                recommmendListStr2 += `<a><img src="${item.swipper[0].url}" alt=""><span class="title">${item.swipper[0].title}</span><span class="price">${item.swipper[0].price}</span></a>`;
                recommmendListStr2 += `<a><img src="${item.swipper[1].url}" alt=""><span class="title">${item.swipper[1].title}</span><span class="price">${item.swipper[1].price}</span></a>`;
                recommmendListStr2 += `<a><img src="${item.swipper[2].url}" alt=""><span class="title">${item.swipper[2].title}</span><span class="price">${item.swipper[2].price}</span></a>`;
            } else if (index == 2) {
                item.swipper.forEach((item, index) => {
                    recommmendListStr3 += `<a><img src="${item.url}" alt=""><span class="title">${item.title}</span><span class="price">${item.price}</span></a>`;
                    recommendPageStr3 += `<span class="oldForm"></span>`;

                })
                recommmendListStr3 += `<a><img src="${item.swipper[0].url}" alt=""><span class="title">${item.swipper[0].title}</span><span class="price">${item.swipper[0].price}</span></a>`;
                recommmendListStr3 += `<a><img src="${item.swipper[1].url}" alt=""><span class="title">${item.swipper[1].title}</span><span class="price">${item.swipper[1].price}</span></a>`;
                recommmendListStr3 += `<a><img src="${item.swipper[2].url}" alt=""><span class="title">${item.swipper[2].title}</span><span class="price">${item.swipper[2].price}</span></a>`;
            }
        });
        lists[0].innerHTML = listStr;
        lists[1].innerHTML = listStr;
        swipper.innerHTML = swipperListStr;
        swipperList = [].slice.call(document.getElementsByClassName("slide"));
        recommendList[0].innerHTML = recommmendListStr1;
        recommendList[1].innerHTML = recommmendListStr2;
        recommendList[2].innerHTML = recommmendListStr3;
        recommendPage[0].innerHTML = recommendPageStr1;
        recommendPage[1].innerHTML = recommendPageStr2;
        recommendPage[2].innerHTML = recommendPageStr3;
    };
    renderHtml(listData, headSwipperData, recommendSwipperData);
    // 头部轮播
    function headSwipper() {
        let imgs = document.querySelectorAll(".slide img");
        let current = 0;

        function slideOff() {
            imgs[current].className = "";
        }

        function slideOn() {
            imgs[current].className = "active";
        }

        function changeSlide() {
            slideOff(current);
            current++;
            if (current >= imgs.length) current = 0;
            slideOn(current);

        }
        imgs[0].className = "active";
        setInterval(changeSlide, 1700);
    };
    headSwipper();

    // 滚轮下移一logo高度，显示mini导航
    function showMini() {
        let sTop = document.documentElement.scrollTop;
        if (sTop >= 80) {
            miniHeader.classList.add("miniHeaderShow");
            return;
        }
        miniHeader.classList.remove("miniHeaderShow");
    }
    // 滚动条上移的时候，如果bodyTop还剩一屏距离，则瞬间将scrollTop设置为o
    let oldTop = [],
        value,
        scrollTop,
        step = 20;

    function moment() {
        scrollTop = document.documentElement.scrollTop;
        oldTop.push(scrollTop);
        oldTop.forEach((item, index) => {
            if (index == 0) return;
            value = item - oldTop[index - 1];
        })
        if (0 < scrollTop < 700 && value < 0) {
            document.documentElement.scrollTop -= step;
        }
    }
    // 实现推荐区域的选项卡
    let lis = document.querySelectorAll(".recommend-list li"),
        tabList = document.querySelectorAll(".tab");
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener("click", function () {
            this.index = i;
            for (let i = 0; i < lis.length; i++) {
                tabList[i].style.display = "none";
            }
            tabList[i].style.display = "block";

            // 推荐模块的选项卡的多轮播图效果
            function moreSwipper() {
                let oldLi = this;
                clearInterval(timer1);
                timer1 = null;
                clearInterval(timer2);
                timer2 = null;
                clearInterval(timer3);
                timer3 = null;
                /* // ?????
                 for (let i = 0; i < lis.length; i++) {
                    if (this != lis[i]) {
                        step2 = 0;
                        console.log(lis[i], this);

                    }
                } 
                */
                if (this != oldLi) step2 = 0;
                // console.log(`timer${this.index}`)
                if (this.index == 0 && timer1 == null) {
                    timer1 = setInterval(lrSwipper, 1000, len1, wrapper0);
                } else if (this.index == 1 && timer2 == null) {
                    timer2 = setInterval(lrSwipper, 1000, len2, wrapper1);
                } else if (this.index == 2 && timer3 == null) {
                    timer3 = setInterval(lrSwipper, 1000, len3, wrapper2);
                }
            }
            moreSwipper.call(this);

        }, false)

    }
    // 实现推荐区域的左右轮播图
    let container = document.querySelectorAll(".wrapper-container"),
        wrapper0 = container[0].querySelector(".right .wrapper"),
        wrapper1 = container[1].querySelector(".right .wrapper"),
        wrapper2 = container[2].querySelector(".right .wrapper"),
        imgs1 = document.querySelectorAll(".tab1 .wrapper img"),
        imgs2 = document.querySelectorAll(".tab2 .wrapper img"),
        imgs3 = document.querySelectorAll(".tab3 .wrapper img"),
        len1 = imgs1.length,
        len2 = imgs2.length,
        len3 = imgs3.length,
        timer1,
        timer2,
        timer3,
        timer = [timer1, timer2, timer3],
        step2 = 0;

    function lrSwipper(len, wrapper) {
        if (step2 > len - 3) {
            step2 = 1;
            wrapper.style.transition = `left 0s`;
            wrapper.style.left = `0px`;
            wrapper.offsetLeft;
        }
        wrapper.style.transition = `left 1.2s`;
        wrapper.style.left = `-${step2*270}px`;
        step2++;
        fllow(step2);
    }
    timer1 = setInterval(lrSwipper, 1000, len1, wrapper0);
    // 实现分页器的跟随
    let page = recommendPage[0].querySelectorAll("span");

    function fllow(step2) {
        for (let i = 0; i < page.length; i++) {
            page[i].className = "oldForm";
            if (i == step2) {
                page[i].className = "active";
            }
            if (i == page.length) {
                page[0].className = "active";
            }
        }
    }
    fllow(step2);



    // 底部导航栏中邮件框的监听
    let p = document.querySelector(".footer .email p");
    let inputBox = document.querySelector(".footer .email input");
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    inputBox.oninput = function () {
        if (!reg.test(inputBox.value)) {
            p.innerText = "请输入有效的邮件";
            p.className = "test";
            return;
        }
        p.innerText = "";
        p.className = "";
    }
    // 表单的聚焦事件
    inputBox.onfocus = function () {
        inputBox.placeholder = "";
    }
    // 表单的失焦事件
    inputBox.onblur = function () {
        inputBox.placeholder = "* 输入您的邮箱";
    }

    window.onscroll = function () {
        showMini();
        moment();
    }
})()
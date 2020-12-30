let goods_utils = (function () {

    // 获取随机数
    let unique = (parameter) => {
        console.log(parameter);
        let newArr = [];
        // 获取li 的长度
        let randomNum = Math.floor(parameter / 3);

        for (let j = 0; j < randomNum; j++) {
            // 随机生成随机数
            let index = Math.round(Math.random() * parameter);
            newArr.push(index);
        }
        return newArr;
    }



    return {
        unique
    }
})();
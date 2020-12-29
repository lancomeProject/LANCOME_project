let unique = () => {
    let newArr = [];
    for (let j = 0; j < 3; j++) {
        // 随机生成随机数
        let index = Math.round(Math.random() * 9);
        newArr.push(index);
    }

    var newArr2 = [];
    for (let i = 0; i < newArr.length; i++) {
        if (newArr2.indexOf(newArr[i]) == -1) {
            newArr2.push(newArr[i]);
        }
    }
    return newArr2;
}
let res = unique();
console.log(res);
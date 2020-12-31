

let str = "￥ 0.45";


console.log(str.replace(/^￥ /ig, ""));
console.log(str.slice(2,str.length));
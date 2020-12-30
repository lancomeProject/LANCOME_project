function getData(methods, url, async) {
    // 异步请求数据
    let data = null;
    let xhr = new XMLHttpRequest;
    xhr.open(methods, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    return data;
}
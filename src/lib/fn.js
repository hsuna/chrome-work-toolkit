const copy = elem => {
    elem.select()
    document.execCommand("copy")
    document.getSelection().removeAllRanges()
}

const query = url => {
    let obj = {};
    if (/\?/.test(url)) {
        url.split("?")[1].split("&").forEach(param => {
            let [key, value] = param.split("=") //进行分割成数组
            obj[key] = decodeURIComponent(value) //为对象赋值
        })
    }
    return obj;
  }

export default {
    copy,
    query
}
// 一般转移字符函数（不适用于富文本编辑）
const escapeStr = function(str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/"/g, '&quto;')
    str = str.replace(/'/g, '&#39;')
    str = str.replace(/`/g, '&#96;')
    str = str.replace(/\//g, '&#x2F;')
    return str
}
console.log(escapeStr('<script>alert(1)</script>'))

// 使用xss白名单方式过滤，需要安装依赖
const xss = require('xss');
console.log(xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>'));
/* 编码，过滤，校正，高度定制渲染内容 */
/* 模拟后端拿回来的已经经过编码的字符串 */
const str = '&lt;button onclick=&quot;alert(1)&quot;&gt;点击触发xss&lt;/button&gt;';// dom改变引诱触发
/* 以下为了方便不写编译过的字符串了，直接写原有字符串 */
const str2 = '<img src="null" onerror="alert(1)" />'; // 立即执行
const str3 = '<a href="jAvAscRipt:alert(1)">点我跳转</a>'; // 大小写这样依然能执行
const str4 = '<script>alert(1)</script>'; // 直接innerHTML不会执行，只能通过appenChild
const str5 = '<style>body { background-color: orange }</style>' // 改变背景颜色

const parse = (str) => {
    let result = '';
    /* 先从服务端拿到反转义后的字符串 */
    const unescapeStr = he.unescape(str, {
        strict: true
    });
    /* 再进行过滤和校正，返回来的字符串是带转义的，需要用innerHTML渲染 */
    HTMLParser(unescapeStr, {
        start(tag, attrs, unary) {
            /* 过滤tag，css相关的也要禁，因为也会影响页面 */
            if ( tag === 'script' || tag === 'link' || tag === 'style' || tag === 'iframe' || tag === 'frame' ) {
                return;
            }
            result += '<' + tag;
            for (let i = 0; i < attrs.length; i++) {
                /* 过滤属性 */
                if (attrs[i].name.indexOf('on') > -1 || attrs[i].escaped.toLowerCase().indexOf('javascript') > -1) {
                    continue;
                }
                result += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
            }
            result += (unary ? ' /' : '') + '>';
        },
        end(tag) {
            result += '</' + tag + '>';
        },
        chars(text) {
            result += text;
        },
        comment(text) {
            result += '<!--' + text + '-->';
        }
    });
    return result;
};

/* 传统一刀切方法，将所有内容显示出来并以转以后的字符串形式显示出来 */
const escapeStr = function(str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/"/g, '&quot;')
    str = str.replace(/'/g, '&#39;')
    str = str.replace(/`/g, '&#96;')
    str = str.replace(/\//g, '&#x2F;')
    return str
}

const result = parse(str5);

const container = document.getElementById('xss');

// container.innerHTML = escapeStr(result);
// 实际上通过innerHTML直接设置script是不会执行的，要想script执行，只有通过appendChild的形式执行
container.innerHTML = result;

console.log(result);

/* ----------------------------------------------------- */

/* xss白名单过滤 */
const xss = require("xss");
console.log(xss('<script>alert("xss");</script>'));
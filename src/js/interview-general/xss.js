/* 编码，过滤，校正，高度定制渲染内容 */
/* 模拟后端拿回来的已经经过编码的字符串 */
const str = '&lt;button onclick=&quot;alert(1)&quot;&gt;点击触发xss&lt;/button&gt;';

const parse = (str) => {
    let result = '';
    /* 先从服务端拿到反转义后的字符串 */
    const unescapeStr = he.unescape(str, {
        strict: true
    });
    /* 再进行过滤和校正，返回来的字符串是带转义的，需要用innerHTML渲染 */
    HTMLParser(unescapeStr, {
        start(tag, attrs, unary) {
            result += '<' + tag;
            for (let i = 0; i < attrs.length; i++) {
                result += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
            }
            result += (unary ? '/' : '') + '>';
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

const result = parse(str);

const container = document.getElementById('xss');

container.innerHTML = result;

console.log(result);
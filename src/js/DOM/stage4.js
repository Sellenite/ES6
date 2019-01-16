const container = document.getElementById('stage4');
const body = document.getElementsByTagName('body')[0];

// childNodes会返回所有节点，甚至连空格和换行符都会被解释为节点，与children不相同
console.log(body.childNodes); // NodeList(5) [text, div#app, text, script, script]，其他打印出来的节点是由于dev-server弄出来的东西

/** 
 * 元素节点的 nodeType 属性值是 1
 * 属性节点的 nodeType 属性值是 2
 * 文本节点的 nodeType 属性值是 3
 */
for (let i = 0; i < body.childNodes.length; i++) {
    console.log(body.childNodes[i].nodeType);
}

// nodeValue取值要正确，取到正确的节点，元素本身是没有nodeValue
const node1 = container.getElementsByClassName('nodeValue')[0];
console.log(node1.childNodes[0].nodeValue);

// node.firstChild与node.childNodes[0]完全等价
// node.lastChild与node.childNodes[node.childNodes.length - 1]完全等价
console.log(body.firstChild === body.childNodes[0]); // true
console.log(body.lastChild === body.childNodes[body.childNodes.length - 1]); // true
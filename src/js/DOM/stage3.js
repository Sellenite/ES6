const container = document.getElementById('stage3');

// 原生getElementsByClassName支持传入多个className，匹配传入及以上的dom，不分先后顺序
console.log(container.getElementsByClassName('class2 class1'));

// 兼容不支持getElementsByClassName的浏览器（IE9以下）
const getElementsByClassName = (node, className) => {
    let result = [];
    let classes = className.trim().split(' ');
    let elems = node.getElementsByTagName('*');
    for (let i = 0, len = elems.length; i < len; i++) {
        let item = elems[i];
        let num = 0;
        // 支持class的无序
        for (let j = 0; j < classes.length; j++) {
            if (item.className.indexOf(classes[j]) !== -1) {
                num++;
            }
        }
        if (num === classes.length) {
            result.push(item);
        }
    }
    return result;
}

console.log(getElementsByClassName(container, 'class2 class1'));

// getAttribute只能通过元素节点调用，不能通过document对象调用
let classes = getElementsByClassName(container, 'class3 class2');
console.log(classes[0].getAttribute('title'));

// setAttribute也是只能通过元素节点调用
classes[0].setAttribute('value', '111');
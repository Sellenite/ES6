const container = document.getElementById('stage7');

/**
 * 与parentNode.appendChild()的区别在于：
 * parentNode.append()可以同时传入多个节点或字符串，没有返回值；
 * 而parentNode.appendChild()只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点
 * Polyfill:(兼容到IE9以上)，原本IE和edge不兼容append，慎用
 * Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
 */
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

const test = () => {
    // 创建元素节点
    let para = document.createElement('p');
    para.innerHTML = 'insert comment';
    // node.nodeName节点的名称取元素的时候是大写
    console.log(para.nodeName, para.nodeType); // P 1
    // parentNode.append()能够添加多个节点，支持传入字符串，有兼容性问题，不要使用，实际就是appendChild和createTextNode的结合使用
    // parentNode.appendChild()只能够添加一个节点，不支持传入字符串
    container.appendChild(para);
};
test();

const test2 = () => {
    let para = document.createElement('p');
    // 创建字节节点使用parentNode.createTextNode()方法
    let text = document.createTextNode('insert comment by textNode');
    console.log(text);
    para.appendChild(text);
    container.appendChild(para);
};
test2();

// insertBefore：在已有元素前插入一个新元素
// 用法：parentNode.insertBefore(newElement, targetElement);
const test3 = () => {
    let newElement = document.createElement('div');
    newElement.innerHTML = 'newElement';
    let targetElement = document.createElement('span');
    targetElement.innerHTML = 'targetElement';
    container.appendChild(targetElement);
    container.insertBefore(newElement, targetElement);
};
test3();

// parentNode没有insertAfter的方法，需要配合nextSibling和insertBefore完成此函数
const insertAfter = (newElement, targetElement) => {
    // 取父元素节点
    let parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        // nextSibling取下一个兄弟节点，取上一个兄弟节点使用previousSibling
        // 取下一个元素节点是使用nextElementSibling，上一个元素节点使用previousElementSibling
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
};
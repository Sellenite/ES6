const container = document.getElementById('stage9');

// 获取下一个元素
const getNextElement = (node) => {
    if (node.nodeType == 1) {
        return node;
    }
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    } else {
        return null;
    }
}

// 使h1的下一个元素字体变色
const setHeaderSiblings = () => {
    let els = container.getElementsByTagName('h1');
    for (let i = 0; i < els.length; i++) {
        let sibling = getNextElement(els[i].nextSibling);
        if (sibling) {
            sibling.style.color = 'red';
        }
    }
}

setHeaderSiblings();

// 当浏览器不支持nth-child(odd)等css3时，使用js遍历更改样式
const stripeTable = (type = 'odd') => {
    let tables = container.getElementsByTagName('table');
    for (let i = 0; i < tables.length; i++) {
        let trs = tables[i].getElementsByTagName('tr');
        // 类数组标准化，除去th所在的第一行样式
        trs = Array.prototype.slice.call(trs);
        let th = trs.shift();
        th.style.backgroundColor = 'rgb(255, 206, 77)';
        th.style.color = '#FFF';
        for (let j = 0; j < trs.length; j++) {
            if (type === 'odd' && j % 2 === 0) {
                trs[j].style.backgroundColor = 'rgb(77, 134, 255)';
                trs[j].style.color = '#FFF';
            }
            else if (type === 'even' && j % 2 === 1) {
                trs[j].style.backgroundColor = 'rgb(77, 134, 255)';
                trs[j].style.color = '#FFF';
            }
        }
    }
}

stripeTable();

// 模仿伪类hover
const hoverTable = () => {
    let tables = container.getElementsByTagName('table');
    for (let i = 0; i < tables.length; i++) {
        let trs = tables[i].getElementsByTagName('tr');
        // 类数组标准化，除去th所在的第一行样式
        trs = Array.prototype.slice.call(trs);
        for (let j = 0; j < trs.length; j++) {
            trs[j].addEventListener('mouseenter', function() { this.style.fontWeight = 'bold' });
            trs[j].addEventListener('mouseleave', function() { this.style.fontWeight = 'normal' });
        }
    }
}

hoverTable();

const addClass = (element, value) => {
    if (!element.className) {
        element.className = value
    } else {
        element.className = element.className += ` ${value}`;
    }
}

addClass(container, 'class2');
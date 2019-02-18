const container = document.getElementById('zepto');

const zepto = {};

const $ = function(selector) {
    return zepto.init(selector);
};

zepto.init = function(selector) {
    const nodeList = container.querySelectorAll(selector);
    const dom = Array.prototype.slice.call(nodeList);
    return zepto.Z(dom, selector);
}

zepto.Z = function(dom, selector) {
    return new Z(dom, selector);
}

function Z(dom, selector) {
    this.selector = selector || '';
    this.dom = dom;
}

// 定义各类操作
$.fn = {
	constructor: zepto.Z,
	html: function(val) {
		this.dom.forEach(el => {
			el.innerText = val;
		});
		return this;
	}
}

zepto.Z.prototype = Z.prototype = $.fn;

// 扩展插件
$.fn.css = function(val) {
	console.log(`css ${val}`);
}

$('p').html(3).css(1);
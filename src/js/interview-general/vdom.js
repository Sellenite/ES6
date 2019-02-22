let snabbdom = require('snabbdom');
let patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
let h = require('snabbdom/h').default; // helper function for creating vnodes

let container = document.getElementById('vdom');

let vnode = h('ul', {}, [
	h('li.item', {}, 'item 1'),
	h('li.item', {}, 'item 2')
]);

console.log(vnode);

patch(container, vnode);
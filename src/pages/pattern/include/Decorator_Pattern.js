// 装饰者模式

// 原理，ES7的decorator模式其实也是语法糖，但实际会更复杂
class Circle {
	draw() {
		console.log('write a circle');
	}
}

class borderDecorator {
	// 传入原有的实例进行改写
	constructor(instance, color) {
		this.instance = instance;
		this.color = color;
	}

	// 覆盖原有实例的方法
	draw() {
		this.instance.draw();
		this.setRedBorder();
	}

	setRedBorder() {
		console.log(`set ${this.color} border`);
	}
}

// 将原来的实例再进行一次包装，改写里面的内容，就是装饰者模式
let circle = new Circle();
let circleWithRedBorder = new borderDecorator(circle, 'dark');
circleWithRedBorder.draw();

/**
 * 装饰器固定格式，装饰器必须是函数
 * @param  {Obejct} target     Class本身
 * @param  {Any} 	name       Class里的属性
 * @param  {Obejct} descriptor descriptor
 */
function readonly(target, name, descriptor) {
	descriptor.writable = false;
}

// 带参，但是必须返回函数
function mixins(obj) {
	return function(target) {
		Object.assign(target.prototype, obj);
	}
}

// 打印结果功能
function log(target, name, descriptor) {
	// descriptor.value就是属性函数本身，先暂存起来
	let func = descriptor.value;
	// 重写函数
	descriptor.value = function() {
		// 这里的this是指向Test的实例，所以apply放入target也可以
		let result = func.apply(this, arguments);
		console.log(`function ${name} result is: ${result}`);
		return result;
	}
}

const Obj = {
	a() {
		console.log('mixins a');
	}
}

// 对class本身做装饰
@mixins(Obj)
class Test {
	constructor(name) {
		this.name = name;
	}

	@readonly
	getName() {
		return this.name;
	}

	@log
	add(...numList) {
		let ret = 0;
		for (let num of numList) {
			ret += num;
		}
		return ret;
	}
}

let test = new Test('yuuhei');
console.log(test);

console.log(test.getName());

test.a();

// 自动打印结果
test.add(1, 2, 3);

// 不可修改：Cannot assign to read only property 'getName' of object '#<Test>'
// test.getName = 1;
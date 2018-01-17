/*
 * @Author: Sellenite
 * @Date:   2018-01-16 12:23:10
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-17 11:02:30
 */

{
	/* typeof null Object Array 都会返回 'object'  */
	let a = null;
	let b = {
		name: 'yuuhei'
	};
	let c = [1, 3];
	console.log(typeof a, typeof b, typeof c);
}

{
	/* 复合条件检测null */
	let a = null;
	console.log(!a && typeof a === 'object'); // true
}

{
	/* 函数对象的length是声明参数的个数 */
	let foo = function(a, b, c) {};
	console.log(foo.length); // 3
}

{
	/* 声明了还没赋值属于undefined */
	/* 还没声明属于undeclared（javascript还是会打印undefined） */
}

{
	/* typeof一个var声明了但未定义值的话会打印undefined */
	/* typeof一个完全没有声明及定义值的话同样也会打印undefined */
}

{
	let IIFE = 2;
	/* typeof判断当前作用域变量是否被定义 */
	let helper = (typeof IIFE !== 'undefined') ? IIFE : function() {
		/* somethings */
	};
	/* 使用typeof来检查变量是首选的选择 */
	console.log(helper); // 2
}

{
	/* 用依赖注入设计模式来验证当前作用域变量是否被定义 */
	let helper = function(IIFE) {
		let helper2 = IIFE || function() {
			/* somethings */
		};
	};
}

{
	/* 创建稀疏数组，空白的地方会被显式赋值为undefined */
	let arr = [];
	arr[0] = 0;
	arr[4] = 4;
	console.log(arr.length); // 5
}

{
	/* 数组也是对象，可以包含字符串键值和属性，但不计入于数组的长度 */
	let arr = [1, 3, 5];
	arr['name'] = 'yuuhei';
	arr['age'] = 23;
	console.log(arr, arr.length); // 3
}

{
	/* 注意，如果字符串键值能够转换为十进制数字，会被当作数字索引处理 */
	let arr = [1, 3, 5];
	arr['5'] = 100;
	console.log(arr);
}

{
	/* 类数组及数组副本建立 */
	// 类数组转换
	let foo = function() {
		let arr = Array.prototype.slice.call(arguments);
		console.log(arr)
	}
	foo()

	// 数组副本
	let arr = [1, 3, 5];
	let arrCopy = Array.prototype.slice.call(arr)
	arr.push(100);
	arrCopy.push(200);
	console.log(arr, arrCopy);

	// ES6的Array.from也能够建立副本
	let arr2 = [2, 4, 6];
	let arrCopy2 = Array.from(arr2);
	arr2.push(100);
	arrCopy2.push(200);
	console.log(arr, arrCopy2);
}

{
	/* 访问字符串某个下标应该用.charAt()，老版本IE不允许string[index]这样访问 */
	/* 以上只能够进行字符串访问，无法进行字符串修改 */
	let string = 'foo';
	console.log(string[0]);
	console.log(string.charAt(2));
}

{
	/* 数字值可用指数表示 */
	let a = 5E10;
	console.log(a);
}

{
	let a = 42.59;
	/* .toFixed()用于指定小数显示多少个 */
	console.log(a.toFixed(4));
	/* .toPrecision()用于指定多少个有效数位 */
	console.log(a.toPrecision(5));
}

{
	/* ES6，严格模式不再支持0开头的八进制数 */
	// let a = 0363;
	// console.log(a);  SyntaxError

	/* ES6和严格模式下的八进制是用0o前缀表示 */
	let a = 0o363;
	console.log(a); // 243
}

{
	/* 注意0.1+0.2不等于0.3，存在精度问题 */
	let a = 0.1 + 0.2;
	let b = 0.3
	console.log(a === b) // false
}

{
	/* NaN不与NaN相等，typeof NaN的值为'number' */
	console.log(typeof NaN); // number
	console.log(NaN === NaN); // false
}

{
	/* window有一个全局方法isNaN()，但这个有bug，会将NaN和字符串也会判断为true */
	/* ES6的Number.isNaN()修复了这个问题，他会先用typeof判断为number再执行此方法
	（上面提到typeof NaN返回的是'number'） */
	let a = 'foo';
	let b = 10 / 'foo';
	console.log(window.isNaN(a)); // true, bug
	console.log(window.isNaN(b)); // true

	console.log(Number.isNaN(a)); // false，修复了
	console.log(Number.isNaN(b)); // true
}
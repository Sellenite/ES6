/*
 * @Author: Sellenite
 * @Date:   2018-01-16 12:23:10
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-16 17:28:46
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
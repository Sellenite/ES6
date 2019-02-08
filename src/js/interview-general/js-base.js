/**
 * 6种原始值，Primitive类型，除了原始值外其他都是对象类型
 * boolean
 * null
 * undefined
 * number
 * string
 * symbol
 */

{
    // instanceof是通过原型链进行判断的，对于直接产生的原始类型，不要使用instanceof
    const str = 'hello world';
    console.log(str instanceof String); // false

    const str2 = new String('hello world');
    console.log(str2 instanceof String); // true
};

{
    // ES6的Symbol.hasInstance指向一个内部方法，当使用判断是否为该对象的实例时，会调用这个方法
    class PrimitiveString {
        static[Symbol.hasInstance](val) {
            return typeof val === 'string';
        }
    }

    const str = 'hello world';
    // 改写了instanceof的判断规则，说明instanceof也不是百分百可信的
    console.log(str instanceof PrimitiveString); // true
};

{
    // 数组转字符串 [1, 2, 3] => '1,2,3';
    // 数组转数字 空数组为0，存在一个元素且为数字转数字，其他情况NaN

    // null转数字 null => 0;
    // 除了上面数组的引用类型转数字 NaN

    /**
     * 对象在转换类型的时候，会调用内置的[[ToPrimitive]]函数，具体逻辑如下
     * 调用 x.valueOf()，如果转换为基础类型，则返回
     * 调用 x.toString()，如果转换为基础类型，则返回
     * 如果都没有返回原始类型，就会报错
     * 如果重写Symbol.toPrimitive，转换时调用优先级最高
     */

    const obj = {
        valueOf() {
            return 0;
        },
        toString() {
            return '0';
        },
		[Symbol.toPrimitive]() {
            return 2;
        }
    }

    console.log(1 + obj);
};

{
	/**
     * 四则运算符转换规则：
     * 加法运算中如果其中一方是字符串，那么会把另一方转为字符串
     * 加法运算中如果都不是字符串或数字，那么会将它转为数字或字符串
     * 除了加法运算，只要其中一方是数字，另一方就会转为数字
     */
    console.log(1 + [1, 2, 3]); // 11,2,3
    console.log(2 * [3]); // 6
 };

 {
 	/**
 	 * 比较运算符转换规则
 	 * 如果是对象，就通过以上toPrimitive转换对象
 	 * 如果是字符串，通过unicode字符索引比较
 	 */
 	const a = {
 		valueOf() {
 			return 0;
 		},
 		toString() {
 			return '2';
 		}
 	};
 	console.log(a > -1); // true
 }

 {
 	// 函数的多次bind，fn中的this永远由第一次bind决定
 	let a = {};
 	let foo = function() {
 		console.log(this);
 	}

 	foo.bind().bind(a)(); // undefined，严格模式全局this为undefiled

 	// 以上代码转换形式，原理
 	let fn = function() {
 		// 相当于第二次bind
 		return function() {
 			// 相当于第一次bind
 			return foo.apply();
 		}.apply(a);
 	};

 	fn();
 };
/**
 * 你不知道的JavaScript(下卷) 第二部分 ES6及更新版本
 * 第一部分没有笔记
 */

{
    const runSomething = (obj) => {
        let x = Math.random(),
            y = Math.random();

        return obj.something(x, y);
    }

    let num = runSomething({
        // 递归引用当前函数的必要写法
        something: function something(x, y) {
            if (x > y) {
                return something(y, x);
            }
            return y - x;
        }
    });

    console.log(num);
};

{
    let obj1 = {
        foo() {
            console.log('foo obj1');
        }
    };

    let obj2 = {
        foo() {
            // 可以这样使用super
            super.foo();
            console.log('foo obj2');
        }
    };

    // 其实就是将obj1的__proto__赋值给obj2
    Object.setPrototypeOf(obj2, obj1);
    obj2.foo();
};

{
    // 标签字符串字面量
    const foo = (strings, ...values) => {
        console.log(strings);
        console.log(values);
    };

    const desc = 'awesome';

    foo`Everything is ${desc}!`;
};

{
    // 标签字符串字面量简单应用
    const fixNum = (strings, ...values) => {
        // strings ["you should pay ", " to me"]
        // values [19.9891]
        return strings.reduce((prev, curr, currIdx) => {
            console.log(prev);
            console.log(curr);
            if (currIdx > 0) {
                if (typeof values[currIdx - 1] === 'number') {
                    prev += `$${values[currIdx - 1].toFixed(2)}`
                }
                else {
                    prev += values[currIdx - 1];
                }
            }
            return prev + curr;
        }, "");
    };

    const amt = 19.9891;
    // 每个通过字面量传入的数字都会被toFixed
    const result = fixNum`you should pay ${amt} to me`;
    console.log(result);
};

{
    // 箭头函数没有自己的arguments，而是继承自父层
    const foo = function() {
        const bar = () => {
            console.log(arguments); // Arguments [1, 2, 3, callee:(..)]
        };
        bar(4, 5, 6);
    }

    foo(1, 2, 3);

    // 但是仍然像普通函数一样可以通过结构来得到类似arguments的数组
    const baz = (...args) => {
        console.log(args);
    }

    baz(7, 8, 9); // [7, 8, 9]
};

{
    // 箭头函数内部没有constructor方法，也没有prototype，所以不支持new操作
    // 它对this的处理与一般的普通函数不一样，箭头函数的this始终指向函数定义时的this，不可用于构造
    const foo = () => { };
    const bar = new foo(); // 不要使用箭头函数做为构造函数
}

{
    // symbol没有字面量形式，不能对Symbol使用new，他不是一个构造器，也不会创建对象
    const sym = Symbol('some optional description');
    // 基础类型，识别symbol的首选办法
    console.log(typeof sym); // symbol
    // 提供描述时会只被作为这个符号的字符串表示
    console.log(sym.toString()); // Symbol(some optional description)

    // sym不是Symbol的实例，像字符串不是String的实例一样，所以无法使用instanceof判断，需要装箱
    console.log(sym instanceof Symbol); // false
    console.log(Object(sym) instanceof Symbol); // true
    // 平时判断直接使用typeof判断即可，无需再次装箱再判断
};

{
    // 单例creator
    const getSingle = function(fn) {
        // 符号本身的内部值是不在代码中出现且无法获得的，所以可以作为唯一值
        const INSTANCE = Symbol('instance');
        // 将返回的结果绑定creator的执行环境this
        const _this = this;

        return function() {
            return getSingle[INSTANCE] || (getSingle[INSTANCE] = fn.apply(_this, arguments));
        }
    };

    // 执行环境
    const container = {
        getSingle
    };

    const creator = container.getSingle(function() { return this });
    const result1 = creator();
    const result2 = creator();
    console.log(result1); // container
    console.log(result1 === result2); // true
};

{
    // 符号作为键值存在于对象中时，不可被枚举，但可以被Object.getOwnPropertySymbols拿出
    const obj = {
        foo: 42,
        [Symbol('foo')]: 24,
        bar: 110
    }

    console.log(Object.getOwnPropertyNames(obj)); // ["foo", "bar"]
    console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(foo)]

    // 内置符号
    const arr = [1, 2, 3];
    console.log(arr[Symbol.iterator]); // ƒ values() { [native code] }
};

{
    const arr = [{ a: 1, b: 2 }, 2, 3];
    const it = arr[Symbol.iterator]();

    const map = new Map();
    map.set('a', 4);
    map.set('b', 5);

    const it2 = map.entries();

    console.log(it.next());
    console.log(it2.next());
};

{

};
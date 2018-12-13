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
/**
 * 你不知道的JavaScript(中卷) 第二部分 异步和性能
 */
{
    // 分时函数，每次计时器处理一段数据，避免一次处理过多数据
    const timeChunk = function(array = [], fn = () => { }, count = 1, interval = 200) {
        let obj, timer;

        const start = function() {
            for (let i = 0; i < Math.min(count, array.length); i++) {
                obj = array.shift();
                fn(obj);
            }
        }

        return function() {
            timer = setInterval(() => {
                if (array.length === 0) {
                    return clearInterval(timer);
                }
                start();
            }, interval);
        }
    }

    let dataArray = [];
    let resultArray = [];

    for (let i = 0; i < 10; i++) {
        dataArray.push(i);
    }

    // 每1秒处理2个item
    const timeChunkFn = timeChunk(dataArray, function(item) {
        resultArray.push(item * 2);
    }, 2, 1000);

    timeChunkFn();
};

{
    try {
        // 延时的报错不会被catch到，只有同步的代码或生成器（类似于async）的才能catch到
        setTimeout(() => {
            // throw undefined
        }, 100);
    } catch (err) {
        // 延时抛错永远不会被catch到，不会执行以下代码
        console.log(err);
    }
};

{
    // generator
    let a = 100;
    const foo = function* () {
        a++;
        yield; // 暂停
        return a;
    }
    let iterator = foo();

    iterator.next();
    let res = iterator.next();

    console.log(res); // value, done

    // iterator可传值
    let b = 200;

    const bar = function* (num) {
        // 遇到yield表达式时，会暂停在赋值语句中间，并本质要求提供一个值
        // 可以不设定预留值，即(yield)，不设定时默认返回的value是undefined
        let result = num * (yield 'Hello');
        return result;
    }

    let iterator2 = bar(10);
    let res21 = iterator2.next(); // 函数停在yield表达式的中间，并把yield后的内容暂时作为value值
    let res22 = iterator2.next(7); // 传值，赋值语句继续执行

    console.log(res21, res22); // value: Hello, value: 70
};

{
    // 标准迭代器接口方法
    const iterator = (function() {
        let nextval;

        return {
            // for..of循环需要
            [Symbol.iterator]: function() {
                return this;
            },
            next: function() {
                if (nextval === undefined) {
                    nextval = 1;
                } else {
                    nextval = (3 * nextval) + 6
                }

                return {
                    done: false,
                    value: nextval
                }
            }
        }
    })();

    for (let v of iterator) {
        console.log(v);

        if (v > 500) {
            break;
        }
    }
};

{
    // 使用生成器
    const iterator = function* () {
        let nextval;

        while (true) {
            if (nextval === undefined) {
                nextval = 1;
            } else {
                nextval = (3 * nextval) + 6;
            }

            yield nextval;
        }
    }

    for (let v of iterator()) {
        console.log(v);

        if (v > 500) {
            break;
        }
    }
}
/**
 * 你不知道的JavaScript(中卷) 第二部分 异步和性能
 */

// 模拟promise请求
const promiseRequest = function(success, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                if (typeof success === 'boolean') {
                    resolve('promise success');
                } else {
                    resolve(success);
                }
            } else {
                reject('promise error');
            }
        }, delay);
    });
}

// 支持Promise的Generator Runner
const run = function(gen) {
    let args = [].slice.call(arguments, 1), it;
    // 在当前上下文中初始化生成器
    it = gen.apply(this, args);
    // 返回一个promise用于生成器完成
    return Promise.resolve().then(function handleNext(value) {
        // 对下一个yield出的值运行
        let next = it.next(value);
        return (function handleResult(next) {
            // 生成器运行完毕了吗？
            if (next.done) {
                return next.value;
            }
            // 否则继续运行
            else {
                return Promise.resolve(next.value).then(
                    // 成功就恢复异步循环，把决议的值发回生成器
                    handleNext,
                    // 如果value是被拒绝的 promise，
                    // 就把错误传回生成器进行出错处理
                    function handleErr(err) {
                        return Promise.resolve(
                            it.throw(err)
                        ).then(handleResult);
                    }
                );
            }
        })(next);
    });
}

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
    // 仿标准迭代器iterator接口的写法
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
    // 使用标准生成器generator，执行后就成为iterator
    // iterator有next，throw和return这三个方法
    const generator = function* () {
        try {
            let nextval;

            while (true) {
                if (nextval === undefined) {
                    nextval = 1;
                } else {
                    nextval = (3 * nextval) + 6;
                }

                yield nextval;
            }
        } finally {
            console.log('Clean up');
        }
    }

    for (let v of generator()) {
        console.log(v);

        if (v > 500) {
            break;
        }
    }
};

{
    // 异步迭代生成器普通版
    const callbackRequest = function(success, delay) {
        setTimeout(() => {
            // 请求前会阻断同步代码，请求后才决定iterator的返回
            if (success) {
                it.next('callback success');
            } else {
                it.throw('callback error');
            }
        }, delay);
    }

    // 看起来很像async-await
    const main = function* () {
        // try-catch本来是无法捕获异步错误的，这里是属于同步代码，迭代器暂停
        try {
            let result = yield callbackRequest(true, 1000);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    let it = main();
    it.next();
};

{
    // 异步迭代生成器配合Promise版
    const main = function* () {
        try {
            let result = yield promiseRequest(true, 2000);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    const it = main();
    // 此时value的值是一个request里返回的promise
    const promise = it.next().value;

    promise.then(res => {
        it.next(res);
    }, err => {
        it.throw(err);
    });
};

{
    // yield的同步和并行操作比较，根据上个迭代配合promise使用Generator Runner函数
    const mainStep = function* () {
        // 都是同步代码，p3是在6秒后才打印出来
        let p1 = yield promiseRequest(true, 1000);
        let p2 = yield promiseRequest(true, 2000);
        let p3 = yield promiseRequest(true, 3000);

        console.log(p3);
    }

    run(mainStep);

    // 生成器的Promise并发
    const mainAll = function* () {
        // 这样写的p1和p2是并行的，首先都进行请求，然后再进行yield，所用时间是2s+3s
        let p1 = promiseRequest('p1 yield', 1000);
        let p2 = promiseRequest('p2 yield', 2000);

        // 并行开始，并且两者都完成了才会继续执行p3
        let r1 = yield p1;
        let r2 = yield p2;

        let p3 = yield promiseRequest(`${r1} and ${r2}`, 3000);
        console.log(p3);
    }

    run(mainAll);

    // 当然也可以使用PromiseAll处理并发，换个方式
    const mainPromiseAll = function* () {
        let p1 = promiseRequest('p1 promiseAll yield', 1000);
        let p2 = promiseRequest('p2 promiseAll yield ', 2000);

        let results = yield Promise.all([p1, p2]);

        let [r1, r2] = results;

        let p3 = yield promiseRequest(`${r1} and ${r2}`, 3000);
        console.log(p3);
    }

    run(mainPromiseAll);
};

{
    // 使用现有的Async-Await进行上面的操作
    const mainStep = async function() {
        // 都是同步代码，p3是在6秒后才打印出来
        let p1 = await promiseRequest(true, 1000);
        let p2 = await promiseRequest(true, 2000);
        let p3 = await promiseRequest(true, 3000);

        console.log(p3);
    }

    mainStep();

    const mainAll = async function() {
        // 这样写的p1和p2是并行的，首先都进行请求，然后再进行await，所用时间是2s+3s
        let p1 = promiseRequest('p1 await', 1000);
        let p2 = promiseRequest('p2 await', 2000);

        // 并行开始，并且两者都完成了才会继续执行p3
        let r1 = await p1;
        let r2 = await p2;

        let p3 = await promiseRequest(`${r1} and ${r2}`, 3000);
        console.log(p3);
    }

    mainAll();

    // 当然也可以使用PromiseAll处理并发，换个方式
    const mainPromiseAll = async function() {
        let p1 = promiseRequest('p1 promiseAll await', 1000);
        let p2 = promiseRequest('p2 promiseAll await ', 2000);

        let results = await Promise.all([p1, p2]);

        let [r1, r2] = results;

        let p3 = await promiseRequest(`${r1} and ${r2}`, 3000);
        console.log(p3);
    }

    mainPromiseAll();

    /**
     * 这里注意，如果再使用Promise.all时，里面所有的promise进行了返回了catch，那么在Promise.all
     * 里就就算报错了，也会走all的then，而不会走catch，如果想分别报错捕获，就在每个promise里进行
     * catch处理并return出去，如果想只有一个报错就执行all的catch，就不要在里面写catch，注意
     * */
};

{
    // 生成器调用另一个生成器，依旧依赖Generator Runner
    const foo = function* () {
        let r1 = yield promiseRequest('p1 another', 1000);
        let r2 = yield promiseRequest(`${r1} and p2 another`, 2000);

        return r2;
    }

    const bar = function* () {
        let r3 = yield promiseRequest('p3', 100);
        let r2 = yield run(foo);

        console.log(r2);
    }

    run(bar);
};

{
    // 生成器调用另一个生成器，但使用yield委托，异步委托
    const foo = function* () {
        let r1 = yield promiseRequest('p1 another', 1000);
        let r2 = yield promiseRequest(`${r1} and p2 another 委托版`, 2000);

        return r2;
    }

    const bar = function* () {
        let r3 = yield promiseRequest('p3', 100);
        // 注意这里，使用的是yield*
        let r2 = yield* foo();

        console.log(r2);
    }

    run(bar);
};
/**
 * 你不知道的JavaScript(中卷) 第二部分 异步和性能
 */
{
    // 分时函数，每次计时器处理一段数据，避免一次处理过多数据
    const timeChunk = function (array = [], fn = () => { }, count = 1, interval = 200) {
        let obj, timer;

        const start = function () {
            for (let i = 0; i < Math.min(count, array.length); i++) {
                obj = array.shift();
                fn(obj);
            }
        }

        return function () {
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
    const timeChunkFn = timeChunk(dataArray, function (item) {
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

};
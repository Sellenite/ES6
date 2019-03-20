/**
 * [promiseAll description]
 * 都成功，按传入的数组顺序返回结果
 * 有失败，直接reject这个失败
 */
{
    let promiseAll = (arr) => {
        let result = new Array(arr.length).fill(undefined),
            count = arr.length;

        return new Promise((resolve, reject) => {
            for (let i = 0; i < arr.length; i++) {
                arr[i].then((res) => {
                    // 按顺序写入结果
                    result[i] = res;
                    if (--count === 0) {
                        resolve(result);
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        });
    }

    let p = (delay, name, type) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type === 'reject') {
                    reject(`error ${name}`);
                } else {
                    resolve(`success ${name}`);
                }
            }, delay);
        });
    }

    let p1 = p(3000, 'p1');
    let p2 = p(1000, 'p2', 'reject');

    promiseAll([p1, p2]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}
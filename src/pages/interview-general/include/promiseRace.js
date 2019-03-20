/**
 * [promiseRace description]
 * 里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
 */

{
    let promiseRace = (arr) => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < arr.length; i++) {
                // 一个成功直接返回
                arr[i].then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
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

    promiseRace([p1, p2]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}
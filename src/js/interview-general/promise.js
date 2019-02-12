{
    /**
     * 简易版Promise
     * 实现原理，执行从闭包带出来的resolve和reject函数
     * 然后再执行then，将函数压到执行栈中
     * 然后第一步的异步函数执行好了，就会利用resolve或reject执行栈中的函数
     */
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';

    const MyPromise = function(fn) {
        const that = this;
        this.state = PENDING;
        this.value = null;
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];

        function resolve(value) {
            // 执行环境不同，需要使用闭包变量
            if (that.state === PENDING) {
                that.state = RESOLVED;
                that.value = value;
                that.resolvedCallbacks.forEach(cb => cb(that.value));
            }
        }

        function reject(value) {
            if (that.state === PENDING) {
                that.state = REJECTED;
                that.value = value;
                that.rejectedCallbacks.forEach(cb => cb(that.value));
            }
        }

        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    MyPromise.prototype.then = function(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : r => {
            throw r
        };
        if (this.state === PENDING) {
            this.resolvedCallbacks.push(onFulfilled);
            this.rejectedCallbacks.push(onRejected);
        }
        if (this.state === RESOLVED) {
            onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected(this.value);
        }
    }

    const promise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('success');
        }, 2000)
    });

    promise.then(value => console.log(value));
};

{
    /* Promise/A+规范的Promise实现 */
};
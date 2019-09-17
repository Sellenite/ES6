{
    // call实现原理
    Function.prototype.myCall = function(context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error');
        }
        context = context || window;
        const args = [...arguments].slice(1);
        // 将函数绑定到上下文
        context.fn = this;
        const result = context.fn(...args);
        delete context.fn;
        return result;
    }

    const obj = {
        a: 1,
        b: 2
    };

    const func = function(val1, val2) {
        console.log(this.a, val1, val2);
    };

    func.myCall(obj, '00', '11');
};

{
    // apply实现原理，与call类似
    Function.prototype.myApply = function(context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error');
        }
        context = context || window;
        context.fn = this;
        let result;
        if (arguments[1]) {
            result = context.fn(...arguments[1]);
        } else {
            result = context.fn();
        }
        delete context.fn;
        return result;
    }

    const obj = {
        a: 1,
        b: 2
    };

    const func = function(val1, val2) {
        console.log(this.b, val1, val2);
    }

    func.myApply(obj, ['11', '00']);
};

{
    // bind实现原理
    Function.prototype.myBind = function(context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error');
        }
        const _this = this;
        const args = [...arguments].slice(1);
        // bind需要返回一个函数
        return function F() {
            // 因为返回了一个函数，如果进行了new F()，需要重新制定this
            if (this instanceof F) {
                return new _this(...args, ...arguments);
            }
            // 合并参数执行
            return _this.apply(context, [...args, ...arguments]);
        }
    }

    const obj = {
        a: 1,
        b: 2,
        c: 3
    };

    const func = function(val1, val2) {
        this.name = val1;
        console.log(this.c, val1, val2);
    };

    const bindF = func.myBind(obj, '11');
    const bindObj = new bindF('22');

    bindF('22');
    console.log(bindObj);
};

{
    // new实现原理
    const myNew = function() {
        // 创建一个对象
        const obj = {};
        const Constructor = [].shift.call(arguments);
        // obj原型指向原型链
        obj.__proto__ = Constructor.prototype;
        // 使obj得到构造函数的属性
        const result = Constructor.apply(obj, arguments);
        // 返回
        return typeof result === 'object' ? result : obj;
    }

    // 不使用__proto__
    const myNew2 = function(Foo, ...args) {
        const obj = Object.create(Foo.prototype);
        const result = Foo.apply(obj, args);
        if (typeof result === 'object') {
            return result;
        } else {
            // 构造函数不返回对象时执行，一般情况下是执行这行
            return obj;
        }
    }

    const Obj = function(name) {
        this.name = name;
    }

    const obj = myNew(Obj, 'yuuhei');

    console.log(obj.name);
};

{
    // Object.create实现原理
    const myCreate = function(obj) {
        let F = function() {};
        F.prototype = obj;
        return new F();
    }
}

{
    // instanceof实现原理，本质是遍历原型链
    const myInstanceof = function(left, right) {
        // 原本的instanceof只能根据原型链上判断，因此基础类型直接返回false
        if (typeof left !== 'object') {
            return false;
        }
        let prototype = right.prototype;
        left = left.__proto__;
        while (true) {
            if (left == null) {
                return false;
            }
            if (left === prototype) {
                return true;
            }
            left = left.__proto__;
        }
    };

    const Con = function() {};
    const obj = new Con();

    console.log(myInstanceof(obj, Con));
    console.log(myInstanceof('233', String));
};

{
    // Array.prototype.map实现，polyfill在mdn上有写
    Array.prototype.myMap = function(callbackfn, thisArg) {
        // 异常处理
        if (this == null) {
            throw new TypeError("Cannot read property 'map' of null or undefined");
        }
        // Step 1. 转成数组对象，有 length 属性和 K-V 键值对
        let O = Object(this);
        // Step 2. 无符号右移 0 位，左侧用 0 填充，结果非负
        let len = O.length >>> 0;
        // Step 3. callbackfn 不是函数时抛出异常
        if (typeof callbackfn !== 'function') {
            throw new TypeError(callbackfn + ' is not a function');
        }
        // Step 4.
        let T = thisArg;
        // Step 5.
        let A = new Array(len);
        // Step 6.
        let k = 0;
        // Step 7.
        while (k < len) {
            // Step 7.1、7.2、7.3
            // 检查 O 及其原型链是否包含属性 k，稀疏数组的就会被忽略
            // 只有 O 及其原型链上包含属性 k 时才会执行 callbackfn 函数，
            // 所以对于稀疏数组 empty 元素或者使用 delete 删除后的索引则不会被调用。
            if (k in O) {
                // Step 7.3.1
                let kValue = O[k];
                // Step 7.3.2 执行 callbackfn 函数
                // 传入 this, 当前元素 element, 索引 index, 原数组对象 O
                let mappedValue = callbackfn.call(T, kValue, k, O);
                // Step 7.3.3 返回结果赋值给新生成数组
                A[k] = mappedValue;
            }
            // Step 7.4
            k++;
        }
        // Step 8. 返回新数组
        return A;
    }
};

{
    Array.prototype.myFilter = function(callbackfn, thisArg) {
        // 异常处理
        if (this == null) {
            throw new TypeError("Cannot read property 'map' of null or undefined");
        }
        if (typeof callbackfn !== 'function') {
            throw new TypeError(callbackfn + ' is not a function')
        }

        let O = Object(this),
            len = O.length >>> 0,
            T = thisArg,
            A = new Array(len),
            k = 0
        // 新增，返回数组的索引
        let to = 0

        while (k < len) {
            if (k in O) {
                let kValue = O[k]
                // 新增
                if (callbackfn.call(T, kValue, k, O)) {
                    A[to++] = kValue;
                }
            }
            k++
        }

        // 新增，修改 length，初始值为 len
        A.length = to;
        return A
    }
};

{
    // 类似map，filter的实现可以看出，回调是使用call去执行的，所以在函数里使用break是无效的
    // 也就是说函数里使用break是无法跳出遍历的，forEach的实现与map类似，所以这就是原因
    // 如果想要退出循环，可以考虑使用for，for-in，for-of循环
};

{
    Array.prototype.myReduce = function(callbackfn, initialValue) {
        // 异常处理
        if (this == null) {
            throw new TypeError("Cannot read property 'map' of null or undefined");
        }
        if (typeof callbackfn !== 'function') {
            throw new TypeError(callbackfn + ' is not a function')
        }
        let O = Object(this)
        let len = O.length >>> 0
        let k = 0,
            accumulator

        // 新增
        if (initialValue) {
            accumulator = initialValue
        } else {
            // Step 4.
            if (len === 0) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            // Step 8.
            let kPresent = false
            // 这里目的就是取数组里第一个有值的数作为初始值
            while (!kPresent && (k < len)) {
                kPresent = k in O
                if (kPresent) {
                    accumulator = O[k]
                }
                k++
            }
        }

        while (k < len) {
            if (k in O) {
                let kValue = O[k]
                accumulator = callbackfn.call(undefined, accumulator, kValue, k, O)
            }
            k++
        }
        return accumulator
    };
}
/**
 * 你不知道的JavaScript(上卷) 第二部分 this和对象原型
 */
{
    (function() {
        var a = 'ALL';
        /* arguments.callee可以用来引用正在运行的函数，包括匿名函数 */
        setTimeout(function() {
            // 该方法是一种被废弃的方案，严格模式下会报错 console.log(arguments.callee);
        }, 300);

        /* 在函数普通模式下直接调用默认绑定的this为全局对象window */
        (function() {
            // 在严格模式下则不会默认绑定，this为undefined use strict一定要写在第一行
            'use strict';

            function foo() {
                console.log(this); // undefined
            }
            foo();
        })();

        /* 函数定义在非严格模式下，即使在严格模式下调用依然被默认绑定为window */
        function foo() {
            console.log(this);
        };

        (function() {
            'use strict';
            foo(); // window
        })();

        /* 隐式绑定例子 */
        (function() {
            function foo() {
                console.log(this.a);
            };

            var obj = {
                a: 233,
                foo: foo
            };

            obj.foo() // 2
        })();

        /**
         * 把基本数据类型转换为对应的引用类型的操作称为装箱，把引用类型转换为基本的数据类型称为拆箱
         * 装箱的最大作用是将值作为对象来处理
         */
        (function() {
            // 简易装箱
            function foo() {
                return this;
            };
            foo.call(true); // Boolean {[[PrimitiveValue]]: true}
            foo.call('123'); // String {[[PrimitiveValue]]: "123"}
            let num = foo.call(456); // Number {[[PrimitiveValue]]: 456}

            // 简易拆箱
            num.valueOf();
        })();

        {
            let foo = function() {
                console.log(this);
            };

            let abc = foo.bind(null);
            /* 严格模式下，this指向是null，但非严格模式下，this指向是window，注意 */
            abc();
        }

        /* 为了避免以上情况，使用DMZ来绑定更安全的this，避免默认绑定规则 */
        (function() {
            function foo(a, b) {
                console.log(this); // ALL
                console.log('a: ' + a + ', b: ' + b);
            }
            // 创建完全空的对象，DMZ
            var DMZ = Object.create(null);
            var bar = foo.bind(DMZ, 2);
            bar(4);
        })();

        /* 箭头函数不适用于以上几条规则 */
        (function() {
            function foo() {
                // 返回一个箭头函数
                return (a) => {
                    // this继承自foo
                    console.log(this.a);
                }
            }

            var obj1 = {
                a: 2
            }

            var obj2 = {
                a: 4
            }

            var bar = foo.call(obj1);
            bar.call(obj2); // 2，这里的call由于使用了箭头强制绑定了上下文，一直是obj1
        })();

        /* forEach的第二个参数可以绑定上下文，和bind效果一样 */
        (function() {
            [1, 3, 4].forEach(function(item, index) {
                console.log(item, this.name);
            }, { name: 'yuuhei' });
        })();
    })();
};

{
    let arr = [
        23,
        1,
        6,
        78,
        9,
        22,
        3,
        100
    ];
    let ret = [];
    arr.every((item) => {
        ret.push(item);
        /* 遍历每一个元素，直至返回false */
        return item % 11 !== 0;
    });
    console.log(ret);
};

{
    let arr = [
        23,
        1,
        6,
        78,
        9,
        22,
        3,
        100
    ];
    let ret = [];
    arr.some((item) => {
        ret.push(item);
        /* 遍历每一个元素，直至返回true */
        return item % 9 === 0;
    });
    console.log(ret);
};

{
    let arr = [2, 4, 6];
    for (let i of arr) {
        console.log(i);
    }
};

/* 数组自带迭代器，可以使用for-of遍历数组的值 */

{
    let arr = [1, 2, 3];
    let it = arr[Symbol.iterator]();
    console.log(it.next());
};

/* 对象本身没有迭代器，需要模仿后才能使用for-of */

/* 由于迭代器的属性就是Symbol.iterator，需要使用键值访问法 */
{
    let obj = {
        name: 'yuuhei',
        age: '232'
    };

    /* 这样定义可以不让Symbol被枚举，直接定义也是可以的 */
    Object.defineProperty(obj, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function() {
            var o = this;
            var index = 0;
            var keys = Object.keys(o);
            return {
                next: function() {
                    return {
                        value: o[keys[index++]],
                        done: (index > keys.length)
                    }
                }
            }
        }
    });
    for (let k of obj) {
        console.log(k);
    }
};

{
    let obj = {
        a: 1,
        b: 233,
        c: 445,
        [Symbol.iterator]: function() {
            var o = this;
            var idx = 0;
            var ks = Object.keys(o);
            return {
                next: function() {
                    return {
                        value: o[ks[idx++]],
                        done: (idx > ks.length)
                    }
                }
            }
        }
    }

    let it = obj[Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
};

{
    /* Object.create(obj)会将[[prototype]]关联到指定对象，继承就由于这个原理 */
    let obj = {
        a: 123
    }

    let obj2 = Object.create(obj);
    console.log(obj2.a)
};

{
    let obj = {
        age: 23
    };
    Object.defineProperty(obj, 'name', {
        writable: false,
        enumerable: false,
        configurable: false,
        value: 'yuuhei'
    });
    console.log(obj);
    for (let i in obj) {
        console.log(i) // age
    };

    /* 无论enumerable是什么，in操作符都能够判断key是否在obj中，并且寻找原型链 */
    console.log('name' in obj);
};

{
    /* ES6拥有Object.setPrototypeOf进行原型链继承 */
    let Foo = function() { };
    Foo.prototype.a = 1;
    let Bar = function() { };
    Object.setPrototypeOf(Bar.prototype, Foo.prototype);
    let bar = new Bar();
    console.log(bar.a);
};

{
    /* 组合继承 */
    let Foo = function(name) {
        this.name = name;
    };

    let Bar = function(name, age) {
        /* 绑定父亲的构造属性 */
        Foo.call(this, name);
        this.age = age;
    };

    /* 将Bar的[[prototype]]关联到Foo的，继承Foo的原型链属性 */
    Bar.prototype = Object.create(Foo.prototype);

    /* 修改过prototype后需要手动修复constructor的指向 */
    Bar.prototype.constructor = Bar;
    Bar.prototype.myName = function() {
        return this.name;
    };

    let bar = new Bar('yuuhei', 23);
    console.log(bar.myName());
    /* ES5直接获取一个对象的[[prototype]]的方式 */
    console.log(Object.getPrototypeOf(bar) === Bar.prototype);
    /* 绝大多数浏览器（非标准获取方式）支持 */
    console.log(bar.__proto__ === Bar.prototype);
    /* 继承也可以通过instanceof找到源头 */
    console.log(bar instanceof Foo);
};

{
    /* Object.create自带第二个参数可以定义属性描述符 */
    let obj = {
        a: 2
    };

    let obj2 = Object.create(obj, {
        b: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 3
        },
        c: {
            writable: false,
            enumerable: false,
            configurable: true,
            value: 3
        }
    });

    // obj2的原型链上连接了obj的原型链
    console.log(obj2.a); // 2
    console.log(obj2.hasOwnProperty('a')); // false
    console.log(obj.hasOwnProperty('a'));
};

{
    /* 神奇的API设计，由于本身内部没有该函数，却能够运行，会变得怪怪的 */
    /* 面向委托模式来源于Object.create()这个特性 */
    let obj = {
        cool: function() {
            console.log('cool!');
        }
    };

    let obj2 = Object.create(obj);
    obj2.cool(); // cool!
};

{
    /* 经典类继承面向对象风格 */
    let Foo = function(name) {
        this.name = name;
    };

    let Bar = function(name, age) {
        Foo.call(this, name);
        this.age = age;
    };

    Bar.prototype = Object.create(Foo.prototype);
    Bar.prototype.constructor = Bar;
    let bar1 = new Bar('yuuhei', 22);
    let bar2 = new Bar('Sellenite', 24);
    console.log(bar1, bar2);
};

{
    /* 对象委托关联风格 */
    let Foo = {
        init: function(name) {
            this.name = name;
        },
        identify: function() {
            return `I am ${this.name}`;
        }
    };

    let Bar = Object.create(Foo);
    Bar.speak = function() {
        console.log(this.identify());
    };

    let b1 = Object.create(Bar);
    let b2 = Object.create(Bar);
    b1.init('yuuhei');
    b2.init('Sellenite');
    b1.speak();
    b2.speak();
    console.log(Bar); // {speak:f()}
    console.log(b1); // {name: 'yuuhei'}
};

{
    /* 反词法 */
    /* ES6以下的简洁写法会编译成匿名函数，无法进行递归 */
    let Foo = {
        // 最好不要使用this.bar()或Foo.bar()执行递归，因为可用实际情况比较少
        bar() { }
    };

    // 以上实际会编译成以下方式
    let Foo1 = {
        bar: function() { }
    };

    // 如果要想使用递归，不要使用简介方式，需要使用具名函数表达式
    let Foo2 = {
        count: 0,
        bar: function baroooo() {
            if (this.count < 10) {
                console.log('loading------>' + this.count);
                this.count++;
                /* 具名函数进行自我递归 */
                baroooo.call(this);
            }
        }
    };

    Foo2.bar();
};

{
    let Foo = function(name) {
        this.name = name;
    };

    let Bar = function(name, age) {
        Foo.call(this, name);
        this.age = age;
    };

    Bar.prototype = Object.create(Foo.prototype);

    let bar = new Bar('yuuhei', 23);

    /* 内省 */
    // 首先要纠正错误，Bar instanceof Foo是错的

    /* 构造函数之间Foo和Bar的内省 */
    Bar.prototype instanceof Foo; // true
    Object.getPrototypeOf(Bar.prototype) === Foo.prototype; // true
    Foo.prototype.isPrototypeOf(Bar.prototype); // true

    /* 实例和构造函数之间的内省 */
    bar instanceof Bar; // true
    bar instanceof Foo; // true
    Object.getPrototypeOf(bar) === Bar.prototype; /// true
    Foo.prototype.isPrototypeOf(bar); // true
    Bar.prototype.isPrototypeOf(bar); // true
};

{
    /* Orbment.prototype.call(this, ...)是伪多态 */
    class Orbment {
        constructor(name) {
            this.name = name || 'Orbment';
            this.message = null;
        }
        setSize(width, height) {
            this.width = width || 50;
            this.height = height || 50;
            this.message = `The ${this.name} `;
        }
        getMessage() {
            return this.message;
        }
    }

    class ENIGMA extends Orbment {
        constructor(name, width, height) {
            // super()在constructor必须在this调用前执行
            super(name);
            this.width = width || 50;
            this.height = height || 50;
        }
        setSize(width, height) {
            // 以前的伪多态写法：Orbment.prototype.setSize.apply(this, [width, height])
            // 注意出版书上的super(width, height)在constructor外使用已被禁止，改为替换以下方式实现相对多态
            super.setSize(width, height);
            this.message += `size is width ${this.width} and height ${this.height}`;
            return this;
        }
    }

    class ARCUS extends Orbment {
        constructor(name, width, height) {
            // super()在constructor必须在this调用前执行
            super(name);
            this.width = width || 50;
            this.height = height || 50;
        }
        setSize(width, height) {
            // 以前的伪多态写法：Orbment.prototype.setSize.apply(this, [width, height])
            // 注意出版书上的super(width, height)在constructor外使用已被禁止，改为替换以下方式实现相对多态
            super.setSize(width, height);
            this.message += `size is width ${this.width} and height ${this.height}`;
            return this;
        }
    }

    let ENIGMA_I = new ENIGMA('ENIGMA_I');
    let ENIGMA_I_SIZE_MESSAGE = ENIGMA_I.setSize().getMessage();

    let ARCUS_I = new ARCUS('ARCUS_I');
    let ARCUS_I_SIZE_MESSAGE = ARCUS_I.setSize(100, 70).getMessage();

    console.log(ENIGMA_I_SIZE_MESSAGE);
    console.log(ARCUS_I_SIZE_MESSAGE);
};

{
    /* class并不是静态，只是一个prototype的语法糖，使用prototype仍可修改 */
    class Random {
        constructor() {
            this.num = Math.random();
        }

        rand() {
            console.log(this.num);
        }
    }

    let r1 = new Random();
    r1.rand();

    Random.prototype.rand = function() {
        console.log(this.num * 1000);
    };

    let r2 = new Random();
    r2.rand();
};
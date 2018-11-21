window.GLOBAL = 'ALL_ELEMENT';

{
    /* 永远不要使用eval，它可以执行任何传给它的字符串，很容易遭受XSS攻击 */
    // eval在严格模式下有自己的作用域
    let testEval = function(str, b) {
        // "use strict"; 使用这句后会报ReferenceError，a is not defined
        eval(str); // 欺诈行为
        console.log(a, b);
    }

    testEval("var a = 2;", 4); // 2, 4 顺利改写a
};

{
    /* 永远不要使用with进行对象赋值，操作不当很有可能泄漏都全局变量 */
    // with在严格模式下被完全禁止，以下代码为泄漏全局变量的例子，在非严格模式下执行
    /*
    let testWith = function(obj) {
        with(obj) {
            _a = 'with revise successfully';
        }
    }

    let obj1 = {
        "_a": 233
    };
    let obj2 = {
        "_b": 445
    };

    testWith(obj1); // obj1._a = with revise successfully
    testWith(obj2); // obj2._a = undefined
    console.log(window._a); // with revise successfully，由于作用域问题泄漏到全局变量
    */
};

{
    /* 回调函数参数是函数表达式，并不是函数声明 */
    setTimeout(function timeoutHandler() {
        console.log('global setTimeout')
    }, 300);
};

{
    let a = 233;
    /* 立即执行函数第一个括号里的内容被当作函数表达式 */
    (function() {
        var a = 1
        console.log('inner IIFE', a);
    })();

    /* 立即执行函数也可以拥有函数名，也可以传参 */
    (function IIFE(a) {
        console.log('global IIFE', a);
    })(a);

    /* 以上代码语义上等同于下面，上面的IIFE全局下是无法访问的 */
    var IIFE = function(a) {
        console.log('global IIFE2', a);
    }(a);

    /* UMD，将函数表达式传进IIFE的模式 */
    (function(fn) {
        fn(window);
    })(function def(global) {
        var a = 2;
        console.log('inner UMD', a);
        console.log('global UMD', global.GLOBAL);
    });
};

{
    /* var变量声明提升 */
    (function() {
        console.log(a); // undefined
        var a = 2;
    })();

    /* 以上代码等同于下面 */
    (function() {
        var a;
        console.log(a);
        var a = 2;
    })();

    /* 函数声明可以提前，函数表达式的声明会像上面变量一样的提升成undefied */
    foo();

    function foo() {
        console.log('foo');
    }

    /* 函数表达式提升成undefined，执行undefined会报TypeError，而不是ReferenceError */
    try {
        bar();
        var bar = function() {
            console.log('bar');
        };
    } catch (error) {
        console.log(error);
    }
};

{
    (function() {
        /* 基础标准闭包 */
        function foo() {
            var a = 2;
            return function() {
                console.log(a);
            };
        }

        var baz = foo();
        baz();

        /* 闭包循环 */
        for (var i = 0; i < 4; i++) {
            (function(j) {
                setTimeout(function timeoutHandler() {
                    console.log(j);
                }, j * 300);
            })(i)
        }

        /* 基本模块设计模式 */
        function coolModule() {
            var something = 'cool';
            var another = [1, 2, 3];

            function doSomething() {
                console.log(something);
            }

            var baz = foo();
            baz();

            /* 闭包循环 */
            for (var i = 0; i < 4; i++) {
                (function(j) {
                    setTimeout(function timeoutHandler() {
                        console.log(j);
                    }, j * 300);
                })(i)
            }

            /* 基本模块设计模式 */
            function coolModule() {
                var something = 'cool';
                var another = [1, 2, 3];

                function doSomething() {
                    console.log(something);
                }

                function doAnother() {
                    console.log(another.join('!'));
                }

                return { doSomething: doSomething, doAnother: doAnother };
            }

            var cool = coolModule();
            cool.doAnother();
            cool.doSomething();

            /* 现代模块依赖加载器，类requireJS模式 */
            var MyModules = (function Manager() {
                var modules = {};

                function define(name, deps, impl) {
                    for (var i = 0; i < deps.length; i++) {
                        deps[i] = modules[deps[i]];
                    }
                    // 最主要函数，使用函数返回值执行
                    modules[name] = impl.apply(impl, deps);
                };

                function get(name) {
                    return modules[name];
                };

                return { define: define, get: get };
            })();

            MyModules.define('foo', [], function() {
                var _this = this;

                function hello() {
                    console.log(_this);
                };

                return { hello: hello };
            })

            MyModules.define('bar', ['foo'], function(foo) {
                function hi() {
                    console.log('bar with foo');
                    foo.hello();
                };

                return { hi: hi };
            });

            var Foo = MyModules.get('foo');
            var Bar = MyModules.get('bar');
            Bar.hi();

        };

        {
            /* Traceur项目try-catch解决ES6以前的级作用域 */
            try {
                throw undefined;
            } catch (catchValue) {
                // 外部无法访问或使用这个变量
                catchValue = 2;
                console.log('try-catch block', catchValue);
            }

            /* 显式创建块级作用域 */
            {
                let a = 2;
                const readonly = 'yuuhei';
                console.log(a, readonly)
            }

            /* bind解决setTimeout等时被绑定window为上下文 */
            var obj = {
                count: 1,
                cool: function() {
                    if (this.count < 5) {
                        setTimeout(function() {
                            this.count++;
                            console.log('more awesome: ', this.count);
                        }.bind(this), this.count * 300);
                    }
                }
            }
            obj.cool();

            /* 箭头函数绑定前后上下文 */
            var object = {
                count: 3,
                cool: function() {
                    if (this.count < 5) {
                        setTimeout(() => {
                            this.count++;
                            console.log('more awesome arrow: ', this.count);
                        }, this.count * 300);
                    }
                }
            }
            object.cool();
        }
    })();
}
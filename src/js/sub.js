/*
 * @Author: yuuhei 
 * @Date: 2018-01-11 13:46:05 
 * @Last Modified by: yuuhei
 * @Last Modified time: 2018-01-12 17:11:28
 */
{
    let arr = [23, 1, 6, 78, 9, 22, 3, 100]
    let ret = []
    arr.every((item) => {
        ret.push(item)
        /* 遍历每一个元素，直至返回false */
        return item % 11 !== 0
    })
    console.log(ret)
}

{
    let arr = [23, 1, 6, 78, 9, 22, 3, 100]
    let ret = []
    arr.some((item) => {
        ret.push(item)
        /* 遍历每一个元素，直至返回true */
        return item % 9 === 0
    })
    console.log(ret)
}

{
    let arr = [2, 4, 6]
    for (let i of arr) {
        console.log(i)
    }
}

/* 数组自带迭代器，可以使用for-of遍历数组的值 */

{
    let arr = [1, 2, 3]
    let it = arr[Symbol.iterator]()
    console.log(it.next())
}

/* 对象本身没有迭代器，需要模仿后才能使用for-of */

/* 由于迭代器的属性就是Symbol.iterator，需要使用键值访问法 */
{
    let obj = {
        name: 'yuuhei',
        age: '232'
    }

    /* 这样定义可以不让Symbol被枚举，直接定义也是可以的 */
    Object.defineProperty(obj, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function () {
            var o = this
            var index = 0
            var keys = Object.keys(o)
            return {
                next: function () {
                    return {
                        value: o[keys[index++]],
                        done: (index > keys.length)
                    }
                }
            }
        }
    })

    for (let k of obj) {
        console.log(k)
    }
}

{
    let obj = {
        a: 1,
        b: 233,
        c: 445,
        [Symbol.iterator]: function () {
            var o = this
            var idx = 0
            var ks = Object.keys(o)
            return {
                next: function () {
                    return {
                        value: o[ks[idx++]],
                        done: (idx > ks.length)
                    }
                }
            }
        }
    }

    let it = obj[Symbol.iterator]()
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())
}

{
    /* Object.create(obj)会将[[prototype]]关联到指定对象，继承就由于这个原理 */
    let obj = {
        a: 123
    }

    let obj2 = Object.create(obj)
    console.log(obj2.a)
}

{
    let obj = {
        age: 23
    }
    Object.defineProperty(obj, 'name', {
        writable: false,
        enumerable: false,
        configurable: false,
        value: 'yuuhei'
    })
    console.log(obj)

    for (let i in obj) {
        console.log(i) // age
    }

    /* 无论enumerable是什么，in操作符都能够判断key是否在obj中，并且寻找原型链 */
    console.log('name' in obj)
}

{
    /* ES6拥有Object.setPrototypeOf进行原型链继承 */
    let Foo = function () {}
    Foo.prototype.a = 1
    let Bar = function () {}
    Object.setPrototypeOf(Bar.prototype, Foo.prototype)
    let bar = new Bar()
    console.log(bar.a)
}

{
    /* 组合继承 */
    let Foo = function (name) {
        this.name = name
    }

    let Bar = function (name, age) {
        /* 绑定父亲的构造属性 */
        Foo.call(this, name)
        this.age = age
    }

    /* 将Bar的[[prototype]]关联到Foo的，继承Foo的原型链属性 */
    Bar.prototype = Object.create(Foo.prototype)

    /* 修改过prototype后需要手动修复constructor的指向 */
    Bar.prototype.constructor = Bar

    Bar.prototype.myName = function () {
        return this.name
    }

    let bar = new Bar('yuuhei', 23)
    console.log(bar.myName())
    /* ES5直接获取一个对象的[[prototype]]的方式 */
    console.log(Object.getPrototypeOf(bar) === Bar.prototype)
    /* 绝大多数浏览器（非标准获取方式）支持 */
    console.log(bar.__proto__ === Bar.prototype)
    /* 继承也可以通过instanceof找到源头 */
    console.log(bar instanceof Foo)
}

{
    /* Object.create自带第二个参数可以定义属性描述符 */
    let obj = {
        a: 2
    }

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
        },
    })

    // obj2的原型链上连接了obj的原型链
    console.log(obj2.a) // 2
    console.log(obj2.hasOwnProperty('a')) // false
    console.log(obj.hasOwnProperty('a'))
}

{
    /* 神奇的API设计，由于本身内部没有该函数，却能够运行，会变得怪怪的 */
    let obj = {
        cool: function () {
            console.log('cool!')
        }
    }

    let obj2 = Object.create(obj)
    obj2.cool() // cool!
}
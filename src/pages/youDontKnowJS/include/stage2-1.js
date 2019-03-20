/**
 * 你不知道的JavaScript(中卷) 第一部分 类型和语法
 */
{
    let a = null;
    let b = {
        name: 'yuuhei'
    };
    let c = [1, 3];
    console.log(typeof a, typeof b, typeof c);
};

{
    /* 复合条件检测null */
    let a = null;
    console.log(!a && typeof a === 'object'); // true
};

{
    /* 函数对象的length是声明参数的个数 */
    let foo = function (a, b, c) { };
    console.log(foo.length); // 3
};

{
    /* 声明了还没赋值属于undefined */
    /* 还没声明属于undeclared（javascript还是会打印undefined） */
};

{
    /* typeof一个var声明了但未定义值的话会打印undefined */
    /* typeof一个完全没有声明及定义值的话同样也会打印undefined */
};

{
    let IIFE = 2;
    /* typeof判断当前作用域变量是否被定义 */
    let helper = (typeof IIFE !== 'undefined') ?
        IIFE :
        function () {
            /* somethings */
        };
    /* 使用typeof来检查变量是首选的选择 */
    console.log(helper); // 2
};

{
    /* 用依赖注入设计模式来验证当前作用域变量是否被定义 */
    let helper = function (IIFE) {
        let helper2 = IIFE || function () {
            /* somethings */
        };
    };
};

{
    /* 创建稀疏数组，空白的地方会被显式赋值为undefined */
    let arr = [];
    arr[0] = 0;
    arr[4] = 4;
    console.log(arr.length); // 5
};

{
    /* 数组也是对象，可以包含字符串键值和属性，但不计入于数组的长度 */
    let arr = [1, 3, 5];
    arr['name'] = 'yuuhei';
    arr['age'] = 23;
    console.log(arr, arr.length); // 3
};

{
    /* 注意，如果字符串键值能够转换为十进制数字，会被当作数字索引处理 */
    let arr = [1, 3, 5];
    arr['5'] = 100;
    console.log(arr);
};

{
    /* 类数组及数组副本建立 */
    // 类数组转换
    let foo = function () {
        let arr = Array.prototype.slice.call(arguments);
        console.log(arr)
    }
    foo()

    // 数组副本
    let arr = [1, 3, 5];
    let arrCopy = Array.prototype.slice.call(arr);
    arr.push(100);
    arrCopy.push(200);
    console.log(arr, arrCopy);

    // ES6的Array.from也能够建立副本
    let arr2 = [2, 4, 6];
    let arrCopy2 = Array.from(arr2);
    arr2.push(100);
    arrCopy2.push(200);
    console.log(arr, arrCopy2);
};

{
    /* 访问字符串某个下标应该用.charAt()，老版本IE不允许string[index]这样访问 */
    /* 以上只能够进行字符串访问，无法进行字符串修改 */
    let string = 'foo';
    console.log(string[0]);
    console.log(string.charAt(2));
};

{
    /* 数字值可用指数表示 */
    let a = 5E10;
    console.log(a);
};

{
    let a = 42.59;
    /* .toFixed()用于指定小数显示多少个 */
    console.log(a.toFixed(4));
    /* .toPrecision()用于指定多少个有效数位 */
    console.log(a.toPrecision(5));
};

{
    /* ES6，严格模式不再支持0开头的八进制数 */
    // let a = 0363;
    // console.log(a);  SyntaxError

    /* ES6和严格模式下的八进制是用0o前缀表示 */
    let a = 0o363;
    console.log(a); // 243
};

{
    /* 注意0.1+0.2不等于0.3，存在精度问题 */
    let a = 0.1 + 0.2;
    let b = 0.3;
    console.log(a === b); // false
};

{
    /* NaN不与NaN相等，typeof NaN的值为'number' */
    console.log(typeof NaN); // number
    console.log(NaN === NaN); // false
};

{
    /* window有一个全局方法isNaN()，但这个有bug，会将NaN和字符串也会判断为true */
    /* ES6的Number.isNaN()修复了这个问题，他会先用typeof判断为number再执行此方法
    （上面提到typeof NaN返回的是'number'） */
    let a = 'foo';
    let b = 10 / 'foo';
    console.log(window.isNaN(a)); // true, bug
    console.log(window.isNaN(b)); // true

    console.log(Number.isNaN(a)); // false，修复了
    console.log(Number.isNaN(b)); // true

    /* 判断是否NaN的更简单方法 */
    let IsNaN = function (n) {
        return n !== n;
    }

    console.log(IsNaN(b)); // true
};

{
    /* 关于-0，0 === -0是true */
    /* 使用JSON.stringify()进行数字转为字符串，-号消失；字符串转为数字，-号保留 */
    /* JSON.stringify(-0) 返回"0"，而JSON.parse("-0") 返回-0 */
    console.log(0 === -0); // true
    console.log(JSON.stringify(-0), JSON.parse('-0'));

    /* 判断是否为负0的方法 */
    let isMinZero = function (n) {
        n = Number(n);
        return (n === 0) && (1 / n === -Infinity);
    }

    console.log(isMinZero(-0)); // true
};

{
    /* 原生函数 */
    // String()
    // Number()
    // Object()
    // Array()
    // Boolean()
    // Function()
    // RegExp()
    // Error()
    // Date()
    // Symbol()
};

{
    /* typeof new String('123')会返回object */
    let a = new String('Hello');
    console.log(a); // String {"Hello"}

    /* 使用String.prototype.toString()能够返回string字符串 */
    console.log(a.toString()); // "Hello"
    console.log(String.prototype.toString.call(a)); // "Hello"

    /* 与本身构造函数的valueOf()功能相同 */
    console.log(a.valueOf()); // "Hello"
    console.log(String.prototype.valueOf.call(a)); // "Hello"

    /* Object.prototype是不同的 */
    console.log(Object.prototype.toString.call(a)); // [object String]
    console.log(Object.prototype.valueOf.call(a)); // String {"Hello"}
};

{
    /* 查看一个内部属性[[class]]使用Object.prototype.toString.call() */
    let a = new Boolean(false);
    console.log(Object.prototype.toString.call(a)); // [object Boolean]
};

{
    /* 想要得到封装对象的基本类型值，可以使用valueOf()函数 */
    let a = new String('Hello');
    console.log(a.valueOf());

    /* 隐式拆封 */
    let b = a + "";
    console.log(b);
};

{
    /* 尝试对一个new String/Boolean/Number进行隐式访问，会造成强制类型转换
       会访问对应的构造函数原型链上的valueOf方法 */
    let string = new String('string1');
    // 隐式访问，实际是调用返回了String.prototype.valueOf的值，强制类型转换
    if (string.indexOf(1) !== -1) {
        console.log('new String direct read');
    }
};

{
    /* 当使用表达式+时，其中一个操作数是string（包含强制转换结果），
       则执行字符串拼接，否则执行数字加法 */
    console.log([] + 1); // []被强制执行.toString，得到空字符，结果为"1"
    console.log("4" + 1); // 41
};

{
    /* 当new Array的时候只传入一个数，
       执行的是创建一个数组，长度为10，且全为空单元（非undefined）填充 */
    /* 空单元和undefined是有区别的，注意 */
    let a = Array(10); // new可以省略，js会自动补加
    console.log(a, a.length);

    /* 清空一个数组可以使用array.length = 0 */
    let b = [2, 4, 6];
    b.length = 0;
    console.log(b);

    /* 创建一个全是undefined（非空单元）填充的数组 */
    /* array.length这样强行修改会用空单元填充多余的空位 */
    let c = Array.apply(null, { length: 3 });
    console.log(c); // [undefined, undefined, undefined]

    /* 永远不要创建和使用空单元数组 */
};

{
    // String.prototype的各类方法，不修改原字符串
    // String#.indexOf
    // String#.charAt
    // String#.substr String#.substring String#.slice()
    // String#.toUpperCase String#.toLowerCase()
    // String#.trim
};

{
    /* Symbol使用原生构造函数来定义，不用加new */
    let myown = Symbol('deleteSomething');
    let obj = {};
    obj[Symbol('deleteSomething')] = function () {
        /* doSomething */
    }
    console.log(obj);
    console.log(Object.getOwnPropertySymbols(obj));

    /* 具有唯一性，很多开发喜欢使用这个用于私有属性代替_function */
};

{
    /* JSON.stringify()在遇到undefined，function，symbol这三个不安全值时，
       在对象会将其自动忽略，在数组中返回null，在一般调用会返回undefined */
    console.log(JSON.stringify(undefined)); // undefined
    console.log(JSON.stringify(function () { })); // undefined
    // "{"a": 2}"
    console.log(JSON.stringify({ a: 2, b: function () { } }));
    // "["yuuhei", null, null, 4]"
    console.log(JSON.stringify(['yuuhei', undefined, function () { }, 4]));
};

{
    /* JSON.stringify有一个很实用的replacer，可以对数据进行筛选处理 */
    // 可以是数组或函数
    let obj = {
        a: 2,
        b: "22",
        c: [1, 2, 3]
    }
    // replacer为数组时的作用
    let json1 = JSON.stringify(obj, ["a", "b"]); // 只序列化key值为a和b的
    console.log(json1); // "{"a":2,"b":"22"}"

    // replacer为function时的作用
    let json2 = JSON.stringify(obj, function (key, value) {
        if (key !== "a")
            return value;
    });
    console.log(json2); // "{"b":"22","c":[1,2,3]}"

    // 第三个参数space，还可以调缩进，自动进行格式化，还可以是填充字符串
    let json3 = JSON.stringify(obj, null, 4);
    console.log(json3);
    // {
    //    "a": 2,
    //    "b": "22",
    //    "c": [
    //        1,
    //        2,
    //        3
    //    ]
    // }
};

{
    /* 以下布尔假植在强制转换的时候结果都为false，强制转换是!! */
    // undefined, null, fasle, +0, -0, NaN, ""
    console.log(!!undefined || !!null || !!false || !!0 || !!NaN || !!""); // false
    // document.all在某些IE和某些浏览器是为真值，在某些浏览器下为假值，是一个类数组

    /* 假值之外都是真值，转换后都为true */
};

{
    /* 显式强制类型转换 */
    // 字符串和数字之间的显式转换，不要使用new，并不是创建对象
    let a = 22;
    let b = "3.14";

    let c = String(a);
    let d = Number(b);

    console.log(c, d); // "22", 3.14

    // 另一种方法的显式转换
    let e = a.toString(); // 调用的是Number.prototype.toString
    let f = +b;
    console.log(e, f); // "22", 3.14
};

{
    // 日期显示转换为数字（相当于.getTime()功能）
    let a = new Date();
    console.log(+a, a.getTime());

    // 当实例化一个构造函数的时候如果没有参数传入，可以不加()
    console.log(+new Date);

    // ES5的Date有一个获取当前时间戳的API，其polyfill就是+new Date()
    console.log(Date.now());
};

{
    /* parseInt的使用 */

    // Number()针对的是字符串，要求所有字符都是数字，否则返回NaN
    // parseInt()可以忽略不是数字字符的字符串，遇到非数字字符则停止转换，若第一个不是数字则返回NaN
    let a = '12aa45';
    let b = '456';
    let c = 'aa123456';

    console.log(parseInt(a), Number(a)); // 12, NaN
    console.log(parseInt(b), Number(b)); // 12, 456
    console.log(parseInt(c), Number(c)); // NaN, NaN
};

{
    /* parseInt的第二个参数转制问题，将当前数值定义为自定义进制，不用加前缀
       然后转换为数字，所有都会被转为十进制 */

    // 如果需要在ES5之前的环境运行并且没有polyfill，需要手动加上第二个参数10
    // 强制转换为十进制，不然会被转为八进制，避免不必要的坑

    let a = "100";
    let b = 256;

    console.log(parseInt(a, 16)); // 256
    console.log(parseInt(a, 8)); // 64
    console.log(parseInt(a, 2)); // 4
    console.log(parseInt(a, 10)); // 100

    /* toString()传入参数，可以将当前数值转换为指定进制 */
    console.log(b.toString(16)); // 100
};

{
    /* 自定义转换 */

    // 十进制数值转为自定义进制：
    let decimalToOther = function (num, transform) {
        /* 返回的是字符串，用于展示 */
        var num = +num;
        var transform = +transform;
        if (transform === 16) {
            return '0x' + num.toString(16);
        } else if (transform === 8) {
            return '0o' + num.toString(8);
        } else {
            return num.toString(transform);
        }
    }

    console.log(decimalToOther(100, 8)); // "0o144"

    // 其他转制转换为十进制（传入标准格式0X或0o等字符串格式）：
    let otherToDecimal = function (num) {
        /* 返回数字 */
        var num = num.toLowerCase();
        if (num.indexOf('0x') === 0) {
            return parseInt(num.replace(/0x/, ''), 16);
        } else if (num.indexOf('0o') === 0) {
            return parseInt(num.replace(/0o/, ''), 8);
        } else {
            return parseInt(num, 10);
        }
    }

    console.log(otherToDecimal('0x100')); // 256
};

{
    /* boolean显示转换，建议使用!!用来转换 */
    let a = "asd";
    let b = [];
    let c = {};

    // 注意空数组和空对象都是返回true。是真值，所有的假值上面有提到
    console.log(Boolean(a)); // true
    console.log(!!b); // true
    console.log(!!c); //true
};

{
    let arr = [2, function () { }, 4, function () { }];

    console.log(JSON.stringify(arr));

    let json = JSON.stringify(arr, function (key, value) {
        if (typeof value === 'function') {
            return true;
        } else {
            return value
        }
    });

    console.log(json); // [2,true,4,true]
};

{
    /* || 或 && 返回的不一定是布尔值 */

    // 对于||，如果当前值判断为true，就会返回当前值
    console.log(false || "ss" || 110); // "ss"

    // 对于&&，只要有一个值判断为false，就返回判断为false的那个值，
    // 否则返回最后一个值
    console.log("55" && undefined && 110); // undefined
    console.log("55" && null && 110); // null
    console.log("55" && function () { } && 110); // 110

    // 所以||会有一个常用作用：传参判断
    let func = function (a, b) {
        a = a || 'Hello';
        b = b || 'World';
        return a + " " + b;
    }
    console.log(func('Hi')); // Hi World
    console.log(func('Hi', "")); // 注意这里传入了假值，结果依然是Hi World
    console.log(func('Hi', " ").trim()); // 传入空字符则判断为true，返回Hi

    console.log(typeof "") // string，如有需求可以通过这个进行容错

    // 所以&&会有一个常用作用：判断参数是否为true，是则执行一个函数
    true && (function () {
        console.log('this is && function!');
    })();
};

{
    /* 注意ES6的Symbol只能够通过显式转换为字符串，使用隐式将会报错 */
    let symbol = Symbol('symbolElement');
    console.log(String(symbol)); // "Symbol(symbolElement)"

    // symbol + "" 这样隐式转换会报错

    // Symbol无法转换为数字，显示和隐式都会出错

    // Symbol可以转换为boolean，隐式显式都转换为true
    console.log(Boolean(symbol)); // true
    console.log(!!symbol); // true
};

{
    /* 关于==和===的使用准则 */

    // 当两边有值为true和false的时候，前往不要使用==
    // 当两边有值为[]，""，0时，尽量不要使用==
    // 使用===是最安全的选择
};

{
    /* ++表达式 */
    let a = 43;
    let b = (a++ , a);
    console.log(b); // 正确将44赋值给b
};

{
    /* ES6的参数预留值可以理解为使用了let，存在暂时性死区TDZ */
    // 下面声明赋值b的时候，同时进行了访问，这样在ES6有些情况会报错
    let testTDZ = function (a = 3, b = a + b + 3) {
        console.log(a, b); // 不报错就输出NaN
    }
    // testTDZ();
};

{
    /* 宿主变量 */
    let div = document.createElement('div');
    console.log(typeof div); // object
    console.log(Object.prototype.toString.call(div)); // [object HTMLDivElement]
    console.log(div.tagName); // DIV
};

{
    /* 由于浏览器历史遗留问题，在创建带有id 属性的DOM 元素时也会创建同名的全局变量 */
    // <div id="app"></div>
    console.log(app); // 一个元素的id为app写在html，window全局对象就带有这个属性
}
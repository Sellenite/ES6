{
  // 对一个没有声明的值唯一不会报错的操作：typeof
  console.log(typeof unDefValue); // undefined
}

{
  // 同时可以判断不是undefined或不是null
  let unDefValue;
  let nullValue = null;
  console.log(unDefValue == null); // true
  console.log(nullValue == null); // true
}

{
  // 八进制0o70，十六进制0xA
  // 0、+0 或-0相除会返回NaN
  console.log(0/0); // NaN
  console.log(-0/+0); // NaN

  // 如果分子是非 值，分母是有符号0或无符号0，则会返回Infinity或-Infinity
  console.log(5/0); // Infinity
  console.log(5/-0); // -Infinity
}

{
  // 有3 个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()。Number()是转型函数，可用于任何数据类型。后两个函数主要用于将字符串转换为数值。对于同样的参数，这3个函数执行的操作也不同。
  // Number()函数基于如下规则执行转换。
  // - 布尔值，true 转换为1，false 转换为0。
  // - 数值，直接返回。
  // - null，返回0。
  // - undefined，返回NaN。
  // - 字符串，应用以下规则。
  //   - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。
  // 因此，Number("1")返回1，Number("123")返回123，Number("011")返回11（忽略前面
  // 的零）。
  //   - 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
  //   - 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整
  // 数值。
  //   - 如果字符串包含有效的八进制格式如"0o70"，则会转换为与该八进制值对应的十进制整数值
  //   - 如果是空字符串（不包含字符），则返回0。
  //   - 如果字符串包含除上述情况之外的其他字符，则返回NaN。
  //   - 对象，调用valueOf()方法，并按照上述规则转换返回的值。如果转换结果是NaN，则调用
  // toString()方法，再按照转换字符串的规则转换
}

{
  // parseInt()支持第二个参数用于说明传入的参数是什么进制，parseFloat()不支持
  // parseFloat()只解析十进制，遇到八进制或十六进制会直接返回0
  // 如果第一个字符不是数值字符、加号或减号，parseInt()立即返回NaN，即parseInt('')也会返回NaN，这个与Number不一样，需要注意
}

{
  // 模板字面量保留换行字符\n，可以跨行定义字符串
  const element = `
    <div>
      <p>para</p>
    </div>
  `;
  console.log(element);
  // 模板字面量所有插入的值都会使用toString()强制转型为字符串
  const val = {
    toString() {
      return 'test string template'
    }
  }
  console.log(`${ val }`)
}

{
  // 标签函数
  const simpleTag = (strings, ...tags) => {
    console.log(strings);
    // 第一个参数里面有一个raw属性，里面是取得每个字符串的原始内容，即未转义之前的字面量
    console.log(tags);
  }
  let a = 1,
      b = 2;

  simpleTag`${ a } + ${ b } = ${ a + b }`;

  // String自带了一个raw的标签函数，可返回未转换前的内容
  console.log(String.raw`\n\n`);
}

{
  // symbol传入的参数只用于调试代码，其他没什么用处
  // 不是全局注册的symbol不会相等，即使对符号的描述相同
  let symbol1 = Symbol('test');
  let symbol2 = Symbol('test');
  console.log(symbol1 === symbol2); // false

  // 全局符号表使用Symbol.for
  let globalSymbol = Symbol.for('globalTest');
  let departSymbol = Symbol('globalTest');
  // 全局注册的和对其描述的，两个也是不相同的
  console.log(globalSymbol === departSymbol); // false

  // 全局注册一个已经存在标记的，会返回已存在的那个标记
  let anotherGlobalSymbol = Symbol.for('globalTest');
  console.log(anotherGlobalSymbol === globalSymbol); // true

  // 使用Symbol.keyFor()查询标记是否全局标记，返回undefined证明不是
  let result = Symbol.keyFor(globalSymbol);
  let result2 = Symbol.keyFor(departSymbol);
  console.log(result); // globalTest
  console.log(result2); // undefined

  // 使用符合作为属性，并查找该属性
  let attrSymbol = Symbol('attr');
  let obj = {
    [attrSymbol]: 4
  }

  console.log(obj);

  let attr = Object.getOwnPropertySymbols(obj);
  console.log(attr);
}
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(15);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(23);
var hide = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(34);
var toPrimitive = __webpack_require__(21);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52);
var defined = __webpack_require__(18);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(11);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(18);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(27);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(20);
var createDesc = __webpack_require__(11);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(21);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(34);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(53);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(69);
var enumBugKeys = __webpack_require__(27);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(35)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(6);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(32);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(35)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(64)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(41);
var hide = __webpack_require__(10);
var has = __webpack_require__(6);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(68);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(36);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
var global = __webpack_require__(2);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(80);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(37);
var hiddenKeys = __webpack_require__(27).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @Author: yuuhei
 * @Date: 2018-01-11 13:51:20
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-17 11:19:27
 */
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(84);
console.log('<!--------Above is Latest-------->');
console.log('<!--------Below is ASYNC-------->');

/***/ }),
/* 47 */
/***/ (function(module, exports) {

window.GLOBAL = 'ALL_ELEMENT';

{
    /* 回调函数参数是函数表达式，并不是函数声明 */
    setTimeout(function timeoutHandler() {
        console.log('global setTimeout');
    }, 300);
}

{
    var a = 233;
    /* 立即执行函数第一个括号里的内容被当作函数表达式 */
    (function () {
        var a = 1;
        console.log('inner IIFE', a);
    })();

    /* 立即执行函数也可以拥有函数名，也可以传参 */
    (function IIFE(a) {
        console.log('global IIFE', a);
    })(a);

    /* 以上代码语义上等同于下面，上面的IIFE全局下是无法访问的 */
    var IIFE = function (a) {
        console.log('global IIFE2', a);
    }(a);

    /* UMD，将函数表达式传进IIFE的模式 */
    (function (fn) {
        fn(window);
    })(function def(global) {
        var a = 2;
        console.log('inner UMD', a);
        console.log('global UMD', global.GLOBAL);
    });
}

{
    var foo = function foo() {
        console.log('foo');
    };

    /* 函数表达式提升成undefined，执行undefined会报TypeError，而不是ReferenceError */


    /* var变量声明提升 */
    (function () {
        console.log(a); // undefined
        var a = 2;
    })();

    /* 以上代码等同于下面 */
    (function () {
        var a;
        console.log(a);
        var a = 2;
    })();

    /* 函数声明可以提前，函数表达式的声明会像上面变量一样的提升成undefied */
    foo();

    try {
        bar();
        var bar = function bar() {
            console.log('bar');
        };
    } catch (error) {
        console.log(error);
    }
}

{
    (function () {
        /* 基础标准闭包 */
        function foo() {
            var a = 2;
            return function () {
                console.log(a);
            };
        }

        var baz = foo();
        baz();

        /* 闭包循环 */
        for (var i = 0; i < 4; i++) {
            (function (j) {
                setTimeout(function timeoutHandler() {
                    console.log(j);
                }, j * 300);
            })(i);
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
                (function (j) {
                    setTimeout(function timeoutHandler() {
                        console.log(j);
                    }, j * 300);
                })(i);
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

                return {
                    doSomething: doSomething,
                    doAnother: doAnother
                };
            }

            var cool = coolModule();
            cool.doAnother();
            cool.doSomething();

            /* 现代模块依赖加载器，类requireJS模式 */
            var MyModules = function Manager() {
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

                return {
                    define: define,
                    get: get
                };
            }();

            MyModules.define('foo', [], function () {
                var _this = this;

                function hello() {
                    console.log(_this);
                };

                return {
                    hello: hello
                };
            });

            MyModules.define('bar', ['foo'], function (foo) {
                function hi() {
                    console.log('bar with foo');
                    foo.hello();
                };

                return {
                    hi: hi
                };
            });

            var Foo = MyModules.get('foo');
            var Bar = MyModules.get('bar');
            Bar.hi();
        }

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
                var _a = 2;
                var readonly = 'yuuhei';
                console.log(_a, readonly);
            }

            /* bind解决setTimeout等时被绑定window为上下文 */
            var obj = {
                count: 1,
                cool: function cool() {
                    if (this.count < 5) {
                        setTimeout(function () {
                            this.count++;
                            console.log('more awesome: ', this.count);
                        }.bind(this), this.count * 300);
                    }
                }
            };
            obj.cool();

            /* 箭头函数绑定前后上下文 */
            var object = {
                count: 3,
                cool: function cool() {
                    var _this2 = this;

                    if (this.count < 5) {
                        setTimeout(function () {
                            _this2.count++;
                            console.log('more awesome arrow: ', _this2.count);
                        }, this.count * 300);
                    }
                }
            };
            object.cool();
        }
    })();
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create__);









var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(object, property); if (desc === undefined) { var parent = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default()(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default.a ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default()(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default()(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: yuuhei
 * @Date: 2018-01-11 13:46:05
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-17 11:19:04
 */

{
    (function () {
        var a = 'ALL';
        /* arguments.callee可以用来引用正在运行的函数，包括匿名函数 */
        setTimeout(function () {
            // 该方法是一种被废弃的方案，严格模式下会报错 console.log(arguments.callee);
        }, 300);

        /* 在函数普通模式下直接调用默认绑定的this为全局对象window */
        (function () {
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
        }(function () {
            'use strict';

            foo(); // window
        })();

        /* 隐式绑定例子 */
        (function () {
            function foo() {
                console.log(this.a);
            };

            var obj = {
                a: 233,
                foo: foo
            };

            obj.foo(); // 2
        })();

        /* 装箱 */
        (function () {
            function foo() {
                console.log(this);
            };
            foo.call(true); // Boolean {[[PrimitiveValue]]: true}
            foo.call('123'); // String {[[PrimitiveValue]]: "123"}
            foo.call(456); // Number {[[PrimitiveValue]]: 456}
        })();

        {
            var _foo = function _foo() {
                console.log(this);
            };

            var abc = _foo.bind(null);
            /* 严格模式下，this指向是null，但非严格模式下，this指向是window，注意 */
            abc();
        }

        /* 为了避免以上情况，使用DMZ来绑定更安全的this，避免默认绑定规则 */
        (function () {
            function foo(a, b) {
                console.log(this); // ALL
                console.log('a: ' + a + ', b: ' + b);
            }
            // 创建完全空的对象，DMZ
            var DMZ = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(null);
            var bar = foo.bind(DMZ, 2);
            bar(4);
        })();

        /* 箭头函数不适用于以上几条规则 */
        (function () {
            function foo() {
                var _this = this;

                // 返回一个箭头函数
                return function (a) {
                    // this继承自foo
                    console.log(_this.a);
                };
            }

            var obj1 = {
                a: 2
            };

            var obj2 = {
                a: 4
            };

            var bar = foo.call(obj1);
            bar.call(obj2); // 2，这里的call由于使用了箭头强制绑定了上下文，一直是obj1
        })();

        /* forEach的第二个参数可以绑定上下文，和bind效果一样 */
        (function () {
            [1, 3, 4].forEach(function (item, index) {
                console.log(item, this.name);
            }, {
                name: 'yuuhei'
            });
        })();
    })();
}

{
    var arr = [23, 1, 6, 78, 9, 22, 3, 100];
    var ret = [];
    arr.every(function (item) {
        ret.push(item);
        /* 遍历每一个元素，直至返回false */
        return item % 11 !== 0;
    });
    console.log(ret);
}

{
    var _arr = [23, 1, 6, 78, 9, 22, 3, 100];
    var _ret = [];
    _arr.some(function (item) {
        _ret.push(item);
        /* 遍历每一个元素，直至返回true */
        return item % 9 === 0;
    });
    console.log(_ret);
}

{
    var _arr2 = [2, 4, 6];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default()(_arr2), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            console.log(i);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/* 数组自带迭代器，可以使用for-of遍历数组的值 */

{
    var _arr3 = [1, 2, 3];
    var it = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default()(_arr3);
    console.log(it.next());
}

/* 对象本身没有迭代器，需要模仿后才能使用for-of */

/* 由于迭代器的属性就是Symbol.iterator，需要使用键值访问法 */
{
    var obj = {
        name: 'yuuhei',
        age: '232'
    };

    /* 这样定义可以不让Symbol被枚举，直接定义也是可以的 */
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default()(obj, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator___default.a, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function value() {
            var o = this;
            var index = 0;
            var keys = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default()(o);
            return {
                next: function next() {
                    return {
                        value: o[keys[index++]],
                        done: index > keys.length
                    };
                }
            };
        }
    });
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default()(obj), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var k = _step2.value;

            console.log(k);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

{
    var _obj = _defineProperty({
        a: 1,
        b: 233,
        c: 445
    }, __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator___default.a, function () {
        var o = this;
        var idx = 0;
        var ks = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default()(o);
        return {
            next: function next() {
                return {
                    value: o[ks[idx++]],
                    done: idx > ks.length
                };
            }
        };
    });

    var _it = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default()(_obj);
    console.log(_it.next());
    console.log(_it.next());
    console.log(_it.next());
    console.log(_it.next());
}

{
    /* Object.create(obj)会将[[prototype]]关联到指定对象，继承就由于这个原理 */
    var _obj3 = {
        a: 123
    };

    var obj2 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_obj3);
    console.log(obj2.a);
}

{
    var _obj4 = {
        age: 23
    };
    Object.defineProperty(_obj4, 'name', {
        writable: false,
        enumerable: false,
        configurable: false,
        value: 'yuuhei'
    });
    console.log(_obj4);
    for (var _i in _obj4) {
        console.log(_i); // age
    };

    /* 无论enumerable是什么，in操作符都能够判断key是否在obj中，并且寻找原型链 */
    console.log('name' in _obj4);
}

{
    /* ES6拥有Object.setPrototypeOf进行原型链继承 */
    var Foo = function Foo() {};
    Foo.prototype.a = 1;
    var Bar = function Bar() {};
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default()(Bar.prototype, Foo.prototype);
    var bar = new Bar();
    console.log(bar.a);
}

{
    /* 组合继承 */
    var _Foo = function _Foo(name) {
        this.name = name;
    };

    var _Bar = function _Bar(name, age) {
        /* 绑定父亲的构造属性 */
        _Foo.call(this, name);
        this.age = age;
    };

    /* 将Bar的[[prototype]]关联到Foo的，继承Foo的原型链属性 */
    _Bar.prototype = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Foo.prototype);

    /* 修改过prototype后需要手动修复constructor的指向 */
    _Bar.prototype.constructor = _Bar;
    _Bar.prototype.myName = function () {
        return this.name;
    };

    var _bar = new _Bar('yuuhei', 23);
    console.log(_bar.myName());
    /* ES5直接获取一个对象的[[prototype]]的方式 */
    console.log(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_bar) === _Bar.prototype);
    /* 绝大多数浏览器（非标准获取方式）支持 */
    console.log(_bar.__proto__ === _Bar.prototype);
    /* 继承也可以通过instanceof找到源头 */
    console.log(_bar instanceof _Foo);
}

{
    /* Object.create自带第二个参数可以定义属性描述符 */
    var _obj5 = {
        a: 2
    };

    var _obj6 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_obj5, {
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
    console.log(_obj6.a); // 2
    console.log(_obj6.hasOwnProperty('a')); // false
    console.log(_obj5.hasOwnProperty('a'));
}

{
    /* 神奇的API设计，由于本身内部没有该函数，却能够运行，会变得怪怪的 */
    /* 面向委托模式来源于Object.create()这个特性 */
    var _obj7 = {
        cool: function cool() {
            console.log('cool!');
        }
    };

    var _obj8 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_obj7);
    _obj8.cool(); // cool!
}

{
    /* 经典类继承面向对象风格 */
    var _Foo2 = function _Foo2(name) {
        this.name = name;
    };

    var _Bar2 = function _Bar2(name, age) {
        _Foo2.call(this, name);
        this.age = age;
    };

    _Bar2.prototype = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Foo2.prototype);
    _Bar2.prototype.constructor = _Bar2;
    var bar1 = new _Bar2('yuuhei', 22);
    var bar2 = new _Bar2('Sellenite', 24);
    console.log(bar1, bar2);
}

{
    /* 对象委托关联风格 */
    var _Foo3 = {
        init: function init(name) {
            this.name = name;
        },
        identify: function identify() {
            return 'I am ' + this.name;
        }
    };

    var _Bar3 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Foo3);
    _Bar3.speak = function () {
        console.log(this.identify());
    };

    var b1 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Bar3);
    var b2 = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Bar3);
    b1.init('yuuhei');
    b2.init('Sellenite');
    b1.speak();
    b2.speak();
    console.log(_Bar3); // {speak:f()}
    console.log(b1); // {name: 'yuuhei'}
}

{
    /* 反词法 */
    /* ES6以下的简洁写法会编译成匿名函数，无法进行递归 */
    var _Foo4 = {
        // 最好不要使用this.bar()或Foo.bar()执行递归，因为可用实际情况比较少
        bar: function bar() {}
    };

    // 以上实际会编译成以下方式
    var Foo1 = {
        bar: function bar() {}
    };

    // 如果要想使用递归，不要使用简介方式，需要使用具名函数表达式
    var Foo2 = {
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
}

{
    var _Foo5 = function _Foo5(name) {
        this.name = name;
    };

    var _Bar4 = function _Bar4(name, age) {
        _Foo5.call(this, name);
        this.age = age;
    };

    _Bar4.prototype = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(_Foo5.prototype);

    var _bar2 = new _Bar4('yuuhei', 23);

    /* 内省 */
    // 首先要纠正错误，Bar instanceof Foo是错的

    /* 构造函数之间Foo和Bar的内省 */
    _Bar4.prototype instanceof _Foo5; // true
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_Bar4.prototype) === _Foo5.prototype; // true
    _Foo5.prototype.isPrototypeOf(_Bar4.prototype); // true

    /* 实例和构造函数之间的内省 */
    _bar2 instanceof _Bar4; // true
    _bar2 instanceof _Foo5; // true
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_bar2) === _Bar4.prototype; /// true
    _Foo5.prototype.isPrototypeOf(_bar2); // true
    _Bar4.prototype.isPrototypeOf(_bar2); // true
}

{
    /* Orbment.prototype.call(this, ...)是伪多态 */
    var Orbment = function () {
        function Orbment(name) {
            _classCallCheck(this, Orbment);

            this.name = name || Orbment;
            this.message = null;
        }

        _createClass(Orbment, [{
            key: 'setSize',
            value: function setSize(width, height) {
                this.width = width || 50;
                this.height = height || 50;
                this.message = 'The ' + this.name + ' ';
            }
        }, {
            key: 'getMessage',
            value: function getMessage() {
                return this.message;
            }
        }]);

        return Orbment;
    }();

    var ENIGMA = function (_Orbment) {
        _inherits(ENIGMA, _Orbment);

        function ENIGMA(name, width, height) {
            _classCallCheck(this, ENIGMA);

            var _this2 = _possibleConstructorReturn(this, (ENIGMA.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ENIGMA)).call(this, name));
            // super()在constructor必须在this调用前执行


            _this2.width = width || 50;
            _this2.height = height || 50;
            return _this2;
        }

        _createClass(ENIGMA, [{
            key: 'setSize',
            value: function setSize(width, height) {
                // 以前的伪多态写法：Orbment.prototype.setSize.apply(this, [width, height])
                // 注意出版书上的super(width, height)在constructor外使用已被禁止，改为替换以下方式实现相对多态
                _get(ENIGMA.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ENIGMA.prototype), 'setSize', this).call(this, width, height);
                this.message += 'size is width ' + this.width + ' and height ' + this.height;
                return this;
            }
        }]);

        return ENIGMA;
    }(Orbment);

    var ARCUS = function (_Orbment2) {
        _inherits(ARCUS, _Orbment2);

        function ARCUS(name, width, height) {
            _classCallCheck(this, ARCUS);

            var _this3 = _possibleConstructorReturn(this, (ARCUS.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ARCUS)).call(this, name));
            // super()在constructor必须在this调用前执行


            _this3.width = width || 50;
            _this3.height = height || 50;
            return _this3;
        }

        _createClass(ARCUS, [{
            key: 'setSize',
            value: function setSize(width, height) {
                // 以前的伪多态写法：Orbment.prototype.setSize.apply(this, [width, height])
                // 注意出版书上的super(width, height)在constructor外使用已被禁止，改为替换以下方式实现相对多态
                _get(ARCUS.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ARCUS.prototype), 'setSize', this).call(this, width, height);
                this.message += 'size is width ' + this.width + ' and height ' + this.height;
                return this;
            }
        }]);

        return ARCUS;
    }(Orbment);

    var ENIGMA_I = new ARCUS('ENIGMA_I');
    var ENIGMA_I_SIZE_MESSAGE = ENIGMA_I.setSize().getMessage();

    var ARCUS_I = new ARCUS('ARCUS_I');
    var ARCUS_I_SIZE_MESSAGE = ARCUS_I.setSize(100, 70).getMessage();

    console.log(ENIGMA_I_SIZE_MESSAGE);
    console.log(ARCUS_I_SIZE_MESSAGE);
}

{
    /* class并不是静态，只是一个prototype的语法糖，使用prototype仍可修改 */
    var Random = function () {
        function Random() {
            _classCallCheck(this, Random);

            this.num = Math.random();
        }

        _createClass(Random, [{
            key: 'rand',
            value: function rand() {
                console.log(this.num);
            }
        }]);

        return Random;
    }();

    var r1 = new Random();
    r1.rand();

    Random.prototype.rand = function () {
        console.log(this.num * 1000);
    };

    var r2 = new Random();
    r2.rand();
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(5);
var $getOwnPropertyDescriptor = __webpack_require__(19).f;

__webpack_require__(22)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(17);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(36);

__webpack_require__(22)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(60).set });


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(8);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(19).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(16);

__webpack_require__(22)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(38);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(42);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(18);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(30);
var descriptor = __webpack_require__(11);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(72);
var step = __webpack_require__(73);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(28);
module.exports = __webpack_require__(79);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(43);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(17);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(30) });


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_number_is_nan__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_number_is_nan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_number_is_nan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_array_from__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_array_from__);





var _typeof = typeof __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a === "function" && typeof __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default.a === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a === "function" && obj.constructor === __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a && obj !== __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a.prototype ? "symbol" : typeof obj; };

/*
 * @Author: Sellenite
 * @Date:   2018-01-16 12:23:10
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-17 11:02:30
 */

{
	/* typeof null Object Array 都会返回 'object'  */
	var a = null;
	var b = {
		name: 'yuuhei'
	};
	var c = [1, 3];
	console.log(typeof a === 'undefined' ? 'undefined' : _typeof(a), typeof b === 'undefined' ? 'undefined' : _typeof(b), typeof c === 'undefined' ? 'undefined' : _typeof(c));
}

{
	/* 复合条件检测null */
	var _a = null;
	console.log(!_a && (typeof _a === 'undefined' ? 'undefined' : _typeof(_a)) === 'object'); // true
}

{
	/* 函数对象的length是声明参数的个数 */
	var foo = function foo(a, b, c) {};
	console.log(foo.length); // 3
}

{
	/* 声明了还没赋值属于undefined */
	/* 还没声明属于undeclared（javascript还是会打印undefined） */
}

{
	/* typeof一个var声明了但未定义值的话会打印undefined */
	/* typeof一个完全没有声明及定义值的话同样也会打印undefined */
}

{
	var IIFE = 2;
	/* typeof判断当前作用域变量是否被定义 */
	var helper = typeof IIFE !== 'undefined' ? IIFE : function () {
		/* somethings */
	};
	/* 使用typeof来检查变量是首选的选择 */
	console.log(helper); // 2
}

{
	/* 用依赖注入设计模式来验证当前作用域变量是否被定义 */
	var _helper = function _helper(IIFE) {
		var helper2 = IIFE || function () {
			/* somethings */
		};
	};
}

{
	/* 创建稀疏数组，空白的地方会被显式赋值为undefined */
	var arr = [];
	arr[0] = 0;
	arr[4] = 4;
	console.log(arr.length); // 5
}

{
	/* 数组也是对象，可以包含字符串键值和属性，但不计入于数组的长度 */
	var _arr = [1, 3, 5];
	_arr['name'] = 'yuuhei';
	_arr['age'] = 23;
	console.log(_arr, _arr.length); // 3
}

{
	/* 注意，如果字符串键值能够转换为十进制数字，会被当作数字索引处理 */
	var _arr2 = [1, 3, 5];
	_arr2['5'] = 100;
	console.log(_arr2);
}

{
	/* 类数组及数组副本建立 */
	// 类数组转换
	var _foo = function _foo() {
		var arr = Array.prototype.slice.call(arguments);
		console.log(arr);
	};
	_foo();

	// 数组副本
	var _arr3 = [1, 3, 5];
	var arrCopy = Array.prototype.slice.call(_arr3);
	_arr3.push(100);
	arrCopy.push(200);
	console.log(_arr3, arrCopy);

	// ES6的Array.from也能够建立副本
	var arr2 = [2, 4, 6];
	var arrCopy2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_array_from___default()(arr2);
	arr2.push(100);
	arrCopy2.push(200);
	console.log(_arr3, arrCopy2);
}

{
	/* 访问字符串某个下标应该用.charAt()，老版本IE不允许string[index]这样访问 */
	/* 以上只能够进行字符串访问，无法进行字符串修改 */
	var string = 'foo';
	console.log(string[0]);
	console.log(string.charAt(2));
}

{
	/* 数字值可用指数表示 */
	var _a2 = 5E10;
	console.log(_a2);
}

{
	var _a3 = 42.59;
	/* .toFixed()用于指定小数显示多少个 */
	console.log(_a3.toFixed(4));
	/* .toPrecision()用于指定多少个有效数位 */
	console.log(_a3.toPrecision(5));
}

{
	/* ES6，严格模式不再支持0开头的八进制数 */
	// let a = 0363;
	// console.log(a);  SyntaxError

	/* ES6和严格模式下的八进制是用0o前缀表示 */
	var _a4 = 243;
	console.log(_a4); // 243
}

{
	/* 注意0.1+0.2不等于0.3，存在精度问题 */
	var _a5 = 0.1 + 0.2;
	var _b = 0.3;
	console.log(_a5 === _b); // false
}

{
	/* NaN不与NaN相等，typeof NaN的值为'number' */
	console.log(typeof NaN === 'undefined' ? 'undefined' : _typeof(NaN)); // number
	console.log(NaN === NaN); // false
}

{
	/* window有一个全局方法isNaN()，但这个有bug，会将NaN和字符串也会判断为true */
	/* ES6的Number.isNaN()修复了这个问题，他会先用typeof判断为number再执行此方法
 （上面提到typeof NaN返回的是'number'） */
	var _a6 = 'foo';
	var _b2 = 10 / 'foo';
	console.log(window.isNaN(_a6)); // true, bug
	console.log(window.isNaN(_b2)); // true

	console.log(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_number_is_nan___default()(_a6)); // false，修复了
	console.log(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_number_is_nan___default()(_b2)); // true
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
__webpack_require__(92);
__webpack_require__(93);
__webpack_require__(94);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(41);
var META = __webpack_require__(88).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(15);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(32);
var wksDefine = __webpack_require__(33);
var enumKeys = __webpack_require__(89);
var isArray = __webpack_require__(90);
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(21);
var createDesc = __webpack_require__(11);
var _create = __webpack_require__(30);
var gOPNExt = __webpack_require__(91);
var $GOPD = __webpack_require__(19);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(45).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f = $propertyIsEnumerable;
  __webpack_require__(44).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(6);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(44);
var pIE = __webpack_require__(20);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(17);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5);
var gOPN = __webpack_require__(45).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {



/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(3);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(100);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(14);
var call = __webpack_require__(101);
var isArrayIter = __webpack_require__(102);
var toLength = __webpack_require__(38);
var createProperty = __webpack_require__(103);
var getIterFn = __webpack_require__(43);

$export($export.S + $export.F * !__webpack_require__(104)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(11);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGJiY2JhNzBjZWM5ZTcyZWVhMjQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RhZ2UxLTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMS0yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0xLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJHTE9CQUwiLCJzZXRUaW1lb3V0IiwidGltZW91dEhhbmRsZXIiLCJhIiwiSUlGRSIsImZuIiwiZGVmIiwiZ2xvYmFsIiwiZm9vIiwiYmFyIiwiZXJyb3IiLCJiYXoiLCJpIiwiaiIsImNvb2xNb2R1bGUiLCJzb21ldGhpbmciLCJhbm90aGVyIiwiZG9Tb21ldGhpbmciLCJkb0Fub3RoZXIiLCJqb2luIiwiY29vbCIsIk15TW9kdWxlcyIsIk1hbmFnZXIiLCJtb2R1bGVzIiwiZGVmaW5lIiwibmFtZSIsImRlcHMiLCJpbXBsIiwibGVuZ3RoIiwiYXBwbHkiLCJnZXQiLCJfdGhpcyIsImhlbGxvIiwiaGkiLCJGb28iLCJCYXIiLCJ1bmRlZmluZWQiLCJjYXRjaFZhbHVlIiwicmVhZG9ubHkiLCJvYmoiLCJjb3VudCIsImJpbmQiLCJvYmplY3QiLCJjYWxsIiwiYWJjIiwiYiIsIkRNWiIsIm9iajEiLCJvYmoyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsInJldCIsImV2ZXJ5IiwicHVzaCIsInNvbWUiLCJpdCIsIm5leHQiLCJhZ2UiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIm8iLCJrZXlzIiwiZG9uZSIsImsiLCJjIiwiaWR4Iiwia3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibXlOYW1lIiwiX19wcm90b19fIiwiaGFzT3duUHJvcGVydHkiLCJiYXIxIiwiYmFyMiIsImluaXQiLCJpZGVudGlmeSIsInNwZWFrIiwiYjEiLCJiMiIsIkZvbzEiLCJGb28yIiwiYmFyb29vbyIsImlzUHJvdG90eXBlT2YiLCJPcmJtZW50IiwibWVzc2FnZSIsIndpZHRoIiwiaGVpZ2h0IiwiRU5JR01BIiwiQVJDVVMiLCJFTklHTUFfSSIsIkVOSUdNQV9JX1NJWkVfTUVTU0FHRSIsInNldFNpemUiLCJnZXRNZXNzYWdlIiwiQVJDVVNfSSIsIkFSQ1VTX0lfU0laRV9NRVNTQUdFIiwiUmFuZG9tIiwibnVtIiwiTWF0aCIsInJhbmRvbSIsInIxIiwicmFuZCIsInIyIiwiaGVscGVyIiwiaGVscGVyMiIsIkFycmF5Iiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcnJDb3B5IiwiYXJyMiIsImFyckNvcHkyIiwic3RyaW5nIiwiY2hhckF0IiwidG9GaXhlZCIsInRvUHJlY2lzaW9uIiwiTmFOIiwiaXNOYU4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSw2QkFBNkI7QUFDN0IsdUNBQXVDOzs7Ozs7O0FDRHZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7Ozs7OztBQ0x6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0Esa0ZBQWtGO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsZ0NBQWdDO0FBQ3ZGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQ0FBa0MsZ0JBQWdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUNwQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBLGlDQUFpQyxTQUFTLEVBQUU7QUFDNUMsQ0FBQyxZQUFZOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTLHFCQUFxQjtBQUMzRCxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGJiY2JhNzBjZWM5ZTcyZWVhMjQiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYgKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpIGRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHsgdmFsdWU6IHdrc0V4dC5mKG5hbWUpIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAoIUJVR0dZICYmICRuYXRpdmUpIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuICogQEF1dGhvcjogeXV1aGVpXHJcbiAqIEBEYXRlOiAyMDE4LTAxLTExIDEzOjUxOjIwXHJcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIFNlbGxlbml0ZVxyXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE4LTAxLTE3IDExOjE5OjI3XHJcbiAqL1xyXG5yZXF1aXJlKCcuL3N0YWdlMS0xLmpzJyk7XHJcbnJlcXVpcmUoJy4vc3RhZ2UxLTIuanMnKTtcclxucmVxdWlyZSgnLi9zdGFnZTItMS5qcycpO1xyXG5jb25zb2xlLmxvZygnPCEtLS0tLS0tLUFib3ZlIGlzIExhdGVzdC0tLS0tLS0tPicpO1xyXG5jb25zb2xlLmxvZygnPCEtLS0tLS0tLUJlbG93IGlzIEFTWU5DLS0tLS0tLS0+Jyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIiwid2luZG93LkdMT0JBTCA9ICdBTExfRUxFTUVOVCc7XHJcblxyXG57XHJcbiAgICAvKiDlm57osIPlh73mlbDlj4LmlbDmmK/lh73mlbDooajovr7lvI/vvIzlubbkuI3mmK/lh73mlbDlo7DmmI4gKi9cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dEhhbmRsZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBzZXRUaW1lb3V0JylcclxuICAgIH0sIDMwMCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhID0gMjMzO1xyXG4gICAgLyog56uL5Y2z5omn6KGM5Ye95pWw56ys5LiA5Liq5ous5Y+36YeM55qE5YaF5a656KKr5b2T5L2c5Ye95pWw6KGo6L6+5byPICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSAxXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lubmVyIElJRkUnLCBhKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog56uL5Y2z5omn6KGM5Ye95pWw5Lmf5Y+v5Lul5oul5pyJ5Ye95pWw5ZCN77yM5Lmf5Y+v5Lul5Lyg5Y+CICovXHJcbiAgICAoZnVuY3Rpb24gSUlGRShhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBJSUZFJywgYSk7XHJcbiAgICB9KShhKTtcclxuXHJcbiAgICAvKiDku6XkuIrku6PnoIHor63kuYnkuIrnrYnlkIzkuo7kuIvpnaLvvIzkuIrpnaLnmoRJSUZF5YWo5bGA5LiL5piv5peg5rOV6K6/6Zeu55qEICovXHJcbiAgICB2YXIgSUlGRSA9IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIElJRkUyJywgYSk7XHJcbiAgICB9KGEpO1xyXG5cclxuICAgIC8qIFVNRO+8jOWwhuWHveaVsOihqOi+vuW8j+S8oOi/m0lJRkXnmoTmqKHlvI8gKi9cclxuICAgIChmdW5jdGlvbihmbikge1xyXG4gICAgICAgIGZuKHdpbmRvdyk7XHJcbiAgICB9KShmdW5jdGlvbiBkZWYoZ2xvYmFsKSB7XHJcbiAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbm5lciBVTUQnLCBhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIFVNRCcsIGdsb2JhbC5HTE9CQUwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIHZhcuWPmOmHj+WjsOaYjuaPkOWNhyAqL1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGEpOyAvLyB1bmRlZmluZWRcclxuICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qIOS7peS4iuS7o+eggeetieWQjOS6juS4i+mdoiAqL1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgICAgIHZhciBhID0gMjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog5Ye95pWw5aOw5piO5Y+v5Lul5o+Q5YmN77yM5Ye95pWw6KGo6L6+5byP55qE5aOw5piO5Lya5YOP5LiK6Z2i5Y+Y6YeP5LiA5qC355qE5o+Q5Y2H5oiQdW5kZWZpZWQgKi9cclxuICAgIGZvbygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZm9vJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyog5Ye95pWw6KGo6L6+5byP5o+Q5Y2H5oiQdW5kZWZpbmVk77yM5omn6KGMdW5kZWZpbmVk5Lya5oqlVHlwZUVycm9y77yM6ICM5LiN5pivUmVmZXJlbmNlRXJyb3IgKi9cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYmFyKCk7XHJcbiAgICAgICAgdmFyIGJhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYmFyJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG57XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyog5Z+656GA5qCH5YeG6Zet5YyFICovXHJcbiAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJheiA9IGZvbygpO1xyXG4gICAgICAgIGJheigpO1xyXG5cclxuICAgICAgICAvKiDpl63ljIXlvqrnjq8gKi9cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24oaikge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqKTtcclxuICAgICAgICAgICAgICAgIH0sIGogKiAzMDApO1xyXG4gICAgICAgICAgICB9KShpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyog5Z+65pys5qih5Z2X6K6+6K6h5qih5byPICovXHJcbiAgICAgICAgZnVuY3Rpb24gY29vbE1vZHVsZSgpIHtcclxuICAgICAgICAgICAgdmFyIHNvbWV0aGluZyA9ICdjb29sJztcclxuICAgICAgICAgICAgdmFyIGFub3RoZXIgPSBbMSwgMiwgM107XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkb1NvbWV0aGluZygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvbWV0aGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXogPSBmb28oKTtcclxuICAgICAgICAgICAgYmF6KCk7XHJcblxyXG4gICAgICAgICAgICAvKiDpl63ljIXlvqrnjq8gKi9cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaiAqIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9KShpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiDln7rmnKzmqKHlnZforr7orqHmqKHlvI8gKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29vbE1vZHVsZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzb21ldGhpbmcgPSAnY29vbCc7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5vdGhlciA9IFsxLCAyLCAzXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb1NvbWV0aGluZygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzb21ldGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvQW5vdGhlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbm90aGVyLmpvaW4oJyEnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkb1NvbWV0aGluZzogZG9Tb21ldGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgZG9Bbm90aGVyOiBkb0Fub3RoZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjb29sID0gY29vbE1vZHVsZSgpO1xyXG4gICAgICAgICAgICBjb29sLmRvQW5vdGhlcigpO1xyXG4gICAgICAgICAgICBjb29sLmRvU29tZXRoaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvKiDnjrDku6PmqKHlnZfkvp3otZbliqDovb3lmajvvIznsbtyZXF1aXJlSlPmqKHlvI8gKi9cclxuICAgICAgICAgICAgdmFyIE15TW9kdWxlcyA9IChmdW5jdGlvbiBNYW5hZ2VyKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZWZpbmUobmFtZSwgZGVwcywgaW1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzW2ldID0gbW9kdWxlc1tkZXBzW2ldXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pyA5Li76KaB5Ye95pWw77yM5L2/55So5Ye95pWw6L+U5Zue5YC85omn6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc1tuYW1lXSA9IGltcGwuYXBwbHkoaW1wbCwgZGVwcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lOiBkZWZpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBNeU1vZHVsZXMuZGVmaW5lKCdmb28nLCBbXSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhlbGxvKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxsbzogaGVsbG9cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBNeU1vZHVsZXMuZGVmaW5lKCdiYXInLCBbJ2ZvbyddLCBmdW5jdGlvbihmb28pIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhpKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYXIgd2l0aCBmb28nKTtcclxuICAgICAgICAgICAgICAgICAgICBmb28uaGVsbG8oKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBoaTogaGlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIEZvbyA9IE15TW9kdWxlcy5nZXQoJ2ZvbycpO1xyXG4gICAgICAgICAgICB2YXIgQmFyID0gTXlNb2R1bGVzLmdldCgnYmFyJyk7XHJcbiAgICAgICAgICAgIEJhci5oaSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyogVHJhY2V1cumhueebrnRyeS1jYXRjaOino+WGs0VTNuS7peWJjeeahOe6p+S9nOeUqOWfnyAqL1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChjYXRjaFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpJbpg6jml6Dms5Xorr/pl67miJbkvb/nlKjov5nkuKrlj5jph49cclxuICAgICAgICAgICAgICAgIGNhdGNoVmFsdWUgPSAyO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeS1jYXRjaCBibG9jaycsIGNhdGNoVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiDmmL7lvI/liJvlu7rlnZfnuqfkvZznlKjln58gKi9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGEgPSAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZG9ubHkgPSAneXV1aGVpJztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGEsIHJlYWRvbmx5KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiBiaW5k6Kej5Yazc2V0VGltZW91dOetieaXtuiiq+e7keWumndpbmRvd+S4uuS4iuS4i+aWhyAqL1xyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb3JlIGF3ZXNvbWU6ICcsIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMuY291bnQgKiAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmouY29vbCgpO1xyXG5cclxuICAgICAgICAgICAgLyog566t5aS05Ye95pWw57uR5a6a5YmN5ZCO5LiK5LiL5paHICovXHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMyxcclxuICAgICAgICAgICAgICAgIGNvb2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50IDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb3JlIGF3ZXNvbWUgYXJyb3c6ICcsIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLmNvdW50ICogMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqZWN0LmNvb2woKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMS0xLmpzIiwiLypcclxuICogQEF1dGhvcjogeXV1aGVpXHJcbiAqIEBEYXRlOiAyMDE4LTAxLTExIDEzOjQ2OjA1XHJcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIFNlbGxlbml0ZVxyXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE4LTAxLTE3IDExOjE5OjA0XHJcbiAqL1xyXG5cclxue1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gJ0FMTCc7XHJcbiAgICAgICAgLyogYXJndW1lbnRzLmNhbGxlZeWPr+S7peeUqOadpeW8leeUqOato+WcqOi/kOihjOeahOWHveaVsO+8jOWMheaLrOWMv+WQjeWHveaVsCAqL1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOivpeaWueazleaYr+S4gOenjeiiq+W6n+W8g+eahOaWueahiO+8jOS4peagvOaooeW8j+S4i+S8muaKpemUmSBjb25zb2xlLmxvZyhhcmd1bWVudHMuY2FsbGVlKTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICAvKiDlnKjlh73mlbDmma7pgJrmqKHlvI/kuIvnm7TmjqXosIPnlKjpu5jorqTnu5HlrprnmoR0aGlz5Li65YWo5bGA5a+56LGhd2luZG93ICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyDlnKjkuKXmoLzmqKHlvI/kuIvliJnkuI3kvJrpu5jorqTnu5HlrprvvIx0aGlz5Li6dW5kZWZpbmVkIHVzZSBzdHJpY3TkuIDlrpropoHlhpnlnKjnrKzkuIDooYxcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvbygpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIOWHveaVsOWumuS5ieWcqOmdnuS4peagvOaooeW8j+S4i++8jOWNs+S9v+WcqOS4peagvOaooeW8j+S4i+iwg+eUqOS+neeEtuiiq+m7mOiupOe7keWumuS4undpbmRvdyAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgfShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgICAgICAgICBmb28oKTsgLy8gd2luZG93XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog6ZqQ5byP57uR5a6a5L6L5a2QICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDIzMyxcclxuICAgICAgICAgICAgICAgIGZvbzogZm9vXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBvYmouZm9vKCkgLy8gMlxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIOijheeusSAqL1xyXG4gICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvby5jYWxsKHRydWUpOyAvLyBCb29sZWFuIHtbW1ByaW1pdGl2ZVZhbHVlXV06IHRydWV9XHJcbiAgICAgICAgICAgIGZvby5jYWxsKCcxMjMnKTsgLy8gU3RyaW5nIHtbW1ByaW1pdGl2ZVZhbHVlXV06IFwiMTIzXCJ9XHJcbiAgICAgICAgICAgIGZvby5jYWxsKDQ1Nik7IC8vIE51bWJlciB7W1tQcmltaXRpdmVWYWx1ZV1dOiA0NTZ9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZm9vID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhYmMgPSBmb28uYmluZChudWxsKTtcclxuICAgICAgICAgICAgLyog5Lil5qC85qih5byP5LiL77yMdGhpc+aMh+WQkeaYr251bGzvvIzkvYbpnZ7kuKXmoLzmqKHlvI/kuIvvvIx0aGlz5oyH5ZCR5pivd2luZG9377yM5rOo5oSPICovXHJcbiAgICAgICAgICAgIGFiYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyog5Li65LqG6YG/5YWN5Lul5LiK5oOF5Ya177yM5L2/55SoRE1a5p2l57uR5a6a5pu05a6J5YWo55qEdGhpc++8jOmBv+WFjem7mOiupOe7keWumuinhOWImSAqL1xyXG4gICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpOyAvLyBBTExcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhOiAnICsgYSArICcsIGI6ICcgKyBiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDliJvlu7rlrozlhajnqbrnmoTlr7nosaHvvIxETVpcclxuICAgICAgICAgICAgdmFyIERNWiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgICAgICAgIHZhciBiYXIgPSBmb28uYmluZChETVosIDIpO1xyXG4gICAgICAgICAgICBiYXIoNCk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog566t5aS05Ye95pWw5LiN6YCC55So5LqO5Lul5LiK5Yeg5p2h6KeE5YiZICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57kuIDkuKrnrq3lpLTlh73mlbBcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXPnu6fmib/oh6pmb29cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMSA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG9iajIgPSB7XHJcbiAgICAgICAgICAgICAgICBhOiA0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXIgPSBmb28uY2FsbChvYmoxKTtcclxuICAgICAgICAgICAgYmFyLmNhbGwob2JqMik7IC8vIDLvvIzov5nph4znmoRjYWxs55Sx5LqO5L2/55So5LqG566t5aS05by65Yi257uR5a6a5LqG5LiK5LiL5paH77yM5LiA55u05pivb2JqMVxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIGZvckVhY2jnmoTnrKzkuozkuKrlj4LmlbDlj6/ku6Xnu5HlrprkuIrkuIvmlofvvIzlkoxiaW5k5pWI5p6c5LiA5qC3ICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBbMSwgMywgNF1cclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd5dXVoZWknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9KSgpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gW1xyXG4gICAgICAgIDIzLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgNixcclxuICAgICAgICA3OCxcclxuICAgICAgICA5LFxyXG4gICAgICAgIDIyLFxyXG4gICAgICAgIDMsXHJcbiAgICAgICAgMTAwXHJcbiAgICBdO1xyXG4gICAgbGV0IHJldCA9IFtdO1xyXG4gICAgYXJyLmV2ZXJ5KChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgLyog6YGN5Y6G5q+P5LiA5Liq5YWD57Sg77yM55u06Iez6L+U5ZueZmFsc2UgKi9cclxuICAgICAgICByZXR1cm4gaXRlbSAlIDExICE9PSAwO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gW1xyXG4gICAgICAgIDIzLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgNixcclxuICAgICAgICA3OCxcclxuICAgICAgICA5LFxyXG4gICAgICAgIDIyLFxyXG4gICAgICAgIDMsXHJcbiAgICAgICAgMTAwXHJcbiAgICBdO1xyXG4gICAgbGV0IHJldCA9IFtdO1xyXG4gICAgYXJyLnNvbWUoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXQucHVzaChpdGVtKTtcclxuICAgICAgICAvKiDpgY3ljobmr4/kuIDkuKrlhYPntKDvvIznm7Toh7Pov5Tlm550cnVlICovXHJcbiAgICAgICAgcmV0dXJuIGl0ZW0gJSA5ID09PSAwO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gWzIsIDQsIDZdO1xyXG4gICAgZm9yIChsZXQgaSBvZiBhcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyog5pWw57uE6Ieq5bim6L+t5Luj5Zmo77yM5Y+v5Lul5L2/55SoZm9yLW9m6YGN5Y6G5pWw57uE55qE5YC8ICovXHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gWzEsIDIsIDNdO1xyXG4gICAgbGV0IGl0ID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbn1cclxuXHJcbi8qIOWvueixoeacrOi6q+ayoeaciei/reS7o+WZqO+8jOmcgOimgeaooeS7v+WQjuaJjeiDveS9v+eUqGZvci1vZiAqL1xyXG5cclxuLyog55Sx5LqO6L+t5Luj5Zmo55qE5bGe5oCn5bCx5pivU3ltYm9sLml0ZXJhdG9y77yM6ZyA6KaB5L2/55So6ZSu5YC86K6/6Zeu5rOVICovXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgbmFtZTogJ3l1dWhlaScsXHJcbiAgICAgICAgYWdlOiAnMjMyJ1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiDov5nmoLflrprkuYnlj6/ku6XkuI3orqlTeW1ib2zooqvmnprkuL7vvIznm7TmjqXlrprkuYnkuZ/mmK/lj6/ku6XnmoQgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFN5bWJvbC5pdGVyYXRvciwge1xyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb1trZXlzW2luZGV4KytdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKGluZGV4ID4ga2V5cy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmb3IgKGxldCBrIG9mIG9iaikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGspO1xyXG4gICAgfVxyXG59XHJcblxyXG57XHJcbiAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGE6IDEsXHJcbiAgICAgICAgYjogMjMzLFxyXG4gICAgICAgIGM6IDQ0NSxcclxuICAgICAgICBbU3ltYm9sLml0ZXJhdG9yXTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBrcyA9IE9iamVjdC5rZXlzKG8pO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9ba3NbaWR4KytdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKGlkeCA+IGtzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGl0ID0gb2JqW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhpdC5uZXh0KCkpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9iamVjdC5jcmVhdGUob2JqKeS8muWwhltbcHJvdG90eXBlXV3lhbPogZTliLDmjIflrprlr7nosaHvvIznu6fmib/lsLHnlLHkuo7ov5nkuKrljp/nkIYgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMTIzXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaik7XHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmEpXHJcbn1cclxuXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYWdlOiAyM1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICduYW1lJywge1xyXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiAneXV1aGVpJ1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgZm9yIChsZXQgaSBpbiBvYmopIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpKSAvLyBhZ2VcclxuICAgIH07XHJcblxyXG4gICAgLyog5peg6K66ZW51bWVyYWJsZeaYr+S7gOS5iO+8jGlu5pON5L2c56ym6YO96IO95aSf5Yik5pata2V55piv5ZCm5Zyob2Jq5Lit77yM5bm25LiU5a+75om+5Y6f5Z6L6ZO+ICovXHJcbiAgICBjb25zb2xlLmxvZygnbmFtZScgaW4gb2JqKTtcclxufVxyXG5cclxue1xyXG4gICAgLyogRVM25oul5pyJT2JqZWN0LnNldFByb3RvdHlwZU9m6L+b6KGM5Y6f5Z6L6ZO+57un5om/ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIEZvby5wcm90b3R5cGUuYSA9IDE7XHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihCYXIucHJvdG90eXBlLCBGb28ucHJvdG90eXBlKTtcclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCk7XHJcbiAgICBjb25zb2xlLmxvZyhiYXIuYSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOe7hOWQiOe7p+aJvyAqL1xyXG4gICAgbGV0IEZvbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XHJcbiAgICAgICAgLyog57uR5a6a54i25Lqy55qE5p6E6YCg5bGe5oCnICovXHJcbiAgICAgICAgRm9vLmNhbGwodGhpcywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIOWwhkJhcueahFtbcHJvdG90eXBlXV3lhbPogZTliLBGb2/nmoTvvIznu6fmib9Gb2/nmoTljp/lnovpk77lsZ7mgKcgKi9cclxuICAgIEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvby5wcm90b3R5cGUpO1xyXG5cclxuICAgIC8qIOS/ruaUuei/h3Byb3RvdHlwZeWQjumcgOimgeaJi+WKqOS/ruWkjWNvbnN0cnVjdG9y55qE5oyH5ZCRICovXHJcbiAgICBCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFyO1xyXG4gICAgQmFyLnByb3RvdHlwZS5teU5hbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYmFyID0gbmV3IEJhcigneXV1aGVpJywgMjMpO1xyXG4gICAgY29uc29sZS5sb2coYmFyLm15TmFtZSgpKTtcclxuICAgIC8qIEVTNeebtOaOpeiOt+WPluS4gOS4quWvueixoeeahFtbcHJvdG90eXBlXV3nmoTmlrnlvI8gKi9cclxuICAgIGNvbnNvbGUubG9nKE9iamVjdC5nZXRQcm90b3R5cGVPZihiYXIpID09PSBCYXIucHJvdG90eXBlKTtcclxuICAgIC8qIOe7neWkp+WkmuaVsOa1j+iniOWZqO+8iOmdnuagh+WHhuiOt+WPluaWueW8j++8ieaUr+aMgSAqL1xyXG4gICAgY29uc29sZS5sb2coYmFyLl9fcHJvdG9fXyA9PT0gQmFyLnByb3RvdHlwZSk7XHJcbiAgICAvKiDnu6fmib/kuZ/lj6/ku6XpgJrov4dpbnN0YW5jZW9m5om+5Yiw5rqQ5aS0ICovXHJcbiAgICBjb25zb2xlLmxvZyhiYXIgaW5zdGFuY2VvZiBGb28pO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBPYmplY3QuY3JlYXRl6Ieq5bim56ys5LqM5Liq5Y+C5pWw5Y+v5Lul5a6a5LmJ5bGe5oCn5o+P6L+w56ymICovXHJcbiAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGE6IDJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaiwge1xyXG4gICAgICAgIGI6IHtcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB2YWx1ZTogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYzoge1xyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb2JqMueahOWOn+Wei+mTvuS4iui/nuaOpeS6hm9iaueahOWOn+Wei+mTvlxyXG4gICAgY29uc29sZS5sb2cob2JqMi5hKTsgLy8gMlxyXG4gICAgY29uc29sZS5sb2cob2JqMi5oYXNPd25Qcm9wZXJ0eSgnYScpKTsgLy8gZmFsc2VcclxuICAgIGNvbnNvbGUubG9nKG9iai5oYXNPd25Qcm9wZXJ0eSgnYScpKTtcclxufVxyXG5cclxue1xyXG4gICAgLyog56We5aWH55qEQVBJ6K6+6K6h77yM55Sx5LqO5pys6Lqr5YaF6YOo5rKh5pyJ6K+l5Ye95pWw77yM5Y206IO95aSf6L+Q6KGM77yM5Lya5Y+Y5b6X5oCq5oCq55qEICovXHJcbiAgICAvKiDpnaLlkJHlp5TmiZjmqKHlvI/mnaXmupDkuo5PYmplY3QuY3JlYXRlKCnov5nkuKrnibnmgKcgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgY29vbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb29sIScpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaik7XHJcbiAgICBvYmoyLmNvb2woKTsgLy8gY29vbCFcclxufVxyXG5cclxue1xyXG4gICAgLyog57uP5YW457G757un5om/6Z2i5ZCR5a+56LGh6aOO5qC8ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbihuYW1lLCBhZ2UpIHtcclxuICAgICAgICBGb28uY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9vLnByb3RvdHlwZSk7XHJcbiAgICBCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFyO1xyXG4gICAgbGV0IGJhcjEgPSBuZXcgQmFyKCd5dXVoZWknLCAyMik7XHJcbiAgICBsZXQgYmFyMiA9IG5ldyBCYXIoJ1NlbGxlbml0ZScsIDI0KTtcclxuICAgIGNvbnNvbGUubG9nKGJhcjEsIGJhcjIpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDlr7nosaHlp5TmiZjlhbPogZTpo47moLwgKi9cclxuICAgIGxldCBGb28gPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWRlbnRpZnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEkgYW0gJHt0aGlzLm5hbWV9YDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBPYmplY3QuY3JlYXRlKEZvbyk7XHJcbiAgICBCYXIuc3BlYWsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlkZW50aWZ5KCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYjEgPSBPYmplY3QuY3JlYXRlKEJhcik7XHJcbiAgICBsZXQgYjIgPSBPYmplY3QuY3JlYXRlKEJhcik7XHJcbiAgICBiMS5pbml0KCd5dXVoZWknKTtcclxuICAgIGIyLmluaXQoJ1NlbGxlbml0ZScpO1xyXG4gICAgYjEuc3BlYWsoKTtcclxuICAgIGIyLnNwZWFrKCk7XHJcbiAgICBjb25zb2xlLmxvZyhCYXIpOyAvLyB7c3BlYWs6ZigpfVxyXG4gICAgY29uc29sZS5sb2coYjEpOyAvLyB7bmFtZTogJ3l1dWhlaSd9XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWPjeivjeazlSAqL1xyXG4gICAgLyogRVM25Lul5LiL55qE566A5rSB5YaZ5rOV5Lya57yW6K+R5oiQ5Yy/5ZCN5Ye95pWw77yM5peg5rOV6L+b6KGM6YCS5b2SICovXHJcbiAgICBsZXQgRm9vID0ge1xyXG4gICAgICAgIC8vIOacgOWlveS4jeimgeS9v+eUqHRoaXMuYmFyKCnmiJZGb28uYmFyKCnmiafooYzpgJLlvZLvvIzlm6DkuLrlj6/nlKjlrp7pmYXmg4XlhrXmr5TovoPlsJFcclxuICAgICAgICBiYXIoKSB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDku6XkuIrlrp7pmYXkvJrnvJbor5HmiJDku6XkuIvmlrnlvI9cclxuICAgIGxldCBGb28xID0ge1xyXG4gICAgICAgIGJhcjogZnVuY3Rpb24oKSB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDlpoLmnpzopoHmg7Pkvb/nlKjpgJLlvZLvvIzkuI3opoHkvb/nlKjnroDku4vmlrnlvI/vvIzpnIDopoHkvb/nlKjlhbflkI3lh73mlbDooajovr7lvI9cclxuICAgIGxldCBGb28yID0ge1xyXG4gICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIGJhcjogZnVuY3Rpb24gYmFyb29vbygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWRpbmctLS0tLS0+JyArIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgLyog5YW35ZCN5Ye95pWw6L+b6KGM6Ieq5oiR6YCS5b2SICovXHJcbiAgICAgICAgICAgICAgICBiYXJvb29vLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIEZvbzIuYmFyKCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBGb28gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IGZ1bmN0aW9uKG5hbWUsIGFnZSkge1xyXG4gICAgICAgIEZvby5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb28ucHJvdG90eXBlKTtcclxuXHJcbiAgICBsZXQgYmFyID0gbmV3IEJhcigneXV1aGVpJywgMjMpO1xyXG5cclxuICAgIC8qIOWGheecgSAqL1xyXG4gICAgLy8g6aaW5YWI6KaB57qg5q2j6ZSZ6K+v77yMQmFyIGluc3RhbmNlb2YgRm9v5piv6ZSZ55qEXHJcblxyXG4gICAgLyog5p6E6YCg5Ye95pWw5LmL6Ze0Rm9v5ZKMQmFy55qE5YaF55yBICovXHJcbiAgICBCYXIucHJvdG90eXBlIGluc3RhbmNlb2YgRm9vOyAvLyB0cnVlXHJcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmFyLnByb3RvdHlwZSkgPT09IEZvby5wcm90b3R5cGU7IC8vIHRydWVcclxuICAgIEZvb1xyXG4gICAgICAgIC5wcm90b3R5cGVcclxuICAgICAgICAuaXNQcm90b3R5cGVPZihCYXIucHJvdG90eXBlKTsgLy8gdHJ1ZVxyXG5cclxuICAgIC8qIOWunuS+i+WSjOaehOmAoOWHveaVsOS5i+mXtOeahOWGheecgSAqL1xyXG4gICAgYmFyIGluc3RhbmNlb2YgQmFyOyAvLyB0cnVlXHJcbiAgICBiYXIgaW5zdGFuY2VvZiBGb287IC8vIHRydWVcclxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihiYXIpID09PSBCYXIucHJvdG90eXBlOyAvLy8gdHJ1ZVxyXG4gICAgRm9vXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKGJhcik7IC8vIHRydWVcclxuICAgIEJhclxyXG4gICAgICAgIC5wcm90b3R5cGVcclxuICAgICAgICAuaXNQcm90b3R5cGVPZihiYXIpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9yYm1lbnQucHJvdG90eXBlLmNhbGwodGhpcywgLi4uKeaYr+S8quWkmuaAgSAqL1xyXG4gICAgY2xhc3MgT3JibWVudCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lIHx8IE9yYm1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDUwO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBgVGhlICR7dGhpcy5uYW1lfSBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXRNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBFTklHTUEgZXh0ZW5kcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHN1cGVyKCnlnKhjb25zdHJ1Y3RvcuW/hemhu+WcqHRoaXPosIPnlKjliY3miafooYxcclxuICAgICAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyDku6XliY3nmoTkvKrlpJrmgIHlhpnms5XvvJpPcmJtZW50LnByb3RvdHlwZS5zZXRTaXplLmFwcGx5KHRoaXMsIFt3aWR0aCwgaGVpZ2h0XSlcclxuICAgICAgICAgICAgLy8g5rOo5oSP5Ye654mI5Lmm5LiK55qEc3VwZXIod2lkdGgsIGhlaWdodCnlnKhjb25zdHJ1Y3RvcuWkluS9v+eUqOW3suiiq+emgeatou+8jOaUueS4uuabv+aNouS7peS4i+aWueW8j+WunueOsOebuOWvueWkmuaAgVxyXG4gICAgICAgICAgICBzdXBlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gYHNpemUgaXMgd2lkdGggJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEFSQ1VTIGV4dGVuZHMgT3JibWVudCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyBzdXBlcigp5ZyoY29uc3RydWN0b3Llv4XpobvlnKh0aGlz6LCD55So5YmN5omn6KGMXHJcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8g5Lul5YmN55qE5Lyq5aSa5oCB5YaZ5rOV77yaT3JibWVudC5wcm90b3R5cGUuc2V0U2l6ZS5hcHBseSh0aGlzLCBbd2lkdGgsIGhlaWdodF0pXHJcbiAgICAgICAgICAgIC8vIOazqOaEj+WHuueJiOS5puS4iueahHN1cGVyKHdpZHRoLCBoZWlnaHQp5ZyoY29uc3RydWN0b3LlpJbkvb/nlKjlt7LooqvnpoHmraLvvIzmlLnkuLrmm7/mjaLku6XkuIvmlrnlvI/lrp7njrDnm7jlr7nlpJrmgIFcclxuICAgICAgICAgICAgc3VwZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlICs9IGBzaXplIGlzIHdpZHRoICR7dGhpcy53aWR0aH0gYW5kIGhlaWdodCAke3RoaXMuaGVpZ2h0fWA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgRU5JR01BX0kgPSBuZXcgQVJDVVMoJ0VOSUdNQV9JJyk7XHJcbiAgICBsZXQgRU5JR01BX0lfU0laRV9NRVNTQUdFID0gRU5JR01BX0lcclxuICAgICAgICAuc2V0U2l6ZSgpXHJcbiAgICAgICAgLmdldE1lc3NhZ2UoKTtcclxuXHJcbiAgICBsZXQgQVJDVVNfSSA9IG5ldyBBUkNVUygnQVJDVVNfSScpO1xyXG4gICAgbGV0IEFSQ1VTX0lfU0laRV9NRVNTQUdFID0gQVJDVVNfSVxyXG4gICAgICAgIC5zZXRTaXplKDEwMCwgNzApXHJcbiAgICAgICAgLmdldE1lc3NhZ2UoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhFTklHTUFfSV9TSVpFX01FU1NBR0UpO1xyXG4gICAgY29uc29sZS5sb2coQVJDVVNfSV9TSVpFX01FU1NBR0UpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBjbGFzc+W5tuS4jeaYr+mdmeaAge+8jOWPquaYr+S4gOS4qnByb3RvdHlwZeeahOivreazleezlu+8jOS9v+eUqHByb3RvdHlwZeS7jeWPr+S/ruaUuSAqL1xyXG4gICAgY2xhc3MgUmFuZG9tIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5udW0gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFuZCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5udW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcjEgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICByMS5yYW5kKCk7XHJcblxyXG4gICAgUmFuZG9tLnByb3RvdHlwZS5yYW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5udW0gKiAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHIyID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgcjIucmFuZCgpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMS0yLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgY3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuICogQEF1dGhvcjogU2VsbGVuaXRlXHJcbiAqIEBEYXRlOiAgIDIwMTgtMDEtMTYgMTI6MjM6MTBcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMTcgMTE6MDI6MzBcclxuICovXHJcblxyXG57XHJcblx0LyogdHlwZW9mIG51bGwgT2JqZWN0IEFycmF5IOmDveS8mui/lOWbniAnb2JqZWN0JyAgKi9cclxuXHRsZXQgYSA9IG51bGw7XHJcblx0bGV0IGIgPSB7XHJcblx0XHRuYW1lOiAneXV1aGVpJ1xyXG5cdH07XHJcblx0bGV0IGMgPSBbMSwgM107XHJcblx0Y29uc29sZS5sb2codHlwZW9mIGEsIHR5cGVvZiBiLCB0eXBlb2YgYyk7XHJcbn1cclxuXHJcbntcclxuXHQvKiDlpI3lkIjmnaHku7bmo4DmtYtudWxsICovXHJcblx0bGV0IGEgPSBudWxsO1xyXG5cdGNvbnNvbGUubG9nKCFhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0Jyk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWHveaVsOWvueixoeeahGxlbmd0aOaYr+WjsOaYjuWPguaVsOeahOS4quaVsCAqL1xyXG5cdGxldCBmb28gPSBmdW5jdGlvbihhLCBiLCBjKSB7fTtcclxuXHRjb25zb2xlLmxvZyhmb28ubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5aOw5piO5LqG6L+Y5rKh6LWL5YC85bGe5LqOdW5kZWZpbmVkICovXHJcblx0Lyog6L+Y5rKh5aOw5piO5bGe5LqOdW5kZWNsYXJlZO+8iGphdmFzY3JpcHTov5jmmK/kvJrmiZPljbB1bmRlZmluZWTvvIkgKi9cclxufVxyXG5cclxue1xyXG5cdC8qIHR5cGVvZuS4gOS4qnZhcuWjsOaYjuS6huS9huacquWumuS5ieWAvOeahOivneS8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG5cdC8qIHR5cGVvZuS4gOS4quWujOWFqOayoeacieWjsOaYjuWPiuWumuS5ieWAvOeahOivneWQjOagt+S5n+S8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG59XHJcblxyXG57XHJcblx0bGV0IElJRkUgPSAyO1xyXG5cdC8qIHR5cGVvZuWIpOaWreW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSAodHlwZW9mIElJRkUgIT09ICd1bmRlZmluZWQnKSA/IElJRkUgOiBmdW5jdGlvbigpIHtcclxuXHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHR9O1xyXG5cdC8qIOS9v+eUqHR5cGVvZuadpeajgOafpeWPmOmHj+aYr+mmlumAieeahOmAieaLqSAqL1xyXG5cdGNvbnNvbGUubG9nKGhlbHBlcik7IC8vIDJcclxufVxyXG5cclxue1xyXG5cdC8qIOeUqOS+nei1luazqOWFpeiuvuiuoeaooeW8j+adpemqjOivgeW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSBmdW5jdGlvbihJSUZFKSB7XHJcblx0XHRsZXQgaGVscGVyMiA9IElJRkUgfHwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHRcdH07XHJcblx0fTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWIm+W7uueogOeWj+aVsOe7hO+8jOepuueZveeahOWcsOaWueS8muiiq+aYvuW8j+i1i+WAvOS4unVuZGVmaW5lZCAqL1xyXG5cdGxldCBhcnIgPSBbXTtcclxuXHRhcnJbMF0gPSAwO1xyXG5cdGFycls0XSA9IDQ7XHJcblx0Y29uc29sZS5sb2coYXJyLmxlbmd0aCk7IC8vIDVcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOe7hOS5n+aYr+Wvueixoe+8jOWPr+S7peWMheWQq+Wtl+espuS4sumUruWAvOWSjOWxnuaAp++8jOS9huS4jeiuoeWFpeS6juaVsOe7hOeahOmVv+W6piAqL1xyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0YXJyWyduYW1lJ10gPSAneXV1aGVpJztcclxuXHRhcnJbJ2FnZSddID0gMjM7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnIubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSP77yM5aaC5p6c5a2X56ym5Liy6ZSu5YC86IO95aSf6L2s5o2i5Li65Y2B6L+b5Yi25pWw5a2X77yM5Lya6KKr5b2T5L2c5pWw5a2X57Si5byV5aSE55CGICovXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRhcnJbJzUnXSA9IDEwMDtcclxuXHRjb25zb2xlLmxvZyhhcnIpO1xyXG59XHJcblxyXG57XHJcblx0Lyog57G75pWw57uE5Y+K5pWw57uE5Ymv5pys5bu656uLICovXHJcblx0Ly8g57G75pWw57uE6L2s5o2iXHJcblx0bGV0IGZvbyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRjb25zb2xlLmxvZyhhcnIpXHJcblx0fVxyXG5cdGZvbygpXHJcblxyXG5cdC8vIOaVsOe7hOWJr+acrFxyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0bGV0IGFyckNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpXHJcblx0YXJyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5LnB1c2goMjAwKTtcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyckNvcHkpO1xyXG5cclxuXHQvLyBFUzbnmoRBcnJheS5mcm9t5Lmf6IO95aSf5bu656uL5Ymv5pysXHJcblx0bGV0IGFycjIgPSBbMiwgNCwgNl07XHJcblx0bGV0IGFyckNvcHkyID0gQXJyYXkuZnJvbShhcnIyKTtcclxuXHRhcnIyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5Mi5wdXNoKDIwMCk7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnJDb3B5Mik7XHJcbn1cclxuXHJcbntcclxuXHQvKiDorr/pl67lrZfnrKbkuLLmn5DkuKrkuIvmoIflupTor6XnlKguY2hhckF0KCnvvIzogIHniYjmnKxJReS4jeWFgeiuuHN0cmluZ1tpbmRleF3ov5nmoLforr/pl64gKi9cclxuXHQvKiDku6XkuIrlj6rog73lpJ/ov5vooYzlrZfnrKbkuLLorr/pl67vvIzml6Dms5Xov5vooYzlrZfnrKbkuLLkv67mlLkgKi9cclxuXHRsZXQgc3RyaW5nID0gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2coc3RyaW5nWzBdKTtcclxuXHRjb25zb2xlLmxvZyhzdHJpbmcuY2hhckF0KDIpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOWtl+WAvOWPr+eUqOaMh+aVsOihqOekuiAqL1xyXG5cdGxldCBhID0gNUUxMDtcclxuXHRjb25zb2xlLmxvZyhhKTtcclxufVxyXG5cclxue1xyXG5cdGxldCBhID0gNDIuNTk7XHJcblx0LyogLnRvRml4ZWQoKeeUqOS6juaMh+WumuWwj+aVsOaYvuekuuWkmuWwkeS4qiAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9GaXhlZCg0KSk7XHJcblx0LyogLnRvUHJlY2lzaW9uKCnnlKjkuo7mjIflrprlpJrlsJHkuKrmnInmlYjmlbDkvY0gKi9cclxuXHRjb25zb2xlLmxvZyhhLnRvUHJlY2lzaW9uKDUpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIEVTNu+8jOS4peagvOaooeW8j+S4jeWGjeaUr+aMgTDlvIDlpLTnmoTlhavov5vliLbmlbAgKi9cclxuXHQvLyBsZXQgYSA9IDAzNjM7XHJcblx0Ly8gY29uc29sZS5sb2coYSk7ICBTeW50YXhFcnJvclxyXG5cclxuXHQvKiBFUzblkozkuKXmoLzmqKHlvI/kuIvnmoTlhavov5vliLbmmK/nlKgwb+WJjee8gOihqOekuiAqL1xyXG5cdGxldCBhID0gMG8zNjM7XHJcblx0Y29uc29sZS5sb2coYSk7IC8vIDI0M1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSPMC4xKzAuMuS4jeetieS6jjAuM++8jOWtmOWcqOeyvuW6pumXrumimCAqL1xyXG5cdGxldCBhID0gMC4xICsgMC4yO1xyXG5cdGxldCBiID0gMC4zXHJcblx0Y29uc29sZS5sb2coYSA9PT0gYikgLy8gZmFsc2VcclxufVxyXG5cclxue1xyXG5cdC8qIE5hTuS4jeS4jk5hTuebuOetie+8jHR5cGVvZiBOYU7nmoTlgLzkuLonbnVtYmVyJyAqL1xyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBOYU4pOyAvLyBudW1iZXJcclxuXHRjb25zb2xlLmxvZyhOYU4gPT09IE5hTik7IC8vIGZhbHNlXHJcbn1cclxuXHJcbntcclxuXHQvKiB3aW5kb3fmnInkuIDkuKrlhajlsYDmlrnms5Vpc05hTigp77yM5L2G6L+Z5Liq5pyJYnVn77yM5Lya5bCGTmFO5ZKM5a2X56ym5Liy5Lmf5Lya5Yik5pat5Li6dHJ1ZSAqL1xyXG5cdC8qIEVTNueahE51bWJlci5pc05hTigp5L+u5aSN5LqG6L+Z5Liq6Zeu6aKY77yM5LuW5Lya5YWI55SodHlwZW9m5Yik5pat5Li6bnVtYmVy5YaN5omn6KGM5q2k5pa55rOVXHJcblx077yI5LiK6Z2i5o+Q5YiwdHlwZW9mIE5hTui/lOWbnueahOaYrydudW1iZXIn77yJICovXHJcblx0bGV0IGEgPSAnZm9vJztcclxuXHRsZXQgYiA9IDEwIC8gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGEpKTsgLy8gdHJ1ZSwgYnVnXHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGIpKTsgLy8gdHJ1ZVxyXG5cclxuXHRjb25zb2xlLmxvZyhOdW1iZXIuaXNOYU4oYSkpOyAvLyBmYWxzZe+8jOS/ruWkjeS6hlxyXG5cdGNvbnNvbGUubG9nKE51bWJlci5pc05hTihiKSk7IC8vIHRydWVcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdGFnZTItMS5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGdPUE4gPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmY7XG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9udW1iZXIvaXMtbmFuXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL251bWJlci9pcy1uYW4uanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk51bWJlci5pc05hTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9udW1iZXIvaXMtbmFuLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMC4xLjIuNCBOdW1iZXIuaXNOYU4obnVtYmVyKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzTmFOOiBmdW5jdGlvbiBpc05hTihudW1iZXIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBtYXBmbiA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oTyk7XG4gICAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZiAobWFwcGluZykgbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZiAoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEMoKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yIChyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
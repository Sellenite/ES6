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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
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
var IObject = __webpack_require__(53);
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
var aFunction = __webpack_require__(54);
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

var $at = __webpack_require__(68)(true);

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
var dPs = __webpack_require__(70);
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
  __webpack_require__(71).appendChild(iframe);
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
var arrayIndexOf = __webpack_require__(65)(false);
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

module.exports = { "default": __webpack_require__(67), __esModule: true };

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
var $iterCreate = __webpack_require__(69);
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

__webpack_require__(72);
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

var classof = __webpack_require__(81);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 44 */
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
  __webpack_require__(46).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f = $propertyIsEnumerable;
  __webpack_require__(45).f = $getOwnPropertySymbols;

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
/* 45 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(37);
var hiddenKeys = __webpack_require__(27).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @Author: yuuhei
 * @Date: 2018-01-11 13:51:20
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-22 17:02:35
 */
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(85);
__webpack_require__(109);
console.log('<!--------Above is Latest-------->');
console.log('<!--------Below is ASYNC-------->');

/***/ }),
/* 48 */
/***/ (function(module, exports) {

window.GLOBAL = 'ALL_ELEMENT';

{
    /* 永远不要使用eval，它可以执行任何传给它的字符串，很容易遭受XSS攻击 */
    // eval在严格模式下有自己的作用域
    var testEval = function testEval(str, b) {
        // "use strict"; 使用这句后会报ReferenceError，a is not defined
        eval(str); // 欺诈行为
        console.log(a, b);
    };

    testEval("var a = 2;", 4); // 2, 4 顺利改写a
}

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
}

{
    /* 回调函数参数是函数表达式，并不是函数声明 */
    setTimeout(function timeoutHandler() {
        console.log('global setTimeout');
    }, 300);
}

{
    var _a = 233;
    /* 立即执行函数第一个括号里的内容被当作函数表达式 */
    (function () {
        var a = 1;
        console.log('inner IIFE', a);
    })();

    /* 立即执行函数也可以拥有函数名，也可以传参 */
    (function IIFE(a) {
        console.log('global IIFE', a);
    })(_a);

    /* 以上代码语义上等同于下面，上面的IIFE全局下是无法访问的 */
    var IIFE = function (a) {
        console.log('global IIFE2', a);
    }(_a);

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
                var _a2 = 2;
                var readonly = 'yuuhei';
                console.log(_a2, readonly);
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create__);









var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_descriptor___default()(object, property); if (desc === undefined) { var parent = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default()(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = __WEBPACK_IMPORTED_MODULE_7_babel_runtime_core_js_object_create___default()(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default.a ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_set_prototype_of___default()(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_define_property___default()(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @Author: yuuhei
 * @Date:   2018-01-11 13:01:46
 * @Filename: stage1-2.js
 * @Last modified by:   yuuhei
 * @Last modified time: 2018-01-24 13:01:42
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
        };

        (function () {
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(17);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(61).set });


/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(38);
var toAbsoluteIndex = __webpack_require__(66);
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(42);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(73);
var step = __webpack_require__(74);
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
/* 73 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(28);
module.exports = __webpack_require__(80);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(43);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 81 */
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(30) });


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_symbols__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_symbols___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_symbols__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_number_is_nan__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_number_is_nan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_number_is_nan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from__);







var _typeof = typeof __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default.a === "function" && typeof __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol_iterator___default.a === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default.a === "function" && obj.constructor === __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default.a && obj !== __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default.a.prototype ? "symbol" : typeof obj; };

/*
 * @Author: Sellenite
 * @Date:   2018-01-16 12:23:10
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-22 16:57:12
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
	var arrCopy2 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_array_from___default()(arr2);
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

	console.log(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_number_is_nan___default()(_a6)); // false，修复了
	console.log(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_number_is_nan___default()(_b2)); // true

	/* 判断是否NaN的更简单方法 */
	var IsNaN = function IsNaN(n) {
		return n !== n;
	};

	console.log(IsNaN(_b2)); // true
}

{
	/* 关于-0，0 === -0是true */
	/* 数字转为字符串，-号消失；字符串转为数字，-号保留 */
	/* JSON.stringify(-0) 返回"0"，而JSON.parse("-0") 返回-0 */
	console.log(0 === -0); // true
	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(-0), JSON.parse('-0'));

	/* 判断是否为负0的方法 */
	var isMinZero = function isMinZero(n) {
		n = Number(n);
		return n === 0 && 1 / n === -Infinity;
	};

	console.log(isMinZero(-0)); // true
}

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
}

{
	/* typeof new String('123')会返回object */
	var _a7 = new String('Hello');
	console.log(_a7); // String {"Hello"}

	/* 使用String.prototype.toString()能够返回string字符串 */
	console.log(_a7.toString()); // "Hello"
	console.log(String.prototype.toString.call(_a7)); // "Hello"

	/* 与本身构造函数的valueOf()功能相同 */
	console.log(_a7.valueOf()); // "Hello"
	console.log(String.prototype.valueOf.call(_a7)); // "Hello"

	/* Object.prototype是不同的 */
	console.log(Object.prototype.toString.call(_a7)); // [object String]
	console.log(Object.prototype.valueOf.call(_a7)); // String {"Hello"}
}

{
	/* 查看一个内部属性[[class]]使用Object.prototype.toString.call() */
	var _a8 = new Boolean(false);
	console.log(Object.prototype.toString.call(_a8)); // [object Boolean]
}

{
	/* 想要得到封装对象的基本类型值，可以使用valueOf()函数 */
	var _a9 = new String('Hello');
	console.log(_a9.valueOf());

	/* 隐式拆封 */
	var _b3 = _a9 + "";
	console.log(_b3);
}

{
	/* 尝试对一个new String/Boolean/Number进行隐式访问，会造成强制类型转换
    会访问对应的构造函数原型链上的valueOf方法 */
	var _string = new String('string1');
	// 隐式访问，实际是调用返回了String.prototype.valueOf的值，强制类型转换
	if (_string.indexOf(1) !== -1) {
		console.log('new String direct read');
	}
}

{
	/* 当使用表达式+时，其中一个操作数是string（包含强制转换结果），
    则执行字符串拼接，否则执行数字加法 */
	console.log([] + 1); // []被强制执行.toString，得到空字符，结果为"1"
	console.log("4" + 1); // 41
}

{
	/* 当new Array的时候只传入一个数，
    执行的是创建一个数组，长度为10，且全为空单元（非undefined）填充 */
	/* 空单元和undefined是有区别的，注意 */
	var _a10 = Array(10); // new可以省略，js会自动补加
	console.log(_a10, _a10.length);

	/* 清空一个数组可以使用array.length = 0 */
	var _b4 = [2, 4, 6];
	_b4.length = 0;
	console.log(_b4);

	/* 创建一个全是undefined（非空单元）填充的数组 */
	/* array.length这样强行修改会用空单元填充多余的空位 */
	var _c = Array.apply(null, {
		length: 3
	});
	console.log(_c); // [undefined, undefined, undefined]

	/* 永远不要创建和使用空单元数组 */
}

{
	// String.prototype的各类方法，不修改原字符串
	// String#.indexOf
	// String#.charAt
	// String#.substr String#.substring String#.slice()
	// String#.toUpperCase String#.toLowerCase()
	// String#.trim
}

{
	/* Symbol使用原生构造函数来定义，不用加new */
	var myown = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default()('deleteSomething');
	var _a11 = {};
	_a11[__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default()('deleteSomething')] = function () {
		/* doSomething */
	};
	console.log(_a11);
	console.log(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_symbols___default()(_a11));

	/* 具有唯一性，很多开发喜欢使用这个用于私有属性代替_function */
}

{
	/* JSON.stringify()在遇到undefined，function，symbol这三个不安全值时，
    在对象会将其自动忽略，在数组中返回null，在一般调用会返回undefined */
	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(undefined)); // undefined
	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(function () {})); // undefined
	// "{"a": 2}"
	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()({
		a: 2,
		b: function b() {}
	}));
	// "["yuuhei", null, null, 4]"
	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(['yuuhei', undefined, function () {}, 4]));
}

{
	/* JSON.stringify有一个很实用的replacer，可以对数据进行筛选处理 */
	// 可以是数组或函数
	var obj = {
		a: 2,
		b: "22",
		c: [1, 2, 3]
		// replacer为数组时的作用
	};var json1 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(obj, ["a", "b"]); // 只序列化key值为a和b的
	console.log(json1); // "{"b":"22","c":[1,2,3]}"

	// replacer为function时的作用
	var json2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(obj, function (key, value) {
		if (key !== "a") return value;
	});
	console.log(json2);

	// 第三个参数space，还可以调缩进，自动进行格式化，还可以是填充字符串
	var json3 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(obj, null, 4);
	console.log(json3);
	// {
	// 	  "a": 2,
	//	  "b": "22",
	//	  "c": [
	//	  	  1,
	//		  2,
	//		  3
	//	  ]
	// }
}

{
	/* 以下布尔假植在强制转换的时候结果都为false，强制转换是!! */
	// undefined, null, fasle, +0, -0, NaN, ""
	console.log(!!undefined || !!null || !!false || !!0 || !!NaN || !!""); // false
	// document.all在某些IE和某些浏览器是为真值，在某些浏览器下为假值，是一个类数组

	/* 假值之外都是真值，转换后都为true */
}

{
	/* 显式强制类型转换 */
	// 字符串和数字之间的显式转换，不要使用new，并不是创建对象
	var _a12 = 22;
	var _b5 = "3.14";

	var _c2 = String(_a12);
	var d = Number(_b5);

	console.log(_c2, d); // "22", 3.14

	// 另一种方法的显式转换
	var e = _a12.toString(); // 调用的是Number.prototype.toString
	var f = +_b5;
	console.log(e, f); // "22", 3.14
}

{
	// 日期显示转换为数字（相当于.getTime()功能）
	var _a13 = new Date();
	console.log(+_a13, _a13.getTime());

	// 当实例化一个构造函数的时候如果没有参数传入，可以不加()
	console.log(+new Date());

	// ES5的Date有一个获取当前时间戳的API，其polyfill就是+new Date()
	console.log(Date.now());
}

{
	/* parseInt的使用 */

	// parseInt针对的是字符串，要求所有字符都是数字，否则返回NaN
	// Number()可以忽略不是数字字符的字符串，遇到非数字字符则停止转换
	var _a14 = '12aa45';
	var _b6 = '456';

	console.log(parseInt(_a14), Number(_a14)); // NaN, 465
	console.log(parseInt(_b6), Number(_b6)); // 12, 456
}

{
	/* parseInt的第二个参数转制问题，将当前数值定义为自定义进制，不用加前缀
    然后转换为数字 */

	// 如果需要在ES5之前的环境运行并且没有polyfill，需要手动加上第二个参数10
	// 强制转换为十进制，不然会被转为八进制，避免不必要的坑

	var _a15 = "100";
	var _b7 = 256;

	console.log(parseInt(_a15, 16)); // 256
	console.log(parseInt(_a15, 8)); // 64
	console.log(parseInt(_a15, 2)); // 4
	console.log(parseInt(_a15, 10)); // 100

	/* toString()传入参数，可以将当前数值转换为指定进制 */
	console.log(_b7.toString(16)); // 100
}

{
	/* 自定义转换 */

	// 十进制数值转为自定义进制：
	var decimalToOther = function decimalToOther(num, transform) {
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
	};

	console.log(decimalToOther(100, 8)); // "0o144"

	// 其他转制转换为十进制（传入标准格式0X或0o等字符串格式）：
	var otherToDecimal = function otherToDecimal(num) {
		/* 返回数字 */
		var num = num.toLowerCase();
		if (num.indexOf('0x') === 0) {
			return parseInt(num.replace(/0x/, ''), 16);
		} else if (num.indexOf('0o') === 0) {
			return parseInt(num.replace(/0o/, ''), 8);
		} else {
			return parseInt(num, 10);
		}
	};

	console.log(otherToDecimal('0x100')); // 256
}

{
	/* boolean显示转换，建议使用!!用来转换 */
	var _a16 = "asd";
	var _b8 = [];
	var _c3 = {};

	// 注意空数组和空对象都是返回true。是真值，所有的假值上面有提到
	console.log(Boolean(_a16)); // true
	console.log(!!_b8); // true
	console.log(!!_c3); //true
}

{
	var _arr4 = [2, function () {}, 4, function () {}];

	console.log(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(_arr4));

	var json = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(_arr4, function (key, value) {
		if (typeof value === 'function') {
			return true;
		} else {
			return value;
		}
	});

	console.log(json); // [2,true,4,true]
}

{
	/* || 或 && 返回的不一定是布尔值 */

	// 对于||，如果当前值判断为true，就会返回当前值
	console.log(false || "ss" || 110); // "ss"

	// 对于&&，只要有一个值判断为false，就返回判断为false的那个值，
	// 否则返回最后一个值
	console.log("55" && undefined && 110); // undefined
	console.log("55" && null && 110); // null
	console.log("55" && function () {} && 110); // 110

	// 所以||会有一个常用作用：传参判断
	var func = function func(a, b) {
		a = a || 'Hello';
		b = b || 'World';
		return a + " " + b;
	};
	console.log(func('Hi')); // Hi World
	console.log(func('Hi', "")); // 注意这里传入了假值，结果依然是Hi World
	console.log(func('Hi', " ").trim()); // 传入空字符则判断为true，返回Hi

	console.log(_typeof("")); // string，如有需求可以通过这个进行容错

	// 所以&&会有一个常用作用：判断参数是否为true，是则执行一个函数
	true && function () {
		console.log('this is && function!');
	}();
}

{
	/* 注意ES6的Symbol只能够通过显式转换为字符串，使用隐式将会报错 */
	var symbol = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default()('symbolElement');
	console.log(String(symbol)); // "Symbol(symbolElement)"

	// symbol + "" 这样隐式转换会报错

	// Symbol无法转换为数字，显示和隐式都会出错

	// Symbol可以转换为boolean，隐式显式都转换为true
	console.log(Boolean(symbol)); // true
	console.log(!!symbol); // true
}

{
	/* 关于==和===的使用准则 */

	// 当两边有值为true和false的时候，前往不要使用==
	// 当两边有值为[]，""，0时，尽量不要使用==
	// 使用===是最安全的选择
}

{
	/* ++表达式 */
	var _a17 = 43;
	var _b9 = (_a17++, _a17);
	console.log(_b9); // 正确将44赋值给b
}

{
	/* ES6的参数预留值可以理解为使用了let，存在暂时性死区TDZ */
	// 下面声明赋值b的时候，同时进行了访问，这样在ES6有些情况会报错
	var testTDZ = function testTDZ() {
		var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
		var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a + b + 3;

		console.log(a, b); // 不报错就输出NaN
	};
	// testTDZ();
}

{
	/* 宿主变量 */
	var div = document.createElement('div');
	console.log(typeof div === 'undefined' ? 'undefined' : _typeof(div)); // object
	console.log(Object.prototype.toString.call(div)); // [object HTMLDivElement]
	console.log(div.tagName); // DIV
}

{
	/* 由于浏览器历史遗留问题，在创建带有id 属性的DOM 元素时也会创建同名的全局变量 */
	// <div id="app"></div>
	console.log(app); // 一个元素的id为app写在html，window全局对象就带有这个属性
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
module.exports = __webpack_require__(0).Object.getOwnPropertySymbols;


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
var gOPS = __webpack_require__(45);
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
var gOPN = __webpack_require__(46).f;
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
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(94);
__webpack_require__(95);
__webpack_require__(96);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 94 */
/***/ (function(module, exports) {



/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
module.exports = __webpack_require__(0).Number.isNaN;


/***/ }),
/* 101 */
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(104);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(14);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(106);
var toLength = __webpack_require__(38);
var createProperty = __webpack_require__(107);
var getIterFn = __webpack_require__(43);

$export($export.S + $export.F * !__webpack_require__(108)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(11);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 108 */
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


/***/ }),
/* 109 */
/***/ (function(module, exports) {

/*
 * @Author: Sellenite
 * @Date:   2018-01-22 17:02:17
 * @Last modified by:   yuuhei
 * @Last modified time: 2018-01-24 12:01:79
 */

{}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGE1YzhlYmIxNjhmMTdmNzE2MmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RhZ2UxLTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMS0yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0xLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0yLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiR0xPQkFMIiwidGVzdEV2YWwiLCJzdHIiLCJiIiwiZXZhbCIsImEiLCJzZXRUaW1lb3V0IiwidGltZW91dEhhbmRsZXIiLCJJSUZFIiwiZm4iLCJkZWYiLCJnbG9iYWwiLCJmb28iLCJiYXIiLCJlcnJvciIsImJheiIsImkiLCJqIiwiY29vbE1vZHVsZSIsInNvbWV0aGluZyIsImFub3RoZXIiLCJkb1NvbWV0aGluZyIsImRvQW5vdGhlciIsImpvaW4iLCJjb29sIiwiTXlNb2R1bGVzIiwiTWFuYWdlciIsIm1vZHVsZXMiLCJkZWZpbmUiLCJuYW1lIiwiZGVwcyIsImltcGwiLCJsZW5ndGgiLCJhcHBseSIsImdldCIsIl90aGlzIiwiaGVsbG8iLCJoaSIsIkZvbyIsIkJhciIsInVuZGVmaW5lZCIsImNhdGNoVmFsdWUiLCJyZWFkb25seSIsIm9iaiIsImNvdW50IiwiYmluZCIsIm9iamVjdCIsImNhbGwiLCJhYmMiLCJETVoiLCJvYmoxIiwib2JqMiIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJyZXQiLCJldmVyeSIsInB1c2giLCJzb21lIiwiaXQiLCJuZXh0IiwiYWdlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJvIiwia2V5cyIsImRvbmUiLCJrIiwiYyIsImlkeCIsImtzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm15TmFtZSIsIl9fcHJvdG9fXyIsImhhc093blByb3BlcnR5IiwiYmFyMSIsImJhcjIiLCJpbml0IiwiaWRlbnRpZnkiLCJzcGVhayIsImIxIiwiYjIiLCJGb28xIiwiRm9vMiIsImJhcm9vb28iLCJpc1Byb3RvdHlwZU9mIiwiT3JibWVudCIsIm1lc3NhZ2UiLCJ3aWR0aCIsImhlaWdodCIsIkVOSUdNQSIsIkFSQ1VTIiwiRU5JR01BX0kiLCJFTklHTUFfSV9TSVpFX01FU1NBR0UiLCJzZXRTaXplIiwiZ2V0TWVzc2FnZSIsIkFSQ1VTX0kiLCJBUkNVU19JX1NJWkVfTUVTU0FHRSIsIlJhbmRvbSIsIm51bSIsIk1hdGgiLCJyYW5kb20iLCJyMSIsInJhbmQiLCJyMiIsImhlbHBlciIsImhlbHBlcjIiLCJBcnJheSIsInNsaWNlIiwiYXJndW1lbnRzIiwiYXJyQ29weSIsImFycjIiLCJhcnJDb3B5MiIsInN0cmluZyIsImNoYXJBdCIsInRvRml4ZWQiLCJ0b1ByZWNpc2lvbiIsIk5hTiIsImlzTmFOIiwiSXNOYU4iLCJuIiwiSlNPTiIsInBhcnNlIiwiaXNNaW5aZXJvIiwiTnVtYmVyIiwiSW5maW5pdHkiLCJTdHJpbmciLCJ0b1N0cmluZyIsInZhbHVlT2YiLCJCb29sZWFuIiwiaW5kZXhPZiIsIm15b3duIiwianNvbjEiLCJqc29uMiIsImtleSIsImpzb24zIiwiZCIsImUiLCJmIiwiRGF0ZSIsImdldFRpbWUiLCJub3ciLCJwYXJzZUludCIsImRlY2ltYWxUb090aGVyIiwidHJhbnNmb3JtIiwib3RoZXJUb0RlY2ltYWwiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJqc29uIiwiZnVuYyIsInRyaW0iLCJzeW1ib2wiLCJ0ZXN0VERaIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGFnTmFtZSIsImFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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QUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBLGlDQUFpQyxTQUFTLEVBQUU7QUFDNUMsQ0FBQyxZQUFZOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTLHFCQUFxQjtBQUMzRCxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7Ozs7Ozs7QUNyQkE7Ozs7Ozs7QUFPQSxDQUVDLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGE1YzhlYmIxNjhmMTdmNzE2MmEiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYgKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpIGRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHsgdmFsdWU6IHdrc0V4dC5mKG5hbWUpIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAoIUJVR0dZICYmICRuYXRpdmUpIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICAkcmVwbGFjZXIgPSByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcbiAqIEBBdXRob3I6IHl1dWhlaVxyXG4gKiBARGF0ZTogMjAxOC0wMS0xMSAxMzo1MToyMFxyXG4gKiBATGFzdCBNb2RpZmllZCBieTogICBTZWxsZW5pdGVcclxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOC0wMS0yMiAxNzowMjozNVxyXG4gKi9cclxucmVxdWlyZSgnLi9zdGFnZTEtMS5qcycpO1xyXG5yZXF1aXJlKCcuL3N0YWdlMS0yLmpzJyk7XHJcbnJlcXVpcmUoJy4vc3RhZ2UyLTEuanMnKTtcclxucmVxdWlyZSgnLi9zdGFnZTItMi5qcycpO1xyXG5jb25zb2xlLmxvZygnPCEtLS0tLS0tLUFib3ZlIGlzIExhdGVzdC0tLS0tLS0tPicpO1xyXG5jb25zb2xlLmxvZygnPCEtLS0tLS0tLUJlbG93IGlzIEFTWU5DLS0tLS0tLS0+Jyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIiwid2luZG93LkdMT0JBTCA9ICdBTExfRUxFTUVOVCc7XHJcblxyXG57XHJcbiAgICAvKiDmsLjov5zkuI3opoHkvb/nlKhldmFs77yM5a6D5Y+v5Lul5omn6KGM5Lu75L2V5Lyg57uZ5a6D55qE5a2X56ym5Liy77yM5b6I5a655piT6YGt5Y+XWFNT5pS75Ye7ICovXHJcbiAgICAvLyBldmFs5Zyo5Lil5qC85qih5byP5LiL5pyJ6Ieq5bex55qE5L2c55So5Z+fXHJcbiAgICBsZXQgdGVzdEV2YWwgPSBmdW5jdGlvbihzdHIsIGIpIHtcclxuICAgICAgICAvLyBcInVzZSBzdHJpY3RcIjsg5L2/55So6L+Z5Y+l5ZCO5Lya5oqlUmVmZXJlbmNlRXJyb3LvvIxhIGlzIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgZXZhbChzdHIpOyAvLyDmrLror4jooYzkuLpcclxuICAgICAgICBjb25zb2xlLmxvZyhhLCBiKTtcclxuICAgIH1cclxuXHJcbiAgICB0ZXN0RXZhbChcInZhciBhID0gMjtcIiwgNCk7IC8vIDIsIDQg6aG65Yip5pS55YaZYVxyXG59XHJcblxyXG57XHJcbiAgICAvKiDmsLjov5zkuI3opoHkvb/nlKh3aXRo6L+b6KGM5a+56LGh6LWL5YC877yM5pON5L2c5LiN5b2T5b6I5pyJ5Y+v6IO95rOE5ryP6YO95YWo5bGA5Y+Y6YePICovXHJcbiAgICAvLyB3aXRo5Zyo5Lil5qC85qih5byP5LiL6KKr5a6M5YWo56aB5q2i77yM5Lul5LiL5Luj56CB5Li65rOE5ryP5YWo5bGA5Y+Y6YeP55qE5L6L5a2Q77yM5Zyo6Z2e5Lil5qC85qih5byP5LiL5omn6KGMXHJcbiAgICAvKlxyXG4gICAgbGV0IHRlc3RXaXRoID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgd2l0aChvYmopIHtcclxuICAgICAgICAgICAgX2EgPSAnd2l0aCByZXZpc2Ugc3VjY2Vzc2Z1bGx5JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9iajEgPSB7XHJcbiAgICAgICAgXCJfYVwiOiAyMzNcclxuICAgIH07XHJcbiAgICBsZXQgb2JqMiA9IHtcclxuICAgICAgICBcIl9iXCI6IDQ0NVxyXG4gICAgfTtcclxuXHJcbiAgICB0ZXN0V2l0aChvYmoxKTsgLy8gb2JqMS5fYSA9IHdpdGggcmV2aXNlIHN1Y2Nlc3NmdWxseVxyXG4gICAgdGVzdFdpdGgob2JqMik7IC8vIG9iajIuX2EgPSB1bmRlZmluZWRcclxuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5fYSk7IC8vIHdpdGggcmV2aXNlIHN1Y2Nlc3NmdWxsee+8jOeUseS6juS9nOeUqOWfn+mXrumimOazhOa8j+WIsOWFqOWxgOWPmOmHj1xyXG4gICAgKi9cclxufVxyXG5cclxue1xyXG4gICAgLyog5Zue6LCD5Ye95pWw5Y+C5pWw5piv5Ye95pWw6KGo6L6+5byP77yM5bm25LiN5piv5Ye95pWw5aOw5piOICovXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgc2V0VGltZW91dCcpXHJcbiAgICB9LCAzMDApO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYSA9IDIzMztcclxuICAgIC8qIOeri+WNs+aJp+ihjOWHveaVsOesrOS4gOS4quaLrOWPt+mHjOeahOWGheWuueiiq+W9k+S9nOWHveaVsOihqOi+vuW8jyAqL1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gMVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbm5lciBJSUZFJywgYSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qIOeri+WNs+aJp+ihjOWHveaVsOS5n+WPr+S7peaLpeacieWHveaVsOWQje+8jOS5n+WPr+S7peS8oOWPgiAqL1xyXG4gICAgKGZ1bmN0aW9uIElJRkUoYSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgSUlGRScsIGEpO1xyXG4gICAgfSkoYSk7XHJcblxyXG4gICAgLyog5Lul5LiK5Luj56CB6K+t5LmJ5LiK562J5ZCM5LqO5LiL6Z2i77yM5LiK6Z2i55qESUlGReWFqOWxgOS4i+aYr+aXoOazleiuv+mXrueahCAqL1xyXG4gICAgdmFyIElJRkUgPSBmdW5jdGlvbihhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBJSUZFMicsIGEpO1xyXG4gICAgfShhKTtcclxuXHJcbiAgICAvKiBVTUTvvIzlsIblh73mlbDooajovr7lvI/kvKDov5tJSUZF55qE5qih5byPICovXHJcbiAgICAoZnVuY3Rpb24oZm4pIHtcclxuICAgICAgICBmbih3aW5kb3cpO1xyXG4gICAgfSkoZnVuY3Rpb24gZGVmKGdsb2JhbCkge1xyXG4gICAgICAgIHZhciBhID0gMjtcclxuICAgICAgICBjb25zb2xlLmxvZygnaW5uZXIgVU1EJywgYSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBVTUQnLCBnbG9iYWwuR0xPQkFMKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiB2YXLlj5jph4/lo7DmmI7mj5DljYcgKi9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhKTsgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKiDku6XkuIrku6PnoIHnrYnlkIzkuo7kuIvpnaIgKi9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhKTtcclxuICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qIOWHveaVsOWjsOaYjuWPr+S7peaPkOWJje+8jOWHveaVsOihqOi+vuW8j+eahOWjsOaYjuS8muWDj+S4iumdouWPmOmHj+S4gOagt+eahOaPkOWNh+aIkHVuZGVmaWVkICovXHJcbiAgICBmb28oKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZvbycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIOWHveaVsOihqOi+vuW8j+aPkOWNh+aIkHVuZGVmaW5lZO+8jOaJp+ihjHVuZGVmaW5lZOS8muaKpVR5cGVFcnJvcu+8jOiAjOS4jeaYr1JlZmVyZW5jZUVycm9yICovXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGJhcigpO1xyXG4gICAgICAgIHZhciBiYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JhcicpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxue1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qIOWfuuehgOagh+WHhumXreWMhSAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBiYXogPSBmb28oKTtcclxuICAgICAgICBiYXooKTtcclxuXHJcbiAgICAgICAgLyog6Zet5YyF5b6q546vICovXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgKGZ1bmN0aW9uKGopIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dEhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaik7XHJcbiAgICAgICAgICAgICAgICB9LCBqICogMzAwKTtcclxuICAgICAgICAgICAgfSkoaSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIOWfuuacrOaooeWdl+iuvuiuoeaooeW8jyAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvb2xNb2R1bGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzb21ldGhpbmcgPSAnY29vbCc7XHJcbiAgICAgICAgICAgIHZhciBhbm90aGVyID0gWzEsIDIsIDNdO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZG9Tb21ldGhpbmcoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzb21ldGhpbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYmF6ID0gZm9vKCk7XHJcbiAgICAgICAgICAgIGJheigpO1xyXG5cclxuICAgICAgICAgICAgLyog6Zet5YyF5b6q546vICovXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dEhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGogKiAzMDApO1xyXG4gICAgICAgICAgICAgICAgfSkoaSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyog5Z+65pys5qih5Z2X6K6+6K6h5qih5byPICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvb2xNb2R1bGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc29tZXRoaW5nID0gJ2Nvb2wnO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFub3RoZXIgPSBbMSwgMiwgM107XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9Tb21ldGhpbmcoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc29tZXRoaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb0Fub3RoZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYW5vdGhlci5qb2luKCchJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9Tb21ldGhpbmc6IGRvU29tZXRoaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvQW5vdGhlcjogZG9Bbm90aGVyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY29vbCA9IGNvb2xNb2R1bGUoKTtcclxuICAgICAgICAgICAgY29vbC5kb0Fub3RoZXIoKTtcclxuICAgICAgICAgICAgY29vbC5kb1NvbWV0aGluZygpO1xyXG5cclxuICAgICAgICAgICAgLyog546w5Luj5qih5Z2X5L6d6LWW5Yqg6L295Zmo77yM57G7cmVxdWlyZUpT5qih5byPICovXHJcbiAgICAgICAgICAgIHZhciBNeU1vZHVsZXMgPSAoZnVuY3Rpb24gTWFuYWdlcigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVzID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVmaW5lKG5hbWUsIGRlcHMsIGltcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwc1tpXSA9IG1vZHVsZXNbZGVwc1tpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOacgOS4u+imgeWHveaVsO+8jOS9v+eUqOWHveaVsOi/lOWbnuWAvOaJp+ihjFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNbbmFtZV0gPSBpbXBsLmFwcGx5KGltcGwsIGRlcHMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXQobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2R1bGVzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZTogZGVmaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldDogZ2V0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAgICAgTXlNb2R1bGVzLmRlZmluZSgnZm9vJywgW10sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBoZWxsbygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVsbG86IGhlbGxvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgTXlNb2R1bGVzLmRlZmluZSgnYmFyJywgWydmb28nXSwgZnVuY3Rpb24oZm9vKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBoaSgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYmFyIHdpdGggZm9vJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vLmhlbGxvKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGk6IGhpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBGb28gPSBNeU1vZHVsZXMuZ2V0KCdmb28nKTtcclxuICAgICAgICAgICAgdmFyIEJhciA9IE15TW9kdWxlcy5nZXQoJ2JhcicpO1xyXG4gICAgICAgICAgICBCYXIuaGkoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qIFRyYWNldXLpobnnm650cnktY2F0Y2jop6PlhrNFUzbku6XliY3nmoTnuqfkvZznlKjln58gKi9cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRocm93IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBjYXRjaCAoY2F0Y2hWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5aSW6YOo5peg5rOV6K6/6Zeu5oiW5L2/55So6L+Z5Liq5Y+Y6YePXHJcbiAgICAgICAgICAgICAgICBjYXRjaFZhbHVlID0gMjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cnktY2F0Y2ggYmxvY2snLCBjYXRjaFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyog5pi+5byP5Yib5bu65Z2X57qn5L2c55So5Z+fICovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhID0gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRvbmx5ID0gJ3l1dWhlaSc7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhLCByZWFkb25seSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyogYmluZOino+WGs3NldFRpbWVvdXTnrYnml7booqvnu5Hlrpp3aW5kb3fkuLrkuIrkuIvmlocgKi9cclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgY29vbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9yZSBhd2Vzb21lOiAnLCB0aGlzLmNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzLmNvdW50ICogMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLmNvb2woKTtcclxuXHJcbiAgICAgICAgICAgIC8qIOeureWktOWHveaVsOe7keWumuWJjeWQjuS4iuS4i+aWhyAqL1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDMsXHJcbiAgICAgICAgICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9yZSBhd2Vzb21lIGFycm93OiAnLCB0aGlzLmNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5jb3VudCAqIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iamVjdC5jb29sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdGFnZTEtMS5qcyIsIi8qKlxyXG4gKiBAQXV0aG9yOiB5dXVoZWlcclxuICogQERhdGU6ICAgMjAxOC0wMS0xMSAxMzowMTo0NlxyXG4gKiBARmlsZW5hbWU6IHN0YWdlMS0yLmpzXHJcbiAqIEBMYXN0IG1vZGlmaWVkIGJ5OiAgIHl1dWhlaVxyXG4gKiBATGFzdCBtb2RpZmllZCB0aW1lOiAyMDE4LTAxLTI0IDEzOjAxOjQyXHJcbiAqL1xyXG5cclxue1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gJ0FMTCc7XHJcbiAgICAgICAgLyogYXJndW1lbnRzLmNhbGxlZeWPr+S7peeUqOadpeW8leeUqOato+WcqOi/kOihjOeahOWHveaVsO+8jOWMheaLrOWMv+WQjeWHveaVsCAqL1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOivpeaWueazleaYr+S4gOenjeiiq+W6n+W8g+eahOaWueahiO+8jOS4peagvOaooeW8j+S4i+S8muaKpemUmSBjb25zb2xlLmxvZyhhcmd1bWVudHMuY2FsbGVlKTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICAvKiDlnKjlh73mlbDmma7pgJrmqKHlvI/kuIvnm7TmjqXosIPnlKjpu5jorqTnu5HlrprnmoR0aGlz5Li65YWo5bGA5a+56LGhd2luZG93ICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyDlnKjkuKXmoLzmqKHlvI/kuIvliJnkuI3kvJrpu5jorqTnu5HlrprvvIx0aGlz5Li6dW5kZWZpbmVkIHVzZSBzdHJpY3TkuIDlrpropoHlhpnlnKjnrKzkuIDooYxcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvbygpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIOWHveaVsOWumuS5ieWcqOmdnuS4peagvOaooeW8j+S4i++8jOWNs+S9v+WcqOS4peagvOaooeW8j+S4i+iwg+eUqOS+neeEtuiiq+m7mOiupOe7keWumuS4undpbmRvdyAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgICAgICAgIGZvbygpOyAvLyB3aW5kb3dcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDpmpDlvI/nu5HlrprkvovlrZAgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMjMzLFxyXG4gICAgICAgICAgICAgICAgZm9vOiBmb29cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG9iai5mb28oKSAvLyAyXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog6KOF566xICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9vLmNhbGwodHJ1ZSk7IC8vIEJvb2xlYW4ge1tbUHJpbWl0aXZlVmFsdWVdXTogdHJ1ZX1cclxuICAgICAgICAgICAgZm9vLmNhbGwoJzEyMycpOyAvLyBTdHJpbmcge1tbUHJpbWl0aXZlVmFsdWVdXTogXCIxMjNcIn1cclxuICAgICAgICAgICAgZm9vLmNhbGwoNDU2KTsgLy8gTnVtYmVyIHtbW1ByaW1pdGl2ZVZhbHVlXV06IDQ1Nn1cclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBmb28gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGFiYyA9IGZvby5iaW5kKG51bGwpO1xyXG4gICAgICAgICAgICAvKiDkuKXmoLzmqKHlvI/kuIvvvIx0aGlz5oyH5ZCR5pivbnVsbO+8jOS9humdnuS4peagvOaooeW8j+S4i++8jHRoaXPmjIflkJHmmK93aW5kb3fvvIzms6jmhI8gKi9cclxuICAgICAgICAgICAgYWJjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiDkuLrkuobpgb/lhY3ku6XkuIrmg4XlhrXvvIzkvb/nlKhETVrmnaXnu5Hlrprmm7TlronlhajnmoR0aGlz77yM6YG/5YWN6buY6K6k57uR5a6a6KeE5YiZICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIEFMTFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2E6ICcgKyBhICsgJywgYjogJyArIGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWIm+W7uuWujOWFqOepuueahOWvueixoe+8jERNWlxyXG4gICAgICAgICAgICB2YXIgRE1aID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5iaW5kKERNWiwgMik7XHJcbiAgICAgICAgICAgIGJhcig0KTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDnrq3lpLTlh73mlbDkuI3pgILnlKjkuo7ku6XkuIrlh6DmnaHop4TliJkgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnuS4gOS4queureWktOWHveaVsFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpc+e7p+aJv+iHqmZvb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvYmoxID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5jYWxsKG9iajEpO1xyXG4gICAgICAgICAgICBiYXIuY2FsbChvYmoyKTsgLy8gMu+8jOi/memHjOeahGNhbGznlLHkuo7kvb/nlKjkuobnrq3lpLTlvLrliLbnu5HlrprkuobkuIrkuIvmlofvvIzkuIDnm7TmmK9vYmoxXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyogZm9yRWFjaOeahOesrOS6jOS4quWPguaVsOWPr+S7pee7keWumuS4iuS4i+aWh++8jOWSjGJpbmTmlYjmnpzkuIDmoLcgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFsxLCAzLCA0XVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3l1dWhlaSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0pKCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuZXZlcnkoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXQucHVzaChpdGVtKTtcclxuICAgICAgICAvKiDpgY3ljobmr4/kuIDkuKrlhYPntKDvvIznm7Toh7Pov5Tlm55mYWxzZSAqL1xyXG4gICAgICAgIHJldHVybiBpdGVtICUgMTEgIT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuc29tZSgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8qIOmBjeWOhuavj+S4gOS4quWFg+e0oO+8jOebtOiHs+i/lOWbnnRydWUgKi9cclxuICAgICAgICByZXR1cm4gaXRlbSAlIDkgPT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMiwgNCwgNl07XHJcbiAgICBmb3IgKGxldCBpIG9mIGFycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiDmlbDnu4Toh6rluKbov63ku6PlmajvvIzlj6/ku6Xkvb/nlKhmb3Itb2bpgY3ljobmlbDnu4TnmoTlgLwgKi9cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMSwgMiwgM107XHJcbiAgICBsZXQgaXQgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxuLyog5a+56LGh5pys6Lqr5rKh5pyJ6L+t5Luj5Zmo77yM6ZyA6KaB5qih5Lu/5ZCO5omN6IO95L2/55SoZm9yLW9mICovXHJcblxyXG4vKiDnlLHkuo7ov63ku6PlmajnmoTlsZ7mgKflsLHmmK9TeW1ib2wuaXRlcmF0b3LvvIzpnIDopoHkvb/nlKjplK7lgLzorr/pl67ms5UgKi9cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBuYW1lOiAneXV1aGVpJyxcclxuICAgICAgICBhZ2U6ICcyMzInXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIOi/meagt+WumuS5ieWPr+S7peS4jeiuqVN5bWJvbOiiq+aemuS4vu+8jOebtOaOpeWumuS5ieS5n+aYr+WPr+S7peeahCAqL1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgU3ltYm9sLml0ZXJhdG9yLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvW2tleXNbaW5kZXgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaW5kZXggPiBrZXlzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGsgb2Ygb2JqKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMSxcclxuICAgICAgICBiOiAyMzMsXHJcbiAgICAgICAgYzogNDQ1LFxyXG4gICAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG8gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtzID0gT2JqZWN0LmtleXMobyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb1trc1tpZHgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaWR4ID4ga3MubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXQgPSBvYmpbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhpdC5uZXh0KCkpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxue1xyXG4gICAgLyogT2JqZWN0LmNyZWF0ZShvYmop5Lya5bCGW1twcm90b3R5cGVdXeWFs+iBlOWIsOaMh+WumuWvueixoe+8jOe7p+aJv+WwseeUseS6jui/meS4quWOn+eQhiAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhOiAxMjNcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIGNvbnNvbGUubG9nKG9iajIuYSlcclxufVxyXG5cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhZ2U6IDIzXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ25hbWUnLCB7XHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6ICd5dXVoZWknXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpIC8vIGFnZVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiDml6DorrplbnVtZXJhYmxl5piv5LuA5LmI77yMaW7mk43kvZznrKbpg73og73lpJ/liKTmlq1rZXnmmK/lkKblnKhvYmrkuK3vvIzlubbkuJTlr7vmib7ljp/lnovpk74gKi9cclxuICAgIGNvbnNvbGUubG9nKCduYW1lJyBpbiBvYmopO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBFUzbmi6XmnIlPYmplY3Quc2V0UHJvdG90eXBlT2bov5vooYzljp/lnovpk77nu6fmib8gKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgRm9vLnByb3RvdHlwZS5hID0gMTtcclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKEJhci5wcm90b3R5cGUsIEZvby5wcm90b3R5cGUpO1xyXG4gICAgbGV0IGJhciA9IG5ldyBCYXIoKTtcclxuICAgIGNvbnNvbGUubG9nKGJhci5hKTtcclxufVxyXG5cclxue1xyXG4gICAgLyog57uE5ZCI57un5om/ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbihuYW1lLCBhZ2UpIHtcclxuICAgICAgICAvKiDnu5HlrprniLbkurLnmoTmnoTpgKDlsZ7mgKcgKi9cclxuICAgICAgICBGb28uY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgLyog5bCGQmFy55qEW1twcm90b3R5cGVdXeWFs+iBlOWIsEZvb+eahO+8jOe7p+aJv0Zvb+eahOWOn+Wei+mTvuWxnuaApyAqL1xyXG4gICAgQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9vLnByb3RvdHlwZSk7XHJcblxyXG4gICAgLyog5L+u5pS56L+HcHJvdG90eXBl5ZCO6ZyA6KaB5omL5Yqo5L+u5aSNY29uc3RydWN0b3LnmoTmjIflkJEgKi9cclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBCYXIucHJvdG90eXBlLm15TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcbiAgICBjb25zb2xlLmxvZyhiYXIubXlOYW1lKCkpO1xyXG4gICAgLyogRVM155u05o6l6I635Y+W5LiA5Liq5a+56LGh55qEW1twcm90b3R5cGVdXeeahOaWueW8jyAqL1xyXG4gICAgY29uc29sZS5sb2coT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGUpO1xyXG4gICAgLyog57ud5aSn5aSa5pWw5rWP6KeI5Zmo77yI6Z2e5qCH5YeG6I635Y+W5pa55byP77yJ5pSv5oyBICovXHJcbiAgICBjb25zb2xlLmxvZyhiYXIuX19wcm90b19fID09PSBCYXIucHJvdG90eXBlKTtcclxuICAgIC8qIOe7p+aJv+S5n+WPr+S7pemAmui/h2luc3RhbmNlb2bmib7liLDmupDlpLQgKi9cclxuICAgIGNvbnNvbGUubG9nKGJhciBpbnN0YW5jZW9mIEZvbyk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9iamVjdC5jcmVhdGXoh6rluKbnrKzkuozkuKrlj4LmlbDlj6/ku6XlrprkuYnlsZ7mgKfmj4/ov7DnrKYgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqLCB7XHJcbiAgICAgICAgYjoge1xyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IDNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBvYmoy55qE5Y6f5Z6L6ZO+5LiK6L+e5o6l5LqGb2Jq55qE5Y6f5Z6L6ZO+XHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmEpOyAvLyAyXHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmhhc093blByb3BlcnR5KCdhJykpOyAvLyBmYWxzZVxyXG4gICAgY29uc29sZS5sb2cob2JqLmhhc093blByb3BlcnR5KCdhJykpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDnpZ7lpYfnmoRBUEnorr7orqHvvIznlLHkuo7mnKzouqvlhoXpg6jmsqHmnInor6Xlh73mlbDvvIzljbTog73lpJ/ov5DooYzvvIzkvJrlj5jlvpfmgKrmgKrnmoQgKi9cclxuICAgIC8qIOmdouWQkeWnlOaJmOaooeW8j+adpea6kOS6jk9iamVjdC5jcmVhdGUoKei/meS4queJueaApyAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvb2whJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIG9iajIuY29vbCgpOyAvLyBjb29sIVxyXG59XHJcblxyXG57XHJcbiAgICAvKiDnu4/lhbjnsbvnu6fmib/pnaLlkJHlr7nosaHpo47moLwgKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IGZ1bmN0aW9uKG5hbWUsIGFnZSkge1xyXG4gICAgICAgIEZvby5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb28ucHJvdG90eXBlKTtcclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBsZXQgYmFyMSA9IG5ldyBCYXIoJ3l1dWhlaScsIDIyKTtcclxuICAgIGxldCBiYXIyID0gbmV3IEJhcignU2VsbGVuaXRlJywgMjQpO1xyXG4gICAgY29uc29sZS5sb2coYmFyMSwgYmFyMik7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWvueixoeWnlOaJmOWFs+iBlOmjjuagvCAqL1xyXG4gICAgbGV0IEZvbyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpZGVudGlmeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgSSBhbSAke3RoaXMubmFtZX1gO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IE9iamVjdC5jcmVhdGUoRm9vKTtcclxuICAgIEJhci5zcGVhayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWRlbnRpZnkoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiMSA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGxldCBiMiA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGIxLmluaXQoJ3l1dWhlaScpO1xyXG4gICAgYjIuaW5pdCgnU2VsbGVuaXRlJyk7XHJcbiAgICBiMS5zcGVhaygpO1xyXG4gICAgYjIuc3BlYWsoKTtcclxuICAgIGNvbnNvbGUubG9nKEJhcik7IC8vIHtzcGVhazpmKCl9XHJcbiAgICBjb25zb2xlLmxvZyhiMSk7IC8vIHtuYW1lOiAneXV1aGVpJ31cclxufVxyXG5cclxue1xyXG4gICAgLyog5Y+N6K+N5rOVICovXHJcbiAgICAvKiBFUzbku6XkuIvnmoTnroDmtIHlhpnms5XkvJrnvJbor5HmiJDljL/lkI3lh73mlbDvvIzml6Dms5Xov5vooYzpgJLlvZIgKi9cclxuICAgIGxldCBGb28gPSB7XHJcbiAgICAgICAgLy8g5pyA5aW95LiN6KaB5L2/55SodGhpcy5iYXIoKeaIlkZvby5iYXIoKeaJp+ihjOmAkuW9ku+8jOWboOS4uuWPr+eUqOWunumZheaDheWGteavlOi+g+WwkVxyXG4gICAgICAgIGJhcigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOS7peS4iuWunumZheS8mue8luivkeaIkOS7peS4i+aWueW8j1xyXG4gICAgbGV0IEZvbzEgPSB7XHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWmguaenOimgeaDs+S9v+eUqOmAkuW9ku+8jOS4jeimgeS9v+eUqOeugOS7i+aWueW8j++8jOmcgOimgeS9v+eUqOWFt+WQjeWHveaVsOihqOi+vuW8j1xyXG4gICAgbGV0IEZvbzIgPSB7XHJcbiAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbiBiYXJvb29vKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZGluZy0tLS0tLT4nICsgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAvKiDlhbflkI3lh73mlbDov5vooYzoh6rmiJHpgJLlvZIgKi9cclxuICAgICAgICAgICAgICAgIGJhcm9vb28uY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgRm9vMi5iYXIoKTtcclxufVxyXG5cclxue1xyXG4gICAgbGV0IEZvbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XHJcbiAgICAgICAgRm9vLmNhbGwodGhpcywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvby5wcm90b3R5cGUpO1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcblxyXG4gICAgLyog5YaF55yBICovXHJcbiAgICAvLyDpppblhYjopoHnuqDmraPplJnor6/vvIxCYXIgaW5zdGFuY2VvZiBGb2/mmK/plJnnmoRcclxuXHJcbiAgICAvKiDmnoTpgKDlh73mlbDkuYvpl7RGb2/lkoxCYXLnmoTlhoXnnIEgKi9cclxuICAgIEJhci5wcm90b3R5cGUgaW5zdGFuY2VvZiBGb287IC8vIHRydWVcclxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihCYXIucHJvdG90eXBlKSA9PT0gRm9vLnByb3RvdHlwZTsgLy8gdHJ1ZVxyXG4gICAgRm9vXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKEJhci5wcm90b3R5cGUpOyAvLyB0cnVlXHJcblxyXG4gICAgLyog5a6e5L6L5ZKM5p6E6YCg5Ye95pWw5LmL6Ze055qE5YaF55yBICovXHJcbiAgICBiYXIgaW5zdGFuY2VvZiBCYXI7IC8vIHRydWVcclxuICAgIGJhciBpbnN0YW5jZW9mIEZvbzsgLy8gdHJ1ZVxyXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGU7IC8vLyB0cnVlXHJcbiAgICBGb29cclxuICAgICAgICAucHJvdG90eXBlXHJcbiAgICAgICAgLmlzUHJvdG90eXBlT2YoYmFyKTsgLy8gdHJ1ZVxyXG4gICAgQmFyXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKGJhcik7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG4gICAgLyogT3JibWVudC5wcm90b3R5cGUuY2FsbCh0aGlzLCAuLi4p5piv5Lyq5aSa5oCBICovXHJcbiAgICBjbGFzcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgT3JibWVudDtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBUaGUgJHt0aGlzLm5hbWV9IGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEVOSUdNQSBleHRlbmRzIE9yYm1lbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gc3VwZXIoKeWcqGNvbnN0cnVjdG9y5b+F6aG75ZyodGhpc+iwg+eUqOWJjeaJp+ihjFxyXG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDUwO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIOS7peWJjeeahOS8quWkmuaAgeWGmeazle+8mk9yYm1lbnQucHJvdG90eXBlLnNldFNpemUuYXBwbHkodGhpcywgW3dpZHRoLCBoZWlnaHRdKVxyXG4gICAgICAgICAgICAvLyDms6jmhI/lh7rniYjkuabkuIrnmoRzdXBlcih3aWR0aCwgaGVpZ2h0KeWcqGNvbnN0cnVjdG9y5aSW5L2/55So5bey6KKr56aB5q2i77yM5pS55Li65pu/5o2i5Lul5LiL5pa55byP5a6e546w55u45a+55aSa5oCBXHJcbiAgICAgICAgICAgIHN1cGVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSArPSBgc2l6ZSBpcyB3aWR0aCAke3RoaXMud2lkdGh9IGFuZCBoZWlnaHQgJHt0aGlzLmhlaWdodH1gO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQVJDVVMgZXh0ZW5kcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHN1cGVyKCnlnKhjb25zdHJ1Y3RvcuW/hemhu+WcqHRoaXPosIPnlKjliY3miafooYxcclxuICAgICAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyDku6XliY3nmoTkvKrlpJrmgIHlhpnms5XvvJpPcmJtZW50LnByb3RvdHlwZS5zZXRTaXplLmFwcGx5KHRoaXMsIFt3aWR0aCwgaGVpZ2h0XSlcclxuICAgICAgICAgICAgLy8g5rOo5oSP5Ye654mI5Lmm5LiK55qEc3VwZXIod2lkdGgsIGhlaWdodCnlnKhjb25zdHJ1Y3RvcuWkluS9v+eUqOW3suiiq+emgeatou+8jOaUueS4uuabv+aNouS7peS4i+aWueW8j+WunueOsOebuOWvueWkmuaAgVxyXG4gICAgICAgICAgICBzdXBlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gYHNpemUgaXMgd2lkdGggJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBFTklHTUFfSSA9IG5ldyBBUkNVUygnRU5JR01BX0knKTtcclxuICAgIGxldCBFTklHTUFfSV9TSVpFX01FU1NBR0UgPSBFTklHTUFfSVxyXG4gICAgICAgIC5zZXRTaXplKClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGxldCBBUkNVU19JID0gbmV3IEFSQ1VTKCdBUkNVU19JJyk7XHJcbiAgICBsZXQgQVJDVVNfSV9TSVpFX01FU1NBR0UgPSBBUkNVU19JXHJcbiAgICAgICAgLnNldFNpemUoMTAwLCA3MClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKEVOSUdNQV9JX1NJWkVfTUVTU0FHRSk7XHJcbiAgICBjb25zb2xlLmxvZyhBUkNVU19JX1NJWkVfTUVTU0FHRSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIGNsYXNz5bm25LiN5piv6Z2Z5oCB77yM5Y+q5piv5LiA5LiqcHJvdG90eXBl55qE6K+t5rOV57OW77yM5L2/55SocHJvdG90eXBl5LuN5Y+v5L+u5pS5ICovXHJcbiAgICBjbGFzcyBSYW5kb20ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLm51bSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5kKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByMSA9IG5ldyBSYW5kb20oKTtcclxuICAgIHIxLnJhbmQoKTtcclxuXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLnJhbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSAqIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcjIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICByMi5yYW5kKCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMS0yLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgY3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuICogQEF1dGhvcjogU2VsbGVuaXRlXHJcbiAqIEBEYXRlOiAgIDIwMTgtMDEtMTYgMTI6MjM6MTBcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMjIgMTY6NTc6MTJcclxuICovXHJcblxyXG57XHJcblx0LyogdHlwZW9mIG51bGwgT2JqZWN0IEFycmF5IOmDveS8mui/lOWbniAnb2JqZWN0JyAgKi9cclxuXHRsZXQgYSA9IG51bGw7XHJcblx0bGV0IGIgPSB7XHJcblx0XHRuYW1lOiAneXV1aGVpJ1xyXG5cdH07XHJcblx0bGV0IGMgPSBbMSwgM107XHJcblx0Y29uc29sZS5sb2codHlwZW9mIGEsIHR5cGVvZiBiLCB0eXBlb2YgYyk7XHJcbn1cclxuXHJcbntcclxuXHQvKiDlpI3lkIjmnaHku7bmo4DmtYtudWxsICovXHJcblx0bGV0IGEgPSBudWxsO1xyXG5cdGNvbnNvbGUubG9nKCFhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0Jyk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWHveaVsOWvueixoeeahGxlbmd0aOaYr+WjsOaYjuWPguaVsOeahOS4quaVsCAqL1xyXG5cdGxldCBmb28gPSBmdW5jdGlvbihhLCBiLCBjKSB7fTtcclxuXHRjb25zb2xlLmxvZyhmb28ubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5aOw5piO5LqG6L+Y5rKh6LWL5YC85bGe5LqOdW5kZWZpbmVkICovXHJcblx0Lyog6L+Y5rKh5aOw5piO5bGe5LqOdW5kZWNsYXJlZO+8iGphdmFzY3JpcHTov5jmmK/kvJrmiZPljbB1bmRlZmluZWTvvIkgKi9cclxufVxyXG5cclxue1xyXG5cdC8qIHR5cGVvZuS4gOS4qnZhcuWjsOaYjuS6huS9huacquWumuS5ieWAvOeahOivneS8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG5cdC8qIHR5cGVvZuS4gOS4quWujOWFqOayoeacieWjsOaYjuWPiuWumuS5ieWAvOeahOivneWQjOagt+S5n+S8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG59XHJcblxyXG57XHJcblx0bGV0IElJRkUgPSAyO1xyXG5cdC8qIHR5cGVvZuWIpOaWreW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSAodHlwZW9mIElJRkUgIT09ICd1bmRlZmluZWQnKSA/IElJRkUgOiBmdW5jdGlvbigpIHtcclxuXHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHR9O1xyXG5cdC8qIOS9v+eUqHR5cGVvZuadpeajgOafpeWPmOmHj+aYr+mmlumAieeahOmAieaLqSAqL1xyXG5cdGNvbnNvbGUubG9nKGhlbHBlcik7IC8vIDJcclxufVxyXG5cclxue1xyXG5cdC8qIOeUqOS+nei1luazqOWFpeiuvuiuoeaooeW8j+adpemqjOivgeW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSBmdW5jdGlvbihJSUZFKSB7XHJcblx0XHRsZXQgaGVscGVyMiA9IElJRkUgfHwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHRcdH07XHJcblx0fTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWIm+W7uueogOeWj+aVsOe7hO+8jOepuueZveeahOWcsOaWueS8muiiq+aYvuW8j+i1i+WAvOS4unVuZGVmaW5lZCAqL1xyXG5cdGxldCBhcnIgPSBbXTtcclxuXHRhcnJbMF0gPSAwO1xyXG5cdGFycls0XSA9IDQ7XHJcblx0Y29uc29sZS5sb2coYXJyLmxlbmd0aCk7IC8vIDVcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOe7hOS5n+aYr+Wvueixoe+8jOWPr+S7peWMheWQq+Wtl+espuS4sumUruWAvOWSjOWxnuaAp++8jOS9huS4jeiuoeWFpeS6juaVsOe7hOeahOmVv+W6piAqL1xyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0YXJyWyduYW1lJ10gPSAneXV1aGVpJztcclxuXHRhcnJbJ2FnZSddID0gMjM7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnIubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSP77yM5aaC5p6c5a2X56ym5Liy6ZSu5YC86IO95aSf6L2s5o2i5Li65Y2B6L+b5Yi25pWw5a2X77yM5Lya6KKr5b2T5L2c5pWw5a2X57Si5byV5aSE55CGICovXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRhcnJbJzUnXSA9IDEwMDtcclxuXHRjb25zb2xlLmxvZyhhcnIpO1xyXG59XHJcblxyXG57XHJcblx0Lyog57G75pWw57uE5Y+K5pWw57uE5Ymv5pys5bu656uLICovXHJcblx0Ly8g57G75pWw57uE6L2s5o2iXHJcblx0bGV0IGZvbyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRjb25zb2xlLmxvZyhhcnIpXHJcblx0fVxyXG5cdGZvbygpXHJcblxyXG5cdC8vIOaVsOe7hOWJr+acrFxyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0bGV0IGFyckNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpXHJcblx0YXJyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5LnB1c2goMjAwKTtcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyckNvcHkpO1xyXG5cclxuXHQvLyBFUzbnmoRBcnJheS5mcm9t5Lmf6IO95aSf5bu656uL5Ymv5pysXHJcblx0bGV0IGFycjIgPSBbMiwgNCwgNl07XHJcblx0bGV0IGFyckNvcHkyID0gQXJyYXkuZnJvbShhcnIyKTtcclxuXHRhcnIyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5Mi5wdXNoKDIwMCk7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnJDb3B5Mik7XHJcbn1cclxuXHJcbntcclxuXHQvKiDorr/pl67lrZfnrKbkuLLmn5DkuKrkuIvmoIflupTor6XnlKguY2hhckF0KCnvvIzogIHniYjmnKxJReS4jeWFgeiuuHN0cmluZ1tpbmRleF3ov5nmoLforr/pl64gKi9cclxuXHQvKiDku6XkuIrlj6rog73lpJ/ov5vooYzlrZfnrKbkuLLorr/pl67vvIzml6Dms5Xov5vooYzlrZfnrKbkuLLkv67mlLkgKi9cclxuXHRsZXQgc3RyaW5nID0gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2coc3RyaW5nWzBdKTtcclxuXHRjb25zb2xlLmxvZyhzdHJpbmcuY2hhckF0KDIpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOWtl+WAvOWPr+eUqOaMh+aVsOihqOekuiAqL1xyXG5cdGxldCBhID0gNUUxMDtcclxuXHRjb25zb2xlLmxvZyhhKTtcclxufVxyXG5cclxue1xyXG5cdGxldCBhID0gNDIuNTk7XHJcblx0LyogLnRvRml4ZWQoKeeUqOS6juaMh+WumuWwj+aVsOaYvuekuuWkmuWwkeS4qiAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9GaXhlZCg0KSk7XHJcblx0LyogLnRvUHJlY2lzaW9uKCnnlKjkuo7mjIflrprlpJrlsJHkuKrmnInmlYjmlbDkvY0gKi9cclxuXHRjb25zb2xlLmxvZyhhLnRvUHJlY2lzaW9uKDUpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIEVTNu+8jOS4peagvOaooeW8j+S4jeWGjeaUr+aMgTDlvIDlpLTnmoTlhavov5vliLbmlbAgKi9cclxuXHQvLyBsZXQgYSA9IDAzNjM7XHJcblx0Ly8gY29uc29sZS5sb2coYSk7ICBTeW50YXhFcnJvclxyXG5cclxuXHQvKiBFUzblkozkuKXmoLzmqKHlvI/kuIvnmoTlhavov5vliLbmmK/nlKgwb+WJjee8gOihqOekuiAqL1xyXG5cdGxldCBhID0gMG8zNjM7XHJcblx0Y29uc29sZS5sb2coYSk7IC8vIDI0M1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSPMC4xKzAuMuS4jeetieS6jjAuM++8jOWtmOWcqOeyvuW6pumXrumimCAqL1xyXG5cdGxldCBhID0gMC4xICsgMC4yO1xyXG5cdGxldCBiID0gMC4zXHJcblx0Y29uc29sZS5sb2coYSA9PT0gYikgLy8gZmFsc2VcclxufVxyXG5cclxue1xyXG5cdC8qIE5hTuS4jeS4jk5hTuebuOetie+8jHR5cGVvZiBOYU7nmoTlgLzkuLonbnVtYmVyJyAqL1xyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBOYU4pOyAvLyBudW1iZXJcclxuXHRjb25zb2xlLmxvZyhOYU4gPT09IE5hTik7IC8vIGZhbHNlXHJcbn1cclxuXHJcbntcclxuXHQvKiB3aW5kb3fmnInkuIDkuKrlhajlsYDmlrnms5Vpc05hTigp77yM5L2G6L+Z5Liq5pyJYnVn77yM5Lya5bCGTmFO5ZKM5a2X56ym5Liy5Lmf5Lya5Yik5pat5Li6dHJ1ZSAqL1xyXG5cdC8qIEVTNueahE51bWJlci5pc05hTigp5L+u5aSN5LqG6L+Z5Liq6Zeu6aKY77yM5LuW5Lya5YWI55SodHlwZW9m5Yik5pat5Li6bnVtYmVy5YaN5omn6KGM5q2k5pa55rOVXHJcblx077yI5LiK6Z2i5o+Q5YiwdHlwZW9mIE5hTui/lOWbnueahOaYrydudW1iZXIn77yJICovXHJcblx0bGV0IGEgPSAnZm9vJztcclxuXHRsZXQgYiA9IDEwIC8gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGEpKTsgLy8gdHJ1ZSwgYnVnXHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGIpKTsgLy8gdHJ1ZVxyXG5cclxuXHRjb25zb2xlLmxvZyhOdW1iZXIuaXNOYU4oYSkpOyAvLyBmYWxzZe+8jOS/ruWkjeS6hlxyXG5cdGNvbnNvbGUubG9nKE51bWJlci5pc05hTihiKSk7IC8vIHRydWVcclxuXHJcblx0Lyog5Yik5pat5piv5ZCmTmFO55qE5pu0566A5Y2V5pa55rOVICovXHJcblx0bGV0IElzTmFOID0gZnVuY3Rpb24obikge1xyXG5cdFx0cmV0dXJuIG4gIT09IG47XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhJc05hTihiKSk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWFs+S6ji0w77yMMCA9PT0gLTDmmK90cnVlICovXHJcblx0Lyog5pWw5a2X6L2s5Li65a2X56ym5Liy77yMLeWPt+a2iOWkse+8m+Wtl+espuS4sui9rOS4uuaVsOWtl++8jC3lj7fkv53nlZkgKi9cclxuXHQvKiBKU09OLnN0cmluZ2lmeSgtMCkg6L+U5ZueXCIwXCLvvIzogIxKU09OLnBhcnNlKFwiLTBcIikg6L+U5ZueLTAgKi9cclxuXHRjb25zb2xlLmxvZygwID09PSAtMCk7IC8vIHRydWVcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSgtMCksIEpTT04ucGFyc2UoJy0wJykpO1xyXG5cclxuXHQvKiDliKTmlq3mmK/lkKbkuLrotJ8w55qE5pa55rOVICovXHJcblx0bGV0IGlzTWluWmVybyA9IGZ1bmN0aW9uKG4pIHtcclxuXHRcdG4gPSBOdW1iZXIobik7XHJcblx0XHRyZXR1cm4gKG4gPT09IDApICYmICgxIC8gbiA9PT0gLUluZmluaXR5KTtcclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKGlzTWluWmVybygtMCkpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuXHQvKiDljp/nlJ/lh73mlbAgKi9cclxuXHQvLyBTdHJpbmcoKVxyXG5cdC8vIE51bWJlcigpXHJcblx0Ly8gT2JqZWN0KClcclxuXHQvLyBBcnJheSgpXHJcblx0Ly8gQm9vbGVhbigpXHJcblx0Ly8gRnVuY3Rpb24oKVxyXG5cdC8vIFJlZ0V4cCgpXHJcblx0Ly8gRXJyb3IoKVxyXG5cdC8vIERhdGUoKVxyXG5cdC8vIFN5bWJvbCgpXHJcbn1cclxuXHJcbntcclxuXHQvKiB0eXBlb2YgbmV3IFN0cmluZygnMTIzJynkvJrov5Tlm55vYmplY3QgKi9cclxuXHRsZXQgYSA9IG5ldyBTdHJpbmcoJ0hlbGxvJyk7XHJcblx0Y29uc29sZS5sb2coYSk7IC8vIFN0cmluZyB7XCJIZWxsb1wifVxyXG5cclxuXHQvKiDkvb/nlKhTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKCnog73lpJ/ov5Tlm55zdHJpbmflrZfnrKbkuLIgKi9cclxuXHRjb25zb2xlLmxvZyhhLnRvU3RyaW5nKCkpOyAvLyBcIkhlbGxvXCJcclxuXHRjb25zb2xlLmxvZyhTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBcIkhlbGxvXCJcclxuXHJcblx0Lyog5LiO5pys6Lqr5p6E6YCg5Ye95pWw55qEdmFsdWVPZigp5Yqf6IO955u45ZCMICovXHJcblx0Y29uc29sZS5sb2coYS52YWx1ZU9mKCkpOyAvLyBcIkhlbGxvXCJcclxuXHRjb25zb2xlLmxvZyhTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbChhKSk7IC8vIFwiSGVsbG9cIlxyXG5cclxuXHQvKiBPYmplY3QucHJvdG90eXBl5piv5LiN5ZCM55qEICovXHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpKTsgLy8gW29iamVjdCBTdHJpbmddXHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoYSkpOyAvLyBTdHJpbmcge1wiSGVsbG9cIn1cclxufVxyXG5cclxue1xyXG5cdC8qIOafpeeci+S4gOS4quWGhemDqOWxnuaAp1tbY2xhc3NdXeS9v+eUqE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCgpICovXHJcblx0bGV0IGEgPSBuZXcgQm9vbGVhbihmYWxzZSk7XHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpKTsgLy8gW29iamVjdCBCb29sZWFuXVxyXG59XHJcblxyXG57XHJcblx0Lyog5oOz6KaB5b6X5Yiw5bCB6KOF5a+56LGh55qE5Z+65pys57G75Z6L5YC877yM5Y+v5Lul5L2/55SodmFsdWVPZigp5Ye95pWwICovXHJcblx0bGV0IGEgPSBuZXcgU3RyaW5nKCdIZWxsbycpO1xyXG5cdGNvbnNvbGUubG9nKGEudmFsdWVPZigpKTtcclxuXHJcblx0Lyog6ZqQ5byP5ouG5bCBICovXHJcblx0bGV0IGIgPSBhICsgXCJcIjtcclxuXHRjb25zb2xlLmxvZyhiKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWwneivleWvueS4gOS4qm5ldyBTdHJpbmcvQm9vbGVhbi9OdW1iZXLov5vooYzpmpDlvI/orr/pl67vvIzkvJrpgKDmiJDlvLrliLbnsbvlnovovazmjaJcclxuXHQgICDkvJrorr/pl67lr7nlupTnmoTmnoTpgKDlh73mlbDljp/lnovpk77kuIrnmoR2YWx1ZU9m5pa55rOVICovXHJcblx0bGV0IHN0cmluZyA9IG5ldyBTdHJpbmcoJ3N0cmluZzEnKTtcclxuXHQvLyDpmpDlvI/orr/pl67vvIzlrp7pmYXmmK/osIPnlKjov5Tlm57kuoZTdHJpbmcucHJvdG90eXBlLnZhbHVlT2bnmoTlgLzvvIzlvLrliLbnsbvlnovovazmjaJcclxuXHRpZiAoc3RyaW5nLmluZGV4T2YoMSkgIT09IC0xKSB7XHJcblx0XHRjb25zb2xlLmxvZygnbmV3IFN0cmluZyBkaXJlY3QgcmVhZCcpO1xyXG5cdH1cclxufVxyXG5cclxue1xyXG5cdC8qIOW9k+S9v+eUqOihqOi+vuW8jyvml7bvvIzlhbbkuK3kuIDkuKrmk43kvZzmlbDmmK9zdHJpbmfvvIjljIXlkKvlvLrliLbovazmjaLnu5PmnpzvvInvvIxcclxuXHQgICDliJnmiafooYzlrZfnrKbkuLLmi7zmjqXvvIzlkKbliJnmiafooYzmlbDlrZfliqDms5UgKi9cclxuXHRjb25zb2xlLmxvZyhbXSArIDEpOyAvLyBbXeiiq+W8uuWItuaJp+ihjC50b1N0cmluZ++8jOW+l+WIsOepuuWtl+espu+8jOe7k+aenOS4ulwiMVwiXHJcblx0Y29uc29sZS5sb2coXCI0XCIgKyAxKTsgLy8gNDFcclxufVxyXG5cclxue1xyXG5cdC8qIOW9k25ldyBBcnJheeeahOaXtuWAmeWPquS8oOWFpeS4gOS4quaVsO+8jFxyXG5cdCAgIOaJp+ihjOeahOaYr+WIm+W7uuS4gOS4quaVsOe7hO+8jOmVv+W6puS4ujEw77yM5LiU5YWo5Li656m65Y2V5YWD77yI6Z2edW5kZWZpbmVk77yJ5aGr5YWFICovXHJcblx0Lyog56m65Y2V5YWD5ZKMdW5kZWZpbmVk5piv5pyJ5Yy65Yir55qE77yM5rOo5oSPICovXHJcblx0bGV0IGEgPSBBcnJheSgxMCk7IC8vIG5ld+WPr+S7peecgeeVpe+8jGpz5Lya6Ieq5Yqo6KGl5YqgXHJcblx0Y29uc29sZS5sb2coYSwgYS5sZW5ndGgpO1xyXG5cclxuXHQvKiDmuIXnqbrkuIDkuKrmlbDnu4Tlj6/ku6Xkvb/nlKhhcnJheS5sZW5ndGggPSAwICovXHJcblx0bGV0IGIgPSBbMiwgNCwgNl07XHJcblx0Yi5sZW5ndGggPSAwO1xyXG5cdGNvbnNvbGUubG9nKGIpO1xyXG5cclxuXHQvKiDliJvlu7rkuIDkuKrlhajmmK91bmRlZmluZWTvvIjpnZ7nqbrljZXlhYPvvInloavlhYXnmoTmlbDnu4QgKi9cclxuXHQvKiBhcnJheS5sZW5ndGjov5nmoLflvLrooYzkv67mlLnkvJrnlKjnqbrljZXlhYPloavlhYXlpJrkvZnnmoTnqbrkvY0gKi9cclxuXHRsZXQgYyA9IEFycmF5LmFwcGx5KG51bGwsIHtcclxuXHRcdGxlbmd0aDogM1xyXG5cdH0pO1xyXG5cdGNvbnNvbGUubG9nKGMpOyAvLyBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cclxuXHJcblx0Lyog5rC46L+c5LiN6KaB5Yib5bu65ZKM5L2/55So56m65Y2V5YWD5pWw57uEICovXHJcbn1cclxuXHJcbntcclxuXHQvLyBTdHJpbmcucHJvdG90eXBl55qE5ZCE57G75pa55rOV77yM5LiN5L+u5pS55Y6f5a2X56ym5LiyXHJcblx0Ly8gU3RyaW5nIy5pbmRleE9mXHJcblx0Ly8gU3RyaW5nIy5jaGFyQXRcclxuXHQvLyBTdHJpbmcjLnN1YnN0ciBTdHJpbmcjLnN1YnN0cmluZyBTdHJpbmcjLnNsaWNlKClcclxuXHQvLyBTdHJpbmcjLnRvVXBwZXJDYXNlIFN0cmluZyMudG9Mb3dlckNhc2UoKVxyXG5cdC8vIFN0cmluZyMudHJpbVxyXG59XHJcblxyXG57XHJcblx0LyogU3ltYm9s5L2/55So5Y6f55Sf5p6E6YCg5Ye95pWw5p2l5a6a5LmJ77yM5LiN55So5YqgbmV3ICovXHJcblx0bGV0IG15b3duID0gU3ltYm9sKCdkZWxldGVTb21ldGhpbmcnKTtcclxuXHRsZXQgYSA9IHt9O1xyXG5cdGFbU3ltYm9sKCdkZWxldGVTb21ldGhpbmcnKV0gPSBmdW5jdGlvbigpIHtcclxuXHRcdC8qIGRvU29tZXRoaW5nICovXHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKGEpO1xyXG5cdGNvbnNvbGUubG9nKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoYSkpO1xyXG5cclxuXHQvKiDlhbfmnInllK/kuIDmgKfvvIzlvojlpJrlvIDlj5HllpzmrKLkvb/nlKjov5nkuKrnlKjkuo7np4HmnInlsZ7mgKfku6Pmm79fZnVuY3Rpb24gKi9cclxufVxyXG5cclxue1xyXG5cdC8qIEpTT04uc3RyaW5naWZ5KCnlnKjpgYfliLB1bmRlZmluZWTvvIxmdW5jdGlvbu+8jHN5bWJvbOi/meS4ieS4quS4jeWuieWFqOWAvOaXtu+8jFxyXG5cdCAgIOWcqOWvueixoeS8muWwhuWFtuiHquWKqOW/veeVpe+8jOWcqOaVsOe7hOS4rei/lOWbnm51bGzvvIzlnKjkuIDoiKzosIPnlKjkvJrov5Tlm551bmRlZmluZWQgKi9cclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh1bmRlZmluZWQpKTsgLy8gdW5kZWZpbmVkXHJcblx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZnVuY3Rpb24oKSB7fSkpOyAvLyB1bmRlZmluZWRcclxuXHQvLyBcIntcImFcIjogMn1cIlxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdGE6IDIsXHJcblx0XHRiOiBmdW5jdGlvbigpIHt9XHJcblx0fSkpO1xyXG5cdC8vIFwiW1wieXV1aGVpXCIsIG51bGwsIG51bGwsIDRdXCJcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShbJ3l1dWhlaScsIHVuZGVmaW5lZCwgZnVuY3Rpb24oKSB7fSwgNF0pKTtcclxufVxyXG5cclxue1xyXG5cdC8qIEpTT04uc3RyaW5naWZ55pyJ5LiA5Liq5b6I5a6e55So55qEcmVwbGFjZXLvvIzlj6/ku6Xlr7nmlbDmja7ov5vooYznrZvpgInlpITnkIYgKi9cclxuXHQvLyDlj6/ku6XmmK/mlbDnu4TmiJblh73mlbBcclxuXHRsZXQgb2JqID0ge1xyXG5cdFx0YTogMixcclxuXHRcdGI6IFwiMjJcIixcclxuXHRcdGM6IFsxLCAyLCAzXVxyXG5cdH1cclxuXHQvLyByZXBsYWNlcuS4uuaVsOe7hOaXtueahOS9nOeUqFxyXG5cdGxldCBqc29uMSA9IEpTT04uc3RyaW5naWZ5KG9iaiwgW1wiYVwiLCBcImJcIl0pOyAvLyDlj6rluo/liJfljJZrZXnlgLzkuLph5ZKMYueahFxyXG5cdGNvbnNvbGUubG9nKGpzb24xKTsgLy8gXCJ7XCJiXCI6XCIyMlwiLFwiY1wiOlsxLDIsM119XCJcclxuXHJcblx0Ly8gcmVwbGFjZXLkuLpmdW5jdGlvbuaXtueahOS9nOeUqFxyXG5cdGxldCBqc29uMiA9IEpTT04uc3RyaW5naWZ5KG9iaiwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKGtleSAhPT0gXCJhXCIpIHJldHVybiB2YWx1ZTtcclxuXHR9KTtcclxuXHRjb25zb2xlLmxvZyhqc29uMik7XHJcblxyXG5cdC8vIOesrOS4ieS4quWPguaVsHNwYWNl77yM6L+Y5Y+v5Lul6LCD57yp6L+b77yM6Ieq5Yqo6L+b6KGM5qC85byP5YyW77yM6L+Y5Y+v5Lul5piv5aGr5YWF5a2X56ym5LiyXHJcblx0bGV0IGpzb24zID0gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCA0KTtcclxuXHRjb25zb2xlLmxvZyhqc29uMyk7XHJcblx0Ly8ge1xyXG5cdC8vIFx0ICBcImFcIjogMixcclxuXHQvL1x0ICBcImJcIjogXCIyMlwiLFxyXG5cdC8vXHQgIFwiY1wiOiBbXHJcblx0Ly9cdCAgXHQgIDEsXHJcblx0Ly9cdFx0ICAyLFxyXG5cdC8vXHRcdCAgM1xyXG5cdC8vXHQgIF1cclxuXHQvLyB9XHJcbn1cclxuXHJcbntcclxuXHQvKiDku6XkuIvluIPlsJTlgYfmpI3lnKjlvLrliLbovazmjaLnmoTml7blgJnnu5Pmnpzpg73kuLpmYWxzZe+8jOW8uuWItui9rOaNouaYryEhICovXHJcblx0Ly8gdW5kZWZpbmVkLCBudWxsLCBmYXNsZSwgKzAsIC0wLCBOYU4sIFwiXCJcclxuXHRjb25zb2xlLmxvZyghIXVuZGVmaW5lZCB8fCAhIW51bGwgfHwgISFmYWxzZSB8fCAhITAgfHwgISFOYU4gfHwgISFcIlwiKTsgLy8gZmFsc2VcclxuXHQvLyBkb2N1bWVudC5hbGzlnKjmn5DkuptJReWSjOafkOS6m+a1j+iniOWZqOaYr+S4uuecn+WAvO+8jOWcqOafkOS6m+a1j+iniOWZqOS4i+S4uuWBh+WAvO+8jOaYr+S4gOS4quexu+aVsOe7hFxyXG5cclxuXHQvKiDlgYflgLzkuYvlpJbpg73mmK/nnJ/lgLzvvIzovazmjaLlkI7pg73kuLp0cnVlICovXHJcbn1cclxuXHJcbntcclxuXHQvKiDmmL7lvI/lvLrliLbnsbvlnovovazmjaIgKi9cclxuXHQvLyDlrZfnrKbkuLLlkozmlbDlrZfkuYvpl7TnmoTmmL7lvI/ovazmjaLvvIzkuI3opoHkvb/nlKhuZXfvvIzlubbkuI3mmK/liJvlu7rlr7nosaFcclxuXHRsZXQgYSA9IDIyO1xyXG5cdGxldCBiID0gXCIzLjE0XCI7XHJcblxyXG5cdGxldCBjID0gU3RyaW5nKGEpO1xyXG5cdGxldCBkID0gTnVtYmVyKGIpO1xyXG5cclxuXHRjb25zb2xlLmxvZyhjLCBkKTsgLy8gXCIyMlwiLCAzLjE0XHJcblxyXG5cdC8vIOWPpuS4gOenjeaWueazleeahOaYvuW8j+i9rOaNolxyXG5cdGxldCBlID0gYS50b1N0cmluZygpOyAvLyDosIPnlKjnmoTmmK9OdW1iZXIucHJvdG90eXBlLnRvU3RyaW5nXHJcblx0bGV0IGYgPSArYjtcclxuXHRjb25zb2xlLmxvZyhlLCBmKTsgLy8gXCIyMlwiLCAzLjE0XHJcbn1cclxuXHJcbntcclxuXHQvLyDml6XmnJ/mmL7npLrovazmjaLkuLrmlbDlrZfvvIjnm7jlvZPkuo4uZ2V0VGltZSgp5Yqf6IO977yJXHJcblx0bGV0IGEgPSBuZXcgRGF0ZSgpO1xyXG5cdGNvbnNvbGUubG9nKCthLCBhLmdldFRpbWUoKSk7XHJcblxyXG5cdC8vIOW9k+WunuS+i+WMluS4gOS4quaehOmAoOWHveaVsOeahOaXtuWAmeWmguaenOayoeacieWPguaVsOS8oOWFpe+8jOWPr+S7peS4jeWKoCgpXHJcblx0Y29uc29sZS5sb2coK25ldyBEYXRlKTtcclxuXHJcblx0Ly8gRVM155qERGF0ZeacieS4gOS4quiOt+WPluW9k+WJjeaXtumXtOaIs+eahEFQSe+8jOWFtnBvbHlmaWxs5bCx5pivK25ldyBEYXRlKClcclxuXHRjb25zb2xlLmxvZyhEYXRlLm5vdygpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIHBhcnNlSW5055qE5L2/55SoICovXHJcblxyXG5cdC8vIHBhcnNlSW506ZKI5a+555qE5piv5a2X56ym5Liy77yM6KaB5rGC5omA5pyJ5a2X56ym6YO95piv5pWw5a2X77yM5ZCm5YiZ6L+U5ZueTmFOXHJcblx0Ly8gTnVtYmVyKCnlj6/ku6Xlv73nlaXkuI3mmK/mlbDlrZflrZfnrKbnmoTlrZfnrKbkuLLvvIzpgYfliLDpnZ7mlbDlrZflrZfnrKbliJnlgZzmraLovazmjaJcclxuXHRsZXQgYSA9ICcxMmFhNDUnO1xyXG5cdGxldCBiID0gJzQ1Nic7XHJcblxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEpLCBOdW1iZXIoYSkpOyAvLyBOYU4sIDQ2NVxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGIpLCBOdW1iZXIoYikpOyAvLyAxMiwgNDU2XHJcbn1cclxuXHJcbntcclxuXHQvKiBwYXJzZUludOeahOesrOS6jOS4quWPguaVsOi9rOWItumXrumimO+8jOWwhuW9k+WJjeaVsOWAvOWumuS5ieS4uuiHquWumuS5iei/m+WItu+8jOS4jeeUqOWKoOWJjee8gFxyXG5cdCAgIOeEtuWQjui9rOaNouS4uuaVsOWtlyAqL1xyXG5cclxuXHQvLyDlpoLmnpzpnIDopoHlnKhFUzXkuYvliY3nmoTnjq/looPov5DooYzlubbkuJTmsqHmnIlwb2x5ZmlsbO+8jOmcgOimgeaJi+WKqOWKoOS4iuesrOS6jOS4quWPguaVsDEwXHJcblx0Ly8g5by65Yi26L2s5o2i5Li65Y2B6L+b5Yi277yM5LiN54S25Lya6KKr6L2s5Li65YWr6L+b5Yi277yM6YG/5YWN5LiN5b+F6KaB55qE5Z2RXHJcblxyXG5cdGxldCBhID0gXCIxMDBcIjtcclxuXHRsZXQgYiA9IDI1NjtcclxuXHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMTYpKTsgLy8gMjU2XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgOCkpOyAvLyA2NFxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEsIDIpKTsgLy8gNFxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEsIDEwKSk7IC8vIDEwMFxyXG5cclxuXHQvKiB0b1N0cmluZygp5Lyg5YWl5Y+C5pWw77yM5Y+v5Lul5bCG5b2T5YmN5pWw5YC86L2s5o2i5Li65oyH5a6a6L+b5Yi2ICovXHJcblx0Y29uc29sZS5sb2coYi50b1N0cmluZygxNikpOyAvLyAxMDBcclxufVxyXG5cclxue1xyXG5cdC8qIOiHquWumuS5iei9rOaNoiAqL1xyXG5cclxuXHQvLyDljYHov5vliLbmlbDlgLzovazkuLroh6rlrprkuYnov5vliLbvvJpcclxuXHRsZXQgZGVjaW1hbFRvT3RoZXIgPSBmdW5jdGlvbihudW0sIHRyYW5zZm9ybSkge1xyXG5cdFx0Lyog6L+U5Zue55qE5piv5a2X56ym5Liy77yM55So5LqO5bGV56S6ICovXHJcblx0XHR2YXIgbnVtID0gK251bTtcclxuXHRcdHZhciB0cmFuc2Zvcm0gPSArdHJhbnNmb3JtO1xyXG5cdFx0aWYgKHRyYW5zZm9ybSA9PT0gMTYpIHtcclxuXHRcdFx0cmV0dXJuICcweCcgKyBudW0udG9TdHJpbmcoMTYpO1xyXG5cdFx0fSBlbHNlIGlmICh0cmFuc2Zvcm0gPT09IDgpIHtcclxuXHRcdFx0cmV0dXJuICcwbycgKyBudW0udG9TdHJpbmcoOCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVtLnRvU3RyaW5nKHRyYW5zZm9ybSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhkZWNpbWFsVG9PdGhlcigxMDAsIDgpKTsgLy8gXCIwbzE0NFwiXHJcblxyXG5cdC8vIOWFtuS7lui9rOWItui9rOaNouS4uuWNgei/m+WItu+8iOS8oOWFpeagh+WHhuagvOW8jzBY5oiWMG/nrYnlrZfnrKbkuLLmoLzlvI/vvInvvJpcclxuXHRsZXQgb3RoZXJUb0RlY2ltYWwgPSBmdW5jdGlvbihudW0pIHtcclxuXHRcdC8qIOi/lOWbnuaVsOWtlyAqL1xyXG5cdFx0dmFyIG51bSA9IG51bS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKG51bS5pbmRleE9mKCcweCcpID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludChudW0ucmVwbGFjZSgvMHgvLCAnJyksIDE2KTtcclxuXHRcdH0gZWxzZSBpZiAobnVtLmluZGV4T2YoJzBvJykgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KG51bS5yZXBsYWNlKC8wby8sICcnKSwgOCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQobnVtLCAxMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhvdGhlclRvRGVjaW1hbCgnMHgxMDAnKSk7IC8vIDI1NlxyXG59XHJcblxyXG57XHJcblx0LyogYm9vbGVhbuaYvuekuui9rOaNou+8jOW7uuiuruS9v+eUqCEh55So5p2l6L2s5o2iICovXHJcblx0bGV0IGEgPSBcImFzZFwiO1xyXG5cdGxldCBiID0gW107XHJcblx0bGV0IGMgPSB7fTtcclxuXHJcblx0Ly8g5rOo5oSP56m65pWw57uE5ZKM56m65a+56LGh6YO95piv6L+U5ZuedHJ1ZeOAguaYr+ecn+WAvO+8jOaJgOacieeahOWBh+WAvOS4iumdouacieaPkOWIsFxyXG5cdGNvbnNvbGUubG9nKEJvb2xlYW4oYSkpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFiKTsgLy8gdHJ1ZVxyXG5cdGNvbnNvbGUubG9nKCEhYyk7IC8vdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0bGV0IGFyciA9IFtcclxuXHRcdDIsXHJcblx0XHRmdW5jdGlvbigpIHt9LFxyXG5cdFx0NCxcclxuXHRcdGZ1bmN0aW9uKCkge31cclxuXHRdO1xyXG5cclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuXHJcblx0bGV0IGpzb24gPSBKU09OLnN0cmluZ2lmeShhcnIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Y29uc29sZS5sb2coanNvbik7IC8vIFsyLHRydWUsNCx0cnVlXVxyXG59XHJcblxyXG57XHJcblx0LyogfHwg5oiWICYmIOi/lOWbnueahOS4jeS4gOWumuaYr+W4g+WwlOWAvCAqL1xyXG5cclxuXHQvLyDlr7nkuo58fO+8jOWmguaenOW9k+WJjeWAvOWIpOaWreS4unRydWXvvIzlsLHkvJrov5Tlm57lvZPliY3lgLxcclxuXHRjb25zb2xlLmxvZyhmYWxzZSB8fCBcInNzXCIgfHwgMTEwKTsgLy8gXCJzc1wiXHJcblxyXG5cdC8vIOWvueS6jiYm77yM5Y+q6KaB5pyJ5LiA5Liq5YC85Yik5pat5Li6ZmFsc2XvvIzlsLHov5Tlm57liKTmlq3kuLpmYWxzZeeahOmCo+S4quWAvO+8jFxyXG5cdC8vIOWQpuWImei/lOWbnuacgOWQjuS4gOS4quWAvFxyXG5cdGNvbnNvbGUubG9nKFwiNTVcIiAmJiB1bmRlZmluZWQgJiYgMTEwKTsgLy8gdW5kZWZpbmVkXHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIG51bGwgJiYgMTEwKTsgLy8gbnVsbFxyXG5cdGNvbnNvbGUubG9nKFwiNTVcIiAmJiBmdW5jdGlvbigpIHt9ICYmIDExMCk7IC8vIDExMFxyXG5cclxuXHQvLyDmiYDku6V8fOS8muacieS4gOS4quW4uOeUqOS9nOeUqO+8muS8oOWPguWIpOaWrVxyXG5cdGxldCBmdW5jID0gZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0YSA9IGEgfHwgJ0hlbGxvJztcclxuXHRcdGIgPSBiIHx8ICdXb3JsZCc7XHJcblx0XHRyZXR1cm4gYSArIFwiIFwiICsgYjtcclxuXHR9XHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknKSk7IC8vIEhpIFdvcmxkXHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknLCBcIlwiKSk7IC8vIOazqOaEj+i/memHjOS8oOWFpeS6huWBh+WAvO+8jOe7k+aenOS+neeEtuaYr0hpIFdvcmxkXHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknLCBcIiBcIikudHJpbSgpKTsgLy8g5Lyg5YWl56m65a2X56ym5YiZ5Yik5pat5Li6dHJ1Ze+8jOi/lOWbnkhpXHJcblxyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBcIlwiKSAvLyBzdHJpbmfvvIzlpoLmnInpnIDmsYLlj6/ku6XpgJrov4fov5nkuKrov5vooYzlrrnplJlcclxuXHJcblx0Ly8g5omA5LulJibkvJrmnInkuIDkuKrluLjnlKjkvZznlKjvvJrliKTmlq3lj4LmlbDmmK/lkKbkuLp0cnVl77yM5piv5YiZ5omn6KGM5LiA5Liq5Ye95pWwXHJcblx0dHJ1ZSAmJiAoZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygndGhpcyBpcyAmJiBmdW5jdGlvbiEnKTtcclxuXHR9KSgpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSPRVM255qEU3ltYm9s5Y+q6IO95aSf6YCa6L+H5pi+5byP6L2s5o2i5Li65a2X56ym5Liy77yM5L2/55So6ZqQ5byP5bCG5Lya5oql6ZSZICovXHJcblx0bGV0IHN5bWJvbCA9IFN5bWJvbCgnc3ltYm9sRWxlbWVudCcpO1xyXG5cdGNvbnNvbGUubG9nKFN0cmluZyhzeW1ib2wpKTsgLy8gXCJTeW1ib2woc3ltYm9sRWxlbWVudClcIlxyXG5cclxuXHQvLyBzeW1ib2wgKyBcIlwiIOi/meagt+makOW8j+i9rOaNouS8muaKpemUmVxyXG5cclxuXHQvLyBTeW1ib2zml6Dms5XovazmjaLkuLrmlbDlrZfvvIzmmL7npLrlkozpmpDlvI/pg73kvJrlh7rplJlcclxuXHJcblx0Ly8gU3ltYm9s5Y+v5Lul6L2s5o2i5Li6Ym9vbGVhbu+8jOmakOW8j+aYvuW8j+mDvei9rOaNouS4unRydWVcclxuXHRjb25zb2xlLmxvZyhCb29sZWFuKHN5bWJvbCkpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFzeW1ib2wpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuXHQvKiDlhbPkuo49PeWSjD09PeeahOS9v+eUqOWHhuWImSAqL1xyXG5cclxuXHQvLyDlvZPkuKTovrnmnInlgLzkuLp0cnVl5ZKMZmFsc2XnmoTml7blgJnvvIzliY3lvoDkuI3opoHkvb/nlKg9PVxyXG5cdC8vIOW9k+S4pOi+ueacieWAvOS4ultd77yMXCJcIu+8jDDml7bvvIzlsL3ph4/kuI3opoHkvb/nlKg9PVxyXG5cdC8vIOS9v+eUqD09PeaYr+acgOWuieWFqOeahOmAieaLqVxyXG59XHJcblxyXG57XHJcblx0LyogKyvooajovr7lvI8gKi9cclxuXHRsZXQgYSA9IDQzO1xyXG5cdGxldCBiID0gKGErKywgYSk7XHJcblx0Y29uc29sZS5sb2coYik7IC8vIOato+ehruWwhjQ06LWL5YC857uZYlxyXG59XHJcblxyXG57XHJcblx0LyogRVM255qE5Y+C5pWw6aKE55WZ5YC85Y+v5Lul55CG6Kej5Li65L2/55So5LqGbGV077yM5a2Y5Zyo5pqC5pe25oCn5q275Yy6VERaICovXHJcblx0Ly8g5LiL6Z2i5aOw5piO6LWL5YC8YueahOaXtuWAme+8jOWQjOaXtui/m+ihjOS6huiuv+mXru+8jOi/meagt+WcqEVTNuacieS6m+aDheWGteS8muaKpemUmVxyXG5cdGxldCB0ZXN0VERaID0gZnVuY3Rpb24oYSA9IDMsIGIgPSBhICsgYiArIDMpIHtcclxuXHRcdGNvbnNvbGUubG9nKGEsIGIpOyAvLyDkuI3miqXplJnlsLHovpPlh7pOYU5cclxuXHR9XHJcblx0Ly8gdGVzdFREWigpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5a6/5Li75Y+Y6YePICovXHJcblx0bGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBkaXYpOyAvLyBvYmplY3RcclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGl2KSk7IC8vIFtvYmplY3QgSFRNTERpdkVsZW1lbnRdXHJcblx0Y29uc29sZS5sb2coZGl2LnRhZ05hbWUpOyAvLyBESVZcclxufVxyXG5cclxue1xyXG5cdC8qIOeUseS6jua1j+iniOWZqOWOhuWPsumBl+eVmemXrumimO+8jOWcqOWIm+W7uuW4puaciWlkIOWxnuaAp+eahERPTSDlhYPntKDml7bkuZ/kvJrliJvlu7rlkIzlkI3nmoTlhajlsYDlj5jph48gKi9cclxuXHQvLyA8ZGl2IGlkPVwiYXBwXCI+PC9kaXY+XHJcblx0Y29uc29sZS5sb2coYXBwKTsgLy8g5LiA5Liq5YWD57Sg55qEaWTkuLphcHDlhpnlnKhodG1s77yMd2luZG935YWo5bGA5a+56LGh5bCx5bim5pyJ6L+Z5Liq5bGe5oCnXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UyLTEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpO1xudmFyICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7IHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnkgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5OdW1iZXIuaXNOYU47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcbiAqIEBBdXRob3I6IFNlbGxlbml0ZVxyXG4gKiBARGF0ZTogICAyMDE4LTAxLTIyIDE3OjAyOjE3XHJcbiAqIEBMYXN0IG1vZGlmaWVkIGJ5OiAgIHl1dWhlaVxyXG4gKiBATGFzdCBtb2RpZmllZCB0aW1lOiAyMDE4LTAxLTI0IDEyOjAxOjc5XHJcbiAqL1xyXG5cclxue1xyXG4gICAgXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMi0yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
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
 * @Last Modified by:   Sellenite
 * @Last Modified time: 2018-01-22 17:02:17
 */

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmU3NjQyZDAyY2Q0ZWNmYTVmZmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RhZ2UxLTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMS0yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0xLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0yLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiR0xPQkFMIiwidGVzdEV2YWwiLCJzdHIiLCJiIiwiZXZhbCIsImEiLCJzZXRUaW1lb3V0IiwidGltZW91dEhhbmRsZXIiLCJJSUZFIiwiZm4iLCJkZWYiLCJnbG9iYWwiLCJmb28iLCJiYXIiLCJlcnJvciIsImJheiIsImkiLCJqIiwiY29vbE1vZHVsZSIsInNvbWV0aGluZyIsImFub3RoZXIiLCJkb1NvbWV0aGluZyIsImRvQW5vdGhlciIsImpvaW4iLCJjb29sIiwiTXlNb2R1bGVzIiwiTWFuYWdlciIsIm1vZHVsZXMiLCJkZWZpbmUiLCJuYW1lIiwiZGVwcyIsImltcGwiLCJsZW5ndGgiLCJhcHBseSIsImdldCIsIl90aGlzIiwiaGVsbG8iLCJoaSIsIkZvbyIsIkJhciIsInVuZGVmaW5lZCIsImNhdGNoVmFsdWUiLCJyZWFkb25seSIsIm9iaiIsImNvdW50IiwiYmluZCIsIm9iamVjdCIsImNhbGwiLCJhYmMiLCJETVoiLCJvYmoxIiwib2JqMiIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJyZXQiLCJldmVyeSIsInB1c2giLCJzb21lIiwiaXQiLCJuZXh0IiwiYWdlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwidmFsdWUiLCJvIiwia2V5cyIsImRvbmUiLCJrIiwiYyIsImlkeCIsImtzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm15TmFtZSIsIl9fcHJvdG9fXyIsImhhc093blByb3BlcnR5IiwiYmFyMSIsImJhcjIiLCJpbml0IiwiaWRlbnRpZnkiLCJzcGVhayIsImIxIiwiYjIiLCJGb28xIiwiRm9vMiIsImJhcm9vb28iLCJpc1Byb3RvdHlwZU9mIiwiT3JibWVudCIsIm1lc3NhZ2UiLCJ3aWR0aCIsImhlaWdodCIsIkVOSUdNQSIsIkFSQ1VTIiwiRU5JR01BX0kiLCJFTklHTUFfSV9TSVpFX01FU1NBR0UiLCJzZXRTaXplIiwiZ2V0TWVzc2FnZSIsIkFSQ1VTX0kiLCJBUkNVU19JX1NJWkVfTUVTU0FHRSIsIlJhbmRvbSIsIm51bSIsIk1hdGgiLCJyYW5kb20iLCJyMSIsInJhbmQiLCJyMiIsImhlbHBlciIsImhlbHBlcjIiLCJBcnJheSIsInNsaWNlIiwiYXJndW1lbnRzIiwiYXJyQ29weSIsImFycjIiLCJhcnJDb3B5MiIsInN0cmluZyIsImNoYXJBdCIsInRvRml4ZWQiLCJ0b1ByZWNpc2lvbiIsIk5hTiIsImlzTmFOIiwiSXNOYU4iLCJuIiwiSlNPTiIsInBhcnNlIiwiaXNNaW5aZXJvIiwiTnVtYmVyIiwiSW5maW5pdHkiLCJTdHJpbmciLCJ0b1N0cmluZyIsInZhbHVlT2YiLCJCb29sZWFuIiwiaW5kZXhPZiIsIm15b3duIiwianNvbjEiLCJqc29uMiIsImtleSIsImpzb24zIiwiZCIsImUiLCJmIiwiRGF0ZSIsImdldFRpbWUiLCJub3ciLCJwYXJzZUludCIsImRlY2ltYWxUb090aGVyIiwidHJhbnNmb3JtIiwib3RoZXJUb0RlY2ltYWwiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJqc29uIiwiZnVuYyIsInRyaW0iLCJzeW1ib2wiLCJ0ZXN0VERaIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGFnTmFtZSIsImFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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QSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMscUJBQXFCO0FBQ3REO0FBQ0EsaUNBQWlDLFNBQVMsRUFBRTtBQUM1QyxDQUFDLFlBQVk7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMscUJBQXFCO0FBQzNELGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0EsR0FBRyxZQUFZO0FBQ2Y7QUFDQTs7Ozs7OztBQ3JCQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZTc2NDJkMDJjZDRlY2ZhNWZmYSIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICghQlVHR1kgJiYgJG5hdGl2ZSkgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVk7XG52YXIgJGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIHdrc0RlZmluZSA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKTtcbnZhciBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgICRyZXBsYWNlciA9IHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuICogQEF1dGhvcjogeXV1aGVpXHJcbiAqIEBEYXRlOiAyMDE4LTAxLTExIDEzOjUxOjIwXHJcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIFNlbGxlbml0ZVxyXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE4LTAxLTIyIDE3OjAyOjM1XHJcbiAqL1xyXG5yZXF1aXJlKCcuL3N0YWdlMS0xLmpzJyk7XHJcbnJlcXVpcmUoJy4vc3RhZ2UxLTIuanMnKTtcclxucmVxdWlyZSgnLi9zdGFnZTItMS5qcycpO1xyXG5yZXF1aXJlKCcuL3N0YWdlMi0yLmpzJyk7XHJcbmNvbnNvbGUubG9nKCc8IS0tLS0tLS0tQWJvdmUgaXMgTGF0ZXN0LS0tLS0tLS0+Jyk7XHJcbmNvbnNvbGUubG9nKCc8IS0tLS0tLS0tQmVsb3cgaXMgQVNZTkMtLS0tLS0tLT4nKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaW5kZXguanMiLCJ3aW5kb3cuR0xPQkFMID0gJ0FMTF9FTEVNRU5UJztcclxuXHJcbntcclxuICAgIC8qIOawuOi/nOS4jeimgeS9v+eUqGV2YWzvvIzlroPlj6/ku6XmiafooYzku7vkvZXkvKDnu5nlroPnmoTlrZfnrKbkuLLvvIzlvojlrrnmmJPpga3lj5dYU1PmlLvlh7sgKi9cclxuICAgIC8vIGV2YWzlnKjkuKXmoLzmqKHlvI/kuIvmnInoh6rlt7HnmoTkvZznlKjln59cclxuICAgIGxldCB0ZXN0RXZhbCA9IGZ1bmN0aW9uKHN0ciwgYikge1xyXG4gICAgICAgIC8vIFwidXNlIHN0cmljdFwiOyDkvb/nlKjov5nlj6XlkI7kvJrmiqVSZWZlcmVuY2VFcnJvcu+8jGEgaXMgbm90IGRlZmluZWRcclxuICAgICAgICBldmFsKHN0cik7IC8vIOasuuiviOihjOS4ulxyXG4gICAgICAgIGNvbnNvbGUubG9nKGEsIGIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRlc3RFdmFsKFwidmFyIGEgPSAyO1wiLCA0KTsgLy8gMiwgNCDpobrliKnmlLnlhplhXHJcbn1cclxuXHJcbntcclxuICAgIC8qIOawuOi/nOS4jeimgeS9v+eUqHdpdGjov5vooYzlr7nosaHotYvlgLzvvIzmk43kvZzkuI3lvZPlvojmnInlj6/og73ms4TmvI/pg73lhajlsYDlj5jph48gKi9cclxuICAgIC8vIHdpdGjlnKjkuKXmoLzmqKHlvI/kuIvooqvlrozlhajnpoHmraLvvIzku6XkuIvku6PnoIHkuLrms4TmvI/lhajlsYDlj5jph4/nmoTkvovlrZDvvIzlnKjpnZ7kuKXmoLzmqKHlvI/kuIvmiafooYxcclxuICAgIC8qXHJcbiAgICBsZXQgdGVzdFdpdGggPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICB3aXRoKG9iaikge1xyXG4gICAgICAgICAgICBfYSA9ICd3aXRoIHJldmlzZSBzdWNjZXNzZnVsbHknO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2JqMSA9IHtcclxuICAgICAgICBcIl9hXCI6IDIzM1xyXG4gICAgfTtcclxuICAgIGxldCBvYmoyID0ge1xyXG4gICAgICAgIFwiX2JcIjogNDQ1XHJcbiAgICB9O1xyXG5cclxuICAgIHRlc3RXaXRoKG9iajEpOyAvLyBvYmoxLl9hID0gd2l0aCByZXZpc2Ugc3VjY2Vzc2Z1bGx5XHJcbiAgICB0ZXN0V2l0aChvYmoyKTsgLy8gb2JqMi5fYSA9IHVuZGVmaW5lZFxyXG4gICAgY29uc29sZS5sb2cod2luZG93Ll9hKTsgLy8gd2l0aCByZXZpc2Ugc3VjY2Vzc2Z1bGx577yM55Sx5LqO5L2c55So5Z+f6Zeu6aKY5rOE5ryP5Yiw5YWo5bGA5Y+Y6YePXHJcbiAgICAqL1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDlm57osIPlh73mlbDlj4LmlbDmmK/lh73mlbDooajovr7lvI/vvIzlubbkuI3mmK/lh73mlbDlo7DmmI4gKi9cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dEhhbmRsZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBzZXRUaW1lb3V0JylcclxuICAgIH0sIDMwMCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhID0gMjMzO1xyXG4gICAgLyog56uL5Y2z5omn6KGM5Ye95pWw56ys5LiA5Liq5ous5Y+36YeM55qE5YaF5a656KKr5b2T5L2c5Ye95pWw6KGo6L6+5byPICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSAxXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lubmVyIElJRkUnLCBhKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog56uL5Y2z5omn6KGM5Ye95pWw5Lmf5Y+v5Lul5oul5pyJ5Ye95pWw5ZCN77yM5Lmf5Y+v5Lul5Lyg5Y+CICovXHJcbiAgICAoZnVuY3Rpb24gSUlGRShhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dsb2JhbCBJSUZFJywgYSk7XHJcbiAgICB9KShhKTtcclxuXHJcbiAgICAvKiDku6XkuIrku6PnoIHor63kuYnkuIrnrYnlkIzkuo7kuIvpnaLvvIzkuIrpnaLnmoRJSUZF5YWo5bGA5LiL5piv5peg5rOV6K6/6Zeu55qEICovXHJcbiAgICB2YXIgSUlGRSA9IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIElJRkUyJywgYSk7XHJcbiAgICB9KGEpO1xyXG5cclxuICAgIC8qIFVNRO+8jOWwhuWHveaVsOihqOi+vuW8j+S8oOi/m0lJRkXnmoTmqKHlvI8gKi9cclxuICAgIChmdW5jdGlvbihmbikge1xyXG4gICAgICAgIGZuKHdpbmRvdyk7XHJcbiAgICB9KShmdW5jdGlvbiBkZWYoZ2xvYmFsKSB7XHJcbiAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbm5lciBVTUQnLCBhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIFVNRCcsIGdsb2JhbC5HTE9CQUwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIHZhcuWPmOmHj+WjsOaYjuaPkOWNhyAqL1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGEpOyAvLyB1bmRlZmluZWRcclxuICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8qIOS7peS4iuS7o+eggeetieWQjOS6juS4i+mdoiAqL1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgICAgIHZhciBhID0gMjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog5Ye95pWw5aOw5piO5Y+v5Lul5o+Q5YmN77yM5Ye95pWw6KGo6L6+5byP55qE5aOw5piO5Lya5YOP5LiK6Z2i5Y+Y6YeP5LiA5qC355qE5o+Q5Y2H5oiQdW5kZWZpZWQgKi9cclxuICAgIGZvbygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZm9vJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyog5Ye95pWw6KGo6L6+5byP5o+Q5Y2H5oiQdW5kZWZpbmVk77yM5omn6KGMdW5kZWZpbmVk5Lya5oqlVHlwZUVycm9y77yM6ICM5LiN5pivUmVmZXJlbmNlRXJyb3IgKi9cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYmFyKCk7XHJcbiAgICAgICAgdmFyIGJhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYmFyJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG57XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyog5Z+656GA5qCH5YeG6Zet5YyFICovXHJcbiAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJheiA9IGZvbygpO1xyXG4gICAgICAgIGJheigpO1xyXG5cclxuICAgICAgICAvKiDpl63ljIXlvqrnjq8gKi9cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24oaikge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqKTtcclxuICAgICAgICAgICAgICAgIH0sIGogKiAzMDApO1xyXG4gICAgICAgICAgICB9KShpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyog5Z+65pys5qih5Z2X6K6+6K6h5qih5byPICovXHJcbiAgICAgICAgZnVuY3Rpb24gY29vbE1vZHVsZSgpIHtcclxuICAgICAgICAgICAgdmFyIHNvbWV0aGluZyA9ICdjb29sJztcclxuICAgICAgICAgICAgdmFyIGFub3RoZXIgPSBbMSwgMiwgM107XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkb1NvbWV0aGluZygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvbWV0aGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXogPSBmb28oKTtcclxuICAgICAgICAgICAgYmF6KCk7XHJcblxyXG4gICAgICAgICAgICAvKiDpl63ljIXlvqrnjq8gKi9cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbihqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaiAqIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9KShpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiDln7rmnKzmqKHlnZforr7orqHmqKHlvI8gKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29vbE1vZHVsZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzb21ldGhpbmcgPSAnY29vbCc7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5vdGhlciA9IFsxLCAyLCAzXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb1NvbWV0aGluZygpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzb21ldGhpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvQW5vdGhlcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbm90aGVyLmpvaW4oJyEnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkb1NvbWV0aGluZzogZG9Tb21ldGhpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgZG9Bbm90aGVyOiBkb0Fub3RoZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjb29sID0gY29vbE1vZHVsZSgpO1xyXG4gICAgICAgICAgICBjb29sLmRvQW5vdGhlcigpO1xyXG4gICAgICAgICAgICBjb29sLmRvU29tZXRoaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvKiDnjrDku6PmqKHlnZfkvp3otZbliqDovb3lmajvvIznsbtyZXF1aXJlSlPmqKHlvI8gKi9cclxuICAgICAgICAgICAgdmFyIE15TW9kdWxlcyA9IChmdW5jdGlvbiBNYW5hZ2VyKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZWZpbmUobmFtZSwgZGVwcywgaW1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBzW2ldID0gbW9kdWxlc1tkZXBzW2ldXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pyA5Li76KaB5Ye95pWw77yM5L2/55So5Ye95pWw6L+U5Zue5YC85omn6KGMXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc1tuYW1lXSA9IGltcGwuYXBwbHkoaW1wbCwgZGVwcyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lOiBkZWZpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBNeU1vZHVsZXMuZGVmaW5lKCdmb28nLCBbXSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhlbGxvKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxsbzogaGVsbG9cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBNeU1vZHVsZXMuZGVmaW5lKCdiYXInLCBbJ2ZvbyddLCBmdW5jdGlvbihmb28pIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhpKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYXIgd2l0aCBmb28nKTtcclxuICAgICAgICAgICAgICAgICAgICBmb28uaGVsbG8oKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBoaTogaGlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIEZvbyA9IE15TW9kdWxlcy5nZXQoJ2ZvbycpO1xyXG4gICAgICAgICAgICB2YXIgQmFyID0gTXlNb2R1bGVzLmdldCgnYmFyJyk7XHJcbiAgICAgICAgICAgIEJhci5oaSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyogVHJhY2V1cumhueebrnRyeS1jYXRjaOino+WGs0VTNuS7peWJjeeahOe6p+S9nOeUqOWfnyAqL1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChjYXRjaFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpJbpg6jml6Dms5Xorr/pl67miJbkvb/nlKjov5nkuKrlj5jph49cclxuICAgICAgICAgICAgICAgIGNhdGNoVmFsdWUgPSAyO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeS1jYXRjaCBibG9jaycsIGNhdGNoVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiDmmL7lvI/liJvlu7rlnZfnuqfkvZznlKjln58gKi9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGEgPSAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZG9ubHkgPSAneXV1aGVpJztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGEsIHJlYWRvbmx5KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiBiaW5k6Kej5Yazc2V0VGltZW91dOetieaXtuiiq+e7keWumndpbmRvd+S4uuS4iuS4i+aWhyAqL1xyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb3JlIGF3ZXNvbWU6ICcsIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMuY291bnQgKiAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmouY29vbCgpO1xyXG5cclxuICAgICAgICAgICAgLyog566t5aS05Ye95pWw57uR5a6a5YmN5ZCO5LiK5LiL5paHICovXHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMyxcclxuICAgICAgICAgICAgICAgIGNvb2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50IDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb3JlIGF3ZXNvbWUgYXJyb3c6ICcsIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLmNvdW50ICogMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqZWN0LmNvb2woKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMS0xLmpzIiwiLypcclxuICogQEF1dGhvcjogeXV1aGVpXHJcbiAqIEBEYXRlOiAyMDE4LTAxLTExIDEzOjQ2OjA1XHJcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIFNlbGxlbml0ZVxyXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE4LTAxLTE3IDExOjE5OjA0XHJcbiAqL1xyXG5cclxue1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhID0gJ0FMTCc7XHJcbiAgICAgICAgLyogYXJndW1lbnRzLmNhbGxlZeWPr+S7peeUqOadpeW8leeUqOato+WcqOi/kOihjOeahOWHveaVsO+8jOWMheaLrOWMv+WQjeWHveaVsCAqL1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOivpeaWueazleaYr+S4gOenjeiiq+W6n+W8g+eahOaWueahiO+8jOS4peagvOaooeW8j+S4i+S8muaKpemUmSBjb25zb2xlLmxvZyhhcmd1bWVudHMuY2FsbGVlKTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICAvKiDlnKjlh73mlbDmma7pgJrmqKHlvI/kuIvnm7TmjqXosIPnlKjpu5jorqTnu5HlrprnmoR0aGlz5Li65YWo5bGA5a+56LGhd2luZG93ICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyDlnKjkuKXmoLzmqKHlvI/kuIvliJnkuI3kvJrpu5jorqTnu5HlrprvvIx0aGlz5Li6dW5kZWZpbmVkIHVzZSBzdHJpY3TkuIDlrpropoHlhpnlnKjnrKzkuIDooYxcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvbygpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIOWHveaVsOWumuS5ieWcqOmdnuS4peagvOaooeW8j+S4i++8jOWNs+S9v+WcqOS4peagvOaooeW8j+S4i+iwg+eUqOS+neeEtuiiq+m7mOiupOe7keWumuS4undpbmRvdyAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgfShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgICAgICAgICBmb28oKTsgLy8gd2luZG93XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog6ZqQ5byP57uR5a6a5L6L5a2QICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDIzMyxcclxuICAgICAgICAgICAgICAgIGZvbzogZm9vXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBvYmouZm9vKCkgLy8gMlxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIOijheeusSAqL1xyXG4gICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvby5jYWxsKHRydWUpOyAvLyBCb29sZWFuIHtbW1ByaW1pdGl2ZVZhbHVlXV06IHRydWV9XHJcbiAgICAgICAgICAgIGZvby5jYWxsKCcxMjMnKTsgLy8gU3RyaW5nIHtbW1ByaW1pdGl2ZVZhbHVlXV06IFwiMTIzXCJ9XHJcbiAgICAgICAgICAgIGZvby5jYWxsKDQ1Nik7IC8vIE51bWJlciB7W1tQcmltaXRpdmVWYWx1ZV1dOiA0NTZ9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZm9vID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhYmMgPSBmb28uYmluZChudWxsKTtcclxuICAgICAgICAgICAgLyog5Lil5qC85qih5byP5LiL77yMdGhpc+aMh+WQkeaYr251bGzvvIzkvYbpnZ7kuKXmoLzmqKHlvI/kuIvvvIx0aGlz5oyH5ZCR5pivd2luZG9377yM5rOo5oSPICovXHJcbiAgICAgICAgICAgIGFiYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyog5Li65LqG6YG/5YWN5Lul5LiK5oOF5Ya177yM5L2/55SoRE1a5p2l57uR5a6a5pu05a6J5YWo55qEdGhpc++8jOmBv+WFjem7mOiupOe7keWumuinhOWImSAqL1xyXG4gICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZm9vKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpOyAvLyBBTExcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhOiAnICsgYSArICcsIGI6ICcgKyBiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDliJvlu7rlrozlhajnqbrnmoTlr7nosaHvvIxETVpcclxuICAgICAgICAgICAgdmFyIERNWiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgICAgICAgIHZhciBiYXIgPSBmb28uYmluZChETVosIDIpO1xyXG4gICAgICAgICAgICBiYXIoNCk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog566t5aS05Ye95pWw5LiN6YCC55So5LqO5Lul5LiK5Yeg5p2h6KeE5YiZICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57kuIDkuKrnrq3lpLTlh73mlbBcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXPnu6fmib/oh6pmb29cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMSA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG9iajIgPSB7XHJcbiAgICAgICAgICAgICAgICBhOiA0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBiYXIgPSBmb28uY2FsbChvYmoxKTtcclxuICAgICAgICAgICAgYmFyLmNhbGwob2JqMik7IC8vIDLvvIzov5nph4znmoRjYWxs55Sx5LqO5L2/55So5LqG566t5aS05by65Yi257uR5a6a5LqG5LiK5LiL5paH77yM5LiA55u05pivb2JqMVxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8qIGZvckVhY2jnmoTnrKzkuozkuKrlj4LmlbDlj6/ku6Xnu5HlrprkuIrkuIvmlofvvIzlkoxiaW5k5pWI5p6c5LiA5qC3ICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBbMSwgMywgNF1cclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0sIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd5dXVoZWknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9KSgpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gW1xyXG4gICAgICAgIDIzLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgNixcclxuICAgICAgICA3OCxcclxuICAgICAgICA5LFxyXG4gICAgICAgIDIyLFxyXG4gICAgICAgIDMsXHJcbiAgICAgICAgMTAwXHJcbiAgICBdO1xyXG4gICAgbGV0IHJldCA9IFtdO1xyXG4gICAgYXJyLmV2ZXJ5KChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgLyog6YGN5Y6G5q+P5LiA5Liq5YWD57Sg77yM55u06Iez6L+U5ZueZmFsc2UgKi9cclxuICAgICAgICByZXR1cm4gaXRlbSAlIDExICE9PSAwO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gW1xyXG4gICAgICAgIDIzLFxyXG4gICAgICAgIDEsXHJcbiAgICAgICAgNixcclxuICAgICAgICA3OCxcclxuICAgICAgICA5LFxyXG4gICAgICAgIDIyLFxyXG4gICAgICAgIDMsXHJcbiAgICAgICAgMTAwXHJcbiAgICBdO1xyXG4gICAgbGV0IHJldCA9IFtdO1xyXG4gICAgYXJyLnNvbWUoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXQucHVzaChpdGVtKTtcclxuICAgICAgICAvKiDpgY3ljobmr4/kuIDkuKrlhYPntKDvvIznm7Toh7Pov5Tlm550cnVlICovXHJcbiAgICAgICAgcmV0dXJuIGl0ZW0gJSA5ID09PSAwO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXQpO1xyXG59XHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gWzIsIDQsIDZdO1xyXG4gICAgZm9yIChsZXQgaSBvZiBhcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyog5pWw57uE6Ieq5bim6L+t5Luj5Zmo77yM5Y+v5Lul5L2/55SoZm9yLW9m6YGN5Y6G5pWw57uE55qE5YC8ICovXHJcblxyXG57XHJcbiAgICBsZXQgYXJyID0gWzEsIDIsIDNdO1xyXG4gICAgbGV0IGl0ID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbn1cclxuXHJcbi8qIOWvueixoeacrOi6q+ayoeaciei/reS7o+WZqO+8jOmcgOimgeaooeS7v+WQjuaJjeiDveS9v+eUqGZvci1vZiAqL1xyXG5cclxuLyog55Sx5LqO6L+t5Luj5Zmo55qE5bGe5oCn5bCx5pivU3ltYm9sLml0ZXJhdG9y77yM6ZyA6KaB5L2/55So6ZSu5YC86K6/6Zeu5rOVICovXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgbmFtZTogJ3l1dWhlaScsXHJcbiAgICAgICAgYWdlOiAnMjMyJ1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiDov5nmoLflrprkuYnlj6/ku6XkuI3orqlTeW1ib2zooqvmnprkuL7vvIznm7TmjqXlrprkuYnkuZ/mmK/lj6/ku6XnmoQgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFN5bWJvbC5pdGVyYXRvciwge1xyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb1trZXlzW2luZGV4KytdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKGluZGV4ID4ga2V5cy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmb3IgKGxldCBrIG9mIG9iaikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGspO1xyXG4gICAgfVxyXG59XHJcblxyXG57XHJcbiAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGE6IDEsXHJcbiAgICAgICAgYjogMjMzLFxyXG4gICAgICAgIGM6IDQ0NSxcclxuICAgICAgICBbU3ltYm9sLml0ZXJhdG9yXTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBrcyA9IE9iamVjdC5rZXlzKG8pO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9ba3NbaWR4KytdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogKGlkeCA+IGtzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGl0ID0gb2JqW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhpdC5uZXh0KCkpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9iamVjdC5jcmVhdGUob2JqKeS8muWwhltbcHJvdG90eXBlXV3lhbPogZTliLDmjIflrprlr7nosaHvvIznu6fmib/lsLHnlLHkuo7ov5nkuKrljp/nkIYgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMTIzXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaik7XHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmEpXHJcbn1cclxuXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYWdlOiAyM1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICduYW1lJywge1xyXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiAneXV1aGVpJ1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgZm9yIChsZXQgaSBpbiBvYmopIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpKSAvLyBhZ2VcclxuICAgIH07XHJcblxyXG4gICAgLyog5peg6K66ZW51bWVyYWJsZeaYr+S7gOS5iO+8jGlu5pON5L2c56ym6YO96IO95aSf5Yik5pata2V55piv5ZCm5Zyob2Jq5Lit77yM5bm25LiU5a+75om+5Y6f5Z6L6ZO+ICovXHJcbiAgICBjb25zb2xlLmxvZygnbmFtZScgaW4gb2JqKTtcclxufVxyXG5cclxue1xyXG4gICAgLyogRVM25oul5pyJT2JqZWN0LnNldFByb3RvdHlwZU9m6L+b6KGM5Y6f5Z6L6ZO+57un5om/ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIEZvby5wcm90b3R5cGUuYSA9IDE7XHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihCYXIucHJvdG90eXBlLCBGb28ucHJvdG90eXBlKTtcclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCk7XHJcbiAgICBjb25zb2xlLmxvZyhiYXIuYSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOe7hOWQiOe7p+aJvyAqL1xyXG4gICAgbGV0IEZvbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XHJcbiAgICAgICAgLyog57uR5a6a54i25Lqy55qE5p6E6YCg5bGe5oCnICovXHJcbiAgICAgICAgRm9vLmNhbGwodGhpcywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIOWwhkJhcueahFtbcHJvdG90eXBlXV3lhbPogZTliLBGb2/nmoTvvIznu6fmib9Gb2/nmoTljp/lnovpk77lsZ7mgKcgKi9cclxuICAgIEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvby5wcm90b3R5cGUpO1xyXG5cclxuICAgIC8qIOS/ruaUuei/h3Byb3RvdHlwZeWQjumcgOimgeaJi+WKqOS/ruWkjWNvbnN0cnVjdG9y55qE5oyH5ZCRICovXHJcbiAgICBCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFyO1xyXG4gICAgQmFyLnByb3RvdHlwZS5teU5hbWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYmFyID0gbmV3IEJhcigneXV1aGVpJywgMjMpO1xyXG4gICAgY29uc29sZS5sb2coYmFyLm15TmFtZSgpKTtcclxuICAgIC8qIEVTNeebtOaOpeiOt+WPluS4gOS4quWvueixoeeahFtbcHJvdG90eXBlXV3nmoTmlrnlvI8gKi9cclxuICAgIGNvbnNvbGUubG9nKE9iamVjdC5nZXRQcm90b3R5cGVPZihiYXIpID09PSBCYXIucHJvdG90eXBlKTtcclxuICAgIC8qIOe7neWkp+WkmuaVsOa1j+iniOWZqO+8iOmdnuagh+WHhuiOt+WPluaWueW8j++8ieaUr+aMgSAqL1xyXG4gICAgY29uc29sZS5sb2coYmFyLl9fcHJvdG9fXyA9PT0gQmFyLnByb3RvdHlwZSk7XHJcbiAgICAvKiDnu6fmib/kuZ/lj6/ku6XpgJrov4dpbnN0YW5jZW9m5om+5Yiw5rqQ5aS0ICovXHJcbiAgICBjb25zb2xlLmxvZyhiYXIgaW5zdGFuY2VvZiBGb28pO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBPYmplY3QuY3JlYXRl6Ieq5bim56ys5LqM5Liq5Y+C5pWw5Y+v5Lul5a6a5LmJ5bGe5oCn5o+P6L+w56ymICovXHJcbiAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGE6IDJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaiwge1xyXG4gICAgICAgIGI6IHtcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB2YWx1ZTogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYzoge1xyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb2JqMueahOWOn+Wei+mTvuS4iui/nuaOpeS6hm9iaueahOWOn+Wei+mTvlxyXG4gICAgY29uc29sZS5sb2cob2JqMi5hKTsgLy8gMlxyXG4gICAgY29uc29sZS5sb2cob2JqMi5oYXNPd25Qcm9wZXJ0eSgnYScpKTsgLy8gZmFsc2VcclxuICAgIGNvbnNvbGUubG9nKG9iai5oYXNPd25Qcm9wZXJ0eSgnYScpKTtcclxufVxyXG5cclxue1xyXG4gICAgLyog56We5aWH55qEQVBJ6K6+6K6h77yM55Sx5LqO5pys6Lqr5YaF6YOo5rKh5pyJ6K+l5Ye95pWw77yM5Y206IO95aSf6L+Q6KGM77yM5Lya5Y+Y5b6X5oCq5oCq55qEICovXHJcbiAgICAvKiDpnaLlkJHlp5TmiZjmqKHlvI/mnaXmupDkuo5PYmplY3QuY3JlYXRlKCnov5nkuKrnibnmgKcgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgY29vbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb29sIScpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IG9iajIgPSBPYmplY3QuY3JlYXRlKG9iaik7XHJcbiAgICBvYmoyLmNvb2woKTsgLy8gY29vbCFcclxufVxyXG5cclxue1xyXG4gICAgLyog57uP5YW457G757un5om/6Z2i5ZCR5a+56LGh6aOO5qC8ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbihuYW1lLCBhZ2UpIHtcclxuICAgICAgICBGb28uY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9vLnByb3RvdHlwZSk7XHJcbiAgICBCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFyO1xyXG4gICAgbGV0IGJhcjEgPSBuZXcgQmFyKCd5dXVoZWknLCAyMik7XHJcbiAgICBsZXQgYmFyMiA9IG5ldyBCYXIoJ1NlbGxlbml0ZScsIDI0KTtcclxuICAgIGNvbnNvbGUubG9nKGJhcjEsIGJhcjIpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDlr7nosaHlp5TmiZjlhbPogZTpo47moLwgKi9cclxuICAgIGxldCBGb28gPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWRlbnRpZnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEkgYW0gJHt0aGlzLm5hbWV9YDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBPYmplY3QuY3JlYXRlKEZvbyk7XHJcbiAgICBCYXIuc3BlYWsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlkZW50aWZ5KCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYjEgPSBPYmplY3QuY3JlYXRlKEJhcik7XHJcbiAgICBsZXQgYjIgPSBPYmplY3QuY3JlYXRlKEJhcik7XHJcbiAgICBiMS5pbml0KCd5dXVoZWknKTtcclxuICAgIGIyLmluaXQoJ1NlbGxlbml0ZScpO1xyXG4gICAgYjEuc3BlYWsoKTtcclxuICAgIGIyLnNwZWFrKCk7XHJcbiAgICBjb25zb2xlLmxvZyhCYXIpOyAvLyB7c3BlYWs6ZigpfVxyXG4gICAgY29uc29sZS5sb2coYjEpOyAvLyB7bmFtZTogJ3l1dWhlaSd9XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWPjeivjeazlSAqL1xyXG4gICAgLyogRVM25Lul5LiL55qE566A5rSB5YaZ5rOV5Lya57yW6K+R5oiQ5Yy/5ZCN5Ye95pWw77yM5peg5rOV6L+b6KGM6YCS5b2SICovXHJcbiAgICBsZXQgRm9vID0ge1xyXG4gICAgICAgIC8vIOacgOWlveS4jeimgeS9v+eUqHRoaXMuYmFyKCnmiJZGb28uYmFyKCnmiafooYzpgJLlvZLvvIzlm6DkuLrlj6/nlKjlrp7pmYXmg4XlhrXmr5TovoPlsJFcclxuICAgICAgICBiYXIoKSB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDku6XkuIrlrp7pmYXkvJrnvJbor5HmiJDku6XkuIvmlrnlvI9cclxuICAgIGxldCBGb28xID0ge1xyXG4gICAgICAgIGJhcjogZnVuY3Rpb24oKSB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDlpoLmnpzopoHmg7Pkvb/nlKjpgJLlvZLvvIzkuI3opoHkvb/nlKjnroDku4vmlrnlvI/vvIzpnIDopoHkvb/nlKjlhbflkI3lh73mlbDooajovr7lvI9cclxuICAgIGxldCBGb28yID0ge1xyXG4gICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIGJhcjogZnVuY3Rpb24gYmFyb29vbygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWRpbmctLS0tLS0+JyArIHRoaXMuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgLyog5YW35ZCN5Ye95pWw6L+b6KGM6Ieq5oiR6YCS5b2SICovXHJcbiAgICAgICAgICAgICAgICBiYXJvb29vLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIEZvbzIuYmFyKCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBGb28gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IGZ1bmN0aW9uKG5hbWUsIGFnZSkge1xyXG4gICAgICAgIEZvby5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb28ucHJvdG90eXBlKTtcclxuXHJcbiAgICBsZXQgYmFyID0gbmV3IEJhcigneXV1aGVpJywgMjMpO1xyXG5cclxuICAgIC8qIOWGheecgSAqL1xyXG4gICAgLy8g6aaW5YWI6KaB57qg5q2j6ZSZ6K+v77yMQmFyIGluc3RhbmNlb2YgRm9v5piv6ZSZ55qEXHJcblxyXG4gICAgLyog5p6E6YCg5Ye95pWw5LmL6Ze0Rm9v5ZKMQmFy55qE5YaF55yBICovXHJcbiAgICBCYXIucHJvdG90eXBlIGluc3RhbmNlb2YgRm9vOyAvLyB0cnVlXHJcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQmFyLnByb3RvdHlwZSkgPT09IEZvby5wcm90b3R5cGU7IC8vIHRydWVcclxuICAgIEZvb1xyXG4gICAgICAgIC5wcm90b3R5cGVcclxuICAgICAgICAuaXNQcm90b3R5cGVPZihCYXIucHJvdG90eXBlKTsgLy8gdHJ1ZVxyXG5cclxuICAgIC8qIOWunuS+i+WSjOaehOmAoOWHveaVsOS5i+mXtOeahOWGheecgSAqL1xyXG4gICAgYmFyIGluc3RhbmNlb2YgQmFyOyAvLyB0cnVlXHJcbiAgICBiYXIgaW5zdGFuY2VvZiBGb287IC8vIHRydWVcclxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihiYXIpID09PSBCYXIucHJvdG90eXBlOyAvLy8gdHJ1ZVxyXG4gICAgRm9vXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKGJhcik7IC8vIHRydWVcclxuICAgIEJhclxyXG4gICAgICAgIC5wcm90b3R5cGVcclxuICAgICAgICAuaXNQcm90b3R5cGVPZihiYXIpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9yYm1lbnQucHJvdG90eXBlLmNhbGwodGhpcywgLi4uKeaYr+S8quWkmuaAgSAqL1xyXG4gICAgY2xhc3MgT3JibWVudCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lIHx8IE9yYm1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDUwO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBgVGhlICR7dGhpcy5uYW1lfSBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXRNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBFTklHTUEgZXh0ZW5kcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHN1cGVyKCnlnKhjb25zdHJ1Y3RvcuW/hemhu+WcqHRoaXPosIPnlKjliY3miafooYxcclxuICAgICAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyDku6XliY3nmoTkvKrlpJrmgIHlhpnms5XvvJpPcmJtZW50LnByb3RvdHlwZS5zZXRTaXplLmFwcGx5KHRoaXMsIFt3aWR0aCwgaGVpZ2h0XSlcclxuICAgICAgICAgICAgLy8g5rOo5oSP5Ye654mI5Lmm5LiK55qEc3VwZXIod2lkdGgsIGhlaWdodCnlnKhjb25zdHJ1Y3RvcuWkluS9v+eUqOW3suiiq+emgeatou+8jOaUueS4uuabv+aNouS7peS4i+aWueW8j+WunueOsOebuOWvueWkmuaAgVxyXG4gICAgICAgICAgICBzdXBlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gYHNpemUgaXMgd2lkdGggJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEFSQ1VTIGV4dGVuZHMgT3JibWVudCB7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyBzdXBlcigp5ZyoY29uc3RydWN0b3Llv4XpobvlnKh0aGlz6LCD55So5YmN5omn6KGMXHJcbiAgICAgICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8g5Lul5YmN55qE5Lyq5aSa5oCB5YaZ5rOV77yaT3JibWVudC5wcm90b3R5cGUuc2V0U2l6ZS5hcHBseSh0aGlzLCBbd2lkdGgsIGhlaWdodF0pXHJcbiAgICAgICAgICAgIC8vIOazqOaEj+WHuueJiOS5puS4iueahHN1cGVyKHdpZHRoLCBoZWlnaHQp5ZyoY29uc3RydWN0b3LlpJbkvb/nlKjlt7LooqvnpoHmraLvvIzmlLnkuLrmm7/mjaLku6XkuIvmlrnlvI/lrp7njrDnm7jlr7nlpJrmgIFcclxuICAgICAgICAgICAgc3VwZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlICs9IGBzaXplIGlzIHdpZHRoICR7dGhpcy53aWR0aH0gYW5kIGhlaWdodCAke3RoaXMuaGVpZ2h0fWA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgRU5JR01BX0kgPSBuZXcgQVJDVVMoJ0VOSUdNQV9JJyk7XHJcbiAgICBsZXQgRU5JR01BX0lfU0laRV9NRVNTQUdFID0gRU5JR01BX0lcclxuICAgICAgICAuc2V0U2l6ZSgpXHJcbiAgICAgICAgLmdldE1lc3NhZ2UoKTtcclxuXHJcbiAgICBsZXQgQVJDVVNfSSA9IG5ldyBBUkNVUygnQVJDVVNfSScpO1xyXG4gICAgbGV0IEFSQ1VTX0lfU0laRV9NRVNTQUdFID0gQVJDVVNfSVxyXG4gICAgICAgIC5zZXRTaXplKDEwMCwgNzApXHJcbiAgICAgICAgLmdldE1lc3NhZ2UoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhFTklHTUFfSV9TSVpFX01FU1NBR0UpO1xyXG4gICAgY29uc29sZS5sb2coQVJDVVNfSV9TSVpFX01FU1NBR0UpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBjbGFzc+W5tuS4jeaYr+mdmeaAge+8jOWPquaYr+S4gOS4qnByb3RvdHlwZeeahOivreazleezlu+8jOS9v+eUqHByb3RvdHlwZeS7jeWPr+S/ruaUuSAqL1xyXG4gICAgY2xhc3MgUmFuZG9tIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5udW0gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmFuZCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5udW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcjEgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICByMS5yYW5kKCk7XHJcblxyXG4gICAgUmFuZG9tLnByb3RvdHlwZS5yYW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5udW0gKiAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHIyID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgcjIucmFuZCgpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3N0YWdlMS0yLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgY3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuICogQEF1dGhvcjogU2VsbGVuaXRlXHJcbiAqIEBEYXRlOiAgIDIwMTgtMDEtMTYgMTI6MjM6MTBcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMjIgMTY6NTc6MTJcclxuICovXHJcblxyXG57XHJcblx0LyogdHlwZW9mIG51bGwgT2JqZWN0IEFycmF5IOmDveS8mui/lOWbniAnb2JqZWN0JyAgKi9cclxuXHRsZXQgYSA9IG51bGw7XHJcblx0bGV0IGIgPSB7XHJcblx0XHRuYW1lOiAneXV1aGVpJ1xyXG5cdH07XHJcblx0bGV0IGMgPSBbMSwgM107XHJcblx0Y29uc29sZS5sb2codHlwZW9mIGEsIHR5cGVvZiBiLCB0eXBlb2YgYyk7XHJcbn1cclxuXHJcbntcclxuXHQvKiDlpI3lkIjmnaHku7bmo4DmtYtudWxsICovXHJcblx0bGV0IGEgPSBudWxsO1xyXG5cdGNvbnNvbGUubG9nKCFhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0Jyk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWHveaVsOWvueixoeeahGxlbmd0aOaYr+WjsOaYjuWPguaVsOeahOS4quaVsCAqL1xyXG5cdGxldCBmb28gPSBmdW5jdGlvbihhLCBiLCBjKSB7fTtcclxuXHRjb25zb2xlLmxvZyhmb28ubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5aOw5piO5LqG6L+Y5rKh6LWL5YC85bGe5LqOdW5kZWZpbmVkICovXHJcblx0Lyog6L+Y5rKh5aOw5piO5bGe5LqOdW5kZWNsYXJlZO+8iGphdmFzY3JpcHTov5jmmK/kvJrmiZPljbB1bmRlZmluZWTvvIkgKi9cclxufVxyXG5cclxue1xyXG5cdC8qIHR5cGVvZuS4gOS4qnZhcuWjsOaYjuS6huS9huacquWumuS5ieWAvOeahOivneS8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG5cdC8qIHR5cGVvZuS4gOS4quWujOWFqOayoeacieWjsOaYjuWPiuWumuS5ieWAvOeahOivneWQjOagt+S5n+S8muaJk+WNsHVuZGVmaW5lZCAqL1xyXG59XHJcblxyXG57XHJcblx0bGV0IElJRkUgPSAyO1xyXG5cdC8qIHR5cGVvZuWIpOaWreW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSAodHlwZW9mIElJRkUgIT09ICd1bmRlZmluZWQnKSA/IElJRkUgOiBmdW5jdGlvbigpIHtcclxuXHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHR9O1xyXG5cdC8qIOS9v+eUqHR5cGVvZuadpeajgOafpeWPmOmHj+aYr+mmlumAieeahOmAieaLqSAqL1xyXG5cdGNvbnNvbGUubG9nKGhlbHBlcik7IC8vIDJcclxufVxyXG5cclxue1xyXG5cdC8qIOeUqOS+nei1luazqOWFpeiuvuiuoeaooeW8j+adpemqjOivgeW9k+WJjeS9nOeUqOWfn+WPmOmHj+aYr+WQpuiiq+WumuS5iSAqL1xyXG5cdGxldCBoZWxwZXIgPSBmdW5jdGlvbihJSUZFKSB7XHJcblx0XHRsZXQgaGVscGVyMiA9IElJRkUgfHwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8qIHNvbWV0aGluZ3MgKi9cclxuXHRcdH07XHJcblx0fTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWIm+W7uueogOeWj+aVsOe7hO+8jOepuueZveeahOWcsOaWueS8muiiq+aYvuW8j+i1i+WAvOS4unVuZGVmaW5lZCAqL1xyXG5cdGxldCBhcnIgPSBbXTtcclxuXHRhcnJbMF0gPSAwO1xyXG5cdGFycls0XSA9IDQ7XHJcblx0Y29uc29sZS5sb2coYXJyLmxlbmd0aCk7IC8vIDVcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOe7hOS5n+aYr+Wvueixoe+8jOWPr+S7peWMheWQq+Wtl+espuS4sumUruWAvOWSjOWxnuaAp++8jOS9huS4jeiuoeWFpeS6juaVsOe7hOeahOmVv+W6piAqL1xyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0YXJyWyduYW1lJ10gPSAneXV1aGVpJztcclxuXHRhcnJbJ2FnZSddID0gMjM7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnIubGVuZ3RoKTsgLy8gM1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSP77yM5aaC5p6c5a2X56ym5Liy6ZSu5YC86IO95aSf6L2s5o2i5Li65Y2B6L+b5Yi25pWw5a2X77yM5Lya6KKr5b2T5L2c5pWw5a2X57Si5byV5aSE55CGICovXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRhcnJbJzUnXSA9IDEwMDtcclxuXHRjb25zb2xlLmxvZyhhcnIpO1xyXG59XHJcblxyXG57XHJcblx0Lyog57G75pWw57uE5Y+K5pWw57uE5Ymv5pys5bu656uLICovXHJcblx0Ly8g57G75pWw57uE6L2s5o2iXHJcblx0bGV0IGZvbyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGFyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRjb25zb2xlLmxvZyhhcnIpXHJcblx0fVxyXG5cdGZvbygpXHJcblxyXG5cdC8vIOaVsOe7hOWJr+acrFxyXG5cdGxldCBhcnIgPSBbMSwgMywgNV07XHJcblx0bGV0IGFyckNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpXHJcblx0YXJyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5LnB1c2goMjAwKTtcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyckNvcHkpO1xyXG5cclxuXHQvLyBFUzbnmoRBcnJheS5mcm9t5Lmf6IO95aSf5bu656uL5Ymv5pysXHJcblx0bGV0IGFycjIgPSBbMiwgNCwgNl07XHJcblx0bGV0IGFyckNvcHkyID0gQXJyYXkuZnJvbShhcnIyKTtcclxuXHRhcnIyLnB1c2goMTAwKTtcclxuXHRhcnJDb3B5Mi5wdXNoKDIwMCk7XHJcblx0Y29uc29sZS5sb2coYXJyLCBhcnJDb3B5Mik7XHJcbn1cclxuXHJcbntcclxuXHQvKiDorr/pl67lrZfnrKbkuLLmn5DkuKrkuIvmoIflupTor6XnlKguY2hhckF0KCnvvIzogIHniYjmnKxJReS4jeWFgeiuuHN0cmluZ1tpbmRleF3ov5nmoLforr/pl64gKi9cclxuXHQvKiDku6XkuIrlj6rog73lpJ/ov5vooYzlrZfnrKbkuLLorr/pl67vvIzml6Dms5Xov5vooYzlrZfnrKbkuLLkv67mlLkgKi9cclxuXHRsZXQgc3RyaW5nID0gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2coc3RyaW5nWzBdKTtcclxuXHRjb25zb2xlLmxvZyhzdHJpbmcuY2hhckF0KDIpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOaVsOWtl+WAvOWPr+eUqOaMh+aVsOihqOekuiAqL1xyXG5cdGxldCBhID0gNUUxMDtcclxuXHRjb25zb2xlLmxvZyhhKTtcclxufVxyXG5cclxue1xyXG5cdGxldCBhID0gNDIuNTk7XHJcblx0LyogLnRvRml4ZWQoKeeUqOS6juaMh+WumuWwj+aVsOaYvuekuuWkmuWwkeS4qiAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9GaXhlZCg0KSk7XHJcblx0LyogLnRvUHJlY2lzaW9uKCnnlKjkuo7mjIflrprlpJrlsJHkuKrmnInmlYjmlbDkvY0gKi9cclxuXHRjb25zb2xlLmxvZyhhLnRvUHJlY2lzaW9uKDUpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIEVTNu+8jOS4peagvOaooeW8j+S4jeWGjeaUr+aMgTDlvIDlpLTnmoTlhavov5vliLbmlbAgKi9cclxuXHQvLyBsZXQgYSA9IDAzNjM7XHJcblx0Ly8gY29uc29sZS5sb2coYSk7ICBTeW50YXhFcnJvclxyXG5cclxuXHQvKiBFUzblkozkuKXmoLzmqKHlvI/kuIvnmoTlhavov5vliLbmmK/nlKgwb+WJjee8gOihqOekuiAqL1xyXG5cdGxldCBhID0gMG8zNjM7XHJcblx0Y29uc29sZS5sb2coYSk7IC8vIDI0M1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSPMC4xKzAuMuS4jeetieS6jjAuM++8jOWtmOWcqOeyvuW6pumXrumimCAqL1xyXG5cdGxldCBhID0gMC4xICsgMC4yO1xyXG5cdGxldCBiID0gMC4zXHJcblx0Y29uc29sZS5sb2coYSA9PT0gYikgLy8gZmFsc2VcclxufVxyXG5cclxue1xyXG5cdC8qIE5hTuS4jeS4jk5hTuebuOetie+8jHR5cGVvZiBOYU7nmoTlgLzkuLonbnVtYmVyJyAqL1xyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBOYU4pOyAvLyBudW1iZXJcclxuXHRjb25zb2xlLmxvZyhOYU4gPT09IE5hTik7IC8vIGZhbHNlXHJcbn1cclxuXHJcbntcclxuXHQvKiB3aW5kb3fmnInkuIDkuKrlhajlsYDmlrnms5Vpc05hTigp77yM5L2G6L+Z5Liq5pyJYnVn77yM5Lya5bCGTmFO5ZKM5a2X56ym5Liy5Lmf5Lya5Yik5pat5Li6dHJ1ZSAqL1xyXG5cdC8qIEVTNueahE51bWJlci5pc05hTigp5L+u5aSN5LqG6L+Z5Liq6Zeu6aKY77yM5LuW5Lya5YWI55SodHlwZW9m5Yik5pat5Li6bnVtYmVy5YaN5omn6KGM5q2k5pa55rOVXHJcblx077yI5LiK6Z2i5o+Q5YiwdHlwZW9mIE5hTui/lOWbnueahOaYrydudW1iZXIn77yJICovXHJcblx0bGV0IGEgPSAnZm9vJztcclxuXHRsZXQgYiA9IDEwIC8gJ2Zvbyc7XHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGEpKTsgLy8gdHJ1ZSwgYnVnXHJcblx0Y29uc29sZS5sb2cod2luZG93LmlzTmFOKGIpKTsgLy8gdHJ1ZVxyXG5cclxuXHRjb25zb2xlLmxvZyhOdW1iZXIuaXNOYU4oYSkpOyAvLyBmYWxzZe+8jOS/ruWkjeS6hlxyXG5cdGNvbnNvbGUubG9nKE51bWJlci5pc05hTihiKSk7IC8vIHRydWVcclxuXHJcblx0Lyog5Yik5pat5piv5ZCmTmFO55qE5pu0566A5Y2V5pa55rOVICovXHJcblx0bGV0IElzTmFOID0gZnVuY3Rpb24obikge1xyXG5cdFx0cmV0dXJuIG4gIT09IG47XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhJc05hTihiKSk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWFs+S6ji0w77yMMCA9PT0gLTDmmK90cnVlICovXHJcblx0Lyog5pWw5a2X6L2s5Li65a2X56ym5Liy77yMLeWPt+a2iOWkse+8m+Wtl+espuS4sui9rOS4uuaVsOWtl++8jC3lj7fkv53nlZkgKi9cclxuXHQvKiBKU09OLnN0cmluZ2lmeSgtMCkg6L+U5ZueXCIwXCLvvIzogIxKU09OLnBhcnNlKFwiLTBcIikg6L+U5ZueLTAgKi9cclxuXHRjb25zb2xlLmxvZygwID09PSAtMCk7IC8vIHRydWVcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSgtMCksIEpTT04ucGFyc2UoJy0wJykpO1xyXG5cclxuXHQvKiDliKTmlq3mmK/lkKbkuLrotJ8w55qE5pa55rOVICovXHJcblx0bGV0IGlzTWluWmVybyA9IGZ1bmN0aW9uKG4pIHtcclxuXHRcdG4gPSBOdW1iZXIobik7XHJcblx0XHRyZXR1cm4gKG4gPT09IDApICYmICgxIC8gbiA9PT0gLUluZmluaXR5KTtcclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKGlzTWluWmVybygtMCkpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuXHQvKiDljp/nlJ/lh73mlbAgKi9cclxuXHQvLyBTdHJpbmcoKVxyXG5cdC8vIE51bWJlcigpXHJcblx0Ly8gT2JqZWN0KClcclxuXHQvLyBBcnJheSgpXHJcblx0Ly8gQm9vbGVhbigpXHJcblx0Ly8gRnVuY3Rpb24oKVxyXG5cdC8vIFJlZ0V4cCgpXHJcblx0Ly8gRXJyb3IoKVxyXG5cdC8vIERhdGUoKVxyXG5cdC8vIFN5bWJvbCgpXHJcbn1cclxuXHJcbntcclxuXHQvKiB0eXBlb2YgbmV3IFN0cmluZygnMTIzJynkvJrov5Tlm55vYmplY3QgKi9cclxuXHRsZXQgYSA9IG5ldyBTdHJpbmcoJ0hlbGxvJyk7XHJcblx0Y29uc29sZS5sb2coYSk7IC8vIFN0cmluZyB7XCJIZWxsb1wifVxyXG5cclxuXHQvKiDkvb/nlKhTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKCnog73lpJ/ov5Tlm55zdHJpbmflrZfnrKbkuLIgKi9cclxuXHRjb25zb2xlLmxvZyhhLnRvU3RyaW5nKCkpOyAvLyBcIkhlbGxvXCJcclxuXHRjb25zb2xlLmxvZyhTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBcIkhlbGxvXCJcclxuXHJcblx0Lyog5LiO5pys6Lqr5p6E6YCg5Ye95pWw55qEdmFsdWVPZigp5Yqf6IO955u45ZCMICovXHJcblx0Y29uc29sZS5sb2coYS52YWx1ZU9mKCkpOyAvLyBcIkhlbGxvXCJcclxuXHRjb25zb2xlLmxvZyhTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbChhKSk7IC8vIFwiSGVsbG9cIlxyXG5cclxuXHQvKiBPYmplY3QucHJvdG90eXBl5piv5LiN5ZCM55qEICovXHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpKTsgLy8gW29iamVjdCBTdHJpbmddXHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoYSkpOyAvLyBTdHJpbmcge1wiSGVsbG9cIn1cclxufVxyXG5cclxue1xyXG5cdC8qIOafpeeci+S4gOS4quWGhemDqOWxnuaAp1tbY2xhc3NdXeS9v+eUqE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCgpICovXHJcblx0bGV0IGEgPSBuZXcgQm9vbGVhbihmYWxzZSk7XHJcblx0Y29uc29sZS5sb2coT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpKTsgLy8gW29iamVjdCBCb29sZWFuXVxyXG59XHJcblxyXG57XHJcblx0Lyog5oOz6KaB5b6X5Yiw5bCB6KOF5a+56LGh55qE5Z+65pys57G75Z6L5YC877yM5Y+v5Lul5L2/55SodmFsdWVPZigp5Ye95pWwICovXHJcblx0bGV0IGEgPSBuZXcgU3RyaW5nKCdIZWxsbycpO1xyXG5cdGNvbnNvbGUubG9nKGEudmFsdWVPZigpKTtcclxuXHJcblx0Lyog6ZqQ5byP5ouG5bCBICovXHJcblx0bGV0IGIgPSBhICsgXCJcIjtcclxuXHRjb25zb2xlLmxvZyhiKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWwneivleWvueS4gOS4qm5ldyBTdHJpbmcvQm9vbGVhbi9OdW1iZXLov5vooYzpmpDlvI/orr/pl67vvIzkvJrpgKDmiJDlvLrliLbnsbvlnovovazmjaJcclxuXHQgICDkvJrorr/pl67lr7nlupTnmoTmnoTpgKDlh73mlbDljp/lnovpk77kuIrnmoR2YWx1ZU9m5pa55rOVICovXHJcblx0bGV0IHN0cmluZyA9IG5ldyBTdHJpbmcoJ3N0cmluZzEnKTtcclxuXHQvLyDpmpDlvI/orr/pl67vvIzlrp7pmYXmmK/osIPnlKjov5Tlm57kuoZTdHJpbmcucHJvdG90eXBlLnZhbHVlT2bnmoTlgLzvvIzlvLrliLbnsbvlnovovazmjaJcclxuXHRpZiAoc3RyaW5nLmluZGV4T2YoMSkgIT09IC0xKSB7XHJcblx0XHRjb25zb2xlLmxvZygnbmV3IFN0cmluZyBkaXJlY3QgcmVhZCcpO1xyXG5cdH1cclxufVxyXG5cclxue1xyXG5cdC8qIOW9k+S9v+eUqOihqOi+vuW8jyvml7bvvIzlhbbkuK3kuIDkuKrmk43kvZzmlbDmmK9zdHJpbmfvvIjljIXlkKvlvLrliLbovazmjaLnu5PmnpzvvInvvIxcclxuXHQgICDliJnmiafooYzlrZfnrKbkuLLmi7zmjqXvvIzlkKbliJnmiafooYzmlbDlrZfliqDms5UgKi9cclxuXHRjb25zb2xlLmxvZyhbXSArIDEpOyAvLyBbXeiiq+W8uuWItuaJp+ihjC50b1N0cmluZ++8jOW+l+WIsOepuuWtl+espu+8jOe7k+aenOS4ulwiMVwiXHJcblx0Y29uc29sZS5sb2coXCI0XCIgKyAxKTsgLy8gNDFcclxufVxyXG5cclxue1xyXG5cdC8qIOW9k25ldyBBcnJheeeahOaXtuWAmeWPquS8oOWFpeS4gOS4quaVsO+8jFxyXG5cdCAgIOaJp+ihjOeahOaYr+WIm+W7uuS4gOS4quaVsOe7hO+8jOmVv+W6puS4ujEw77yM5LiU5YWo5Li656m65Y2V5YWD77yI6Z2edW5kZWZpbmVk77yJ5aGr5YWFICovXHJcblx0Lyog56m65Y2V5YWD5ZKMdW5kZWZpbmVk5piv5pyJ5Yy65Yir55qE77yM5rOo5oSPICovXHJcblx0bGV0IGEgPSBBcnJheSgxMCk7IC8vIG5ld+WPr+S7peecgeeVpe+8jGpz5Lya6Ieq5Yqo6KGl5YqgXHJcblx0Y29uc29sZS5sb2coYSwgYS5sZW5ndGgpO1xyXG5cclxuXHQvKiDmuIXnqbrkuIDkuKrmlbDnu4Tlj6/ku6Xkvb/nlKhhcnJheS5sZW5ndGggPSAwICovXHJcblx0bGV0IGIgPSBbMiwgNCwgNl07XHJcblx0Yi5sZW5ndGggPSAwO1xyXG5cdGNvbnNvbGUubG9nKGIpO1xyXG5cclxuXHQvKiDliJvlu7rkuIDkuKrlhajmmK91bmRlZmluZWTvvIjpnZ7nqbrljZXlhYPvvInloavlhYXnmoTmlbDnu4QgKi9cclxuXHQvKiBhcnJheS5sZW5ndGjov5nmoLflvLrooYzkv67mlLnkvJrnlKjnqbrljZXlhYPloavlhYXlpJrkvZnnmoTnqbrkvY0gKi9cclxuXHRsZXQgYyA9IEFycmF5LmFwcGx5KG51bGwsIHtcclxuXHRcdGxlbmd0aDogM1xyXG5cdH0pO1xyXG5cdGNvbnNvbGUubG9nKGMpOyAvLyBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cclxuXHJcblx0Lyog5rC46L+c5LiN6KaB5Yib5bu65ZKM5L2/55So56m65Y2V5YWD5pWw57uEICovXHJcbn1cclxuXHJcbntcclxuXHQvLyBTdHJpbmcucHJvdG90eXBl55qE5ZCE57G75pa55rOV77yM5LiN5L+u5pS55Y6f5a2X56ym5LiyXHJcblx0Ly8gU3RyaW5nIy5pbmRleE9mXHJcblx0Ly8gU3RyaW5nIy5jaGFyQXRcclxuXHQvLyBTdHJpbmcjLnN1YnN0ciBTdHJpbmcjLnN1YnN0cmluZyBTdHJpbmcjLnNsaWNlKClcclxuXHQvLyBTdHJpbmcjLnRvVXBwZXJDYXNlIFN0cmluZyMudG9Mb3dlckNhc2UoKVxyXG5cdC8vIFN0cmluZyMudHJpbVxyXG59XHJcblxyXG57XHJcblx0LyogU3ltYm9s5L2/55So5Y6f55Sf5p6E6YCg5Ye95pWw5p2l5a6a5LmJ77yM5LiN55So5YqgbmV3ICovXHJcblx0bGV0IG15b3duID0gU3ltYm9sKCdkZWxldGVTb21ldGhpbmcnKTtcclxuXHRsZXQgYSA9IHt9O1xyXG5cdGFbU3ltYm9sKCdkZWxldGVTb21ldGhpbmcnKV0gPSBmdW5jdGlvbigpIHtcclxuXHRcdC8qIGRvU29tZXRoaW5nICovXHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKGEpO1xyXG5cdGNvbnNvbGUubG9nKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoYSkpO1xyXG5cclxuXHQvKiDlhbfmnInllK/kuIDmgKfvvIzlvojlpJrlvIDlj5HllpzmrKLkvb/nlKjov5nkuKrnlKjkuo7np4HmnInlsZ7mgKfku6Pmm79fZnVuY3Rpb24gKi9cclxufVxyXG5cclxue1xyXG5cdC8qIEpTT04uc3RyaW5naWZ5KCnlnKjpgYfliLB1bmRlZmluZWTvvIxmdW5jdGlvbu+8jHN5bWJvbOi/meS4ieS4quS4jeWuieWFqOWAvOaXtu+8jFxyXG5cdCAgIOWcqOWvueixoeS8muWwhuWFtuiHquWKqOW/veeVpe+8jOWcqOaVsOe7hOS4rei/lOWbnm51bGzvvIzlnKjkuIDoiKzosIPnlKjkvJrov5Tlm551bmRlZmluZWQgKi9cclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh1bmRlZmluZWQpKTsgLy8gdW5kZWZpbmVkXHJcblx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZnVuY3Rpb24oKSB7fSkpOyAvLyB1bmRlZmluZWRcclxuXHQvLyBcIntcImFcIjogMn1cIlxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdGE6IDIsXHJcblx0XHRiOiBmdW5jdGlvbigpIHt9XHJcblx0fSkpO1xyXG5cdC8vIFwiW1wieXV1aGVpXCIsIG51bGwsIG51bGwsIDRdXCJcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShbJ3l1dWhlaScsIHVuZGVmaW5lZCwgZnVuY3Rpb24oKSB7fSwgNF0pKTtcclxufVxyXG5cclxue1xyXG5cdC8qIEpTT04uc3RyaW5naWZ55pyJ5LiA5Liq5b6I5a6e55So55qEcmVwbGFjZXLvvIzlj6/ku6Xlr7nmlbDmja7ov5vooYznrZvpgInlpITnkIYgKi9cclxuXHQvLyDlj6/ku6XmmK/mlbDnu4TmiJblh73mlbBcclxuXHRsZXQgb2JqID0ge1xyXG5cdFx0YTogMixcclxuXHRcdGI6IFwiMjJcIixcclxuXHRcdGM6IFsxLCAyLCAzXVxyXG5cdH1cclxuXHQvLyByZXBsYWNlcuS4uuaVsOe7hOaXtueahOS9nOeUqFxyXG5cdGxldCBqc29uMSA9IEpTT04uc3RyaW5naWZ5KG9iaiwgW1wiYVwiLCBcImJcIl0pOyAvLyDlj6rluo/liJfljJZrZXnlgLzkuLph5ZKMYueahFxyXG5cdGNvbnNvbGUubG9nKGpzb24xKTsgLy8gXCJ7XCJiXCI6XCIyMlwiLFwiY1wiOlsxLDIsM119XCJcclxuXHJcblx0Ly8gcmVwbGFjZXLkuLpmdW5jdGlvbuaXtueahOS9nOeUqFxyXG5cdGxldCBqc29uMiA9IEpTT04uc3RyaW5naWZ5KG9iaiwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKGtleSAhPT0gXCJhXCIpIHJldHVybiB2YWx1ZTtcclxuXHR9KTtcclxuXHRjb25zb2xlLmxvZyhqc29uMik7XHJcblxyXG5cdC8vIOesrOS4ieS4quWPguaVsHNwYWNl77yM6L+Y5Y+v5Lul6LCD57yp6L+b77yM6Ieq5Yqo6L+b6KGM5qC85byP5YyW77yM6L+Y5Y+v5Lul5piv5aGr5YWF5a2X56ym5LiyXHJcblx0bGV0IGpzb24zID0gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCA0KTtcclxuXHRjb25zb2xlLmxvZyhqc29uMyk7XHJcblx0Ly8ge1xyXG5cdC8vIFx0ICBcImFcIjogMixcclxuXHQvL1x0ICBcImJcIjogXCIyMlwiLFxyXG5cdC8vXHQgIFwiY1wiOiBbXHJcblx0Ly9cdCAgXHQgIDEsXHJcblx0Ly9cdFx0ICAyLFxyXG5cdC8vXHRcdCAgM1xyXG5cdC8vXHQgIF1cclxuXHQvLyB9XHJcbn1cclxuXHJcbntcclxuXHQvKiDku6XkuIvluIPlsJTlgYfmpI3lnKjlvLrliLbovazmjaLnmoTml7blgJnnu5Pmnpzpg73kuLpmYWxzZe+8jOW8uuWItui9rOaNouaYryEhICovXHJcblx0Ly8gdW5kZWZpbmVkLCBudWxsLCBmYXNsZSwgKzAsIC0wLCBOYU4sIFwiXCJcclxuXHRjb25zb2xlLmxvZyghIXVuZGVmaW5lZCB8fCAhIW51bGwgfHwgISFmYWxzZSB8fCAhITAgfHwgISFOYU4gfHwgISFcIlwiKTsgLy8gZmFsc2VcclxuXHQvLyBkb2N1bWVudC5hbGzlnKjmn5DkuptJReWSjOafkOS6m+a1j+iniOWZqOaYr+S4uuecn+WAvO+8jOWcqOafkOS6m+a1j+iniOWZqOS4i+S4uuWBh+WAvO+8jOaYr+S4gOS4quexu+aVsOe7hFxyXG5cclxuXHQvKiDlgYflgLzkuYvlpJbpg73mmK/nnJ/lgLzvvIzovazmjaLlkI7pg73kuLp0cnVlICovXHJcbn1cclxuXHJcbntcclxuXHQvKiDmmL7lvI/lvLrliLbnsbvlnovovazmjaIgKi9cclxuXHQvLyDlrZfnrKbkuLLlkozmlbDlrZfkuYvpl7TnmoTmmL7lvI/ovazmjaLvvIzkuI3opoHkvb/nlKhuZXfvvIzlubbkuI3mmK/liJvlu7rlr7nosaFcclxuXHRsZXQgYSA9IDIyO1xyXG5cdGxldCBiID0gXCIzLjE0XCI7XHJcblxyXG5cdGxldCBjID0gU3RyaW5nKGEpO1xyXG5cdGxldCBkID0gTnVtYmVyKGIpO1xyXG5cclxuXHRjb25zb2xlLmxvZyhjLCBkKTsgLy8gXCIyMlwiLCAzLjE0XHJcblxyXG5cdC8vIOWPpuS4gOenjeaWueazleeahOaYvuW8j+i9rOaNolxyXG5cdGxldCBlID0gYS50b1N0cmluZygpOyAvLyDosIPnlKjnmoTmmK9OdW1iZXIucHJvdG90eXBlLnRvU3RyaW5nXHJcblx0bGV0IGYgPSArYjtcclxuXHRjb25zb2xlLmxvZyhlLCBmKTsgLy8gXCIyMlwiLCAzLjE0XHJcbn1cclxuXHJcbntcclxuXHQvLyDml6XmnJ/mmL7npLrovazmjaLkuLrmlbDlrZfvvIjnm7jlvZPkuo4uZ2V0VGltZSgp5Yqf6IO977yJXHJcblx0bGV0IGEgPSBuZXcgRGF0ZSgpO1xyXG5cdGNvbnNvbGUubG9nKCthLCBhLmdldFRpbWUoKSk7XHJcblxyXG5cdC8vIOW9k+WunuS+i+WMluS4gOS4quaehOmAoOWHveaVsOeahOaXtuWAmeWmguaenOayoeacieWPguaVsOS8oOWFpe+8jOWPr+S7peS4jeWKoCgpXHJcblx0Y29uc29sZS5sb2coK25ldyBEYXRlKTtcclxuXHJcblx0Ly8gRVM155qERGF0ZeacieS4gOS4quiOt+WPluW9k+WJjeaXtumXtOaIs+eahEFQSe+8jOWFtnBvbHlmaWxs5bCx5pivK25ldyBEYXRlKClcclxuXHRjb25zb2xlLmxvZyhEYXRlLm5vdygpKTtcclxufVxyXG5cclxue1xyXG5cdC8qIHBhcnNlSW5055qE5L2/55SoICovXHJcblxyXG5cdC8vIHBhcnNlSW506ZKI5a+555qE5piv5a2X56ym5Liy77yM6KaB5rGC5omA5pyJ5a2X56ym6YO95piv5pWw5a2X77yM5ZCm5YiZ6L+U5ZueTmFOXHJcblx0Ly8gTnVtYmVyKCnlj6/ku6Xlv73nlaXkuI3mmK/mlbDlrZflrZfnrKbnmoTlrZfnrKbkuLLvvIzpgYfliLDpnZ7mlbDlrZflrZfnrKbliJnlgZzmraLovazmjaJcclxuXHRsZXQgYSA9ICcxMmFhNDUnO1xyXG5cdGxldCBiID0gJzQ1Nic7XHJcblxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEpLCBOdW1iZXIoYSkpOyAvLyBOYU4sIDQ2NVxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGIpLCBOdW1iZXIoYikpOyAvLyAxMiwgNDU2XHJcbn1cclxuXHJcbntcclxuXHQvKiBwYXJzZUludOeahOesrOS6jOS4quWPguaVsOi9rOWItumXrumimO+8jOWwhuW9k+WJjeaVsOWAvOWumuS5ieS4uuiHquWumuS5iei/m+WItu+8jOS4jeeUqOWKoOWJjee8gFxyXG5cdCAgIOeEtuWQjui9rOaNouS4uuaVsOWtlyAqL1xyXG5cclxuXHQvLyDlpoLmnpzpnIDopoHlnKhFUzXkuYvliY3nmoTnjq/looPov5DooYzlubbkuJTmsqHmnIlwb2x5ZmlsbO+8jOmcgOimgeaJi+WKqOWKoOS4iuesrOS6jOS4quWPguaVsDEwXHJcblx0Ly8g5by65Yi26L2s5o2i5Li65Y2B6L+b5Yi277yM5LiN54S25Lya6KKr6L2s5Li65YWr6L+b5Yi277yM6YG/5YWN5LiN5b+F6KaB55qE5Z2RXHJcblxyXG5cdGxldCBhID0gXCIxMDBcIjtcclxuXHRsZXQgYiA9IDI1NjtcclxuXHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMTYpKTsgLy8gMjU2XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgOCkpOyAvLyA2NFxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEsIDIpKTsgLy8gNFxyXG5cdGNvbnNvbGUubG9nKHBhcnNlSW50KGEsIDEwKSk7IC8vIDEwMFxyXG5cclxuXHQvKiB0b1N0cmluZygp5Lyg5YWl5Y+C5pWw77yM5Y+v5Lul5bCG5b2T5YmN5pWw5YC86L2s5o2i5Li65oyH5a6a6L+b5Yi2ICovXHJcblx0Y29uc29sZS5sb2coYi50b1N0cmluZygxNikpOyAvLyAxMDBcclxufVxyXG5cclxue1xyXG5cdC8qIOiHquWumuS5iei9rOaNoiAqL1xyXG5cclxuXHQvLyDljYHov5vliLbmlbDlgLzovazkuLroh6rlrprkuYnov5vliLbvvJpcclxuXHRsZXQgZGVjaW1hbFRvT3RoZXIgPSBmdW5jdGlvbihudW0sIHRyYW5zZm9ybSkge1xyXG5cdFx0Lyog6L+U5Zue55qE5piv5a2X56ym5Liy77yM55So5LqO5bGV56S6ICovXHJcblx0XHR2YXIgbnVtID0gK251bTtcclxuXHRcdHZhciB0cmFuc2Zvcm0gPSArdHJhbnNmb3JtO1xyXG5cdFx0aWYgKHRyYW5zZm9ybSA9PT0gMTYpIHtcclxuXHRcdFx0cmV0dXJuICcweCcgKyBudW0udG9TdHJpbmcoMTYpO1xyXG5cdFx0fSBlbHNlIGlmICh0cmFuc2Zvcm0gPT09IDgpIHtcclxuXHRcdFx0cmV0dXJuICcwbycgKyBudW0udG9TdHJpbmcoOCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVtLnRvU3RyaW5nKHRyYW5zZm9ybSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhkZWNpbWFsVG9PdGhlcigxMDAsIDgpKTsgLy8gXCIwbzE0NFwiXHJcblxyXG5cdC8vIOWFtuS7lui9rOWItui9rOaNouS4uuWNgei/m+WItu+8iOS8oOWFpeagh+WHhuagvOW8jzBY5oiWMG/nrYnlrZfnrKbkuLLmoLzlvI/vvInvvJpcclxuXHRsZXQgb3RoZXJUb0RlY2ltYWwgPSBmdW5jdGlvbihudW0pIHtcclxuXHRcdC8qIOi/lOWbnuaVsOWtlyAqL1xyXG5cdFx0dmFyIG51bSA9IG51bS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKG51bS5pbmRleE9mKCcweCcpID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludChudW0ucmVwbGFjZSgvMHgvLCAnJyksIDE2KTtcclxuXHRcdH0gZWxzZSBpZiAobnVtLmluZGV4T2YoJzBvJykgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KG51bS5yZXBsYWNlKC8wby8sICcnKSwgOCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQobnVtLCAxMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zb2xlLmxvZyhvdGhlclRvRGVjaW1hbCgnMHgxMDAnKSk7IC8vIDI1NlxyXG59XHJcblxyXG57XHJcblx0LyogYm9vbGVhbuaYvuekuui9rOaNou+8jOW7uuiuruS9v+eUqCEh55So5p2l6L2s5o2iICovXHJcblx0bGV0IGEgPSBcImFzZFwiO1xyXG5cdGxldCBiID0gW107XHJcblx0bGV0IGMgPSB7fTtcclxuXHJcblx0Ly8g5rOo5oSP56m65pWw57uE5ZKM56m65a+56LGh6YO95piv6L+U5ZuedHJ1ZeOAguaYr+ecn+WAvO+8jOaJgOacieeahOWBh+WAvOS4iumdouacieaPkOWIsFxyXG5cdGNvbnNvbGUubG9nKEJvb2xlYW4oYSkpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFiKTsgLy8gdHJ1ZVxyXG5cdGNvbnNvbGUubG9nKCEhYyk7IC8vdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0bGV0IGFyciA9IFtcclxuXHRcdDIsXHJcblx0XHRmdW5jdGlvbigpIHt9LFxyXG5cdFx0NCxcclxuXHRcdGZ1bmN0aW9uKCkge31cclxuXHRdO1xyXG5cclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuXHJcblx0bGV0IGpzb24gPSBKU09OLnN0cmluZ2lmeShhcnIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Y29uc29sZS5sb2coanNvbik7IC8vIFsyLHRydWUsNCx0cnVlXVxyXG59XHJcblxyXG57XHJcblx0LyogfHwg5oiWICYmIOi/lOWbnueahOS4jeS4gOWumuaYr+W4g+WwlOWAvCAqL1xyXG5cclxuXHQvLyDlr7nkuo58fO+8jOWmguaenOW9k+WJjeWAvOWIpOaWreS4unRydWXvvIzlsLHkvJrov5Tlm57lvZPliY3lgLxcclxuXHRjb25zb2xlLmxvZyhmYWxzZSB8fCBcInNzXCIgfHwgMTEwKTsgLy8gXCJzc1wiXHJcblxyXG5cdC8vIOWvueS6jiYm77yM5Y+q6KaB5pyJ5LiA5Liq5YC85Yik5pat5Li6ZmFsc2XvvIzlsLHov5Tlm57liKTmlq3kuLpmYWxzZeeahOmCo+S4quWAvO+8jFxyXG5cdC8vIOWQpuWImei/lOWbnuacgOWQjuS4gOS4quWAvFxyXG5cdGNvbnNvbGUubG9nKFwiNTVcIiAmJiB1bmRlZmluZWQgJiYgMTEwKTsgLy8gdW5kZWZpbmVkXHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIG51bGwgJiYgMTEwKTsgLy8gbnVsbFxyXG5cdGNvbnNvbGUubG9nKFwiNTVcIiAmJiBmdW5jdGlvbigpIHt9ICYmIDExMCk7IC8vIDExMFxyXG5cclxuXHQvLyDmiYDku6V8fOS8muacieS4gOS4quW4uOeUqOS9nOeUqO+8muS8oOWPguWIpOaWrVxyXG5cdGxldCBmdW5jID0gZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0YSA9IGEgfHwgJ0hlbGxvJztcclxuXHRcdGIgPSBiIHx8ICdXb3JsZCc7XHJcblx0XHRyZXR1cm4gYSArIFwiIFwiICsgYjtcclxuXHR9XHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknKSk7IC8vIEhpIFdvcmxkXHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknLCBcIlwiKSk7IC8vIOazqOaEj+i/memHjOS8oOWFpeS6huWBh+WAvO+8jOe7k+aenOS+neeEtuaYr0hpIFdvcmxkXHJcblx0Y29uc29sZS5sb2coZnVuYygnSGknLCBcIiBcIikudHJpbSgpKTsgLy8g5Lyg5YWl56m65a2X56ym5YiZ5Yik5pat5Li6dHJ1Ze+8jOi/lOWbnkhpXHJcblxyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBcIlwiKSAvLyBzdHJpbmfvvIzlpoLmnInpnIDmsYLlj6/ku6XpgJrov4fov5nkuKrov5vooYzlrrnplJlcclxuXHJcblx0Ly8g5omA5LulJibkvJrmnInkuIDkuKrluLjnlKjkvZznlKjvvJrliKTmlq3lj4LmlbDmmK/lkKbkuLp0cnVl77yM5piv5YiZ5omn6KGM5LiA5Liq5Ye95pWwXHJcblx0dHJ1ZSAmJiAoZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zb2xlLmxvZygndGhpcyBpcyAmJiBmdW5jdGlvbiEnKTtcclxuXHR9KSgpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5rOo5oSPRVM255qEU3ltYm9s5Y+q6IO95aSf6YCa6L+H5pi+5byP6L2s5o2i5Li65a2X56ym5Liy77yM5L2/55So6ZqQ5byP5bCG5Lya5oql6ZSZICovXHJcblx0bGV0IHN5bWJvbCA9IFN5bWJvbCgnc3ltYm9sRWxlbWVudCcpO1xyXG5cdGNvbnNvbGUubG9nKFN0cmluZyhzeW1ib2wpKTsgLy8gXCJTeW1ib2woc3ltYm9sRWxlbWVudClcIlxyXG5cclxuXHQvLyBzeW1ib2wgKyBcIlwiIOi/meagt+makOW8j+i9rOaNouS8muaKpemUmVxyXG5cclxuXHQvLyBTeW1ib2zml6Dms5XovazmjaLkuLrmlbDlrZfvvIzmmL7npLrlkozpmpDlvI/pg73kvJrlh7rplJlcclxuXHJcblx0Ly8gU3ltYm9s5Y+v5Lul6L2s5o2i5Li6Ym9vbGVhbu+8jOmakOW8j+aYvuW8j+mDvei9rOaNouS4unRydWVcclxuXHRjb25zb2xlLmxvZyhCb29sZWFuKHN5bWJvbCkpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFzeW1ib2wpOyAvLyB0cnVlXHJcbn1cclxuXHJcbntcclxuXHQvKiDlhbPkuo49PeWSjD09PeeahOS9v+eUqOWHhuWImSAqL1xyXG5cclxuXHQvLyDlvZPkuKTovrnmnInlgLzkuLp0cnVl5ZKMZmFsc2XnmoTml7blgJnvvIzliY3lvoDkuI3opoHkvb/nlKg9PVxyXG5cdC8vIOW9k+S4pOi+ueacieWAvOS4ultd77yMXCJcIu+8jDDml7bvvIzlsL3ph4/kuI3opoHkvb/nlKg9PVxyXG5cdC8vIOS9v+eUqD09PeaYr+acgOWuieWFqOeahOmAieaLqVxyXG59XHJcblxyXG57XHJcblx0LyogKyvooajovr7lvI8gKi9cclxuXHRsZXQgYSA9IDQzO1xyXG5cdGxldCBiID0gKGErKywgYSk7XHJcblx0Y29uc29sZS5sb2coYik7IC8vIOato+ehruWwhjQ06LWL5YC857uZYlxyXG59XHJcblxyXG57XHJcblx0LyogRVM255qE5Y+C5pWw6aKE55WZ5YC85Y+v5Lul55CG6Kej5Li65L2/55So5LqGbGV077yM5a2Y5Zyo5pqC5pe25oCn5q275Yy6VERaICovXHJcblx0Ly8g5LiL6Z2i5aOw5piO6LWL5YC8YueahOaXtuWAme+8jOWQjOaXtui/m+ihjOS6huiuv+mXru+8jOi/meagt+WcqEVTNuacieS6m+aDheWGteS8muaKpemUmVxyXG5cdGxldCB0ZXN0VERaID0gZnVuY3Rpb24oYSA9IDMsIGIgPSBhICsgYiArIDMpIHtcclxuXHRcdGNvbnNvbGUubG9nKGEsIGIpOyAvLyDkuI3miqXplJnlsLHovpPlh7pOYU5cclxuXHR9XHJcblx0Ly8gdGVzdFREWigpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5a6/5Li75Y+Y6YePICovXHJcblx0bGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNvbnNvbGUubG9nKHR5cGVvZiBkaXYpOyAvLyBvYmplY3RcclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGl2KSk7IC8vIFtvYmplY3QgSFRNTERpdkVsZW1lbnRdXHJcblx0Y29uc29sZS5sb2coZGl2LnRhZ05hbWUpOyAvLyBESVZcclxufVxyXG5cclxue1xyXG5cdC8qIOeUseS6jua1j+iniOWZqOWOhuWPsumBl+eVmemXrumimO+8jOWcqOWIm+W7uuW4puaciWlkIOWxnuaAp+eahERPTSDlhYPntKDml7bkuZ/kvJrliJvlu7rlkIzlkI3nmoTlhajlsYDlj5jph48gKi9cclxuXHQvLyA8ZGl2IGlkPVwiYXBwXCI+PC9kaXY+XHJcblx0Y29uc29sZS5sb2coYXBwKTsgLy8g5LiA5Liq5YWD57Sg55qEaWTkuLphcHDlhpnlnKhodG1s77yMd2luZG935YWo5bGA5a+56LGh5bCx5bim5pyJ6L+Z5Liq5bGe5oCnXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UyLTEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpO1xudmFyICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7IHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnkgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5OdW1iZXIuaXNOYU47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcbiAqIEBBdXRob3I6IFNlbGxlbml0ZVxyXG4gKiBARGF0ZTogICAyMDE4LTAxLTIyIDE3OjAyOjE3XHJcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIFNlbGxlbml0ZVxyXG4gKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE4LTAxLTIyIDE3OjAyOjE3XHJcbiAqL1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdGFnZTItMi5qcyJdLCJzb3VyY2VSb290IjoiIn0=
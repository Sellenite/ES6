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
 * @Last Modified time: 2018-01-17 11:19:27
 */
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(85);
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
 * @Last Modified time: 2018-01-22 09:57:41
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTE2OTIxMTEyZjQ3ZDVmZjdlNzYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RhZ2UxLTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMS0yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0xLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJHTE9CQUwiLCJ0ZXN0RXZhbCIsInN0ciIsImIiLCJldmFsIiwiYSIsInNldFRpbWVvdXQiLCJ0aW1lb3V0SGFuZGxlciIsIklJRkUiLCJmbiIsImRlZiIsImdsb2JhbCIsImZvbyIsImJhciIsImVycm9yIiwiYmF6IiwiaSIsImoiLCJjb29sTW9kdWxlIiwic29tZXRoaW5nIiwiYW5vdGhlciIsImRvU29tZXRoaW5nIiwiZG9Bbm90aGVyIiwiam9pbiIsImNvb2wiLCJNeU1vZHVsZXMiLCJNYW5hZ2VyIiwibW9kdWxlcyIsImRlZmluZSIsIm5hbWUiLCJkZXBzIiwiaW1wbCIsImxlbmd0aCIsImFwcGx5IiwiZ2V0IiwiX3RoaXMiLCJoZWxsbyIsImhpIiwiRm9vIiwiQmFyIiwidW5kZWZpbmVkIiwiY2F0Y2hWYWx1ZSIsInJlYWRvbmx5Iiwib2JqIiwiY291bnQiLCJiaW5kIiwib2JqZWN0IiwiY2FsbCIsImFiYyIsIkRNWiIsIm9iajEiLCJvYmoyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsInJldCIsImV2ZXJ5IiwicHVzaCIsInNvbWUiLCJpdCIsIm5leHQiLCJhZ2UiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIm8iLCJrZXlzIiwiZG9uZSIsImsiLCJjIiwiaWR4Iiwia3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibXlOYW1lIiwiX19wcm90b19fIiwiaGFzT3duUHJvcGVydHkiLCJiYXIxIiwiYmFyMiIsImluaXQiLCJpZGVudGlmeSIsInNwZWFrIiwiYjEiLCJiMiIsIkZvbzEiLCJGb28yIiwiYmFyb29vbyIsImlzUHJvdG90eXBlT2YiLCJPcmJtZW50IiwibWVzc2FnZSIsIndpZHRoIiwiaGVpZ2h0IiwiRU5JR01BIiwiQVJDVVMiLCJFTklHTUFfSSIsIkVOSUdNQV9JX1NJWkVfTUVTU0FHRSIsInNldFNpemUiLCJnZXRNZXNzYWdlIiwiQVJDVVNfSSIsIkFSQ1VTX0lfU0laRV9NRVNTQUdFIiwiUmFuZG9tIiwibnVtIiwiTWF0aCIsInJhbmRvbSIsInIxIiwicmFuZCIsInIyIiwiaGVscGVyIiwiaGVscGVyMiIsIkFycmF5Iiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcnJDb3B5IiwiYXJyMiIsImFyckNvcHkyIiwic3RyaW5nIiwiY2hhckF0IiwidG9GaXhlZCIsInRvUHJlY2lzaW9uIiwiTmFOIiwiaXNOYU4iLCJJc05hTiIsIm4iLCJKU09OIiwicGFyc2UiLCJpc01pblplcm8iLCJOdW1iZXIiLCJJbmZpbml0eSIsIlN0cmluZyIsInRvU3RyaW5nIiwidmFsdWVPZiIsIkJvb2xlYW4iLCJpbmRleE9mIiwibXlvd24iLCJqc29uMSIsImpzb24yIiwia2V5IiwianNvbjMiLCJkIiwiZSIsImYiLCJEYXRlIiwiZ2V0VGltZSIsIm5vdyIsInBhcnNlSW50IiwiZGVjaW1hbFRvT3RoZXIiLCJ0cmFuc2Zvcm0iLCJvdGhlclRvRGVjaW1hbCIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImpzb24iLCJmdW5jIiwidHJpbSIsInN5bWJvbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLDZCQUE2QjtBQUM3Qix1Q0FBdUM7Ozs7Ozs7QUNEdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDOzs7Ozs7O0FDTHpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCOzs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxtQkFBbUIsVUFBVSxFQUFFLEVBQUU7QUFDMUUsQ0FBQzs7Ozs7OztBQ0hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDTkEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7Ozs7Ozs7QUNmQSxjQUFjOzs7Ozs7O0FDQWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EscURBQXFELE9BQU8sRUFBRTtBQUM5RDs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSx1Q0FBdUM7QUFDdkM7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNIQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsY0FBYztBQUNkO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsVUFBVTtBQUNWLENBQUM7Ozs7Ozs7QUNoQkQ7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvRUFBb0UsaUNBQWlDO0FBQ3JHOzs7Ozs7O0FDTkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsc0JBQXNCO0FBQ2hGLGtGQUFrRix3QkFBd0I7QUFDMUc7Ozs7Ozs7QUNSQTtBQUNBLHFFQUFzRSxtQkFBbUIsVUFBVSxFQUFFLEVBQUU7QUFDdkcsQ0FBQzs7Ozs7OztBQ0ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEOzs7Ozs7O0FDTEEsa0JBQWtCLHdEOzs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixhQUFhOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG9DQUFvQztBQUM3RSw2Q0FBNkMsb0NBQW9DO0FBQ2pGLEtBQUssNEJBQTRCLG9DQUFvQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0Esa0NBQWtDLDJCQUEyQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7QUNyRUE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSx5QkFBeUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixzQkFBc0IsdUJBQXVCLFdBQVcsSUFBSTtBQUM1RCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixtQ0FBbUM7QUFDekQsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGdDQUFnQztBQUNoRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELGtCQUFrQjs7QUFFNUU7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1Qjs7QUFFM0Msb0RBQW9ELDZCQUE2Qjs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBCQUEwQixlQUFlLEVBQUU7QUFDM0MsMEJBQTBCLGdCQUFnQjtBQUMxQyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsT0FBTyxRQUFRLGlDQUFpQztBQUNwRyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDek9BOzs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOzs7Ozs7QUFNQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0EsbUJBQUFBLENBQVEsRUFBUjtBQUNBLG1CQUFBQSxDQUFRLEVBQVI7QUFDQUMsUUFBUUMsR0FBUixDQUFZLG9DQUFaO0FBQ0FELFFBQVFDLEdBQVIsQ0FBWSxtQ0FBWixFOzs7Ozs7QUNWQUMsT0FBT0MsTUFBUCxHQUFnQixhQUFoQjs7QUFFQTtBQUNJO0FBQ0E7QUFDQSxRQUFJQyxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsR0FBVCxFQUFjQyxDQUFkLEVBQWlCO0FBQzVCO0FBQ0FDLGFBQUtGLEdBQUwsRUFGNEIsQ0FFakI7QUFDWEwsZ0JBQVFDLEdBQVIsQ0FBWU8sQ0FBWixFQUFlRixDQUFmO0FBQ0gsS0FKRDs7QUFNQUYsYUFBUyxZQUFULEVBQXVCLENBQXZCLEVBVEosQ0FTK0I7QUFDOUI7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkg7O0FBRUQ7QUFDSTtBQUNBSyxlQUFXLFNBQVNDLGNBQVQsR0FBMEI7QUFDakNWLGdCQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDSCxLQUZELEVBRUcsR0FGSDtBQUdIOztBQUVEO0FBQ0ksUUFBSU8sS0FBSSxHQUFSO0FBQ0E7QUFDQSxLQUFDLFlBQVc7QUFDUixZQUFJQSxJQUFJLENBQVI7QUFDQVIsZ0JBQVFDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCTyxDQUExQjtBQUNILEtBSEQ7O0FBS0E7QUFDQSxLQUFDLFNBQVNHLElBQVQsQ0FBY0gsQ0FBZCxFQUFpQjtBQUNkUixnQkFBUUMsR0FBUixDQUFZLGFBQVosRUFBMkJPLENBQTNCO0FBQ0gsS0FGRCxFQUVHQSxFQUZIOztBQUlBO0FBQ0EsUUFBSUcsT0FBTyxVQUFTSCxDQUFULEVBQVk7QUFDbkJSLGdCQUFRQyxHQUFSLENBQVksY0FBWixFQUE0Qk8sQ0FBNUI7QUFDSCxLQUZVLENBRVRBLEVBRlMsQ0FBWDs7QUFJQTtBQUNBLEtBQUMsVUFBU0ksRUFBVCxFQUFhO0FBQ1ZBLFdBQUdWLE1BQUg7QUFDSCxLQUZELEVBRUcsU0FBU1csR0FBVCxDQUFhQyxNQUFiLEVBQXFCO0FBQ3BCLFlBQUlOLElBQUksQ0FBUjtBQUNBUixnQkFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUJPLENBQXpCO0FBQ0FSLGdCQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQmEsT0FBT1gsTUFBakM7QUFDSCxLQU5EO0FBT0g7O0FBRUQ7QUFBQSxRQWlCYVksR0FqQmIsR0FpQkksU0FBU0EsR0FBVCxHQUFlO0FBQ1hmLGdCQUFRQyxHQUFSLENBQVksS0FBWjtBQUNILEtBbkJMOztBQXFCSTs7O0FBcEJBO0FBQ0EsS0FBQyxZQUFXO0FBQ1JELGdCQUFRQyxHQUFSLENBQVlPLENBQVosRUFEUSxDQUNRO0FBQ2hCLFlBQUlBLElBQUksQ0FBUjtBQUNILEtBSEQ7O0FBS0E7QUFDQSxLQUFDLFlBQVc7QUFDUixZQUFJQSxDQUFKO0FBQ0FSLGdCQUFRQyxHQUFSLENBQVlPLENBQVo7QUFDQSxZQUFJQSxJQUFJLENBQVI7QUFDSCxLQUpEOztBQU1BO0FBQ0FPOztBQU9BLFFBQUk7QUFDQUM7QUFDQSxZQUFJQSxNQUFNLFNBQU5BLEdBQU0sR0FBVztBQUNqQmhCLG9CQUFRQyxHQUFSLENBQVksS0FBWjtBQUNILFNBRkQ7QUFHSCxLQUxELENBS0UsT0FBT2dCLEtBQVAsRUFBYztBQUNaakIsZ0JBQVFDLEdBQVIsQ0FBWWdCLEtBQVo7QUFDSDtBQUNKOztBQUVEO0FBQ0ksS0FBQyxZQUFXO0FBQ1I7QUFDQSxpQkFBU0YsR0FBVCxHQUFlO0FBQ1gsZ0JBQUlQLElBQUksQ0FBUjtBQUNBLG1CQUFPLFlBQVc7QUFDZFIsd0JBQVFDLEdBQVIsQ0FBWU8sQ0FBWjtBQUNILGFBRkQ7QUFHSDs7QUFFRCxZQUFJVSxNQUFNSCxLQUFWO0FBQ0FHOztBQUVBO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCLGFBQUMsVUFBU0MsQ0FBVCxFQUFZO0FBQ1RYLDJCQUFXLFNBQVNDLGNBQVQsR0FBMEI7QUFDakNWLDRCQUFRQyxHQUFSLENBQVltQixDQUFaO0FBQ0gsaUJBRkQsRUFFR0EsSUFBSSxHQUZQO0FBR0gsYUFKRCxFQUlHRCxDQUpIO0FBS0g7O0FBRUQ7QUFDQSxpQkFBU0UsVUFBVCxHQUFzQjtBQUNsQixnQkFBSUMsWUFBWSxNQUFoQjtBQUNBLGdCQUFJQyxVQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQWQ7O0FBRUEscUJBQVNDLFdBQVQsR0FBdUI7QUFDbkJ4Qix3QkFBUUMsR0FBUixDQUFZcUIsU0FBWjtBQUNIOztBQUVELGdCQUFJSixNQUFNSCxLQUFWO0FBQ0FHOztBQUVBO0FBQ0EsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLENBQXBCLEVBQXVCQSxHQUF2QixFQUE0QjtBQUN4QixpQkFBQyxVQUFTQyxDQUFULEVBQVk7QUFDVFgsK0JBQVcsU0FBU0MsY0FBVCxHQUEwQjtBQUNqQ1YsZ0NBQVFDLEdBQVIsQ0FBWW1CLENBQVo7QUFDSCxxQkFGRCxFQUVHQSxJQUFJLEdBRlA7QUFHSCxpQkFKRCxFQUlHRCxDQUpIO0FBS0g7O0FBRUQ7QUFDQSxxQkFBU0UsVUFBVCxHQUFzQjtBQUNsQixvQkFBSUMsWUFBWSxNQUFoQjtBQUNBLG9CQUFJQyxVQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQWQ7O0FBRUEseUJBQVNDLFdBQVQsR0FBdUI7QUFDbkJ4Qiw0QkFBUUMsR0FBUixDQUFZcUIsU0FBWjtBQUNIOztBQUVELHlCQUFTRyxTQUFULEdBQXFCO0FBQ2pCekIsNEJBQVFDLEdBQVIsQ0FBWXNCLFFBQVFHLElBQVIsQ0FBYSxHQUFiLENBQVo7QUFDSDs7QUFFRCx1QkFBTztBQUNIRixpQ0FBYUEsV0FEVjtBQUVIQywrQkFBV0E7QUFGUixpQkFBUDtBQUlIOztBQUVELGdCQUFJRSxPQUFPTixZQUFYO0FBQ0FNLGlCQUFLRixTQUFMO0FBQ0FFLGlCQUFLSCxXQUFMOztBQUVBO0FBQ0EsZ0JBQUlJLFlBQWEsU0FBU0MsT0FBVCxHQUFtQjtBQUNoQyxvQkFBSUMsVUFBVSxFQUFkOztBQUVBLHlCQUFTQyxNQUFULENBQWdCQyxJQUFoQixFQUFzQkMsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQzlCLHlCQUFLLElBQUlmLElBQUksQ0FBYixFQUFnQkEsSUFBSWMsS0FBS0UsTUFBekIsRUFBaUNoQixHQUFqQyxFQUFzQztBQUNsQ2MsNkJBQUtkLENBQUwsSUFBVVcsUUFBUUcsS0FBS2QsQ0FBTCxDQUFSLENBQVY7QUFDSDtBQUNEO0FBQ0FXLDRCQUFRRSxJQUFSLElBQWdCRSxLQUFLRSxLQUFMLENBQVdGLElBQVgsRUFBaUJELElBQWpCLENBQWhCO0FBQ0g7O0FBRUQseUJBQVNJLEdBQVQsQ0FBYUwsSUFBYixFQUFtQjtBQUNmLDJCQUFPRixRQUFRRSxJQUFSLENBQVA7QUFDSDs7QUFFRCx1QkFBTztBQUNIRCw0QkFBUUEsTUFETDtBQUVITSx5QkFBS0E7QUFGRixpQkFBUDtBQUlILGFBbkJlLEVBQWhCOztBQXFCQVQsc0JBQVVHLE1BQVYsQ0FBaUIsS0FBakIsRUFBd0IsRUFBeEIsRUFBNEIsWUFBVztBQUNuQyxvQkFBSU8sUUFBUSxJQUFaOztBQUVBLHlCQUFTQyxLQUFULEdBQWlCO0FBQ2J2Qyw0QkFBUUMsR0FBUixDQUFZcUMsS0FBWjtBQUNIOztBQUVELHVCQUFPO0FBQ0hDLDJCQUFPQTtBQURKLGlCQUFQO0FBR0gsYUFWRDs7QUFZQVgsc0JBQVVHLE1BQVYsQ0FBaUIsS0FBakIsRUFBd0IsQ0FBQyxLQUFELENBQXhCLEVBQWlDLFVBQVNoQixHQUFULEVBQWM7QUFDM0MseUJBQVN5QixFQUFULEdBQWM7QUFDVnhDLDRCQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBYyx3QkFBSXdCLEtBQUo7QUFDSDs7QUFFRCx1QkFBTztBQUNIQyx3QkFBSUE7QUFERCxpQkFBUDtBQUdILGFBVEQ7O0FBV0EsZ0JBQUlDLE1BQU1iLFVBQVVTLEdBQVYsQ0FBYyxLQUFkLENBQVY7QUFDQSxnQkFBSUssTUFBTWQsVUFBVVMsR0FBVixDQUFjLEtBQWQsQ0FBVjtBQUNBSyxnQkFBSUYsRUFBSjtBQUVIOztBQUVEO0FBQ0k7QUFDQSxnQkFBSTtBQUNBLHNCQUFNRyxTQUFOO0FBQ0gsYUFGRCxDQUVFLE9BQU9DLFVBQVAsRUFBbUI7QUFDakI7QUFDQUEsNkJBQWEsQ0FBYjtBQUNBNUMsd0JBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQjJDLFVBQS9CO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJLG9CQUFJcEMsTUFBSSxDQUFSO0FBQ0Esb0JBQU1xQyxXQUFXLFFBQWpCO0FBQ0E3Qyx3QkFBUUMsR0FBUixDQUFZTyxHQUFaLEVBQWVxQyxRQUFmO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSUMsTUFBTTtBQUNOQyx1QkFBTyxDQUREO0FBRU5wQixzQkFBTSxnQkFBVztBQUNiLHdCQUFJLEtBQUtvQixLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEJ0QyxtQ0FBVyxZQUFXO0FBQ2xCLGlDQUFLc0MsS0FBTDtBQUNBL0Msb0NBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixLQUFLOEMsS0FBbkM7QUFDSCx5QkFIVSxDQUdUQyxJQUhTLENBR0osSUFISSxDQUFYLEVBR2MsS0FBS0QsS0FBTCxHQUFhLEdBSDNCO0FBSUg7QUFDSjtBQVRLLGFBQVY7QUFXQUQsZ0JBQUluQixJQUFKOztBQUVBO0FBQ0EsZ0JBQUlzQixTQUFTO0FBQ1RGLHVCQUFPLENBREU7QUFFVHBCLHNCQUFNLGdCQUFXO0FBQUE7O0FBQ2Isd0JBQUksS0FBS29CLEtBQUwsR0FBYSxDQUFqQixFQUFvQjtBQUNoQnRDLG1DQUFXLFlBQU07QUFDYixtQ0FBS3NDLEtBQUw7QUFDQS9DLG9DQUFRQyxHQUFSLENBQVksc0JBQVosRUFBb0MsT0FBSzhDLEtBQXpDO0FBQ0gseUJBSEQsRUFHRyxLQUFLQSxLQUFMLEdBQWEsR0FIaEI7QUFJSDtBQUNKO0FBVFEsYUFBYjtBQVdBRSxtQkFBT3RCLElBQVA7QUFDSDtBQUNKLEtBaktEO0FBa0tILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNRRDs7Ozs7OztBQU9BO0FBQ0ksS0FBQyxZQUFXO0FBQ1IsWUFBSW5CLElBQUksS0FBUjtBQUNBO0FBQ0FDLG1CQUFXLFlBQVc7QUFDbEI7QUFDSCxTQUZELEVBRUcsR0FGSDs7QUFJQTtBQUNBLFNBQUMsWUFBVztBQUNSO0FBQ0E7O0FBRUEscUJBQVNNLEdBQVQsR0FBZTtBQUNYZix3QkFBUUMsR0FBUixDQUFZLElBQVosRUFEVyxDQUNRO0FBQ3RCO0FBQ0RjO0FBQ0gsU0FSRDs7QUFVQTtBQUNBLGlCQUFTQSxHQUFULEdBQWU7QUFDWGYsb0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0gsVUFBQyxZQUFXO0FBQ1Q7O0FBQ0FjLGtCQUZTLENBRUY7QUFDVixTQUhBOztBQUtEO0FBQ0EsU0FBQyxZQUFXO0FBQ1IscUJBQVNBLEdBQVQsR0FBZTtBQUNYZix3QkFBUUMsR0FBUixDQUFZLEtBQUtPLENBQWpCO0FBQ0g7O0FBRUQsZ0JBQUlzQyxNQUFNO0FBQ050QyxtQkFBRyxHQURHO0FBRU5PLHFCQUFLQTtBQUZDLGFBQVY7O0FBS0ErQixnQkFBSS9CLEdBQUosR0FWUSxDQVVFO0FBQ2IsU0FYRDs7QUFhQTtBQUNBLFNBQUMsWUFBVztBQUNSLHFCQUFTQSxHQUFULEdBQWU7QUFDWGYsd0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0g7QUFDRGMsZ0JBQUltQyxJQUFKLENBQVMsSUFBVCxFQUpRLENBSVE7QUFDaEJuQyxnQkFBSW1DLElBQUosQ0FBUyxLQUFULEVBTFEsQ0FLUztBQUNqQm5DLGdCQUFJbUMsSUFBSixDQUFTLEdBQVQsRUFOUSxDQU1PO0FBQ2xCLFNBUEQ7O0FBU0E7QUFDSSxnQkFBSW5DLE9BQU0sU0FBTkEsSUFBTSxHQUFXO0FBQ2pCZix3QkFBUUMsR0FBUixDQUFZLElBQVo7QUFDSCxhQUZEOztBQUlBLGdCQUFJa0QsTUFBTXBDLEtBQUlpQyxJQUFKLENBQVMsSUFBVCxDQUFWO0FBQ0E7QUFDQUc7QUFDSDs7QUFFRDtBQUNBLFNBQUMsWUFBVztBQUNSLHFCQUFTcEMsR0FBVCxDQUFhUCxDQUFiLEVBQWdCRixDQUFoQixFQUFtQjtBQUNmTix3QkFBUUMsR0FBUixDQUFZLElBQVosRUFEZSxDQUNJO0FBQ25CRCx3QkFBUUMsR0FBUixDQUFZLFFBQVFPLENBQVIsR0FBWSxPQUFaLEdBQXNCRixDQUFsQztBQUNIO0FBQ0Q7QUFDQSxnQkFBSThDLE1BQU0sNEVBQWMsSUFBZCxDQUFWO0FBQ0EsZ0JBQUlwQyxNQUFNRCxJQUFJaUMsSUFBSixDQUFTSSxHQUFULEVBQWMsQ0FBZCxDQUFWO0FBQ0FwQyxnQkFBSSxDQUFKO0FBQ0gsU0FURDs7QUFXQTtBQUNBLFNBQUMsWUFBVztBQUNSLHFCQUFTRCxHQUFULEdBQWU7QUFBQTs7QUFDWDtBQUNBLHVCQUFPLFVBQUNQLENBQUQsRUFBTztBQUNWO0FBQ0FSLDRCQUFRQyxHQUFSLENBQVksTUFBS08sQ0FBakI7QUFDSCxpQkFIRDtBQUlIOztBQUVELGdCQUFJNkMsT0FBTztBQUNQN0MsbUJBQUc7QUFESSxhQUFYOztBQUlBLGdCQUFJOEMsT0FBTztBQUNQOUMsbUJBQUc7QUFESSxhQUFYOztBQUlBLGdCQUFJUSxNQUFNRCxJQUFJbUMsSUFBSixDQUFTRyxJQUFULENBQVY7QUFDQXJDLGdCQUFJa0MsSUFBSixDQUFTSSxJQUFULEVBbEJRLENBa0JRO0FBQ25CLFNBbkJEOztBQXFCQTtBQUNBLFNBQUMsWUFBVztBQUNSLGFBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQ0NDLE9BREQsQ0FDUyxVQUFTQyxJQUFULEVBQWVDLEtBQWYsRUFBc0I7QUFDM0J6RCx3QkFBUUMsR0FBUixDQUFZdUQsSUFBWixFQUFrQixLQUFLeEIsSUFBdkI7QUFDSCxhQUhELEVBR0c7QUFDQ0Esc0JBQU07QUFEUCxhQUhIO0FBTUgsU0FQRDtBQVFILEtBdkdEO0FBd0dIOztBQUVEO0FBQ0ksUUFBSTBCLE1BQU0sQ0FDTixFQURNLEVBRU4sQ0FGTSxFQUdOLENBSE0sRUFJTixFQUpNLEVBS04sQ0FMTSxFQU1OLEVBTk0sRUFPTixDQVBNLEVBUU4sR0FSTSxDQUFWO0FBVUEsUUFBSUMsTUFBTSxFQUFWO0FBQ0FELFFBQUlFLEtBQUosQ0FBVSxVQUFDSixJQUFELEVBQVU7QUFDaEJHLFlBQUlFLElBQUosQ0FBU0wsSUFBVDtBQUNBO0FBQ0EsZUFBT0EsT0FBTyxFQUFQLEtBQWMsQ0FBckI7QUFDSCxLQUpEO0FBS0F4RCxZQUFRQyxHQUFSLENBQVkwRCxHQUFaO0FBQ0g7O0FBRUQ7QUFDSSxRQUFJRCxPQUFNLENBQ04sRUFETSxFQUVOLENBRk0sRUFHTixDQUhNLEVBSU4sRUFKTSxFQUtOLENBTE0sRUFNTixFQU5NLEVBT04sQ0FQTSxFQVFOLEdBUk0sQ0FBVjtBQVVBLFFBQUlDLE9BQU0sRUFBVjtBQUNBRCxTQUFJSSxJQUFKLENBQVMsVUFBQ04sSUFBRCxFQUFVO0FBQ2ZHLGFBQUlFLElBQUosQ0FBU0wsSUFBVDtBQUNBO0FBQ0EsZUFBT0EsT0FBTyxDQUFQLEtBQWEsQ0FBcEI7QUFDSCxLQUpEO0FBS0F4RCxZQUFRQyxHQUFSLENBQVkwRCxJQUFaO0FBQ0g7O0FBRUQ7QUFDSSxRQUFJRCxRQUFNLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQVY7QUFESjtBQUFBO0FBQUE7O0FBQUE7QUFFSSx3R0FBY0EsS0FBZCw0R0FBbUI7QUFBQSxnQkFBVnZDLENBQVU7O0FBQ2ZuQixvQkFBUUMsR0FBUixDQUFZa0IsQ0FBWjtBQUNIO0FBSkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtDOztBQUVEOztBQUVBO0FBQ0ksUUFBSXVDLFFBQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBVjtBQUNBLFFBQUlLLEtBQUEsMEVBQUFBLENBQUtMLEtBQUwsQ0FBSjtBQUNBMUQsWUFBUUMsR0FBUixDQUFZOEQsR0FBR0MsSUFBSCxFQUFaO0FBQ0g7O0FBRUQ7O0FBRUE7QUFDQTtBQUNJLFFBQUlsQixNQUFNO0FBQ05kLGNBQU0sUUFEQTtBQUVOaUMsYUFBSztBQUZDLEtBQVY7O0FBS0E7QUFDQSx5RkFBc0JuQixHQUF0QixpRkFBNEM7QUFDeENvQixvQkFBWSxLQUQ0QjtBQUV4Q0Msa0JBQVUsS0FGOEI7QUFHeENDLHNCQUFjLElBSDBCO0FBSXhDQyxlQUFPLGlCQUFXO0FBQ2QsZ0JBQUlDLElBQUksSUFBUjtBQUNBLGdCQUFJYixRQUFRLENBQVo7QUFDQSxnQkFBSWMsT0FBTywwRUFBWUQsQ0FBWixDQUFYO0FBQ0EsbUJBQU87QUFDSE4sc0JBQU0sZ0JBQVc7QUFDYiwyQkFBTztBQUNISywrQkFBT0MsRUFBRUMsS0FBS2QsT0FBTCxDQUFGLENBREo7QUFFSGUsOEJBQU9mLFFBQVFjLEtBQUtwQztBQUZqQixxQkFBUDtBQUlIO0FBTkUsYUFBUDtBQVFIO0FBaEJ1QyxLQUE1QztBQVBKO0FBQUE7QUFBQTs7QUFBQTtBQXlCSSx5R0FBY1csR0FBZCxpSEFBbUI7QUFBQSxnQkFBVjJCLENBQVU7O0FBQ2Z6RSxvQkFBUUMsR0FBUixDQUFZd0UsQ0FBWjtBQUNIO0FBM0JMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE0QkM7O0FBRUQ7QUFDSSxRQUFJM0I7QUFDQXRDLFdBQUcsQ0FESDtBQUVBRixXQUFHLEdBRkg7QUFHQW9FLFdBQUc7QUFISCxzRkFJbUIsWUFBVztBQUMxQixZQUFJSixJQUFJLElBQVI7QUFDQSxZQUFJSyxNQUFNLENBQVY7QUFDQSxZQUFJQyxLQUFLLDBFQUFZTixDQUFaLENBQVQ7QUFDQSxlQUFPO0FBQ0hOLGtCQUFNLGdCQUFXO0FBQ2IsdUJBQU87QUFDSEssMkJBQU9DLEVBQUVNLEdBQUdELEtBQUgsQ0FBRixDQURKO0FBRUhILDBCQUFPRyxNQUFNQyxHQUFHekM7QUFGYixpQkFBUDtBQUlIO0FBTkUsU0FBUDtBQVFILEtBaEJELENBQUo7O0FBbUJBLFFBQUk0QixNQUFBLDBFQUFBQSxDQUFLakIsSUFBTCxDQUFKO0FBQ0E5QyxZQUFRQyxHQUFSLENBQVk4RCxJQUFHQyxJQUFILEVBQVo7QUFDQWhFLFlBQVFDLEdBQVIsQ0FBWThELElBQUdDLElBQUgsRUFBWjtBQUNBaEUsWUFBUUMsR0FBUixDQUFZOEQsSUFBR0MsSUFBSCxFQUFaO0FBQ0FoRSxZQUFRQyxHQUFSLENBQVk4RCxJQUFHQyxJQUFILEVBQVo7QUFDSDs7QUFFRDtBQUNJO0FBQ0EsUUFBSWxCLFFBQU07QUFDTnRDLFdBQUc7QUFERyxLQUFWOztBQUlBLFFBQUk4QyxPQUFPLDRFQUFjUixLQUFkLENBQVg7QUFDQTlDLFlBQVFDLEdBQVIsQ0FBWXFELEtBQUs5QyxDQUFqQjtBQUNIOztBQUVEO0FBQ0ksUUFBSXNDLFFBQU07QUFDTm1CLGFBQUs7QUFEQyxLQUFWO0FBR0FZLFdBQU9DLGNBQVAsQ0FBc0JoQyxLQUF0QixFQUEyQixNQUEzQixFQUFtQztBQUMvQnFCLGtCQUFVLEtBRHFCO0FBRS9CRCxvQkFBWSxLQUZtQjtBQUcvQkUsc0JBQWMsS0FIaUI7QUFJL0JDLGVBQU87QUFKd0IsS0FBbkM7QUFNQXJFLFlBQVFDLEdBQVIsQ0FBWTZDLEtBQVo7QUFDQSxTQUFLLElBQUkzQixFQUFULElBQWMyQixLQUFkLEVBQW1CO0FBQ2Y5QyxnQkFBUUMsR0FBUixDQUFZa0IsRUFBWixFQURlLENBQ0E7QUFDbEI7O0FBRUQ7QUFDQW5CLFlBQVFDLEdBQVIsQ0FBWSxVQUFVNkMsS0FBdEI7QUFDSDs7QUFFRDtBQUNJO0FBQ0EsUUFBSUwsTUFBTSxTQUFOQSxHQUFNLEdBQVcsQ0FBRSxDQUF2QjtBQUNBQSxRQUFJc0MsU0FBSixDQUFjdkUsQ0FBZCxHQUFrQixDQUFsQjtBQUNBLFFBQUlrQyxNQUFNLFNBQU5BLEdBQU0sR0FBVyxDQUFFLENBQXZCO0FBQ0EsMEZBQXNCQSxJQUFJcUMsU0FBMUIsRUFBcUN0QyxJQUFJc0MsU0FBekM7QUFDQSxRQUFJL0QsTUFBTSxJQUFJMEIsR0FBSixFQUFWO0FBQ0ExQyxZQUFRQyxHQUFSLENBQVllLElBQUlSLENBQWhCO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBLFFBQUlpQyxPQUFNLFNBQU5BLElBQU0sQ0FBU1QsSUFBVCxFQUFlO0FBQ3JCLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNILEtBRkQ7O0FBSUEsUUFBSVUsT0FBTSxTQUFOQSxJQUFNLENBQVNWLElBQVQsRUFBZWlDLEdBQWYsRUFBb0I7QUFDMUI7QUFDQXhCLGFBQUlTLElBQUosQ0FBUyxJQUFULEVBQWVsQixJQUFmO0FBQ0EsYUFBS2lDLEdBQUwsR0FBV0EsR0FBWDtBQUNILEtBSkQ7O0FBTUE7QUFDQXZCLFNBQUlxQyxTQUFKLEdBQWdCLDRFQUFjdEMsS0FBSXNDLFNBQWxCLENBQWhCOztBQUVBO0FBQ0FyQyxTQUFJcUMsU0FBSixDQUFjQyxXQUFkLEdBQTRCdEMsSUFBNUI7QUFDQUEsU0FBSXFDLFNBQUosQ0FBY0UsTUFBZCxHQUF1QixZQUFXO0FBQzlCLGVBQU8sS0FBS2pELElBQVo7QUFDSCxLQUZEOztBQUlBLFFBQUloQixPQUFNLElBQUkwQixJQUFKLENBQVEsUUFBUixFQUFrQixFQUFsQixDQUFWO0FBQ0ExQyxZQUFRQyxHQUFSLENBQVllLEtBQUlpRSxNQUFKLEVBQVo7QUFDQTtBQUNBakYsWUFBUUMsR0FBUixDQUFZLHNGQUFzQmUsSUFBdEIsTUFBK0IwQixLQUFJcUMsU0FBL0M7QUFDQTtBQUNBL0UsWUFBUUMsR0FBUixDQUFZZSxLQUFJa0UsU0FBSixLQUFrQnhDLEtBQUlxQyxTQUFsQztBQUNBO0FBQ0EvRSxZQUFRQyxHQUFSLENBQVllLGdCQUFleUIsSUFBM0I7QUFDSDs7QUFFRDtBQUNJO0FBQ0EsUUFBSUssUUFBTTtBQUNOdEMsV0FBRztBQURHLEtBQVY7O0FBSUEsUUFBSThDLFFBQU8sNEVBQWNSLEtBQWQsRUFBbUI7QUFDMUJ4QyxXQUFHO0FBQ0M2RCxzQkFBVSxLQURYO0FBRUNELHdCQUFZLEtBRmI7QUFHQ0UsMEJBQWMsSUFIZjtBQUlDQyxtQkFBTztBQUpSLFNBRHVCO0FBTzFCSyxXQUFHO0FBQ0NQLHNCQUFVLEtBRFg7QUFFQ0Qsd0JBQVksS0FGYjtBQUdDRSwwQkFBYyxJQUhmO0FBSUNDLG1CQUFPO0FBSlI7QUFQdUIsS0FBbkIsQ0FBWDs7QUFlQTtBQUNBckUsWUFBUUMsR0FBUixDQUFZcUQsTUFBSzlDLENBQWpCLEVBdEJKLENBc0J5QjtBQUNyQlIsWUFBUUMsR0FBUixDQUFZcUQsTUFBSzZCLGNBQUwsQ0FBb0IsR0FBcEIsQ0FBWixFQXZCSixDQXVCMkM7QUFDdkNuRixZQUFRQyxHQUFSLENBQVk2QyxNQUFJcUMsY0FBSixDQUFtQixHQUFuQixDQUFaO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0EsUUFBSXJDLFFBQU07QUFDTm5CLGNBQU0sZ0JBQVc7QUFDYjNCLG9CQUFRQyxHQUFSLENBQVksT0FBWjtBQUNIO0FBSEssS0FBVjs7QUFNQSxRQUFJcUQsUUFBTyw0RUFBY1IsS0FBZCxDQUFYO0FBQ0FRLFVBQUszQixJQUFMLEdBVkosQ0FVaUI7QUFDaEI7O0FBRUQ7QUFDSTtBQUNBLFFBQUljLFFBQU0sU0FBTkEsS0FBTSxDQUFTVCxJQUFULEVBQWU7QUFDckIsYUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsS0FGRDs7QUFJQSxRQUFJVSxRQUFNLFNBQU5BLEtBQU0sQ0FBU1YsSUFBVCxFQUFlaUMsR0FBZixFQUFvQjtBQUMxQnhCLGNBQUlTLElBQUosQ0FBUyxJQUFULEVBQWVsQixJQUFmO0FBQ0EsYUFBS2lDLEdBQUwsR0FBV0EsR0FBWDtBQUNILEtBSEQ7O0FBS0F2QixVQUFJcUMsU0FBSixHQUFnQiw0RUFBY3RDLE1BQUlzQyxTQUFsQixDQUFoQjtBQUNBckMsVUFBSXFDLFNBQUosQ0FBY0MsV0FBZCxHQUE0QnRDLEtBQTVCO0FBQ0EsUUFBSTBDLE9BQU8sSUFBSTFDLEtBQUosQ0FBUSxRQUFSLEVBQWtCLEVBQWxCLENBQVg7QUFDQSxRQUFJMkMsT0FBTyxJQUFJM0MsS0FBSixDQUFRLFdBQVIsRUFBcUIsRUFBckIsQ0FBWDtBQUNBMUMsWUFBUUMsR0FBUixDQUFZbUYsSUFBWixFQUFrQkMsSUFBbEI7QUFDSDs7QUFFRDtBQUNJO0FBQ0EsUUFBSTVDLFFBQU07QUFDTjZDLGNBQU0sY0FBU3RELElBQVQsRUFBZTtBQUNqQixpQkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsU0FISztBQUlOdUQsa0JBQVUsb0JBQVc7QUFDakIsNkJBQWUsS0FBS3ZELElBQXBCO0FBQ0g7QUFOSyxLQUFWOztBQVNBLFFBQUlVLFFBQU0sNEVBQWNELEtBQWQsQ0FBVjtBQUNBQyxVQUFJOEMsS0FBSixHQUFZLFlBQVc7QUFDbkJ4RixnQkFBUUMsR0FBUixDQUFZLEtBQUtzRixRQUFMLEVBQVo7QUFDSCxLQUZEOztBQUlBLFFBQUlFLEtBQUssNEVBQWMvQyxLQUFkLENBQVQ7QUFDQSxRQUFJZ0QsS0FBSyw0RUFBY2hELEtBQWQsQ0FBVDtBQUNBK0MsT0FBR0gsSUFBSCxDQUFRLFFBQVI7QUFDQUksT0FBR0osSUFBSCxDQUFRLFdBQVI7QUFDQUcsT0FBR0QsS0FBSDtBQUNBRSxPQUFHRixLQUFIO0FBQ0F4RixZQUFRQyxHQUFSLENBQVl5QyxLQUFaLEVBdEJKLENBc0JzQjtBQUNsQjFDLFlBQVFDLEdBQVIsQ0FBWXdGLEVBQVosRUF2QkosQ0F1QnFCO0FBQ3BCOztBQUVEO0FBQ0k7QUFDQTtBQUNBLFFBQUloRCxRQUFNO0FBQ047QUFDQXpCLFdBRk0saUJBRUEsQ0FBRTtBQUZGLEtBQVY7O0FBS0E7QUFDQSxRQUFJMkUsT0FBTztBQUNQM0UsYUFBSyxlQUFXLENBQUU7QUFEWCxLQUFYOztBQUlBO0FBQ0EsUUFBSTRFLE9BQU87QUFDUDdDLGVBQU8sQ0FEQTtBQUVQL0IsYUFBSyxTQUFTNkUsT0FBVCxHQUFtQjtBQUNwQixnQkFBSSxLQUFLOUMsS0FBTCxHQUFhLEVBQWpCLEVBQXFCO0FBQ2pCL0Msd0JBQVFDLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSzhDLEtBQXBDO0FBQ0EscUJBQUtBLEtBQUw7QUFDQTtBQUNBOEMsd0JBQVEzQyxJQUFSLENBQWEsSUFBYjtBQUNIO0FBQ0o7QUFUTSxLQUFYOztBQVlBMEMsU0FBSzVFLEdBQUw7QUFDSDs7QUFFRDtBQUNJLFFBQUl5QixRQUFNLFNBQU5BLEtBQU0sQ0FBU1QsSUFBVCxFQUFlO0FBQ3JCLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNILEtBRkQ7O0FBSUEsUUFBSVUsUUFBTSxTQUFOQSxLQUFNLENBQVNWLElBQVQsRUFBZWlDLEdBQWYsRUFBb0I7QUFDMUJ4QixjQUFJUyxJQUFKLENBQVMsSUFBVCxFQUFlbEIsSUFBZjtBQUNBLGFBQUtpQyxHQUFMLEdBQVdBLEdBQVg7QUFDSCxLQUhEOztBQUtBdkIsVUFBSXFDLFNBQUosR0FBZ0IsNEVBQWN0QyxNQUFJc0MsU0FBbEIsQ0FBaEI7O0FBRUEsUUFBSS9ELFFBQU0sSUFBSTBCLEtBQUosQ0FBUSxRQUFSLEVBQWtCLEVBQWxCLENBQVY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBQSxVQUFJcUMsU0FBSixZQUF5QnRDLEtBQXpCLENBbEJKLENBa0JrQztBQUM5QiwwRkFBc0JDLE1BQUlxQyxTQUExQixNQUF5Q3RDLE1BQUlzQyxTQUE3QyxDQW5CSixDQW1CNEQ7QUFDeER0QyxVQUNLc0MsU0FETCxDQUVLZSxhQUZMLENBRW1CcEQsTUFBSXFDLFNBRnZCLEVBcEJKLENBc0J1Qzs7QUFFbkM7QUFDQS9ELHFCQUFlMEIsS0FBZixDQXpCSixDQXlCd0I7QUFDcEIxQixxQkFBZXlCLEtBQWYsQ0ExQkosQ0EwQndCO0FBQ3BCLDBGQUFzQnpCLEtBQXRCLE1BQStCMEIsTUFBSXFDLFNBQW5DLENBM0JKLENBMkJrRDtBQUM5Q3RDLFVBQ0tzQyxTQURMLENBRUtlLGFBRkwsQ0FFbUI5RSxLQUZuQixFQTVCSixDQThCNkI7QUFDekIwQixVQUNLcUMsU0FETCxDQUVLZSxhQUZMLENBRW1COUUsS0FGbkIsRUEvQkosQ0FpQzZCO0FBQzVCOztBQUVEO0FBQ0k7QUFESixRQUVVK0UsT0FGVjtBQUdRLHlCQUFZL0QsSUFBWixFQUFrQjtBQUFBOztBQUNkLGlCQUFLQSxJQUFMLEdBQVlBLFFBQVErRCxPQUFwQjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNIOztBQU5UO0FBQUE7QUFBQSxvQ0FPZ0JDLEtBUGhCLEVBT3VCQyxNQVB2QixFQU8rQjtBQUNuQixxQkFBS0QsS0FBTCxHQUFhQSxTQUFTLEVBQXRCO0FBQ0EscUJBQUtDLE1BQUwsR0FBY0EsVUFBVSxFQUF4QjtBQUNBLHFCQUFLRixPQUFMLFlBQXNCLEtBQUtoRSxJQUEzQjtBQUNIO0FBWFQ7QUFBQTtBQUFBLHlDQVlxQjtBQUNULHVCQUFPLEtBQUtnRSxPQUFaO0FBQ0g7QUFkVDs7QUFBQTtBQUFBOztBQUFBLFFBaUJVRyxNQWpCVjtBQUFBOztBQWtCUSx3QkFBWW5FLElBQVosRUFBa0JpRSxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUM7QUFBQTs7QUFBQSx5TEFFdkJsRSxJQUZ1QjtBQUM3Qjs7O0FBRUEsbUJBQUtpRSxLQUFMLEdBQWFBLFNBQVMsRUFBdEI7QUFDQSxtQkFBS0MsTUFBTCxHQUFjQSxVQUFVLEVBQXhCO0FBSjZCO0FBS2hDOztBQXZCVDtBQUFBO0FBQUEsb0NBd0JnQkQsS0F4QmhCLEVBd0J1QkMsTUF4QnZCLEVBd0IrQjtBQUNuQjtBQUNBO0FBQ0Esd0xBQWNELEtBQWQsRUFBcUJDLE1BQXJCO0FBQ0EscUJBQUtGLE9BQUwsdUJBQWlDLEtBQUtDLEtBQXRDLG9CQUEwRCxLQUFLQyxNQUEvRDtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQTlCVDs7QUFBQTtBQUFBLE1BaUJ5QkgsT0FqQnpCOztBQUFBLFFBaUNVSyxLQWpDVjtBQUFBOztBQWtDUSx1QkFBWXBFLElBQVosRUFBa0JpRSxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUM7QUFBQTs7QUFBQSx1TEFFdkJsRSxJQUZ1QjtBQUM3Qjs7O0FBRUEsbUJBQUtpRSxLQUFMLEdBQWFBLFNBQVMsRUFBdEI7QUFDQSxtQkFBS0MsTUFBTCxHQUFjQSxVQUFVLEVBQXhCO0FBSjZCO0FBS2hDOztBQXZDVDtBQUFBO0FBQUEsb0NBd0NnQkQsS0F4Q2hCLEVBd0N1QkMsTUF4Q3ZCLEVBd0MrQjtBQUNuQjtBQUNBO0FBQ0Esc0xBQWNELEtBQWQsRUFBcUJDLE1BQXJCO0FBQ0EscUJBQUtGLE9BQUwsdUJBQWlDLEtBQUtDLEtBQXRDLG9CQUEwRCxLQUFLQyxNQUEvRDtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQTlDVDs7QUFBQTtBQUFBLE1BaUN3QkgsT0FqQ3hCOztBQWlESSxRQUFJTSxXQUFXLElBQUlELEtBQUosQ0FBVSxVQUFWLENBQWY7QUFDQSxRQUFJRSx3QkFBd0JELFNBQ3ZCRSxPQUR1QixHQUV2QkMsVUFGdUIsRUFBNUI7O0FBSUEsUUFBSUMsVUFBVSxJQUFJTCxLQUFKLENBQVUsU0FBVixDQUFkO0FBQ0EsUUFBSU0sdUJBQXVCRCxRQUN0QkYsT0FEc0IsQ0FDZCxHQURjLEVBQ1QsRUFEUyxFQUV0QkMsVUFGc0IsRUFBM0I7O0FBSUF4RyxZQUFRQyxHQUFSLENBQVlxRyxxQkFBWjtBQUNBdEcsWUFBUUMsR0FBUixDQUFZeUcsb0JBQVo7QUFDSDs7QUFFRDtBQUNJO0FBREosUUFFVUMsTUFGVjtBQUdRLDBCQUFjO0FBQUE7O0FBQ1YsaUJBQUtDLEdBQUwsR0FBV0MsS0FBS0MsTUFBTCxFQUFYO0FBQ0g7O0FBTFQ7QUFBQTtBQUFBLG1DQU9lO0FBQ0g5Ryx3QkFBUUMsR0FBUixDQUFZLEtBQUsyRyxHQUFqQjtBQUNIO0FBVFQ7O0FBQUE7QUFBQTs7QUFZSSxRQUFJRyxLQUFLLElBQUlKLE1BQUosRUFBVDtBQUNBSSxPQUFHQyxJQUFIOztBQUVBTCxXQUFPNUIsU0FBUCxDQUFpQmlDLElBQWpCLEdBQXdCLFlBQVc7QUFDL0JoSCxnQkFBUUMsR0FBUixDQUFZLEtBQUsyRyxHQUFMLEdBQVcsSUFBdkI7QUFDSCxLQUZEOztBQUlBLFFBQUlLLEtBQUssSUFBSU4sTUFBSixFQUFUO0FBQ0FNLE9BQUdELElBQUg7QUFDSCxDOzs7Ozs7QUNwaEJELGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQSxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ1JELGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0EsOEJBQThCLDhDQUE4Qzs7Ozs7OztBQ0Y1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sWUFBWSxjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssR0FBRztBQUNSO0FBQ0E7Ozs7Ozs7QUN4QkEsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVksZUFBZTtBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRGQUFrRixhQUFhLEVBQUU7O0FBRWpHO0FBQ0EscURBQXFELDRCQUE0QjtBQUNqRjtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGNBQWM7QUFDZCxpQkFBaUI7QUFDakI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDakNBLDhCQUE4Qjs7Ozs7OztBQ0E5QjtBQUNBLFVBQVU7QUFDVjs7Ozs7OztBQ0ZBLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0Esb0VBQXVFLDJDQUE0Qzs7Ozs7OztBQ0ZuSCxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQixFQUFFOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0EsOEJBQThCLGtDQUFzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRnBFOzs7Ozs7O0FBT0E7QUFDQztBQUNBLEtBQUl4RyxJQUFJLElBQVI7QUFDQSxLQUFJRixJQUFJO0FBQ1AwQixRQUFNO0FBREMsRUFBUjtBQUdBLEtBQUkwQyxJQUFJLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBUjtBQUNBMUUsU0FBUUMsR0FBUixRQUFtQk8sQ0FBbkIseUNBQW1CQSxDQUFuQixVQUE2QkYsQ0FBN0IseUNBQTZCQSxDQUE3QixVQUF1Q29FLENBQXZDLHlDQUF1Q0EsQ0FBdkM7QUFDQTs7QUFFRDtBQUNDO0FBQ0EsS0FBSWxFLEtBQUksSUFBUjtBQUNBUixTQUFRQyxHQUFSLENBQVksQ0FBQ08sRUFBRCxJQUFNLFFBQU9BLEVBQVAseUNBQU9BLEVBQVAsT0FBYSxRQUEvQixFQUhELENBRzJDO0FBQzFDOztBQUVEO0FBQ0M7QUFDQSxLQUFJTyxNQUFNLFNBQU5BLEdBQU0sQ0FBU1AsQ0FBVCxFQUFZRixDQUFaLEVBQWVvRSxDQUFmLEVBQWtCLENBQUUsQ0FBOUI7QUFDQTFFLFNBQVFDLEdBQVIsQ0FBWWMsSUFBSW9CLE1BQWhCLEVBSEQsQ0FHMEI7QUFDekI7O0FBRUQ7QUFDQztBQUNBO0FBQ0E7O0FBRUQ7QUFDQztBQUNBO0FBQ0E7O0FBRUQ7QUFDQyxLQUFJeEIsT0FBTyxDQUFYO0FBQ0E7QUFDQSxLQUFJdUcsU0FBVSxPQUFPdkcsSUFBUCxLQUFnQixXQUFqQixHQUFnQ0EsSUFBaEMsR0FBdUMsWUFBVztBQUM5RDtBQUNBLEVBRkQ7QUFHQTtBQUNBWCxTQUFRQyxHQUFSLENBQVlpSCxNQUFaLEVBUEQsQ0FPc0I7QUFDckI7O0FBRUQ7QUFDQztBQUNBLEtBQUlBLFVBQVMsU0FBVEEsT0FBUyxDQUFTdkcsSUFBVCxFQUFlO0FBQzNCLE1BQUl3RyxVQUFVeEcsUUFBUSxZQUFXO0FBQ2hDO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7QUFLQTs7QUFFRDtBQUNDO0FBQ0EsS0FBSStDLE1BQU0sRUFBVjtBQUNBQSxLQUFJLENBQUosSUFBUyxDQUFUO0FBQ0FBLEtBQUksQ0FBSixJQUFTLENBQVQ7QUFDQTFELFNBQVFDLEdBQVIsQ0FBWXlELElBQUl2QixNQUFoQixFQUxELENBSzBCO0FBQ3pCOztBQUVEO0FBQ0M7QUFDQSxLQUFJdUIsT0FBTSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFWO0FBQ0FBLE1BQUksTUFBSixJQUFjLFFBQWQ7QUFDQUEsTUFBSSxLQUFKLElBQWEsRUFBYjtBQUNBMUQsU0FBUUMsR0FBUixDQUFZeUQsSUFBWixFQUFpQkEsS0FBSXZCLE1BQXJCLEVBTEQsQ0FLK0I7QUFDOUI7O0FBRUQ7QUFDQztBQUNBLEtBQUl1QixRQUFNLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQVY7QUFDQUEsT0FBSSxHQUFKLElBQVcsR0FBWDtBQUNBMUQsU0FBUUMsR0FBUixDQUFZeUQsS0FBWjtBQUNBOztBQUVEO0FBQ0M7QUFDQTtBQUNBLEtBQUkzQyxPQUFNLFNBQU5BLElBQU0sR0FBVztBQUNwQixNQUFJMkMsTUFBTTBELE1BQU1yQyxTQUFOLENBQWdCc0MsS0FBaEIsQ0FBc0JuRSxJQUF0QixDQUEyQm9FLFNBQTNCLENBQVY7QUFDQXRILFVBQVFDLEdBQVIsQ0FBWXlELEdBQVo7QUFDQSxFQUhEO0FBSUEzQzs7QUFFQTtBQUNBLEtBQUkyQyxRQUFNLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQVY7QUFDQSxLQUFJNkQsVUFBVUgsTUFBTXJDLFNBQU4sQ0FBZ0JzQyxLQUFoQixDQUFzQm5FLElBQXRCLENBQTJCUSxLQUEzQixDQUFkO0FBQ0FBLE9BQUlHLElBQUosQ0FBUyxHQUFUO0FBQ0EwRCxTQUFRMUQsSUFBUixDQUFhLEdBQWI7QUFDQTdELFNBQVFDLEdBQVIsQ0FBWXlELEtBQVosRUFBaUI2RCxPQUFqQjs7QUFFQTtBQUNBLEtBQUlDLE9BQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBWDtBQUNBLEtBQUlDLFdBQVcseUVBQVdELElBQVgsQ0FBZjtBQUNBQSxNQUFLM0QsSUFBTCxDQUFVLEdBQVY7QUFDQTRELFVBQVM1RCxJQUFULENBQWMsR0FBZDtBQUNBN0QsU0FBUUMsR0FBUixDQUFZeUQsS0FBWixFQUFpQitELFFBQWpCO0FBQ0E7O0FBRUQ7QUFDQztBQUNBO0FBQ0EsS0FBSUMsU0FBUyxLQUFiO0FBQ0ExSCxTQUFRQyxHQUFSLENBQVl5SCxPQUFPLENBQVAsQ0FBWjtBQUNBMUgsU0FBUUMsR0FBUixDQUFZeUgsT0FBT0MsTUFBUCxDQUFjLENBQWQsQ0FBWjtBQUNBOztBQUVEO0FBQ0M7QUFDQSxLQUFJbkgsTUFBSSxJQUFSO0FBQ0FSLFNBQVFDLEdBQVIsQ0FBWU8sR0FBWjtBQUNBOztBQUVEO0FBQ0MsS0FBSUEsTUFBSSxLQUFSO0FBQ0E7QUFDQVIsU0FBUUMsR0FBUixDQUFZTyxJQUFFb0gsT0FBRixDQUFVLENBQVYsQ0FBWjtBQUNBO0FBQ0E1SCxTQUFRQyxHQUFSLENBQVlPLElBQUVxSCxXQUFGLENBQWMsQ0FBZCxDQUFaO0FBQ0E7O0FBRUQ7QUFDQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJckgsTUFBSSxHQUFSO0FBQ0FSLFNBQVFDLEdBQVIsQ0FBWU8sR0FBWixFQVBELENBT2lCO0FBQ2hCOztBQUVEO0FBQ0M7QUFDQSxLQUFJQSxNQUFJLE1BQU0sR0FBZDtBQUNBLEtBQUlGLEtBQUksR0FBUjtBQUNBTixTQUFRQyxHQUFSLENBQVlPLFFBQU1GLEVBQWxCLEVBSkQsQ0FJc0I7QUFDckI7O0FBRUQ7QUFDQztBQUNBTixTQUFRQyxHQUFSLFFBQW1CNkgsR0FBbkIseUNBQW1CQSxHQUFuQixHQUZELENBRTBCO0FBQ3pCOUgsU0FBUUMsR0FBUixDQUFZNkgsUUFBUUEsR0FBcEIsRUFIRCxDQUcyQjtBQUMxQjs7QUFFRDtBQUNDO0FBQ0E7O0FBRUEsS0FBSXRILE1BQUksS0FBUjtBQUNBLEtBQUlGLE1BQUksS0FBSyxLQUFiO0FBQ0FOLFNBQVFDLEdBQVIsQ0FBWUMsT0FBTzZILEtBQVAsQ0FBYXZILEdBQWIsQ0FBWixFQU5ELENBTStCO0FBQzlCUixTQUFRQyxHQUFSLENBQVlDLE9BQU82SCxLQUFQLENBQWF6SCxHQUFiLENBQVosRUFQRCxDQU8rQjs7QUFFOUJOLFNBQVFDLEdBQVIsQ0FBWSw0RUFBYU8sR0FBYixDQUFaLEVBVEQsQ0FTK0I7QUFDOUJSLFNBQVFDLEdBQVIsQ0FBWSw0RUFBYUssR0FBYixDQUFaLEVBVkQsQ0FVK0I7O0FBRTlCO0FBQ0EsS0FBSTBILFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxDQUFULEVBQVk7QUFDdkIsU0FBT0EsTUFBTUEsQ0FBYjtBQUNBLEVBRkQ7O0FBSUFqSSxTQUFRQyxHQUFSLENBQVkrSCxNQUFNMUgsR0FBTixDQUFaLEVBakJELENBaUJ3QjtBQUN2Qjs7QUFFRDtBQUNDO0FBQ0E7QUFDQTtBQUNBTixTQUFRQyxHQUFSLENBQVksTUFBTSxDQUFDLENBQW5CLEVBSkQsQ0FJd0I7QUFDdkJELFNBQVFDLEdBQVIsQ0FBWSw2RUFBZSxDQUFDLENBQWhCLENBQVosRUFBZ0NpSSxLQUFLQyxLQUFMLENBQVcsSUFBWCxDQUFoQzs7QUFFQTtBQUNBLEtBQUlDLFlBQVksU0FBWkEsU0FBWSxDQUFTSCxDQUFULEVBQVk7QUFDM0JBLE1BQUlJLE9BQU9KLENBQVAsQ0FBSjtBQUNBLFNBQVFBLE1BQU0sQ0FBUCxJQUFjLElBQUlBLENBQUosS0FBVSxDQUFDSyxRQUFoQztBQUNBLEVBSEQ7O0FBS0F0SSxTQUFRQyxHQUFSLENBQVltSSxVQUFVLENBQUMsQ0FBWCxDQUFaLEVBYkQsQ0FhNkI7QUFDNUI7O0FBRUQ7QUFDQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUQ7QUFDQztBQUNBLEtBQUk1SCxNQUFJLElBQUkrSCxNQUFKLENBQVcsT0FBWCxDQUFSO0FBQ0F2SSxTQUFRQyxHQUFSLENBQVlPLEdBQVosRUFIRCxDQUdpQjs7QUFFaEI7QUFDQVIsU0FBUUMsR0FBUixDQUFZTyxJQUFFZ0ksUUFBRixFQUFaLEVBTkQsQ0FNNEI7QUFDM0J4SSxTQUFRQyxHQUFSLENBQVlzSSxPQUFPeEQsU0FBUCxDQUFpQnlELFFBQWpCLENBQTBCdEYsSUFBMUIsQ0FBK0IxQyxHQUEvQixDQUFaLEVBUEQsQ0FPaUQ7O0FBRWhEO0FBQ0FSLFNBQVFDLEdBQVIsQ0FBWU8sSUFBRWlJLE9BQUYsRUFBWixFQVZELENBVTJCO0FBQzFCekksU0FBUUMsR0FBUixDQUFZc0ksT0FBT3hELFNBQVAsQ0FBaUIwRCxPQUFqQixDQUF5QnZGLElBQXpCLENBQThCMUMsR0FBOUIsQ0FBWixFQVhELENBV2dEOztBQUUvQztBQUNBUixTQUFRQyxHQUFSLENBQVk0RSxPQUFPRSxTQUFQLENBQWlCeUQsUUFBakIsQ0FBMEJ0RixJQUExQixDQUErQjFDLEdBQS9CLENBQVosRUFkRCxDQWNpRDtBQUNoRFIsU0FBUUMsR0FBUixDQUFZNEUsT0FBT0UsU0FBUCxDQUFpQjBELE9BQWpCLENBQXlCdkYsSUFBekIsQ0FBOEIxQyxHQUE5QixDQUFaLEVBZkQsQ0FlZ0Q7QUFDL0M7O0FBRUQ7QUFDQztBQUNBLEtBQUlBLE1BQUksSUFBSWtJLE9BQUosQ0FBWSxLQUFaLENBQVI7QUFDQTFJLFNBQVFDLEdBQVIsQ0FBWTRFLE9BQU9FLFNBQVAsQ0FBaUJ5RCxRQUFqQixDQUEwQnRGLElBQTFCLENBQStCMUMsR0FBL0IsQ0FBWixFQUhELENBR2lEO0FBQ2hEOztBQUVEO0FBQ0M7QUFDQSxLQUFJQSxNQUFJLElBQUkrSCxNQUFKLENBQVcsT0FBWCxDQUFSO0FBQ0F2SSxTQUFRQyxHQUFSLENBQVlPLElBQUVpSSxPQUFGLEVBQVo7O0FBRUE7QUFDQSxLQUFJbkksTUFBSUUsTUFBSSxFQUFaO0FBQ0FSLFNBQVFDLEdBQVIsQ0FBWUssR0FBWjtBQUNBOztBQUVEO0FBQ0M7O0FBRUEsS0FBSW9ILFVBQVMsSUFBSWEsTUFBSixDQUFXLFNBQVgsQ0FBYjtBQUNBO0FBQ0EsS0FBSWIsUUFBT2lCLE9BQVAsQ0FBZSxDQUFmLE1BQXNCLENBQUMsQ0FBM0IsRUFBOEI7QUFDN0IzSSxVQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDQTtBQUNEOztBQUVEO0FBQ0M7O0FBRUE7QUFDQSxLQUFJTyxPQUFJNEcsTUFBTSxFQUFOLENBQVIsQ0FKRCxDQUlvQjtBQUNuQnBILFNBQVFDLEdBQVIsQ0FBWU8sSUFBWixFQUFlQSxLQUFFMkIsTUFBakI7O0FBRUE7QUFDQSxLQUFJN0IsTUFBSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFSO0FBQ0FBLEtBQUU2QixNQUFGLEdBQVcsQ0FBWDtBQUNBbkMsU0FBUUMsR0FBUixDQUFZSyxHQUFaOztBQUVBO0FBQ0E7QUFDQSxLQUFJb0UsS0FBSTBDLE1BQU1oRixLQUFOLENBQVksSUFBWixFQUFrQjtBQUN6QkQsVUFBUTtBQURpQixFQUFsQixDQUFSO0FBR0FuQyxTQUFRQyxHQUFSLENBQVl5RSxFQUFaLEVBakJELENBaUJpQjs7QUFFaEI7QUFDQTs7QUFFRDtBQUNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVEO0FBQ0M7QUFDQSxLQUFJa0UsUUFBUSxxRUFBTyxpQkFBUCxDQUFaO0FBQ0EsS0FBSXBJLE9BQUksRUFBUjtBQUNBQSxNQUFFLHFFQUFPLGlCQUFQLENBQUYsSUFBK0IsWUFBVztBQUN6QztBQUNBLEVBRkQ7QUFHQVIsU0FBUUMsR0FBUixDQUFZTyxJQUFaO0FBQ0FSLFNBQVFDLEdBQVIsQ0FBWSw4RkFBNkJPLElBQTdCLENBQVo7O0FBRUE7QUFDQTs7QUFFRDtBQUNDOztBQUVBUixTQUFRQyxHQUFSLENBQVksNkVBQWUwQyxTQUFmLENBQVosRUFIRCxDQUd5QztBQUN4QzNDLFNBQVFDLEdBQVIsQ0FBWSw2RUFBZSxZQUFXLENBQUUsQ0FBNUIsQ0FBWixFQUpELENBSTZDO0FBQzVDO0FBQ0FELFNBQVFDLEdBQVIsQ0FBWSw2RUFBZTtBQUMxQk8sS0FBRyxDQUR1QjtBQUUxQkYsS0FBRyxhQUFXLENBQUU7QUFGVSxFQUFmLENBQVo7QUFJQTtBQUNBTixTQUFRQyxHQUFSLENBQVksNkVBQWUsQ0FBQyxRQUFELEVBQVcwQyxTQUFYLEVBQXNCLFlBQVcsQ0FBRSxDQUFuQyxFQUFxQyxDQUFyQyxDQUFmLENBQVo7QUFDQTs7QUFFRDtBQUNDO0FBQ0E7QUFDQSxLQUFJRyxNQUFNO0FBQ1R0QyxLQUFHLENBRE07QUFFVEYsS0FBRyxJQUZNO0FBR1RvRSxLQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO0FBRUo7QUFMVSxFQUFWLENBTUEsSUFBSW1FLFFBQVEsNkVBQWUvRixHQUFmLEVBQW9CLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBcEIsQ0FBWixDQVRELENBUzhDO0FBQzdDOUMsU0FBUUMsR0FBUixDQUFZNEksS0FBWixFQVZELENBVXFCOztBQUVwQjtBQUNBLEtBQUlDLFFBQVEsNkVBQWVoRyxHQUFmLEVBQW9CLFVBQVNpRyxHQUFULEVBQWMxRSxLQUFkLEVBQXFCO0FBQ3BELE1BQUkwRSxRQUFRLEdBQVosRUFBaUIsT0FBTzFFLEtBQVA7QUFDakIsRUFGVyxDQUFaO0FBR0FyRSxTQUFRQyxHQUFSLENBQVk2SSxLQUFaOztBQUVBO0FBQ0EsS0FBSUUsUUFBUSw2RUFBZWxHLEdBQWYsRUFBb0IsSUFBcEIsRUFBMEIsQ0FBMUIsQ0FBWjtBQUNBOUMsU0FBUUMsR0FBUixDQUFZK0ksS0FBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVEO0FBQ0M7QUFDQTtBQUNBaEosU0FBUUMsR0FBUixDQUFZLENBQUMsQ0FBQzBDLFNBQUYsSUFBZSxDQUFDLENBQUMsSUFBakIsSUFBeUIsQ0FBQyxDQUFDLEtBQTNCLElBQW9DLENBQUMsQ0FBQyxDQUF0QyxJQUEyQyxDQUFDLENBQUNtRixHQUE3QyxJQUFvRCxDQUFDLENBQUMsRUFBbEUsRUFIRCxDQUd3RTtBQUN2RTs7QUFFQTtBQUNBOztBQUVEO0FBQ0M7QUFDQTtBQUNBLEtBQUl0SCxPQUFJLEVBQVI7QUFDQSxLQUFJRixNQUFJLE1BQVI7O0FBRUEsS0FBSW9FLE1BQUk2RCxPQUFPL0gsSUFBUCxDQUFSO0FBQ0EsS0FBSXlJLElBQUlaLE9BQU8vSCxHQUFQLENBQVI7O0FBRUFOLFNBQVFDLEdBQVIsQ0FBWXlFLEdBQVosRUFBZXVFLENBQWYsRUFURCxDQVNvQjs7QUFFbkI7QUFDQSxLQUFJQyxJQUFJMUksS0FBRWdJLFFBQUYsRUFBUixDQVpELENBWXVCO0FBQ3RCLEtBQUlXLElBQUksQ0FBQzdJLEdBQVQ7QUFDQU4sU0FBUUMsR0FBUixDQUFZaUosQ0FBWixFQUFlQyxDQUFmLEVBZEQsQ0Fjb0I7QUFDbkI7O0FBRUQ7QUFDQztBQUNBLEtBQUkzSSxPQUFJLElBQUk0SSxJQUFKLEVBQVI7QUFDQXBKLFNBQVFDLEdBQVIsQ0FBWSxDQUFDTyxJQUFiLEVBQWdCQSxLQUFFNkksT0FBRixFQUFoQjs7QUFFQTtBQUNBckosU0FBUUMsR0FBUixDQUFZLENBQUMsSUFBSW1KLElBQUosRUFBYjs7QUFFQTtBQUNBcEosU0FBUUMsR0FBUixDQUFZbUosS0FBS0UsR0FBTCxFQUFaO0FBQ0E7O0FBRUQ7QUFDQzs7QUFFQTtBQUNBO0FBQ0EsS0FBSTlJLE9BQUksUUFBUjtBQUNBLEtBQUlGLE1BQUksS0FBUjs7QUFFQU4sU0FBUUMsR0FBUixDQUFZc0osU0FBUy9JLElBQVQsQ0FBWixFQUF5QjZILE9BQU83SCxJQUFQLENBQXpCLEVBUkQsQ0FRc0M7QUFDckNSLFNBQVFDLEdBQVIsQ0FBWXNKLFNBQVNqSixHQUFULENBQVosRUFBeUIrSCxPQUFPL0gsR0FBUCxDQUF6QixFQVRELENBU3NDO0FBQ3JDOztBQUVEO0FBQ0M7OztBQUdBO0FBQ0E7O0FBRUEsS0FBSUUsT0FBSSxLQUFSO0FBQ0EsS0FBSUYsTUFBSSxHQUFSOztBQUVBTixTQUFRQyxHQUFSLENBQVlzSixTQUFTL0ksSUFBVCxFQUFZLEVBQVosQ0FBWixFQVZELENBVStCO0FBQzlCUixTQUFRQyxHQUFSLENBQVlzSixTQUFTL0ksSUFBVCxFQUFZLENBQVosQ0FBWixFQVhELENBVzhCO0FBQzdCUixTQUFRQyxHQUFSLENBQVlzSixTQUFTL0ksSUFBVCxFQUFZLENBQVosQ0FBWixFQVpELENBWThCO0FBQzdCUixTQUFRQyxHQUFSLENBQVlzSixTQUFTL0ksSUFBVCxFQUFZLEVBQVosQ0FBWixFQWJELENBYStCOztBQUU5QjtBQUNBUixTQUFRQyxHQUFSLENBQVlLLElBQUVrSSxRQUFGLENBQVcsRUFBWCxDQUFaLEVBaEJELENBZ0I4QjtBQUM3Qjs7QUFFRDtBQUNDOztBQUVBO0FBQ0EsS0FBSWdCLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBUzVDLEdBQVQsRUFBYzZDLFNBQWQsRUFBeUI7QUFDN0M7QUFDQSxNQUFJN0MsTUFBTSxDQUFDQSxHQUFYO0FBQ0EsTUFBSTZDLFlBQVksQ0FBQ0EsU0FBakI7QUFDQSxNQUFJQSxjQUFjLEVBQWxCLEVBQXNCO0FBQ3JCLFVBQU8sT0FBTzdDLElBQUk0QixRQUFKLENBQWEsRUFBYixDQUFkO0FBQ0EsR0FGRCxNQUVPLElBQUlpQixjQUFjLENBQWxCLEVBQXFCO0FBQzNCLFVBQU8sT0FBTzdDLElBQUk0QixRQUFKLENBQWEsQ0FBYixDQUFkO0FBQ0EsR0FGTSxNQUVBO0FBQ04sVUFBTzVCLElBQUk0QixRQUFKLENBQWFpQixTQUFiLENBQVA7QUFDQTtBQUNELEVBWEQ7O0FBYUF6SixTQUFRQyxHQUFSLENBQVl1SixlQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBWixFQWpCRCxDQWlCc0M7O0FBRXJDO0FBQ0EsS0FBSUUsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFTOUMsR0FBVCxFQUFjO0FBQ2xDO0FBQ0EsTUFBSUEsTUFBTUEsSUFBSStDLFdBQUosRUFBVjtBQUNBLE1BQUkvQyxJQUFJK0IsT0FBSixDQUFZLElBQVosTUFBc0IsQ0FBMUIsRUFBNkI7QUFDNUIsVUFBT1ksU0FBUzNDLElBQUlnRCxPQUFKLENBQVksSUFBWixFQUFrQixFQUFsQixDQUFULEVBQWdDLEVBQWhDLENBQVA7QUFDQSxHQUZELE1BRU8sSUFBSWhELElBQUkrQixPQUFKLENBQVksSUFBWixNQUFzQixDQUExQixFQUE2QjtBQUNuQyxVQUFPWSxTQUFTM0MsSUFBSWdELE9BQUosQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLENBQVQsRUFBZ0MsQ0FBaEMsQ0FBUDtBQUNBLEdBRk0sTUFFQTtBQUNOLFVBQU9MLFNBQVMzQyxHQUFULEVBQWMsRUFBZCxDQUFQO0FBQ0E7QUFDRCxFQVZEOztBQVlBNUcsU0FBUUMsR0FBUixDQUFZeUosZUFBZSxPQUFmLENBQVosRUFoQ0QsQ0FnQ3VDO0FBQ3RDOztBQUVEO0FBQ0M7QUFDQSxLQUFJbEosT0FBSSxLQUFSO0FBQ0EsS0FBSUYsTUFBSSxFQUFSO0FBQ0EsS0FBSW9FLE1BQUksRUFBUjs7QUFFQTtBQUNBMUUsU0FBUUMsR0FBUixDQUFZeUksUUFBUWxJLElBQVIsQ0FBWixFQVBELENBTzBCO0FBQ3pCUixTQUFRQyxHQUFSLENBQVksQ0FBQyxDQUFDSyxHQUFkLEVBUkQsQ0FRbUI7QUFDbEJOLFNBQVFDLEdBQVIsQ0FBWSxDQUFDLENBQUN5RSxHQUFkLEVBVEQsQ0FTbUI7QUFDbEI7O0FBRUQ7QUFDQyxLQUFJaEIsUUFBTSxDQUNULENBRFMsRUFFVCxZQUFXLENBQUUsQ0FGSixFQUdULENBSFMsRUFJVCxZQUFXLENBQUUsQ0FKSixDQUFWOztBQU9BMUQsU0FBUUMsR0FBUixDQUFZLDZFQUFleUQsS0FBZixDQUFaOztBQUVBLEtBQUltRyxPQUFPLDZFQUFlbkcsS0FBZixFQUFvQixVQUFTcUYsR0FBVCxFQUFjMUUsS0FBZCxFQUFxQjtBQUNuRCxNQUFJLE9BQU9BLEtBQVAsS0FBaUIsVUFBckIsRUFBaUM7QUFDaEMsVUFBTyxJQUFQO0FBQ0EsR0FGRCxNQUVPO0FBQ04sVUFBT0EsS0FBUDtBQUNBO0FBQ0QsRUFOVSxDQUFYOztBQVFBckUsU0FBUUMsR0FBUixDQUFZNEosSUFBWixFQWxCRCxDQWtCb0I7QUFDbkI7O0FBRUQ7QUFDQzs7QUFFQTtBQUNBN0osU0FBUUMsR0FBUixDQUFZLFNBQVMsSUFBVCxJQUFpQixHQUE3QixFQUpELENBSW9DOztBQUVuQztBQUNBO0FBQ0FELFNBQVFDLEdBQVIsQ0FBWSxRQUFRMEMsU0FBUixJQUFxQixHQUFqQyxFQVJELENBUXdDO0FBQ3ZDM0MsU0FBUUMsR0FBUixDQUFZLFFBQVEsSUFBUixJQUFnQixHQUE1QixFQVRELENBU21DO0FBQ2xDRCxTQUFRQyxHQUFSLENBQVksUUFBUSxZQUFXLENBQUUsQ0FBckIsSUFBeUIsR0FBckMsRUFWRCxDQVU0Qzs7QUFFM0M7QUFDQSxLQUFJNkosT0FBTyxTQUFQQSxJQUFPLENBQVN0SixDQUFULEVBQVlGLENBQVosRUFBZTtBQUN6QkUsTUFBSUEsS0FBSyxPQUFUO0FBQ0FGLE1BQUlBLEtBQUssT0FBVDtBQUNBLFNBQU9FLElBQUksR0FBSixHQUFVRixDQUFqQjtBQUNBLEVBSkQ7QUFLQU4sU0FBUUMsR0FBUixDQUFZNkosS0FBSyxJQUFMLENBQVosRUFsQkQsQ0FrQjBCO0FBQ3pCOUosU0FBUUMsR0FBUixDQUFZNkosS0FBSyxJQUFMLEVBQVcsRUFBWCxDQUFaLEVBbkJELENBbUI4QjtBQUM3QjlKLFNBQVFDLEdBQVIsQ0FBWTZKLEtBQUssSUFBTCxFQUFXLEdBQVgsRUFBZ0JDLElBQWhCLEVBQVosRUFwQkQsQ0FvQnNDOztBQUVyQy9KLFNBQVFDLEdBQVIsU0FBbUIsRUFBbkIsR0F0QkQsQ0FzQndCOztBQUV2QjtBQUNBLFNBQVMsWUFBVztBQUNuQkQsVUFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0EsRUFGTyxFQUFSO0FBR0E7O0FBRUQ7QUFDQztBQUNBLEtBQUkrSixTQUFTLHFFQUFPLGVBQVAsQ0FBYjtBQUNBaEssU0FBUUMsR0FBUixDQUFZc0ksT0FBT3lCLE1BQVAsQ0FBWixFQUhELENBRzhCOztBQUU3Qjs7QUFFQTs7QUFFQTtBQUNBaEssU0FBUUMsR0FBUixDQUFZeUksUUFBUXNCLE1BQVIsQ0FBWixFQVZELENBVStCO0FBQzlCaEssU0FBUUMsR0FBUixDQUFZLENBQUMsQ0FBQytKLE1BQWQsRUFYRCxDQVd3QjtBQUN2Qjs7QUFFRDtBQUNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztBQ3pnQkQsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxDQUFDO0FBQ0Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1QsR0FBRyxFQUFFO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQSxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSkE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0EsdUNBQXVDLDRCQUE0QjtBQUNuRSx5Q0FBeUM7QUFDekM7QUFDQTs7Ozs7OztBQ0pBLGtCQUFrQix5RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDUkQsa0JBQWtCLHlEOzs7Ozs7QUNBbEI7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyRUFBNEUsa0JBQWtCLEVBQUU7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsZ0NBQWdDO0FBQ3ZGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQ0FBa0MsZ0JBQWdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUNwQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBLGlDQUFpQyxTQUFTLEVBQUU7QUFDNUMsQ0FBQyxZQUFZOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTLHFCQUFxQjtBQUMzRCxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTE2OTIxMTEyZjQ3ZDVmZjdlNzYiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYgKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpIGRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHsgdmFsdWU6IHdrc0V4dC5mKG5hbWUpIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAoIUJVR0dZICYmICRuYXRpdmUpIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBfY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdPUE5FeHQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKTtcbnZhciAkR09QRCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKGl0LCBrZXksIEQpIHtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmIChwcm90b0Rlc2MpIGRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYgKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pIGRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZykge1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCkge1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvKSAkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUQuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoaXQsIEhJRERFTikpIGRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSBpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHsgZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCkge1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGwgPiBpKSAkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKSB7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KSB7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICBpdCA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZiAoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSBELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHZhciBuYW1lcyA9IGdPUE4odG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICB2YXIgSVNfT1AgPSBpdCA9PT0gT2JqZWN0UHJvdG87XG4gIHZhciBuYW1lcyA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSkgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8pICRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBzZXR0ZXIpIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldCB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSkge1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgU3ltYm9sOiAkU3ltYm9sIH0pO1xuXG5mb3IgKHZhciBlczZTeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGogPSAwOyBlczZTeW1ib2xzLmxlbmd0aCA+IGo7KXdrcyhlczZTeW1ib2xzW2orK10pO1xuXG5mb3IgKHZhciB3ZWxsS25vd25TeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgayA9IDA7IHdlbGxLbm93blN5bWJvbHMubGVuZ3RoID4gazspIHdrc0RlZmluZSh3ZWxsS25vd25TeW1ib2xzW2srK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICAgIGZvciAodmFyIGtleSBpbiBTeW1ib2xSZWdpc3RyeSkgaWYgKFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkgcmV0dXJuIGtleTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHsgYTogUyB9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpIHtcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICAkcmVwbGFjZXIgPSByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcbiAqIEBBdXRob3I6IHl1dWhlaVxyXG4gKiBARGF0ZTogMjAxOC0wMS0xMSAxMzo1MToyMFxyXG4gKiBATGFzdCBNb2RpZmllZCBieTogICBTZWxsZW5pdGVcclxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOC0wMS0xNyAxMToxOToyN1xyXG4gKi9cclxucmVxdWlyZSgnLi9zdGFnZTEtMS5qcycpO1xyXG5yZXF1aXJlKCcuL3N0YWdlMS0yLmpzJyk7XHJcbnJlcXVpcmUoJy4vc3RhZ2UyLTEuanMnKTtcclxuY29uc29sZS5sb2coJzwhLS0tLS0tLS1BYm92ZSBpcyBMYXRlc3QtLS0tLS0tLT4nKTtcclxuY29uc29sZS5sb2coJzwhLS0tLS0tLS1CZWxvdyBpcyBBU1lOQy0tLS0tLS0tPicpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9pbmRleC5qcyIsIndpbmRvdy5HTE9CQUwgPSAnQUxMX0VMRU1FTlQnO1xyXG5cclxue1xyXG4gICAgLyog5rC46L+c5LiN6KaB5L2/55SoZXZhbO+8jOWug+WPr+S7peaJp+ihjOS7u+S9leS8oOe7meWug+eahOWtl+espuS4su+8jOW+iOWuueaYk+mBreWPl1hTU+aUu+WHuyAqL1xyXG4gICAgLy8gZXZhbOWcqOS4peagvOaooeW8j+S4i+acieiHquW3seeahOS9nOeUqOWfn1xyXG4gICAgbGV0IHRlc3RFdmFsID0gZnVuY3Rpb24oc3RyLCBiKSB7XHJcbiAgICAgICAgLy8gXCJ1c2Ugc3RyaWN0XCI7IOS9v+eUqOi/meWPpeWQjuS8muaKpVJlZmVyZW5jZUVycm9y77yMYSBpcyBub3QgZGVmaW5lZFxyXG4gICAgICAgIGV2YWwoc3RyKTsgLy8g5qy66K+I6KGM5Li6XHJcbiAgICAgICAgY29uc29sZS5sb2coYSwgYik7XHJcbiAgICB9XHJcblxyXG4gICAgdGVzdEV2YWwoXCJ2YXIgYSA9IDI7XCIsIDQpOyAvLyAyLCA0IOmhuuWIqeaUueWGmWFcclxufVxyXG5cclxue1xyXG4gICAgLyog5rC46L+c5LiN6KaB5L2/55Sod2l0aOi/m+ihjOWvueixoei1i+WAvO+8jOaTjeS9nOS4jeW9k+W+iOacieWPr+iDveazhOa8j+mDveWFqOWxgOWPmOmHjyAqL1xyXG4gICAgLy8gd2l0aOWcqOS4peagvOaooeW8j+S4i+iiq+WujOWFqOemgeatou+8jOS7peS4i+S7o+eggeS4uuazhOa8j+WFqOWxgOWPmOmHj+eahOS+i+WtkO+8jOWcqOmdnuS4peagvOaooeW8j+S4i+aJp+ihjFxyXG4gICAgLypcclxuICAgIGxldCB0ZXN0V2l0aCA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHdpdGgob2JqKSB7XHJcbiAgICAgICAgICAgIF9hID0gJ3dpdGggcmV2aXNlIHN1Y2Nlc3NmdWxseSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBvYmoxID0ge1xyXG4gICAgICAgIFwiX2FcIjogMjMzXHJcbiAgICB9O1xyXG4gICAgbGV0IG9iajIgPSB7XHJcbiAgICAgICAgXCJfYlwiOiA0NDVcclxuICAgIH07XHJcblxyXG4gICAgdGVzdFdpdGgob2JqMSk7IC8vIG9iajEuX2EgPSB3aXRoIHJldmlzZSBzdWNjZXNzZnVsbHlcclxuICAgIHRlc3RXaXRoKG9iajIpOyAvLyBvYmoyLl9hID0gdW5kZWZpbmVkXHJcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cuX2EpOyAvLyB3aXRoIHJldmlzZSBzdWNjZXNzZnVsbHnvvIznlLHkuo7kvZznlKjln5/pl67popjms4TmvI/liLDlhajlsYDlj5jph49cclxuICAgICovXHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWbnuiwg+WHveaVsOWPguaVsOaYr+WHveaVsOihqOi+vuW8j++8jOW5tuS4jeaYr+WHveaVsOWjsOaYjiAqL1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIHNldFRpbWVvdXQnKVxyXG4gICAgfSwgMzAwKTtcclxufVxyXG5cclxue1xyXG4gICAgbGV0IGEgPSAyMzM7XHJcbiAgICAvKiDnq4vljbPmiafooYzlh73mlbDnrKzkuIDkuKrmi6zlj7fph4znmoTlhoXlrrnooqvlvZPkvZzlh73mlbDooajovr7lvI8gKi9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYSA9IDFcclxuICAgICAgICBjb25zb2xlLmxvZygnaW5uZXIgSUlGRScsIGEpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKiDnq4vljbPmiafooYzlh73mlbDkuZ/lj6/ku6Xmi6XmnInlh73mlbDlkI3vvIzkuZ/lj6/ku6XkvKDlj4IgKi9cclxuICAgIChmdW5jdGlvbiBJSUZFKGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIElJRkUnLCBhKTtcclxuICAgIH0pKGEpO1xyXG5cclxuICAgIC8qIOS7peS4iuS7o+eggeivreS5ieS4iuetieWQjOS6juS4i+mdou+8jOS4iumdoueahElJRkXlhajlsYDkuIvmmK/ml6Dms5Xorr/pl67nmoQgKi9cclxuICAgIHZhciBJSUZFID0gZnVuY3Rpb24oYSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgSUlGRTInLCBhKTtcclxuICAgIH0oYSk7XHJcblxyXG4gICAgLyogVU1E77yM5bCG5Ye95pWw6KGo6L6+5byP5Lyg6L+bSUlGReeahOaooeW8jyAqL1xyXG4gICAgKGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgZm4od2luZG93KTtcclxuICAgIH0pKGZ1bmN0aW9uIGRlZihnbG9iYWwpIHtcclxuICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lubmVyIFVNRCcsIGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgVU1EJywgZ2xvYmFsLkdMT0JBTCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxue1xyXG4gICAgLyogdmFy5Y+Y6YeP5aOw5piO5o+Q5Y2HICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgIHZhciBhID0gMjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog5Lul5LiK5Luj56CB562J5ZCM5LqO5LiL6Z2iICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGE7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKiDlh73mlbDlo7DmmI7lj6/ku6Xmj5DliY3vvIzlh73mlbDooajovr7lvI/nmoTlo7DmmI7kvJrlg4/kuIrpnaLlj5jph4/kuIDmoLfnmoTmj5DljYfmiJB1bmRlZmllZCAqL1xyXG4gICAgZm9vKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmb28nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDlh73mlbDooajovr7lvI/mj5DljYfmiJB1bmRlZmluZWTvvIzmiafooYx1bmRlZmluZWTkvJrmiqVUeXBlRXJyb3LvvIzogIzkuI3mmK9SZWZlcmVuY2VFcnJvciAqL1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBiYXIoKTtcclxuICAgICAgICB2YXIgYmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYXInKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbntcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiDln7rnoYDmoIflh4bpl63ljIUgKi9cclxuICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgIHZhciBhID0gMjtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYmF6ID0gZm9vKCk7XHJcbiAgICAgICAgYmF6KCk7XHJcblxyXG4gICAgICAgIC8qIOmXreWMheW+queOryAqL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbihqKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGopO1xyXG4gICAgICAgICAgICAgICAgfSwgaiAqIDMwMCk7XHJcbiAgICAgICAgICAgIH0pKGkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiDln7rmnKzmqKHlnZforr7orqHmqKHlvI8gKi9cclxuICAgICAgICBmdW5jdGlvbiBjb29sTW9kdWxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc29tZXRoaW5nID0gJ2Nvb2wnO1xyXG4gICAgICAgICAgICB2YXIgYW5vdGhlciA9IFsxLCAyLCAzXTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc29tZXRoaW5nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJheiA9IGZvbygpO1xyXG4gICAgICAgICAgICBiYXooKTtcclxuXHJcbiAgICAgICAgICAgIC8qIOmXreWMheW+queOryAqL1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGopIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBqICogMzAwKTtcclxuICAgICAgICAgICAgICAgIH0pKGkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIOWfuuacrOaooeWdl+iuvuiuoeaooeW8jyAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb29sTW9kdWxlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvbWV0aGluZyA9ICdjb29sJztcclxuICAgICAgICAgICAgICAgIHZhciBhbm90aGVyID0gWzEsIDIsIDNdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvbWV0aGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9Bbm90aGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFub3RoZXIuam9pbignIScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvU29tZXRoaW5nOiBkb1NvbWV0aGluZyxcclxuICAgICAgICAgICAgICAgICAgICBkb0Fub3RoZXI6IGRvQW5vdGhlclxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGNvb2wgPSBjb29sTW9kdWxlKCk7XHJcbiAgICAgICAgICAgIGNvb2wuZG9Bbm90aGVyKCk7XHJcbiAgICAgICAgICAgIGNvb2wuZG9Tb21ldGhpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8qIOeOsOS7o+aooeWdl+S+nei1luWKoOi9veWZqO+8jOexu3JlcXVpcmVKU+aooeW8jyAqL1xyXG4gICAgICAgICAgICB2YXIgTXlNb2R1bGVzID0gKGZ1bmN0aW9uIE1hbmFnZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmluZShuYW1lLCBkZXBzLCBpbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHNbaV0gPSBtb2R1bGVzW2RlcHNbaV1dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDmnIDkuLvopoHlh73mlbDvvIzkvb/nlKjlh73mlbDov5Tlm57lgLzmiafooYxcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzW25hbWVdID0gaW1wbC5hcHBseShpbXBsLCBkZXBzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0KG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmU6IGRlZmluZSxcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIE15TW9kdWxlcy5kZWZpbmUoJ2ZvbycsIFtdLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGVsbG8oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbGxvOiBoZWxsb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIE15TW9kdWxlcy5kZWZpbmUoJ2JhcicsIFsnZm9vJ10sIGZ1bmN0aW9uKGZvbykge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGkoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2JhciB3aXRoIGZvbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvby5oZWxsbygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpOiBoaVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgRm9vID0gTXlNb2R1bGVzLmdldCgnZm9vJyk7XHJcbiAgICAgICAgICAgIHZhciBCYXIgPSBNeU1vZHVsZXMuZ2V0KCdiYXInKTtcclxuICAgICAgICAgICAgQmFyLmhpKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKiBUcmFjZXVy6aG555uudHJ5LWNhdGNo6Kej5YazRVM25Lul5YmN55qE57qn5L2c55So5Z+fICovXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGNhdGNoVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWklumDqOaXoOazleiuv+mXruaIluS9v+eUqOi/meS4quWPmOmHj1xyXG4gICAgICAgICAgICAgICAgY2F0Y2hWYWx1ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5LWNhdGNoIGJsb2NrJywgY2F0Y2hWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIOaYvuW8j+WIm+W7uuWdl+e6p+S9nOeUqOWfnyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IDI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkb25seSA9ICd5dXVoZWknO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYSwgcmVhZG9ubHkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIGJpbmTop6PlhrNzZXRUaW1lb3V0562J5pe26KKr57uR5a6ad2luZG935Li65LiK5LiL5paHICovXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgICAgIGNvb2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50IDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vcmUgYXdlc29tZTogJywgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5jb3VudCAqIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb29sKCk7XHJcblxyXG4gICAgICAgICAgICAvKiDnrq3lpLTlh73mlbDnu5HlrprliY3lkI7kuIrkuIvmlocgKi9cclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAzLFxyXG4gICAgICAgICAgICAgICAgY29vbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vcmUgYXdlc29tZSBhcnJvdzogJywgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuY291bnQgKiAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmplY3QuY29vbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UxLTEuanMiLCIvKlxyXG4gKiBAQXV0aG9yOiB5dXVoZWlcclxuICogQERhdGU6IDIwMTgtMDEtMTEgMTM6NDY6MDVcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMTcgMTE6MTk6MDRcclxuICovXHJcblxyXG57XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSAnQUxMJztcclxuICAgICAgICAvKiBhcmd1bWVudHMuY2FsbGVl5Y+v5Lul55So5p2l5byV55So5q2j5Zyo6L+Q6KGM55qE5Ye95pWw77yM5YyF5ous5Yy/5ZCN5Ye95pWwICovXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8g6K+l5pa55rOV5piv5LiA56eN6KKr5bqf5byD55qE5pa55qGI77yM5Lil5qC85qih5byP5LiL5Lya5oql6ZSZIGNvbnNvbGUubG9nKGFyZ3VtZW50cy5jYWxsZWUpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgIC8qIOWcqOWHveaVsOaZrumAmuaooeW8j+S4i+ebtOaOpeiwg+eUqOm7mOiupOe7keWumueahHRoaXPkuLrlhajlsYDlr7nosaF3aW5kb3cgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOS4peagvOaooeW8j+S4i+WImeS4jeS8mum7mOiupOe7keWumu+8jHRoaXPkuLp1bmRlZmluZWQgdXNlIHN0cmljdOS4gOWumuimgeWGmeWcqOesrOS4gOihjFxyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTsgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9vKCk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog5Ye95pWw5a6a5LmJ5Zyo6Z2e5Lil5qC85qih5byP5LiL77yM5Y2z5L2/5Zyo5Lil5qC85qih5byP5LiL6LCD55So5L6d54S26KKr6buY6K6k57uR5a6a5Li6d2luZG93ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICB9KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgICAgICAgIGZvbygpOyAvLyB3aW5kb3dcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDpmpDlvI/nu5HlrprkvovlrZAgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMjMzLFxyXG4gICAgICAgICAgICAgICAgZm9vOiBmb29cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG9iai5mb28oKSAvLyAyXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog6KOF566xICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9vLmNhbGwodHJ1ZSk7IC8vIEJvb2xlYW4ge1tbUHJpbWl0aXZlVmFsdWVdXTogdHJ1ZX1cclxuICAgICAgICAgICAgZm9vLmNhbGwoJzEyMycpOyAvLyBTdHJpbmcge1tbUHJpbWl0aXZlVmFsdWVdXTogXCIxMjNcIn1cclxuICAgICAgICAgICAgZm9vLmNhbGwoNDU2KTsgLy8gTnVtYmVyIHtbW1ByaW1pdGl2ZVZhbHVlXV06IDQ1Nn1cclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBmb28gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGFiYyA9IGZvby5iaW5kKG51bGwpO1xyXG4gICAgICAgICAgICAvKiDkuKXmoLzmqKHlvI/kuIvvvIx0aGlz5oyH5ZCR5pivbnVsbO+8jOS9humdnuS4peagvOaooeW8j+S4i++8jHRoaXPmjIflkJHmmK93aW5kb3fvvIzms6jmhI8gKi9cclxuICAgICAgICAgICAgYWJjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiDkuLrkuobpgb/lhY3ku6XkuIrmg4XlhrXvvIzkvb/nlKhETVrmnaXnu5Hlrprmm7TlronlhajnmoR0aGlz77yM6YG/5YWN6buY6K6k57uR5a6a6KeE5YiZICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIEFMTFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2E6ICcgKyBhICsgJywgYjogJyArIGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWIm+W7uuWujOWFqOepuueahOWvueixoe+8jERNWlxyXG4gICAgICAgICAgICB2YXIgRE1aID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5iaW5kKERNWiwgMik7XHJcbiAgICAgICAgICAgIGJhcig0KTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDnrq3lpLTlh73mlbDkuI3pgILnlKjkuo7ku6XkuIrlh6DmnaHop4TliJkgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnuS4gOS4queureWktOWHveaVsFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpc+e7p+aJv+iHqmZvb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvYmoxID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5jYWxsKG9iajEpO1xyXG4gICAgICAgICAgICBiYXIuY2FsbChvYmoyKTsgLy8gMu+8jOi/memHjOeahGNhbGznlLHkuo7kvb/nlKjkuobnrq3lpLTlvLrliLbnu5HlrprkuobkuIrkuIvmlofvvIzkuIDnm7TmmK9vYmoxXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyogZm9yRWFjaOeahOesrOS6jOS4quWPguaVsOWPr+S7pee7keWumuS4iuS4i+aWh++8jOWSjGJpbmTmlYjmnpzkuIDmoLcgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFsxLCAzLCA0XVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3l1dWhlaSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0pKCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuZXZlcnkoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXQucHVzaChpdGVtKTtcclxuICAgICAgICAvKiDpgY3ljobmr4/kuIDkuKrlhYPntKDvvIznm7Toh7Pov5Tlm55mYWxzZSAqL1xyXG4gICAgICAgIHJldHVybiBpdGVtICUgMTEgIT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuc29tZSgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8qIOmBjeWOhuavj+S4gOS4quWFg+e0oO+8jOebtOiHs+i/lOWbnnRydWUgKi9cclxuICAgICAgICByZXR1cm4gaXRlbSAlIDkgPT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMiwgNCwgNl07XHJcbiAgICBmb3IgKGxldCBpIG9mIGFycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiDmlbDnu4Toh6rluKbov63ku6PlmajvvIzlj6/ku6Xkvb/nlKhmb3Itb2bpgY3ljobmlbDnu4TnmoTlgLwgKi9cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMSwgMiwgM107XHJcbiAgICBsZXQgaXQgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxuLyog5a+56LGh5pys6Lqr5rKh5pyJ6L+t5Luj5Zmo77yM6ZyA6KaB5qih5Lu/5ZCO5omN6IO95L2/55SoZm9yLW9mICovXHJcblxyXG4vKiDnlLHkuo7ov63ku6PlmajnmoTlsZ7mgKflsLHmmK9TeW1ib2wuaXRlcmF0b3LvvIzpnIDopoHkvb/nlKjplK7lgLzorr/pl67ms5UgKi9cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBuYW1lOiAneXV1aGVpJyxcclxuICAgICAgICBhZ2U6ICcyMzInXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIOi/meagt+WumuS5ieWPr+S7peS4jeiuqVN5bWJvbOiiq+aemuS4vu+8jOebtOaOpeWumuS5ieS5n+aYr+WPr+S7peeahCAqL1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgU3ltYm9sLml0ZXJhdG9yLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvW2tleXNbaW5kZXgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaW5kZXggPiBrZXlzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGsgb2Ygb2JqKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMSxcclxuICAgICAgICBiOiAyMzMsXHJcbiAgICAgICAgYzogNDQ1LFxyXG4gICAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG8gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtzID0gT2JqZWN0LmtleXMobyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb1trc1tpZHgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaWR4ID4ga3MubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXQgPSBvYmpbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhpdC5uZXh0KCkpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxue1xyXG4gICAgLyogT2JqZWN0LmNyZWF0ZShvYmop5Lya5bCGW1twcm90b3R5cGVdXeWFs+iBlOWIsOaMh+WumuWvueixoe+8jOe7p+aJv+WwseeUseS6jui/meS4quWOn+eQhiAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhOiAxMjNcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIGNvbnNvbGUubG9nKG9iajIuYSlcclxufVxyXG5cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhZ2U6IDIzXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ25hbWUnLCB7XHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6ICd5dXVoZWknXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpIC8vIGFnZVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiDml6DorrplbnVtZXJhYmxl5piv5LuA5LmI77yMaW7mk43kvZznrKbpg73og73lpJ/liKTmlq1rZXnmmK/lkKblnKhvYmrkuK3vvIzlubbkuJTlr7vmib7ljp/lnovpk74gKi9cclxuICAgIGNvbnNvbGUubG9nKCduYW1lJyBpbiBvYmopO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBFUzbmi6XmnIlPYmplY3Quc2V0UHJvdG90eXBlT2bov5vooYzljp/lnovpk77nu6fmib8gKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgRm9vLnByb3RvdHlwZS5hID0gMTtcclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKEJhci5wcm90b3R5cGUsIEZvby5wcm90b3R5cGUpO1xyXG4gICAgbGV0IGJhciA9IG5ldyBCYXIoKTtcclxuICAgIGNvbnNvbGUubG9nKGJhci5hKTtcclxufVxyXG5cclxue1xyXG4gICAgLyog57uE5ZCI57un5om/ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbihuYW1lLCBhZ2UpIHtcclxuICAgICAgICAvKiDnu5HlrprniLbkurLnmoTmnoTpgKDlsZ7mgKcgKi9cclxuICAgICAgICBGb28uY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgLyog5bCGQmFy55qEW1twcm90b3R5cGVdXeWFs+iBlOWIsEZvb+eahO+8jOe7p+aJv0Zvb+eahOWOn+Wei+mTvuWxnuaApyAqL1xyXG4gICAgQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9vLnByb3RvdHlwZSk7XHJcblxyXG4gICAgLyog5L+u5pS56L+HcHJvdG90eXBl5ZCO6ZyA6KaB5omL5Yqo5L+u5aSNY29uc3RydWN0b3LnmoTmjIflkJEgKi9cclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBCYXIucHJvdG90eXBlLm15TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcbiAgICBjb25zb2xlLmxvZyhiYXIubXlOYW1lKCkpO1xyXG4gICAgLyogRVM155u05o6l6I635Y+W5LiA5Liq5a+56LGh55qEW1twcm90b3R5cGVdXeeahOaWueW8jyAqL1xyXG4gICAgY29uc29sZS5sb2coT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGUpO1xyXG4gICAgLyog57ud5aSn5aSa5pWw5rWP6KeI5Zmo77yI6Z2e5qCH5YeG6I635Y+W5pa55byP77yJ5pSv5oyBICovXHJcbiAgICBjb25zb2xlLmxvZyhiYXIuX19wcm90b19fID09PSBCYXIucHJvdG90eXBlKTtcclxuICAgIC8qIOe7p+aJv+S5n+WPr+S7pemAmui/h2luc3RhbmNlb2bmib7liLDmupDlpLQgKi9cclxuICAgIGNvbnNvbGUubG9nKGJhciBpbnN0YW5jZW9mIEZvbyk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9iamVjdC5jcmVhdGXoh6rluKbnrKzkuozkuKrlj4LmlbDlj6/ku6XlrprkuYnlsZ7mgKfmj4/ov7DnrKYgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqLCB7XHJcbiAgICAgICAgYjoge1xyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IDNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBvYmoy55qE5Y6f5Z6L6ZO+5LiK6L+e5o6l5LqGb2Jq55qE5Y6f5Z6L6ZO+XHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmEpOyAvLyAyXHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmhhc093blByb3BlcnR5KCdhJykpOyAvLyBmYWxzZVxyXG4gICAgY29uc29sZS5sb2cob2JqLmhhc093blByb3BlcnR5KCdhJykpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDnpZ7lpYfnmoRBUEnorr7orqHvvIznlLHkuo7mnKzouqvlhoXpg6jmsqHmnInor6Xlh73mlbDvvIzljbTog73lpJ/ov5DooYzvvIzkvJrlj5jlvpfmgKrmgKrnmoQgKi9cclxuICAgIC8qIOmdouWQkeWnlOaJmOaooeW8j+adpea6kOS6jk9iamVjdC5jcmVhdGUoKei/meS4queJueaApyAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvb2whJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIG9iajIuY29vbCgpOyAvLyBjb29sIVxyXG59XHJcblxyXG57XHJcbiAgICAvKiDnu4/lhbjnsbvnu6fmib/pnaLlkJHlr7nosaHpo47moLwgKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IGZ1bmN0aW9uKG5hbWUsIGFnZSkge1xyXG4gICAgICAgIEZvby5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb28ucHJvdG90eXBlKTtcclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBsZXQgYmFyMSA9IG5ldyBCYXIoJ3l1dWhlaScsIDIyKTtcclxuICAgIGxldCBiYXIyID0gbmV3IEJhcignU2VsbGVuaXRlJywgMjQpO1xyXG4gICAgY29uc29sZS5sb2coYmFyMSwgYmFyMik7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWvueixoeWnlOaJmOWFs+iBlOmjjuagvCAqL1xyXG4gICAgbGV0IEZvbyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpZGVudGlmeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgSSBhbSAke3RoaXMubmFtZX1gO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IE9iamVjdC5jcmVhdGUoRm9vKTtcclxuICAgIEJhci5zcGVhayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWRlbnRpZnkoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiMSA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGxldCBiMiA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGIxLmluaXQoJ3l1dWhlaScpO1xyXG4gICAgYjIuaW5pdCgnU2VsbGVuaXRlJyk7XHJcbiAgICBiMS5zcGVhaygpO1xyXG4gICAgYjIuc3BlYWsoKTtcclxuICAgIGNvbnNvbGUubG9nKEJhcik7IC8vIHtzcGVhazpmKCl9XHJcbiAgICBjb25zb2xlLmxvZyhiMSk7IC8vIHtuYW1lOiAneXV1aGVpJ31cclxufVxyXG5cclxue1xyXG4gICAgLyog5Y+N6K+N5rOVICovXHJcbiAgICAvKiBFUzbku6XkuIvnmoTnroDmtIHlhpnms5XkvJrnvJbor5HmiJDljL/lkI3lh73mlbDvvIzml6Dms5Xov5vooYzpgJLlvZIgKi9cclxuICAgIGxldCBGb28gPSB7XHJcbiAgICAgICAgLy8g5pyA5aW95LiN6KaB5L2/55SodGhpcy5iYXIoKeaIlkZvby5iYXIoKeaJp+ihjOmAkuW9ku+8jOWboOS4uuWPr+eUqOWunumZheaDheWGteavlOi+g+WwkVxyXG4gICAgICAgIGJhcigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOS7peS4iuWunumZheS8mue8luivkeaIkOS7peS4i+aWueW8j1xyXG4gICAgbGV0IEZvbzEgPSB7XHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWmguaenOimgeaDs+S9v+eUqOmAkuW9ku+8jOS4jeimgeS9v+eUqOeugOS7i+aWueW8j++8jOmcgOimgeS9v+eUqOWFt+WQjeWHveaVsOihqOi+vuW8j1xyXG4gICAgbGV0IEZvbzIgPSB7XHJcbiAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbiBiYXJvb29vKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZGluZy0tLS0tLT4nICsgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAvKiDlhbflkI3lh73mlbDov5vooYzoh6rmiJHpgJLlvZIgKi9cclxuICAgICAgICAgICAgICAgIGJhcm9vb28uY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgRm9vMi5iYXIoKTtcclxufVxyXG5cclxue1xyXG4gICAgbGV0IEZvbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XHJcbiAgICAgICAgRm9vLmNhbGwodGhpcywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvby5wcm90b3R5cGUpO1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcblxyXG4gICAgLyog5YaF55yBICovXHJcbiAgICAvLyDpppblhYjopoHnuqDmraPplJnor6/vvIxCYXIgaW5zdGFuY2VvZiBGb2/mmK/plJnnmoRcclxuXHJcbiAgICAvKiDmnoTpgKDlh73mlbDkuYvpl7RGb2/lkoxCYXLnmoTlhoXnnIEgKi9cclxuICAgIEJhci5wcm90b3R5cGUgaW5zdGFuY2VvZiBGb287IC8vIHRydWVcclxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihCYXIucHJvdG90eXBlKSA9PT0gRm9vLnByb3RvdHlwZTsgLy8gdHJ1ZVxyXG4gICAgRm9vXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKEJhci5wcm90b3R5cGUpOyAvLyB0cnVlXHJcblxyXG4gICAgLyog5a6e5L6L5ZKM5p6E6YCg5Ye95pWw5LmL6Ze055qE5YaF55yBICovXHJcbiAgICBiYXIgaW5zdGFuY2VvZiBCYXI7IC8vIHRydWVcclxuICAgIGJhciBpbnN0YW5jZW9mIEZvbzsgLy8gdHJ1ZVxyXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGU7IC8vLyB0cnVlXHJcbiAgICBGb29cclxuICAgICAgICAucHJvdG90eXBlXHJcbiAgICAgICAgLmlzUHJvdG90eXBlT2YoYmFyKTsgLy8gdHJ1ZVxyXG4gICAgQmFyXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKGJhcik7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG4gICAgLyogT3JibWVudC5wcm90b3R5cGUuY2FsbCh0aGlzLCAuLi4p5piv5Lyq5aSa5oCBICovXHJcbiAgICBjbGFzcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgT3JibWVudDtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBUaGUgJHt0aGlzLm5hbWV9IGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEVOSUdNQSBleHRlbmRzIE9yYm1lbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gc3VwZXIoKeWcqGNvbnN0cnVjdG9y5b+F6aG75ZyodGhpc+iwg+eUqOWJjeaJp+ihjFxyXG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDUwO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIOS7peWJjeeahOS8quWkmuaAgeWGmeazle+8mk9yYm1lbnQucHJvdG90eXBlLnNldFNpemUuYXBwbHkodGhpcywgW3dpZHRoLCBoZWlnaHRdKVxyXG4gICAgICAgICAgICAvLyDms6jmhI/lh7rniYjkuabkuIrnmoRzdXBlcih3aWR0aCwgaGVpZ2h0KeWcqGNvbnN0cnVjdG9y5aSW5L2/55So5bey6KKr56aB5q2i77yM5pS55Li65pu/5o2i5Lul5LiL5pa55byP5a6e546w55u45a+55aSa5oCBXHJcbiAgICAgICAgICAgIHN1cGVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSArPSBgc2l6ZSBpcyB3aWR0aCAke3RoaXMud2lkdGh9IGFuZCBoZWlnaHQgJHt0aGlzLmhlaWdodH1gO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQVJDVVMgZXh0ZW5kcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHN1cGVyKCnlnKhjb25zdHJ1Y3RvcuW/hemhu+WcqHRoaXPosIPnlKjliY3miafooYxcclxuICAgICAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyDku6XliY3nmoTkvKrlpJrmgIHlhpnms5XvvJpPcmJtZW50LnByb3RvdHlwZS5zZXRTaXplLmFwcGx5KHRoaXMsIFt3aWR0aCwgaGVpZ2h0XSlcclxuICAgICAgICAgICAgLy8g5rOo5oSP5Ye654mI5Lmm5LiK55qEc3VwZXIod2lkdGgsIGhlaWdodCnlnKhjb25zdHJ1Y3RvcuWkluS9v+eUqOW3suiiq+emgeatou+8jOaUueS4uuabv+aNouS7peS4i+aWueW8j+WunueOsOebuOWvueWkmuaAgVxyXG4gICAgICAgICAgICBzdXBlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gYHNpemUgaXMgd2lkdGggJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBFTklHTUFfSSA9IG5ldyBBUkNVUygnRU5JR01BX0knKTtcclxuICAgIGxldCBFTklHTUFfSV9TSVpFX01FU1NBR0UgPSBFTklHTUFfSVxyXG4gICAgICAgIC5zZXRTaXplKClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGxldCBBUkNVU19JID0gbmV3IEFSQ1VTKCdBUkNVU19JJyk7XHJcbiAgICBsZXQgQVJDVVNfSV9TSVpFX01FU1NBR0UgPSBBUkNVU19JXHJcbiAgICAgICAgLnNldFNpemUoMTAwLCA3MClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKEVOSUdNQV9JX1NJWkVfTUVTU0FHRSk7XHJcbiAgICBjb25zb2xlLmxvZyhBUkNVU19JX1NJWkVfTUVTU0FHRSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIGNsYXNz5bm25LiN5piv6Z2Z5oCB77yM5Y+q5piv5LiA5LiqcHJvdG90eXBl55qE6K+t5rOV57OW77yM5L2/55SocHJvdG90eXBl5LuN5Y+v5L+u5pS5ICovXHJcbiAgICBjbGFzcyBSYW5kb20ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLm51bSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5kKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByMSA9IG5ldyBSYW5kb20oKTtcclxuICAgIHIxLnJhbmQoKTtcclxuXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLnJhbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSAqIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcjIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICByMi5yYW5kKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UxLTIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG4gKiBAQXV0aG9yOiBTZWxsZW5pdGVcclxuICogQERhdGU6ICAgMjAxOC0wMS0xNiAxMjoyMzoxMFxyXG4gKiBATGFzdCBNb2RpZmllZCBieTogICBTZWxsZW5pdGVcclxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOC0wMS0yMiAwOTo1Nzo0MVxyXG4gKi9cclxuXHJcbntcclxuXHQvKiB0eXBlb2YgbnVsbCBPYmplY3QgQXJyYXkg6YO95Lya6L+U5ZueICdvYmplY3QnICAqL1xyXG5cdGxldCBhID0gbnVsbDtcclxuXHRsZXQgYiA9IHtcclxuXHRcdG5hbWU6ICd5dXVoZWknXHJcblx0fTtcclxuXHRsZXQgYyA9IFsxLCAzXTtcclxuXHRjb25zb2xlLmxvZyh0eXBlb2YgYSwgdHlwZW9mIGIsIHR5cGVvZiBjKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWkjeWQiOadoeS7tuajgOa1i251bGwgKi9cclxuXHRsZXQgYSA9IG51bGw7XHJcblx0Y29uc29sZS5sb2coIWEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKTsgLy8gdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0Lyog5Ye95pWw5a+56LGh55qEbGVuZ3Ro5piv5aOw5piO5Y+C5pWw55qE5Liq5pWwICovXHJcblx0bGV0IGZvbyA9IGZ1bmN0aW9uKGEsIGIsIGMpIHt9O1xyXG5cdGNvbnNvbGUubG9nKGZvby5sZW5ndGgpOyAvLyAzXHJcbn1cclxuXHJcbntcclxuXHQvKiDlo7DmmI7kuobov5jmsqHotYvlgLzlsZ7kuo51bmRlZmluZWQgKi9cclxuXHQvKiDov5jmsqHlo7DmmI7lsZ7kuo51bmRlY2xhcmVk77yIamF2YXNjcmlwdOi/mOaYr+S8muaJk+WNsHVuZGVmaW5lZO+8iSAqL1xyXG59XHJcblxyXG57XHJcblx0LyogdHlwZW9m5LiA5LiqdmFy5aOw5piO5LqG5L2G5pyq5a6a5LmJ5YC855qE6K+d5Lya5omT5Y2wdW5kZWZpbmVkICovXHJcblx0LyogdHlwZW9m5LiA5Liq5a6M5YWo5rKh5pyJ5aOw5piO5Y+K5a6a5LmJ5YC855qE6K+d5ZCM5qC35Lmf5Lya5omT5Y2wdW5kZWZpbmVkICovXHJcbn1cclxuXHJcbntcclxuXHRsZXQgSUlGRSA9IDI7XHJcblx0LyogdHlwZW9m5Yik5pat5b2T5YmN5L2c55So5Z+f5Y+Y6YeP5piv5ZCm6KKr5a6a5LmJICovXHJcblx0bGV0IGhlbHBlciA9ICh0eXBlb2YgSUlGRSAhPT0gJ3VuZGVmaW5lZCcpID8gSUlGRSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Lyogc29tZXRoaW5ncyAqL1xyXG5cdH07XHJcblx0Lyog5L2/55SodHlwZW9m5p2l5qOA5p+l5Y+Y6YeP5piv6aaW6YCJ55qE6YCJ5oupICovXHJcblx0Y29uc29sZS5sb2coaGVscGVyKTsgLy8gMlxyXG59XHJcblxyXG57XHJcblx0Lyog55So5L6d6LWW5rOo5YWl6K6+6K6h5qih5byP5p2l6aqM6K+B5b2T5YmN5L2c55So5Z+f5Y+Y6YeP5piv5ZCm6KKr5a6a5LmJICovXHJcblx0bGV0IGhlbHBlciA9IGZ1bmN0aW9uKElJRkUpIHtcclxuXHRcdGxldCBoZWxwZXIyID0gSUlGRSB8fCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Lyogc29tZXRoaW5ncyAqL1xyXG5cdFx0fTtcclxuXHR9O1xyXG59XHJcblxyXG57XHJcblx0Lyog5Yib5bu656iA55aP5pWw57uE77yM56m655m955qE5Zyw5pa55Lya6KKr5pi+5byP6LWL5YC85Li6dW5kZWZpbmVkICovXHJcblx0bGV0IGFyciA9IFtdO1xyXG5cdGFyclswXSA9IDA7XHJcblx0YXJyWzRdID0gNDtcclxuXHRjb25zb2xlLmxvZyhhcnIubGVuZ3RoKTsgLy8gNVxyXG59XHJcblxyXG57XHJcblx0Lyog5pWw57uE5Lmf5piv5a+56LGh77yM5Y+v5Lul5YyF5ZCr5a2X56ym5Liy6ZSu5YC85ZKM5bGe5oCn77yM5L2G5LiN6K6h5YWl5LqO5pWw57uE55qE6ZW/5bqmICovXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRhcnJbJ25hbWUnXSA9ICd5dXVoZWknO1xyXG5cdGFyclsnYWdlJ10gPSAyMztcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyci5sZW5ndGgpOyAvLyAzXHJcbn1cclxuXHJcbntcclxuXHQvKiDms6jmhI/vvIzlpoLmnpzlrZfnrKbkuLLplK7lgLzog73lpJ/ovazmjaLkuLrljYHov5vliLbmlbDlrZfvvIzkvJrooqvlvZPkvZzmlbDlrZfntKLlvJXlpITnkIYgKi9cclxuXHRsZXQgYXJyID0gWzEsIDMsIDVdO1xyXG5cdGFyclsnNSddID0gMTAwO1xyXG5cdGNvbnNvbGUubG9nKGFycik7XHJcbn1cclxuXHJcbntcclxuXHQvKiDnsbvmlbDnu4Tlj4rmlbDnu4Tlia/mnKzlu7rnq4sgKi9cclxuXHQvLyDnsbvmlbDnu4TovazmjaJcclxuXHRsZXQgZm9vID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRcdGNvbnNvbGUubG9nKGFycilcclxuXHR9XHJcblx0Zm9vKClcclxuXHJcblx0Ly8g5pWw57uE5Ymv5pysXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRsZXQgYXJyQ29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycilcclxuXHRhcnIucHVzaCgxMDApO1xyXG5cdGFyckNvcHkucHVzaCgyMDApO1xyXG5cdGNvbnNvbGUubG9nKGFyciwgYXJyQ29weSk7XHJcblxyXG5cdC8vIEVTNueahEFycmF5LmZyb23kuZ/og73lpJ/lu7rnq4vlia/mnKxcclxuXHRsZXQgYXJyMiA9IFsyLCA0LCA2XTtcclxuXHRsZXQgYXJyQ29weTIgPSBBcnJheS5mcm9tKGFycjIpO1xyXG5cdGFycjIucHVzaCgxMDApO1xyXG5cdGFyckNvcHkyLnB1c2goMjAwKTtcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyckNvcHkyKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOiuv+mXruWtl+espuS4suafkOS4quS4i+agh+W6lOivpeeUqC5jaGFyQXQoKe+8jOiAgeeJiOacrElF5LiN5YWB6K64c3RyaW5nW2luZGV4Xei/meagt+iuv+mXriAqL1xyXG5cdC8qIOS7peS4iuWPquiDveWkn+i/m+ihjOWtl+espuS4suiuv+mXru+8jOaXoOazlei/m+ihjOWtl+espuS4suS/ruaUuSAqL1xyXG5cdGxldCBzdHJpbmcgPSAnZm9vJztcclxuXHRjb25zb2xlLmxvZyhzdHJpbmdbMF0pO1xyXG5cdGNvbnNvbGUubG9nKHN0cmluZy5jaGFyQXQoMikpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5pWw5a2X5YC85Y+v55So5oyH5pWw6KGo56S6ICovXHJcblx0bGV0IGEgPSA1RTEwO1xyXG5cdGNvbnNvbGUubG9nKGEpO1xyXG59XHJcblxyXG57XHJcblx0bGV0IGEgPSA0Mi41OTtcclxuXHQvKiAudG9GaXhlZCgp55So5LqO5oyH5a6a5bCP5pWw5pi+56S65aSa5bCR5LiqICovXHJcblx0Y29uc29sZS5sb2coYS50b0ZpeGVkKDQpKTtcclxuXHQvKiAudG9QcmVjaXNpb24oKeeUqOS6juaMh+WumuWkmuWwkeS4quacieaViOaVsOS9jSAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9QcmVjaXNpb24oNSkpO1xyXG59XHJcblxyXG57XHJcblx0LyogRVM277yM5Lil5qC85qih5byP5LiN5YaN5pSv5oyBMOW8gOWktOeahOWFq+i/m+WItuaVsCAqL1xyXG5cdC8vIGxldCBhID0gMDM2MztcclxuXHQvLyBjb25zb2xlLmxvZyhhKTsgIFN5bnRheEVycm9yXHJcblxyXG5cdC8qIEVTNuWSjOS4peagvOaooeW8j+S4i+eahOWFq+i/m+WItuaYr+eUqDBv5YmN57yA6KGo56S6ICovXHJcblx0bGV0IGEgPSAwbzM2MztcclxuXHRjb25zb2xlLmxvZyhhKTsgLy8gMjQzXHJcbn1cclxuXHJcbntcclxuXHQvKiDms6jmhI8wLjErMC4y5LiN562J5LqOMC4z77yM5a2Y5Zyo57K+5bqm6Zeu6aKYICovXHJcblx0bGV0IGEgPSAwLjEgKyAwLjI7XHJcblx0bGV0IGIgPSAwLjNcclxuXHRjb25zb2xlLmxvZyhhID09PSBiKSAvLyBmYWxzZVxyXG59XHJcblxyXG57XHJcblx0LyogTmFO5LiN5LiOTmFO55u4562J77yMdHlwZW9mIE5hTueahOWAvOS4uidudW1iZXInICovXHJcblx0Y29uc29sZS5sb2codHlwZW9mIE5hTik7IC8vIG51bWJlclxyXG5cdGNvbnNvbGUubG9nKE5hTiA9PT0gTmFOKTsgLy8gZmFsc2VcclxufVxyXG5cclxue1xyXG5cdC8qIHdpbmRvd+acieS4gOS4quWFqOWxgOaWueazlWlzTmFOKCnvvIzkvYbov5nkuKrmnIlidWfvvIzkvJrlsIZOYU7lkozlrZfnrKbkuLLkuZ/kvJrliKTmlq3kuLp0cnVlICovXHJcblx0LyogRVM255qETnVtYmVyLmlzTmFOKCnkv67lpI3kuobov5nkuKrpl67popjvvIzku5bkvJrlhYjnlKh0eXBlb2bliKTmlq3kuLpudW1iZXLlho3miafooYzmraTmlrnms5VcclxuXHTvvIjkuIrpnaLmj5DliLB0eXBlb2YgTmFO6L+U5Zue55qE5pivJ251bWJlcifvvIkgKi9cclxuXHRsZXQgYSA9ICdmb28nO1xyXG5cdGxldCBiID0gMTAgLyAnZm9vJztcclxuXHRjb25zb2xlLmxvZyh3aW5kb3cuaXNOYU4oYSkpOyAvLyB0cnVlLCBidWdcclxuXHRjb25zb2xlLmxvZyh3aW5kb3cuaXNOYU4oYikpOyAvLyB0cnVlXHJcblxyXG5cdGNvbnNvbGUubG9nKE51bWJlci5pc05hTihhKSk7IC8vIGZhbHNl77yM5L+u5aSN5LqGXHJcblx0Y29uc29sZS5sb2coTnVtYmVyLmlzTmFOKGIpKTsgLy8gdHJ1ZVxyXG5cclxuXHQvKiDliKTmlq3mmK/lkKZOYU7nmoTmm7TnroDljZXmlrnms5UgKi9cclxuXHRsZXQgSXNOYU4gPSBmdW5jdGlvbihuKSB7XHJcblx0XHRyZXR1cm4gbiAhPT0gbjtcclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKElzTmFOKGIpKTsgLy8gdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0Lyog5YWz5LqOLTDvvIwwID09PSAtMOaYr3RydWUgKi9cclxuXHQvKiDmlbDlrZfovazkuLrlrZfnrKbkuLLvvIwt5Y+35raI5aSx77yb5a2X56ym5Liy6L2s5Li65pWw5a2X77yMLeWPt+S/neeVmSAqL1xyXG5cdC8qIEpTT04uc3RyaW5naWZ5KC0wKSDov5Tlm55cIjBcIu+8jOiAjEpTT04ucGFyc2UoXCItMFwiKSDov5Tlm54tMCAqL1xyXG5cdGNvbnNvbGUubG9nKDAgPT09IC0wKTsgLy8gdHJ1ZVxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KC0wKSwgSlNPTi5wYXJzZSgnLTAnKSk7XHJcblxyXG5cdC8qIOWIpOaWreaYr+WQpuS4uui0nzDnmoTmlrnms5UgKi9cclxuXHRsZXQgaXNNaW5aZXJvID0gZnVuY3Rpb24obikge1xyXG5cdFx0biA9IE51bWJlcihuKTtcclxuXHRcdHJldHVybiAobiA9PT0gMCkgJiYgKDEgLyBuID09PSAtSW5maW5pdHkpO1xyXG5cdH1cclxuXHJcblx0Y29uc29sZS5sb2coaXNNaW5aZXJvKC0wKSk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWOn+eUn+WHveaVsCAqL1xyXG5cdC8vIFN0cmluZygpXHJcblx0Ly8gTnVtYmVyKClcclxuXHQvLyBPYmplY3QoKVxyXG5cdC8vIEFycmF5KClcclxuXHQvLyBCb29sZWFuKClcclxuXHQvLyBGdW5jdGlvbigpXHJcblx0Ly8gUmVnRXhwKClcclxuXHQvLyBFcnJvcigpXHJcblx0Ly8gRGF0ZSgpXHJcblx0Ly8gU3ltYm9sKClcclxufVxyXG5cclxue1xyXG5cdC8qIHR5cGVvZiBuZXcgU3RyaW5nKCcxMjMnKeS8mui/lOWbnm9iamVjdCAqL1xyXG5cdGxldCBhID0gbmV3IFN0cmluZygnSGVsbG8nKTtcclxuXHRjb25zb2xlLmxvZyhhKTsgLy8gU3RyaW5nIHtcIkhlbGxvXCJ9XHJcblxyXG5cdC8qIOS9v+eUqFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcoKeiDveWkn+i/lOWbnnN0cmluZ+Wtl+espuS4siAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9TdHJpbmcoKSk7IC8vIFwiSGVsbG9cIlxyXG5cdGNvbnNvbGUubG9nKFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSk7IC8vIFwiSGVsbG9cIlxyXG5cclxuXHQvKiDkuI7mnKzouqvmnoTpgKDlh73mlbDnmoR2YWx1ZU9mKCnlip/og73nm7jlkIwgKi9cclxuXHRjb25zb2xlLmxvZyhhLnZhbHVlT2YoKSk7IC8vIFwiSGVsbG9cIlxyXG5cdGNvbnNvbGUubG9nKFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKGEpKTsgLy8gXCJIZWxsb1wiXHJcblxyXG5cdC8qIE9iamVjdC5wcm90b3R5cGXmmK/kuI3lkIznmoQgKi9cclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBbb2JqZWN0IFN0cmluZ11cclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuY2FsbChhKSk7IC8vIFN0cmluZyB7XCJIZWxsb1wifVxyXG59XHJcblxyXG57XHJcblx0Lyog5p+l55yL5LiA5Liq5YaF6YOo5bGe5oCnW1tjbGFzc11d5L2/55SoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCkgKi9cclxuXHRsZXQgYSA9IG5ldyBCb29sZWFuKGZhbHNlKTtcclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBbb2JqZWN0IEJvb2xlYW5dXHJcbn1cclxuXHJcbntcclxuXHQvKiDmg7PopoHlvpfliLDlsIHoo4Xlr7nosaHnmoTln7rmnKznsbvlnovlgLzvvIzlj6/ku6Xkvb/nlKh2YWx1ZU9mKCnlh73mlbAgKi9cclxuXHRsZXQgYSA9IG5ldyBTdHJpbmcoJ0hlbGxvJyk7XHJcblx0Y29uc29sZS5sb2coYS52YWx1ZU9mKCkpO1xyXG5cclxuXHQvKiDpmpDlvI/mi4blsIEgKi9cclxuXHRsZXQgYiA9IGEgKyBcIlwiO1xyXG5cdGNvbnNvbGUubG9nKGIpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5bCd6K+V5a+55LiA5LiqbmV3IFN0cmluZy9Cb29sZWFuL051bWJlcui/m+ihjOmakOW8j+iuv+mXru+8jOS8mumAoOaIkOW8uuWItuexu+Wei+i9rOaNolxyXG5cdCAgIOS8muiuv+mXruWvueW6lOeahOaehOmAoOWHveaVsOWOn+Wei+mTvuS4iueahHZhbHVlT2bmlrnms5UgKi9cclxuXHRsZXQgc3RyaW5nID0gbmV3IFN0cmluZygnc3RyaW5nMScpO1xyXG5cdC8vIOmakOW8j+iuv+mXru+8jOWunumZheaYr+iwg+eUqOi/lOWbnuS6hlN0cmluZy5wcm90b3R5cGUudmFsdWVPZueahOWAvO+8jOW8uuWItuexu+Wei+i9rOaNolxyXG5cdGlmIChzdHJpbmcuaW5kZXhPZigxKSAhPT0gLTEpIHtcclxuXHRcdGNvbnNvbGUubG9nKCduZXcgU3RyaW5nIGRpcmVjdCByZWFkJyk7XHJcblx0fVxyXG59XHJcblxyXG57XHJcblx0Lyog5b2TbmV3IEFycmF555qE5pe25YCZ5Y+q5Lyg5YWl5LiA5Liq5pWw77yMXHJcblx0ICAg5omn6KGM55qE5piv5Yib5bu65LiA5Liq5pWw57uE77yM6ZW/5bqm5Li6MTDvvIzkuJTlhajkuLrnqbrljZXlhYPvvIjpnZ51bmRlZmluZWTvvInloavlhYUgKi9cclxuXHQvKiDnqbrljZXlhYPlkox1bmRlZmluZWTmmK/mnInljLrliKvnmoTvvIzms6jmhI8gKi9cclxuXHRsZXQgYSA9IEFycmF5KDEwKTsgLy8gbmV35Y+v5Lul55yB55Wl77yManPkvJroh6rliqjooaXliqBcclxuXHRjb25zb2xlLmxvZyhhLCBhLmxlbmd0aCk7XHJcblxyXG5cdC8qIOa4heepuuS4gOS4quaVsOe7hOWPr+S7peS9v+eUqGFycmF5Lmxlbmd0aCA9IDAgKi9cclxuXHRsZXQgYiA9IFsyLCA0LCA2XTtcclxuXHRiLmxlbmd0aCA9IDA7XHJcblx0Y29uc29sZS5sb2coYik7XHJcblxyXG5cdC8qIOWIm+W7uuS4gOS4quWFqOaYr3VuZGVmaW5lZO+8iOmdnuepuuWNleWFg++8ieWhq+WFheeahOaVsOe7hCAqL1xyXG5cdC8qIGFycmF5Lmxlbmd0aOi/meagt+W8uuihjOS/ruaUueS8mueUqOepuuWNleWFg+Whq+WFheWkmuS9meeahOepuuS9jSAqL1xyXG5cdGxldCBjID0gQXJyYXkuYXBwbHkobnVsbCwge1xyXG5cdFx0bGVuZ3RoOiAzXHJcblx0fSk7XHJcblx0Y29uc29sZS5sb2coYyk7IC8vIFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxyXG5cclxuXHQvKiDmsLjov5zkuI3opoHliJvlu7rlkozkvb/nlKjnqbrljZXlhYPmlbDnu4QgKi9cclxufVxyXG5cclxue1xyXG5cdC8vIFN0cmluZy5wcm90b3R5cGXnmoTlkITnsbvmlrnms5XvvIzkuI3kv67mlLnljp/lrZfnrKbkuLJcclxuXHQvLyBTdHJpbmcjLmluZGV4T2ZcclxuXHQvLyBTdHJpbmcjLmNoYXJBdFxyXG5cdC8vIFN0cmluZyMuc3Vic3RyIFN0cmluZyMuc3Vic3RyaW5nIFN0cmluZyMuc2xpY2UoKVxyXG5cdC8vIFN0cmluZyMudG9VcHBlckNhc2UgU3RyaW5nIy50b0xvd2VyQ2FzZSgpXHJcblx0Ly8gU3RyaW5nIy50cmltXHJcbn1cclxuXHJcbntcclxuXHQvKiBTeW1ib2zkvb/nlKjljp/nlJ/mnoTpgKDlh73mlbDmnaXlrprkuYnvvIzkuI3nlKjliqBuZXcgKi9cclxuXHRsZXQgbXlvd24gPSBTeW1ib2woJ2RlbGV0ZVNvbWV0aGluZycpO1xyXG5cdGxldCBhID0ge307XHJcblx0YVtTeW1ib2woJ2RlbGV0ZVNvbWV0aGluZycpXSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0LyogZG9Tb21ldGhpbmcgKi9cclxuXHR9XHJcblx0Y29uc29sZS5sb2coYSk7XHJcblx0Y29uc29sZS5sb2coT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhhKSk7XHJcblxyXG5cdC8qIOWFt+acieWUr+S4gOaAp++8jOW+iOWkmuW8gOWPkeWWnOasouS9v+eUqOi/meS4queUqOS6juengeacieWxnuaAp+S7o+abv19mdW5jdGlvbiAqL1xyXG59XHJcblxyXG57XHJcblx0LyogSlNPTi5zdHJpbmdpZnkoKeWcqOmBh+WIsHVuZGVmaW5lZO+8jGZ1bmN0aW9u77yMc3ltYm9s6L+Z5LiJ5Liq5LiN5a6J5YWo5YC85pe277yMXHJcblx0ICAg5Zyo5a+56LGh5Lya5bCG5YW26Ieq5Yqo5b+955Wl77yM5Zyo5pWw57uE5Lit6L+U5ZuebnVsbO+8jOWcqOS4gOiIrOiwg+eUqOS8mui/lOWbnnVuZGVmaW5lZCAqL1xyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVuZGVmaW5lZCkpOyAvLyB1bmRlZmluZWRcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShmdW5jdGlvbigpIHt9KSk7IC8vIHVuZGVmaW5lZFxyXG5cdC8vIFwie1wiYVwiOiAyfVwiXHJcblx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0YTogMixcclxuXHRcdGI6IGZ1bmN0aW9uKCkge31cclxuXHR9KSk7XHJcblx0Ly8gXCJbXCJ5dXVoZWlcIiwgbnVsbCwgbnVsbCwgNF1cIlxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFsneXV1aGVpJywgdW5kZWZpbmVkLCBmdW5jdGlvbigpIHt9LCA0XSkpO1xyXG59XHJcblxyXG57XHJcblx0LyogSlNPTi5zdHJpbmdpZnnmnInkuIDkuKrlvojlrp7nlKjnmoRyZXBsYWNlcu+8jOWPr+S7peWvueaVsOaNrui/m+ihjOetm+mAieWkhOeQhiAqL1xyXG5cdC8vIOWPr+S7peaYr+aVsOe7hOaIluWHveaVsFxyXG5cdGxldCBvYmogPSB7XHJcblx0XHRhOiAyLFxyXG5cdFx0YjogXCIyMlwiLFxyXG5cdFx0YzogWzEsIDIsIDNdXHJcblx0fVxyXG5cdC8vIHJlcGxhY2Vy5Li65pWw57uE5pe255qE5L2c55SoXHJcblx0bGV0IGpzb24xID0gSlNPTi5zdHJpbmdpZnkob2JqLCBbXCJhXCIsIFwiYlwiXSk7IC8vIOWPquW6j+WIl+WMlmtleeWAvOS4umHlkoxi55qEXHJcblx0Y29uc29sZS5sb2coanNvbjEpOyAvLyBcIntcImJcIjpcIjIyXCIsXCJjXCI6WzEsMiwzXX1cIlxyXG5cclxuXHQvLyByZXBsYWNlcuS4umZ1bmN0aW9u5pe255qE5L2c55SoXHJcblx0bGV0IGpzb24yID0gSlNPTi5zdHJpbmdpZnkob2JqLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoa2V5ICE9PSBcImFcIikgcmV0dXJuIHZhbHVlO1xyXG5cdH0pO1xyXG5cdGNvbnNvbGUubG9nKGpzb24yKTtcclxuXHJcblx0Ly8g56ys5LiJ5Liq5Y+C5pWwc3BhY2XvvIzov5jlj6/ku6XosIPnvKnov5vvvIzoh6rliqjov5vooYzmoLzlvI/ljJbvvIzov5jlj6/ku6XmmK/loavlhYXlrZfnrKbkuLJcclxuXHRsZXQganNvbjMgPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDQpO1xyXG5cdGNvbnNvbGUubG9nKGpzb24zKTtcclxuXHQvLyB7XHJcblx0Ly8gXHQgIFwiYVwiOiAyLFxyXG5cdC8vXHQgIFwiYlwiOiBcIjIyXCIsXHJcblx0Ly9cdCAgXCJjXCI6IFtcclxuXHQvL1x0ICBcdCAgMSxcclxuXHQvL1x0XHQgIDIsXHJcblx0Ly9cdFx0ICAzXHJcblx0Ly9cdCAgXVxyXG5cdC8vIH1cclxufVxyXG5cclxue1xyXG5cdC8qIOS7peS4i+W4g+WwlOWBh+akjeWcqOW8uuWItui9rOaNoueahOaXtuWAmee7k+aenOmDveS4umZhbHNl77yM5by65Yi26L2s5o2i5pivISEgKi9cclxuXHQvLyB1bmRlZmluZWQsIG51bGwsIGZhc2xlLCArMCwgLTAsIE5hTiwgXCJcIlxyXG5cdGNvbnNvbGUubG9nKCEhdW5kZWZpbmVkIHx8ICEhbnVsbCB8fCAhIWZhbHNlIHx8ICEhMCB8fCAhIU5hTiB8fCAhIVwiXCIpOyAvLyBmYWxzZVxyXG5cdC8vIGRvY3VtZW50LmFsbOWcqOafkOS6m0lF5ZKM5p+Q5Lqb5rWP6KeI5Zmo5piv5Li655yf5YC877yM5Zyo5p+Q5Lqb5rWP6KeI5Zmo5LiL5Li65YGH5YC877yM5piv5LiA5Liq57G75pWw57uEXHJcblxyXG5cdC8qIOWBh+WAvOS5i+WklumDveaYr+ecn+WAvO+8jOi9rOaNouWQjumDveS4unRydWUgKi9cclxufVxyXG5cclxue1xyXG5cdC8qIOaYvuW8j+W8uuWItuexu+Wei+i9rOaNoiAqL1xyXG5cdC8vIOWtl+espuS4suWSjOaVsOWtl+S5i+mXtOeahOaYvuW8j+i9rOaNou+8jOS4jeimgeS9v+eUqG5ld++8jOW5tuS4jeaYr+WIm+W7uuWvueixoVxyXG5cdGxldCBhID0gMjI7XHJcblx0bGV0IGIgPSBcIjMuMTRcIjtcclxuXHJcblx0bGV0IGMgPSBTdHJpbmcoYSk7XHJcblx0bGV0IGQgPSBOdW1iZXIoYik7XHJcblxyXG5cdGNvbnNvbGUubG9nKGMsIGQpOyAvLyBcIjIyXCIsIDMuMTRcclxuXHJcblx0Ly8g5Y+m5LiA56eN5pa55rOV55qE5pi+5byP6L2s5o2iXHJcblx0bGV0IGUgPSBhLnRvU3RyaW5nKCk7IC8vIOiwg+eUqOeahOaYr051bWJlci5wcm90b3R5cGUudG9TdHJpbmdcclxuXHRsZXQgZiA9ICtiO1xyXG5cdGNvbnNvbGUubG9nKGUsIGYpOyAvLyBcIjIyXCIsIDMuMTRcclxufVxyXG5cclxue1xyXG5cdC8vIOaXpeacn+aYvuekuui9rOaNouS4uuaVsOWtl++8iOebuOW9k+S6ji5nZXRUaW1lKCnlip/og73vvIlcclxuXHRsZXQgYSA9IG5ldyBEYXRlKCk7XHJcblx0Y29uc29sZS5sb2coK2EsIGEuZ2V0VGltZSgpKTtcclxuXHJcblx0Ly8g5b2T5a6e5L6L5YyW5LiA5Liq5p6E6YCg5Ye95pWw55qE5pe25YCZ5aaC5p6c5rKh5pyJ5Y+C5pWw5Lyg5YWl77yM5Y+v5Lul5LiN5YqgKClcclxuXHRjb25zb2xlLmxvZygrbmV3IERhdGUpO1xyXG5cclxuXHQvLyBFUzXnmoREYXRl5pyJ5LiA5Liq6I635Y+W5b2T5YmN5pe26Ze05oiz55qEQVBJ77yM5YW2cG9seWZpbGzlsLHmmK8rbmV3IERhdGUoKVxyXG5cdGNvbnNvbGUubG9nKERhdGUubm93KCkpO1xyXG59XHJcblxyXG57XHJcblx0LyogcGFyc2VJbnTnmoTkvb/nlKggKi9cclxuXHJcblx0Ly8gcGFyc2VJbnTpkojlr7nnmoTmmK/lrZfnrKbkuLLvvIzopoHmsYLmiYDmnInlrZfnrKbpg73mmK/mlbDlrZfvvIzlkKbliJnov5Tlm55OYU5cclxuXHQvLyBOdW1iZXIoKeWPr+S7peW/veeVpeS4jeaYr+aVsOWtl+Wtl+espueahOWtl+espuS4su+8jOmBh+WIsOmdnuaVsOWtl+Wtl+espuWImeWBnOatoui9rOaNolxyXG5cdGxldCBhID0gJzEyYWE0NSc7XHJcblx0bGV0IGIgPSAnNDU2JztcclxuXHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSksIE51bWJlcihhKSk7IC8vIE5hTiwgNDY1XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYiksIE51bWJlcihiKSk7IC8vIDEyLCA0NTZcclxufVxyXG5cclxue1xyXG5cdC8qIHBhcnNlSW5055qE56ys5LqM5Liq5Y+C5pWw6L2s5Yi26Zeu6aKY77yM5bCG5b2T5YmN5pWw5YC85a6a5LmJ5Li66Ieq5a6a5LmJ6L+b5Yi277yM5LiN55So5Yqg5YmN57yAXHJcblx0ICAg54S25ZCO6L2s5o2i5Li65pWw5a2XICovXHJcblxyXG5cdC8vIOWmguaenOmcgOimgeWcqEVTNeS5i+WJjeeahOeOr+Wig+i/kOihjOW5tuS4lOayoeaciXBvbHlmaWxs77yM6ZyA6KaB5omL5Yqo5Yqg5LiK56ys5LqM5Liq5Y+C5pWwMTBcclxuXHQvLyDlvLrliLbovazmjaLkuLrljYHov5vliLbvvIzkuI3nhLbkvJrooqvovazkuLrlhavov5vliLbvvIzpgb/lhY3kuI3lv4XopoHnmoTlnZFcclxuXHJcblx0bGV0IGEgPSBcIjEwMFwiO1xyXG5cdGxldCBiID0gMjU2O1xyXG5cclxuXHRjb25zb2xlLmxvZyhwYXJzZUludChhLCAxNikpOyAvLyAyNTZcclxuXHRjb25zb2xlLmxvZyhwYXJzZUludChhLCA4KSk7IC8vIDY0XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMikpOyAvLyA0XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMTApKTsgLy8gMTAwXHJcblxyXG5cdC8qIHRvU3RyaW5nKCnkvKDlhaXlj4LmlbDvvIzlj6/ku6XlsIblvZPliY3mlbDlgLzovazmjaLkuLrmjIflrprov5vliLYgKi9cclxuXHRjb25zb2xlLmxvZyhiLnRvU3RyaW5nKDE2KSk7IC8vIDEwMFxyXG59XHJcblxyXG57XHJcblx0Lyog6Ieq5a6a5LmJ6L2s5o2iICovXHJcblxyXG5cdC8vIOWNgei/m+WItuaVsOWAvOi9rOS4uuiHquWumuS5iei/m+WItu+8mlxyXG5cdGxldCBkZWNpbWFsVG9PdGhlciA9IGZ1bmN0aW9uKG51bSwgdHJhbnNmb3JtKSB7XHJcblx0XHQvKiDov5Tlm57nmoTmmK/lrZfnrKbkuLLvvIznlKjkuo7lsZXnpLogKi9cclxuXHRcdHZhciBudW0gPSArbnVtO1xyXG5cdFx0dmFyIHRyYW5zZm9ybSA9ICt0cmFuc2Zvcm07XHJcblx0XHRpZiAodHJhbnNmb3JtID09PSAxNikge1xyXG5cdFx0XHRyZXR1cm4gJzB4JyArIG51bS50b1N0cmluZygxNik7XHJcblx0XHR9IGVsc2UgaWYgKHRyYW5zZm9ybSA9PT0gOCkge1xyXG5cdFx0XHRyZXR1cm4gJzBvJyArIG51bS50b1N0cmluZyg4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudW0udG9TdHJpbmcodHJhbnNmb3JtKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKGRlY2ltYWxUb090aGVyKDEwMCwgOCkpOyAvLyBcIjBvMTQ0XCJcclxuXHJcblx0Ly8g5YW25LuW6L2s5Yi26L2s5o2i5Li65Y2B6L+b5Yi277yI5Lyg5YWl5qCH5YeG5qC85byPMFjmiJYwb+etieWtl+espuS4suagvOW8j++8ie+8mlxyXG5cdGxldCBvdGhlclRvRGVjaW1hbCA9IGZ1bmN0aW9uKG51bSkge1xyXG5cdFx0Lyog6L+U5Zue5pWw5a2XICovXHJcblx0XHR2YXIgbnVtID0gbnVtLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAobnVtLmluZGV4T2YoJzB4JykgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KG51bS5yZXBsYWNlKC8weC8sICcnKSwgMTYpO1xyXG5cdFx0fSBlbHNlIGlmIChudW0uaW5kZXhPZignMG8nKSA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQobnVtLnJlcGxhY2UoLzBvLywgJycpLCA4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludChudW0sIDEwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKG90aGVyVG9EZWNpbWFsKCcweDEwMCcpKTsgLy8gMjU2XHJcbn1cclxuXHJcbntcclxuXHQvKiBib29sZWFu5pi+56S66L2s5o2i77yM5bu66K6u5L2/55SoISHnlKjmnaXovazmjaIgKi9cclxuXHRsZXQgYSA9IFwiYXNkXCI7XHJcblx0bGV0IGIgPSBbXTtcclxuXHRsZXQgYyA9IHt9O1xyXG5cclxuXHQvLyDms6jmhI/nqbrmlbDnu4Tlkoznqbrlr7nosaHpg73mmK/ov5Tlm550cnVl44CC5piv55yf5YC877yM5omA5pyJ55qE5YGH5YC85LiK6Z2i5pyJ5o+Q5YiwXHJcblx0Y29uc29sZS5sb2coQm9vbGVhbihhKSk7IC8vIHRydWVcclxuXHRjb25zb2xlLmxvZyghIWIpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFjKTsgLy90cnVlXHJcbn1cclxuXHJcbntcclxuXHRsZXQgYXJyID0gW1xyXG5cdFx0MixcclxuXHRcdGZ1bmN0aW9uKCkge30sXHJcblx0XHQ0LFxyXG5cdFx0ZnVuY3Rpb24oKSB7fVxyXG5cdF07XHJcblxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFycikpO1xyXG5cclxuXHRsZXQganNvbiA9IEpTT04uc3RyaW5naWZ5KGFyciwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRjb25zb2xlLmxvZyhqc29uKTsgLy8gWzIsdHJ1ZSw0LHRydWVdXHJcbn1cclxuXHJcbntcclxuXHQvKiB8fCDmiJYgJiYg6L+U5Zue55qE5LiN5LiA5a6a5piv5biD5bCU5YC8ICovXHJcblxyXG5cdC8vIOWvueS6jnx877yM5aaC5p6c5b2T5YmN5YC85Yik5pat5Li6dHJ1Ze+8jOWwseS8mui/lOWbnuW9k+WJjeWAvFxyXG5cdGNvbnNvbGUubG9nKGZhbHNlIHx8IFwic3NcIiB8fCAxMTApOyAvLyBcInNzXCJcclxuXHJcblx0Ly8g5a+55LqOJibvvIzlj6ropoHmnInkuIDkuKrlgLzliKTmlq3kuLpmYWxzZe+8jOWwsei/lOWbnuWIpOaWreS4umZhbHNl55qE6YKj5Liq5YC877yMXHJcblx0Ly8g5ZCm5YiZ6L+U5Zue5pyA5ZCO5LiA5Liq5YC8XHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIHVuZGVmaW5lZCAmJiAxMTApOyAvLyB1bmRlZmluZWRcclxuXHRjb25zb2xlLmxvZyhcIjU1XCIgJiYgbnVsbCAmJiAxMTApOyAvLyBudWxsXHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIGZ1bmN0aW9uKCkge30gJiYgMTEwKTsgLy8gMTEwXHJcblxyXG5cdC8vIOaJgOS7pXx85Lya5pyJ5LiA5Liq5bi455So5L2c55So77ya5Lyg5Y+C5Yik5patXHJcblx0bGV0IGZ1bmMgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRhID0gYSB8fCAnSGVsbG8nO1xyXG5cdFx0YiA9IGIgfHwgJ1dvcmxkJztcclxuXHRcdHJldHVybiBhICsgXCIgXCIgKyBiO1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScpKTsgLy8gSGkgV29ybGRcclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScsIFwiXCIpKTsgLy8g5rOo5oSP6L+Z6YeM5Lyg5YWl5LqG5YGH5YC877yM57uT5p6c5L6d54S25pivSGkgV29ybGRcclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScsIFwiIFwiKS50cmltKCkpOyAvLyDkvKDlhaXnqbrlrZfnrKbliJnliKTmlq3kuLp0cnVl77yM6L+U5ZueSGlcclxuXHJcblx0Y29uc29sZS5sb2codHlwZW9mIFwiXCIpIC8vIHN0cmluZ++8jOWmguaciemcgOaxguWPr+S7pemAmui/h+i/meS4qui/m+ihjOWuuemUmVxyXG5cclxuXHQvLyDmiYDku6UmJuS8muacieS4gOS4quW4uOeUqOS9nOeUqO+8muWIpOaWreWPguaVsOaYr+WQpuS4unRydWXvvIzmmK/liJnmiafooYzkuIDkuKrlh73mlbBcclxuXHR0cnVlICYmIChmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzICYmIGZ1bmN0aW9uIScpO1xyXG5cdH0pKCk7XHJcbn1cclxuXHJcbntcclxuXHQvKiDms6jmhI9FUzbnmoRTeW1ib2zlj6rog73lpJ/pgJrov4fmmL7lvI/ovazmjaLkuLrlrZfnrKbkuLLvvIzkvb/nlKjpmpDlvI/lsIbkvJrmiqXplJkgKi9cclxuXHRsZXQgc3ltYm9sID0gU3ltYm9sKCdzeW1ib2xFbGVtZW50Jyk7XHJcblx0Y29uc29sZS5sb2coU3RyaW5nKHN5bWJvbCkpOyAvLyBcIlN5bWJvbChzeW1ib2xFbGVtZW50KVwiXHJcblxyXG5cdC8vIHN5bWJvbCArIFwiXCIg6L+Z5qC36ZqQ5byP6L2s5o2i5Lya5oql6ZSZXHJcblxyXG5cdC8vIFN5bWJvbOaXoOazlei9rOaNouS4uuaVsOWtl++8jOaYvuekuuWSjOmakOW8j+mDveS8muWHuumUmVxyXG5cclxuXHQvLyBTeW1ib2zlj6/ku6XovazmjaLkuLpib29sZWFu77yM6ZqQ5byP5pi+5byP6YO96L2s5o2i5Li6dHJ1ZVxyXG5cdGNvbnNvbGUubG9nKEJvb2xlYW4oc3ltYm9sKSk7IC8vIHRydWVcclxuXHRjb25zb2xlLmxvZyghIXN5bWJvbCk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWFs+S6jj095ZKMPT0955qE5L2/55So5YeG5YiZICovXHJcblxyXG5cdC8vIOW9k+S4pOi+ueacieWAvOS4unRydWXlkoxmYWxzZeeahOaXtuWAme+8jOWJjeW+gOS4jeimgeS9v+eUqD09XHJcblx0Ly8g5b2T5Lik6L655pyJ5YC85Li6W13vvIxcIlwi77yMMOaXtu+8jOWwvemHj+S4jeimgeS9v+eUqD09XHJcblx0Ly8g5L2/55SoPT095piv5pyA5a6J5YWo55qE6YCJ5oupXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UyLTEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpO1xudmFyICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7IHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnkgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5OdW1iZXIuaXNOYU47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
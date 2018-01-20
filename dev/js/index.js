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
 * @Last Modified time: 2018-01-20 15:25:19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzkwMTMxY2ZkNGY2MzVkYmRhNTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RhZ2UxLTEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMS0yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0YWdlMi0xLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1uYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJHTE9CQUwiLCJzZXRUaW1lb3V0IiwidGltZW91dEhhbmRsZXIiLCJhIiwiSUlGRSIsImZuIiwiZGVmIiwiZ2xvYmFsIiwiZm9vIiwiYmFyIiwiZXJyb3IiLCJiYXoiLCJpIiwiaiIsImNvb2xNb2R1bGUiLCJzb21ldGhpbmciLCJhbm90aGVyIiwiZG9Tb21ldGhpbmciLCJkb0Fub3RoZXIiLCJqb2luIiwiY29vbCIsIk15TW9kdWxlcyIsIk1hbmFnZXIiLCJtb2R1bGVzIiwiZGVmaW5lIiwibmFtZSIsImRlcHMiLCJpbXBsIiwibGVuZ3RoIiwiYXBwbHkiLCJnZXQiLCJfdGhpcyIsImhlbGxvIiwiaGkiLCJGb28iLCJCYXIiLCJ1bmRlZmluZWQiLCJjYXRjaFZhbHVlIiwicmVhZG9ubHkiLCJvYmoiLCJjb3VudCIsImJpbmQiLCJvYmplY3QiLCJjYWxsIiwiYWJjIiwiYiIsIkRNWiIsIm9iajEiLCJvYmoyIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsInJldCIsImV2ZXJ5IiwicHVzaCIsInNvbWUiLCJpdCIsIm5leHQiLCJhZ2UiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIm8iLCJrZXlzIiwiZG9uZSIsImsiLCJjIiwiaWR4Iiwia3MiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibXlOYW1lIiwiX19wcm90b19fIiwiaGFzT3duUHJvcGVydHkiLCJiYXIxIiwiYmFyMiIsImluaXQiLCJpZGVudGlmeSIsInNwZWFrIiwiYjEiLCJiMiIsIkZvbzEiLCJGb28yIiwiYmFyb29vbyIsImlzUHJvdG90eXBlT2YiLCJPcmJtZW50IiwibWVzc2FnZSIsIndpZHRoIiwiaGVpZ2h0IiwiRU5JR01BIiwiQVJDVVMiLCJFTklHTUFfSSIsIkVOSUdNQV9JX1NJWkVfTUVTU0FHRSIsInNldFNpemUiLCJnZXRNZXNzYWdlIiwiQVJDVVNfSSIsIkFSQ1VTX0lfU0laRV9NRVNTQUdFIiwiUmFuZG9tIiwibnVtIiwiTWF0aCIsInJhbmRvbSIsInIxIiwicmFuZCIsInIyIiwiaGVscGVyIiwiaGVscGVyMiIsIkFycmF5Iiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcnJDb3B5IiwiYXJyMiIsImFyckNvcHkyIiwic3RyaW5nIiwiY2hhckF0IiwidG9GaXhlZCIsInRvUHJlY2lzaW9uIiwiTmFOIiwiaXNOYU4iLCJJc05hTiIsIm4iLCJKU09OIiwicGFyc2UiLCJpc01pblplcm8iLCJOdW1iZXIiLCJJbmZpbml0eSIsIlN0cmluZyIsInRvU3RyaW5nIiwidmFsdWVPZiIsIkJvb2xlYW4iLCJteW93biIsImpzb24xIiwianNvbjIiLCJrZXkiLCJqc29uMyIsImQiLCJlIiwiZiIsIkRhdGUiLCJnZXRUaW1lIiwibm93IiwicGFyc2VJbnQiLCJkZWNpbWFsVG9PdGhlciIsInRyYW5zZm9ybSIsIm90aGVyVG9EZWNpbWFsIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwicmVwbGFjZSIsImpzb24iLCJmdW5jIiwidHJpbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxt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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkVBQTRFLGtCQUFrQixFQUFFO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGdDQUFnQztBQUN2RjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLGdCQUFnQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDcENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxxQkFBcUI7QUFDdEQ7QUFDQSxpQ0FBaUMsU0FBUyxFQUFFO0FBQzVDLENBQUMsWUFBWTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUyxxQkFBcUI7QUFDM0QsaUNBQWlDLGFBQWE7QUFDOUM7QUFDQSxHQUFHLFlBQVk7QUFDZjtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc5MDEzMWNmZDRmNjM1ZGJkYTU5IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gKCFCVUdHWSAmJiAkbmF0aXZlKSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG4gKiBAQXV0aG9yOiB5dXVoZWlcclxuICogQERhdGU6IDIwMTgtMDEtMTEgMTM6NTE6MjBcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMTcgMTE6MTk6MjdcclxuICovXHJcbnJlcXVpcmUoJy4vc3RhZ2UxLTEuanMnKTtcclxucmVxdWlyZSgnLi9zdGFnZTEtMi5qcycpO1xyXG5yZXF1aXJlKCcuL3N0YWdlMi0xLmpzJyk7XHJcbmNvbnNvbGUubG9nKCc8IS0tLS0tLS0tQWJvdmUgaXMgTGF0ZXN0LS0tLS0tLS0+Jyk7XHJcbmNvbnNvbGUubG9nKCc8IS0tLS0tLS0tQmVsb3cgaXMgQVNZTkMtLS0tLS0tLT4nKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaW5kZXguanMiLCJ3aW5kb3cuR0xPQkFMID0gJ0FMTF9FTEVNRU5UJztcclxuXHJcbntcclxuICAgIC8qIOWbnuiwg+WHveaVsOWPguaVsOaYr+WHveaVsOihqOi+vuW8j++8jOW5tuS4jeaYr+WHveaVsOWjsOaYjiAqL1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0SGFuZGxlcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIHNldFRpbWVvdXQnKVxyXG4gICAgfSwgMzAwKTtcclxufVxyXG5cclxue1xyXG4gICAgbGV0IGEgPSAyMzM7XHJcbiAgICAvKiDnq4vljbPmiafooYzlh73mlbDnrKzkuIDkuKrmi6zlj7fph4znmoTlhoXlrrnooqvlvZPkvZzlh73mlbDooajovr7lvI8gKi9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYSA9IDFcclxuICAgICAgICBjb25zb2xlLmxvZygnaW5uZXIgSUlGRScsIGEpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKiDnq4vljbPmiafooYzlh73mlbDkuZ/lj6/ku6Xmi6XmnInlh73mlbDlkI3vvIzkuZ/lj6/ku6XkvKDlj4IgKi9cclxuICAgIChmdW5jdGlvbiBJSUZFKGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2xvYmFsIElJRkUnLCBhKTtcclxuICAgIH0pKGEpO1xyXG5cclxuICAgIC8qIOS7peS4iuS7o+eggeivreS5ieS4iuetieWQjOS6juS4i+mdou+8jOS4iumdoueahElJRkXlhajlsYDkuIvmmK/ml6Dms5Xorr/pl67nmoQgKi9cclxuICAgIHZhciBJSUZFID0gZnVuY3Rpb24oYSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgSUlGRTInLCBhKTtcclxuICAgIH0oYSk7XHJcblxyXG4gICAgLyogVU1E77yM5bCG5Ye95pWw6KGo6L6+5byP5Lyg6L+bSUlGReeahOaooeW8jyAqL1xyXG4gICAgKGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgZm4od2luZG93KTtcclxuICAgIH0pKGZ1bmN0aW9uIGRlZihnbG9iYWwpIHtcclxuICAgICAgICB2YXIgYSA9IDI7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lubmVyIFVNRCcsIGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnbG9iYWwgVU1EJywgZ2xvYmFsLkdMT0JBTCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxue1xyXG4gICAgLyogdmFy5Y+Y6YeP5aOw5piO5o+Q5Y2HICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7IC8vIHVuZGVmaW5lZFxyXG4gICAgICAgIHZhciBhID0gMjtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLyog5Lul5LiK5Luj56CB562J5ZCM5LqO5LiL6Z2iICovXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGE7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgICAgdmFyIGEgPSAyO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvKiDlh73mlbDlo7DmmI7lj6/ku6Xmj5DliY3vvIzlh73mlbDooajovr7lvI/nmoTlo7DmmI7kvJrlg4/kuIrpnaLlj5jph4/kuIDmoLfnmoTmj5DljYfmiJB1bmRlZmllZCAqL1xyXG4gICAgZm9vKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmb28nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiDlh73mlbDooajovr7lvI/mj5DljYfmiJB1bmRlZmluZWTvvIzmiafooYx1bmRlZmluZWTkvJrmiqVUeXBlRXJyb3LvvIzogIzkuI3mmK9SZWZlcmVuY2VFcnJvciAqL1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBiYXIoKTtcclxuICAgICAgICB2YXIgYmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYXInKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbntcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAvKiDln7rnoYDmoIflh4bpl63ljIUgKi9cclxuICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgIHZhciBhID0gMjtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYmF6ID0gZm9vKCk7XHJcbiAgICAgICAgYmF6KCk7XHJcblxyXG4gICAgICAgIC8qIOmXreWMheW+queOryAqL1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbihqKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGopO1xyXG4gICAgICAgICAgICAgICAgfSwgaiAqIDMwMCk7XHJcbiAgICAgICAgICAgIH0pKGkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiDln7rmnKzmqKHlnZforr7orqHmqKHlvI8gKi9cclxuICAgICAgICBmdW5jdGlvbiBjb29sTW9kdWxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc29tZXRoaW5nID0gJ2Nvb2wnO1xyXG4gICAgICAgICAgICB2YXIgYW5vdGhlciA9IFsxLCAyLCAzXTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc29tZXRoaW5nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJheiA9IGZvbygpO1xyXG4gICAgICAgICAgICBiYXooKTtcclxuXHJcbiAgICAgICAgICAgIC8qIOmXreWMheW+queOryAqL1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGopIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBqICogMzAwKTtcclxuICAgICAgICAgICAgICAgIH0pKGkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIOWfuuacrOaooeWdl+iuvuiuoeaooeW8jyAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb29sTW9kdWxlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvbWV0aGluZyA9ICdjb29sJztcclxuICAgICAgICAgICAgICAgIHZhciBhbm90aGVyID0gWzEsIDIsIDNdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvbWV0aGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9Bbm90aGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFub3RoZXIuam9pbignIScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvU29tZXRoaW5nOiBkb1NvbWV0aGluZyxcclxuICAgICAgICAgICAgICAgICAgICBkb0Fub3RoZXI6IGRvQW5vdGhlclxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGNvb2wgPSBjb29sTW9kdWxlKCk7XHJcbiAgICAgICAgICAgIGNvb2wuZG9Bbm90aGVyKCk7XHJcbiAgICAgICAgICAgIGNvb2wuZG9Tb21ldGhpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8qIOeOsOS7o+aooeWdl+S+nei1luWKoOi9veWZqO+8jOexu3JlcXVpcmVKU+aooeW8jyAqL1xyXG4gICAgICAgICAgICB2YXIgTXlNb2R1bGVzID0gKGZ1bmN0aW9uIE1hbmFnZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmluZShuYW1lLCBkZXBzLCBpbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHNbaV0gPSBtb2R1bGVzW2RlcHNbaV1dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDmnIDkuLvopoHlh73mlbDvvIzkvb/nlKjlh73mlbDov5Tlm57lgLzmiafooYxcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzW25hbWVdID0gaW1wbC5hcHBseShpbXBsLCBkZXBzKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0KG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmU6IGRlZmluZSxcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIE15TW9kdWxlcy5kZWZpbmUoJ2ZvbycsIFtdLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGVsbG8oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbGxvOiBoZWxsb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIE15TW9kdWxlcy5kZWZpbmUoJ2JhcicsIFsnZm9vJ10sIGZ1bmN0aW9uKGZvbykge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGkoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2JhciB3aXRoIGZvbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvby5oZWxsbygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpOiBoaVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgRm9vID0gTXlNb2R1bGVzLmdldCgnZm9vJyk7XHJcbiAgICAgICAgICAgIHZhciBCYXIgPSBNeU1vZHVsZXMuZ2V0KCdiYXInKTtcclxuICAgICAgICAgICAgQmFyLmhpKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKiBUcmFjZXVy6aG555uudHJ5LWNhdGNo6Kej5YazRVM25Lul5YmN55qE57qn5L2c55So5Z+fICovXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGNhdGNoVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWklumDqOaXoOazleiuv+mXruaIluS9v+eUqOi/meS4quWPmOmHj1xyXG4gICAgICAgICAgICAgICAgY2F0Y2hWYWx1ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5LWNhdGNoIGJsb2NrJywgY2F0Y2hWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIOaYvuW8j+WIm+W7uuWdl+e6p+S9nOeUqOWfnyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IDI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkb25seSA9ICd5dXVoZWknO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYSwgcmVhZG9ubHkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIGJpbmTop6PlhrNzZXRUaW1lb3V0562J5pe26KKr57uR5a6ad2luZG935Li65LiK5LiL5paHICovXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgICAgIGNvb2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50IDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vcmUgYXdlc29tZTogJywgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5jb3VudCAqIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb29sKCk7XHJcblxyXG4gICAgICAgICAgICAvKiDnrq3lpLTlh73mlbDnu5HlrprliY3lkI7kuIrkuIvmlocgKi9cclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAzLFxyXG4gICAgICAgICAgICAgICAgY29vbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnQgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vcmUgYXdlc29tZSBhcnJvdzogJywgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuY291bnQgKiAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmplY3QuY29vbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UxLTEuanMiLCIvKlxyXG4gKiBAQXV0aG9yOiB5dXVoZWlcclxuICogQERhdGU6IDIwMTgtMDEtMTEgMTM6NDY6MDVcclxuICogQExhc3QgTW9kaWZpZWQgYnk6ICAgU2VsbGVuaXRlXHJcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTgtMDEtMTcgMTE6MTk6MDRcclxuICovXHJcblxyXG57XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGEgPSAnQUxMJztcclxuICAgICAgICAvKiBhcmd1bWVudHMuY2FsbGVl5Y+v5Lul55So5p2l5byV55So5q2j5Zyo6L+Q6KGM55qE5Ye95pWw77yM5YyF5ous5Yy/5ZCN5Ye95pWwICovXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8g6K+l5pa55rOV5piv5LiA56eN6KKr5bqf5byD55qE5pa55qGI77yM5Lil5qC85qih5byP5LiL5Lya5oql6ZSZIGNvbnNvbGUubG9nKGFyZ3VtZW50cy5jYWxsZWUpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgIC8qIOWcqOWHveaVsOaZrumAmuaooeW8j+S4i+ebtOaOpeiwg+eUqOm7mOiupOe7keWumueahHRoaXPkuLrlhajlsYDlr7nosaF3aW5kb3cgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOS4peagvOaooeW8j+S4i+WImeS4jeS8mum7mOiupOe7keWumu+8jHRoaXPkuLp1bmRlZmluZWQgdXNlIHN0cmljdOS4gOWumuimgeWGmeWcqOesrOS4gOihjFxyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTsgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9vKCk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog5Ye95pWw5a6a5LmJ5Zyo6Z2e5Lil5qC85qih5byP5LiL77yM5Y2z5L2/5Zyo5Lil5qC85qih5byP5LiL6LCD55So5L6d54S26KKr6buY6K6k57uR5a6a5Li6d2luZG93ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZm9vKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICB9KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgICAgICAgIGZvbygpOyAvLyB3aW5kb3dcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDpmpDlvI/nu5HlrprkvovlrZAgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMjMzLFxyXG4gICAgICAgICAgICAgICAgZm9vOiBmb29cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG9iai5mb28oKSAvLyAyXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyog6KOF566xICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9vLmNhbGwodHJ1ZSk7IC8vIEJvb2xlYW4ge1tbUHJpbWl0aXZlVmFsdWVdXTogdHJ1ZX1cclxuICAgICAgICAgICAgZm9vLmNhbGwoJzEyMycpOyAvLyBTdHJpbmcge1tbUHJpbWl0aXZlVmFsdWVdXTogXCIxMjNcIn1cclxuICAgICAgICAgICAgZm9vLmNhbGwoNDU2KTsgLy8gTnVtYmVyIHtbW1ByaW1pdGl2ZVZhbHVlXV06IDQ1Nn1cclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBmb28gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGFiYyA9IGZvby5iaW5kKG51bGwpO1xyXG4gICAgICAgICAgICAvKiDkuKXmoLzmqKHlvI/kuIvvvIx0aGlz5oyH5ZCR5pivbnVsbO+8jOS9humdnuS4peagvOaooeW8j+S4i++8jHRoaXPmjIflkJHmmK93aW5kb3fvvIzms6jmhI8gKi9cclxuICAgICAgICAgICAgYWJjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiDkuLrkuobpgb/lhY3ku6XkuIrmg4XlhrXvvIzkvb/nlKhETVrmnaXnu5Hlrprmm7TlronlhajnmoR0aGlz77yM6YG/5YWN6buY6K6k57uR5a6a6KeE5YiZICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmb28oYSwgYikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7IC8vIEFMTFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2E6ICcgKyBhICsgJywgYjogJyArIGIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWIm+W7uuWujOWFqOepuueahOWvueixoe+8jERNWlxyXG4gICAgICAgICAgICB2YXIgRE1aID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5iaW5kKERNWiwgMik7XHJcbiAgICAgICAgICAgIGJhcig0KTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKiDnrq3lpLTlh73mlbDkuI3pgILnlKjkuo7ku6XkuIrlh6DmnaHop4TliJkgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvbygpIHtcclxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnuS4gOS4queureWktOWHveaVsFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpc+e7p+aJv+iHqmZvb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvYmoxID0ge1xyXG4gICAgICAgICAgICAgICAgYTogMlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHtcclxuICAgICAgICAgICAgICAgIGE6IDRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJhciA9IGZvby5jYWxsKG9iajEpO1xyXG4gICAgICAgICAgICBiYXIuY2FsbChvYmoyKTsgLy8gMu+8jOi/memHjOeahGNhbGznlLHkuo7kvb/nlKjkuobnrq3lpLTlvLrliLbnu5HlrprkuobkuIrkuIvmlofvvIzkuIDnm7TmmK9vYmoxXHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLyogZm9yRWFjaOeahOesrOS6jOS4quWPguaVsOWPr+S7pee7keWumuS4iuS4i+aWh++8jOWSjGJpbmTmlYjmnpzkuIDmoLcgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFsxLCAzLCA0XVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3l1dWhlaSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0pKCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuZXZlcnkoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXQucHVzaChpdGVtKTtcclxuICAgICAgICAvKiDpgY3ljobmr4/kuIDkuKrlhYPntKDvvIznm7Toh7Pov5Tlm55mYWxzZSAqL1xyXG4gICAgICAgIHJldHVybiBpdGVtICUgMTEgIT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgMjMsXHJcbiAgICAgICAgMSxcclxuICAgICAgICA2LFxyXG4gICAgICAgIDc4LFxyXG4gICAgICAgIDksXHJcbiAgICAgICAgMjIsXHJcbiAgICAgICAgMyxcclxuICAgICAgICAxMDBcclxuICAgIF07XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBhcnIuc29tZSgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8qIOmBjeWOhuavj+S4gOS4quWFg+e0oO+8jOebtOiHs+i/lOWbnnRydWUgKi9cclxuICAgICAgICByZXR1cm4gaXRlbSAlIDkgPT09IDA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMiwgNCwgNl07XHJcbiAgICBmb3IgKGxldCBpIG9mIGFycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiDmlbDnu4Toh6rluKbov63ku6PlmajvvIzlj6/ku6Xkvb/nlKhmb3Itb2bpgY3ljobmlbDnu4TnmoTlgLwgKi9cclxuXHJcbntcclxuICAgIGxldCBhcnIgPSBbMSwgMiwgM107XHJcbiAgICBsZXQgaXQgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxuLyog5a+56LGh5pys6Lqr5rKh5pyJ6L+t5Luj5Zmo77yM6ZyA6KaB5qih5Lu/5ZCO5omN6IO95L2/55SoZm9yLW9mICovXHJcblxyXG4vKiDnlLHkuo7ov63ku6PlmajnmoTlsZ7mgKflsLHmmK9TeW1ib2wuaXRlcmF0b3LvvIzpnIDopoHkvb/nlKjplK7lgLzorr/pl67ms5UgKi9cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBuYW1lOiAneXV1aGVpJyxcclxuICAgICAgICBhZ2U6ICcyMzInXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIOi/meagt+WumuS5ieWPr+S7peS4jeiuqVN5bWJvbOiiq+aemuS4vu+8jOebtOaOpeWumuS5ieS5n+aYr+WPr+S7peeahCAqL1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgU3ltYm9sLml0ZXJhdG9yLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvW2tleXNbaW5kZXgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaW5kZXggPiBrZXlzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGsgb2Ygb2JqKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbntcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMSxcclxuICAgICAgICBiOiAyMzMsXHJcbiAgICAgICAgYzogNDQ1LFxyXG4gICAgICAgIFtTeW1ib2wuaXRlcmF0b3JdOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG8gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICAgICAgdmFyIGtzID0gT2JqZWN0LmtleXMobyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb1trc1tpZHgrK11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiAoaWR4ID4ga3MubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXQgPSBvYmpbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxuICAgIGNvbnNvbGUubG9nKGl0Lm5leHQoKSk7XHJcbiAgICBjb25zb2xlLmxvZyhpdC5uZXh0KCkpO1xyXG4gICAgY29uc29sZS5sb2coaXQubmV4dCgpKTtcclxufVxyXG5cclxue1xyXG4gICAgLyogT2JqZWN0LmNyZWF0ZShvYmop5Lya5bCGW1twcm90b3R5cGVdXeWFs+iBlOWIsOaMh+WumuWvueixoe+8jOe7p+aJv+WwseeUseS6jui/meS4quWOn+eQhiAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhOiAxMjNcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIGNvbnNvbGUubG9nKG9iajIuYSlcclxufVxyXG5cclxue1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBhZ2U6IDIzXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ25hbWUnLCB7XHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6ICd5dXVoZWknXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpIC8vIGFnZVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiDml6DorrplbnVtZXJhYmxl5piv5LuA5LmI77yMaW7mk43kvZznrKbpg73og73lpJ/liKTmlq1rZXnmmK/lkKblnKhvYmrkuK3vvIzlubbkuJTlr7vmib7ljp/lnovpk74gKi9cclxuICAgIGNvbnNvbGUubG9nKCduYW1lJyBpbiBvYmopO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiBFUzbmi6XmnIlPYmplY3Quc2V0UHJvdG90eXBlT2bov5vooYzljp/lnovpk77nu6fmib8gKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgRm9vLnByb3RvdHlwZS5hID0gMTtcclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKEJhci5wcm90b3R5cGUsIEZvby5wcm90b3R5cGUpO1xyXG4gICAgbGV0IGJhciA9IG5ldyBCYXIoKTtcclxuICAgIGNvbnNvbGUubG9nKGJhci5hKTtcclxufVxyXG5cclxue1xyXG4gICAgLyog57uE5ZCI57un5om/ICovXHJcbiAgICBsZXQgRm9vID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBCYXIgPSBmdW5jdGlvbihuYW1lLCBhZ2UpIHtcclxuICAgICAgICAvKiDnu5HlrprniLbkurLnmoTmnoTpgKDlsZ7mgKcgKi9cclxuICAgICAgICBGb28uY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgLyog5bCGQmFy55qEW1twcm90b3R5cGVdXeWFs+iBlOWIsEZvb+eahO+8jOe7p+aJv0Zvb+eahOWOn+Wei+mTvuWxnuaApyAqL1xyXG4gICAgQmFyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9vLnByb3RvdHlwZSk7XHJcblxyXG4gICAgLyog5L+u5pS56L+HcHJvdG90eXBl5ZCO6ZyA6KaB5omL5Yqo5L+u5aSNY29uc3RydWN0b3LnmoTmjIflkJEgKi9cclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBCYXIucHJvdG90eXBlLm15TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcbiAgICBjb25zb2xlLmxvZyhiYXIubXlOYW1lKCkpO1xyXG4gICAgLyogRVM155u05o6l6I635Y+W5LiA5Liq5a+56LGh55qEW1twcm90b3R5cGVdXeeahOaWueW8jyAqL1xyXG4gICAgY29uc29sZS5sb2coT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGUpO1xyXG4gICAgLyog57ud5aSn5aSa5pWw5rWP6KeI5Zmo77yI6Z2e5qCH5YeG6I635Y+W5pa55byP77yJ5pSv5oyBICovXHJcbiAgICBjb25zb2xlLmxvZyhiYXIuX19wcm90b19fID09PSBCYXIucHJvdG90eXBlKTtcclxuICAgIC8qIOe7p+aJv+S5n+WPr+S7pemAmui/h2luc3RhbmNlb2bmib7liLDmupDlpLQgKi9cclxuICAgIGNvbnNvbGUubG9nKGJhciBpbnN0YW5jZW9mIEZvbyk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIE9iamVjdC5jcmVhdGXoh6rluKbnrKzkuozkuKrlj4LmlbDlj6/ku6XlrprkuYnlsZ7mgKfmj4/ov7DnrKYgKi9cclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgYTogMlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqLCB7XHJcbiAgICAgICAgYjoge1xyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjOiB7XHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IDNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBvYmoy55qE5Y6f5Z6L6ZO+5LiK6L+e5o6l5LqGb2Jq55qE5Y6f5Z6L6ZO+XHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmEpOyAvLyAyXHJcbiAgICBjb25zb2xlLmxvZyhvYmoyLmhhc093blByb3BlcnR5KCdhJykpOyAvLyBmYWxzZVxyXG4gICAgY29uc29sZS5sb2cob2JqLmhhc093blByb3BlcnR5KCdhJykpO1xyXG59XHJcblxyXG57XHJcbiAgICAvKiDnpZ7lpYfnmoRBUEnorr7orqHvvIznlLHkuo7mnKzouqvlhoXpg6jmsqHmnInor6Xlh73mlbDvvIzljbTog73lpJ/ov5DooYzvvIzkvJrlj5jlvpfmgKrmgKrnmoQgKi9cclxuICAgIC8qIOmdouWQkeWnlOaJmOaooeW8j+adpea6kOS6jk9iamVjdC5jcmVhdGUoKei/meS4queJueaApyAqL1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgICBjb29sOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvb2whJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb2JqMiA9IE9iamVjdC5jcmVhdGUob2JqKTtcclxuICAgIG9iajIuY29vbCgpOyAvLyBjb29sIVxyXG59XHJcblxyXG57XHJcbiAgICAvKiDnu4/lhbjnsbvnu6fmib/pnaLlkJHlr7nosaHpo47moLwgKi9cclxuICAgIGxldCBGb28gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IGZ1bmN0aW9uKG5hbWUsIGFnZSkge1xyXG4gICAgICAgIEZvby5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb28ucHJvdG90eXBlKTtcclxuICAgIEJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYXI7XHJcbiAgICBsZXQgYmFyMSA9IG5ldyBCYXIoJ3l1dWhlaScsIDIyKTtcclxuICAgIGxldCBiYXIyID0gbmV3IEJhcignU2VsbGVuaXRlJywgMjQpO1xyXG4gICAgY29uc29sZS5sb2coYmFyMSwgYmFyMik7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIOWvueixoeWnlOaJmOWFs+iBlOmjjuagvCAqL1xyXG4gICAgbGV0IEZvbyA9IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpZGVudGlmeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgSSBhbSAke3RoaXMubmFtZX1gO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IEJhciA9IE9iamVjdC5jcmVhdGUoRm9vKTtcclxuICAgIEJhci5zcGVhayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaWRlbnRpZnkoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBiMSA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGxldCBiMiA9IE9iamVjdC5jcmVhdGUoQmFyKTtcclxuICAgIGIxLmluaXQoJ3l1dWhlaScpO1xyXG4gICAgYjIuaW5pdCgnU2VsbGVuaXRlJyk7XHJcbiAgICBiMS5zcGVhaygpO1xyXG4gICAgYjIuc3BlYWsoKTtcclxuICAgIGNvbnNvbGUubG9nKEJhcik7IC8vIHtzcGVhazpmKCl9XHJcbiAgICBjb25zb2xlLmxvZyhiMSk7IC8vIHtuYW1lOiAneXV1aGVpJ31cclxufVxyXG5cclxue1xyXG4gICAgLyog5Y+N6K+N5rOVICovXHJcbiAgICAvKiBFUzbku6XkuIvnmoTnroDmtIHlhpnms5XkvJrnvJbor5HmiJDljL/lkI3lh73mlbDvvIzml6Dms5Xov5vooYzpgJLlvZIgKi9cclxuICAgIGxldCBGb28gPSB7XHJcbiAgICAgICAgLy8g5pyA5aW95LiN6KaB5L2/55SodGhpcy5iYXIoKeaIlkZvby5iYXIoKeaJp+ihjOmAkuW9ku+8jOWboOS4uuWPr+eUqOWunumZheaDheWGteavlOi+g+WwkVxyXG4gICAgICAgIGJhcigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOS7peS4iuWunumZheS8mue8luivkeaIkOS7peS4i+aWueW8j1xyXG4gICAgbGV0IEZvbzEgPSB7XHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbigpIHt9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWmguaenOimgeaDs+S9v+eUqOmAkuW9ku+8jOS4jeimgeS9v+eUqOeugOS7i+aWueW8j++8jOmcgOimgeS9v+eUqOWFt+WQjeWHveaVsOihqOi+vuW8j1xyXG4gICAgbGV0IEZvbzIgPSB7XHJcbiAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgYmFyOiBmdW5jdGlvbiBiYXJvb29vKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZGluZy0tLS0tLT4nICsgdGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAvKiDlhbflkI3lh73mlbDov5vooYzoh6rmiJHpgJLlvZIgKi9cclxuICAgICAgICAgICAgICAgIGJhcm9vb28uY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgRm9vMi5iYXIoKTtcclxufVxyXG5cclxue1xyXG4gICAgbGV0IEZvbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgQmFyID0gZnVuY3Rpb24obmFtZSwgYWdlKSB7XHJcbiAgICAgICAgRm9vLmNhbGwodGhpcywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIEJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvby5wcm90b3R5cGUpO1xyXG5cclxuICAgIGxldCBiYXIgPSBuZXcgQmFyKCd5dXVoZWknLCAyMyk7XHJcblxyXG4gICAgLyog5YaF55yBICovXHJcbiAgICAvLyDpppblhYjopoHnuqDmraPplJnor6/vvIxCYXIgaW5zdGFuY2VvZiBGb2/mmK/plJnnmoRcclxuXHJcbiAgICAvKiDmnoTpgKDlh73mlbDkuYvpl7RGb2/lkoxCYXLnmoTlhoXnnIEgKi9cclxuICAgIEJhci5wcm90b3R5cGUgaW5zdGFuY2VvZiBGb287IC8vIHRydWVcclxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihCYXIucHJvdG90eXBlKSA9PT0gRm9vLnByb3RvdHlwZTsgLy8gdHJ1ZVxyXG4gICAgRm9vXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKEJhci5wcm90b3R5cGUpOyAvLyB0cnVlXHJcblxyXG4gICAgLyog5a6e5L6L5ZKM5p6E6YCg5Ye95pWw5LmL6Ze055qE5YaF55yBICovXHJcbiAgICBiYXIgaW5zdGFuY2VvZiBCYXI7IC8vIHRydWVcclxuICAgIGJhciBpbnN0YW5jZW9mIEZvbzsgLy8gdHJ1ZVxyXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGJhcikgPT09IEJhci5wcm90b3R5cGU7IC8vLyB0cnVlXHJcbiAgICBGb29cclxuICAgICAgICAucHJvdG90eXBlXHJcbiAgICAgICAgLmlzUHJvdG90eXBlT2YoYmFyKTsgLy8gdHJ1ZVxyXG4gICAgQmFyXHJcbiAgICAgICAgLnByb3RvdHlwZVxyXG4gICAgICAgIC5pc1Byb3RvdHlwZU9mKGJhcik7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG4gICAgLyogT3JibWVudC5wcm90b3R5cGUuY2FsbCh0aGlzLCAuLi4p5piv5Lyq5aSa5oCBICovXHJcbiAgICBjbGFzcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgT3JibWVudDtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGBUaGUgJHt0aGlzLm5hbWV9IGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEVOSUdNQSBleHRlbmRzIE9yYm1lbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gc3VwZXIoKeWcqGNvbnN0cnVjdG9y5b+F6aG75ZyodGhpc+iwg+eUqOWJjeaJp+ihjFxyXG4gICAgICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDUwO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCA1MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIOS7peWJjeeahOS8quWkmuaAgeWGmeazle+8mk9yYm1lbnQucHJvdG90eXBlLnNldFNpemUuYXBwbHkodGhpcywgW3dpZHRoLCBoZWlnaHRdKVxyXG4gICAgICAgICAgICAvLyDms6jmhI/lh7rniYjkuabkuIrnmoRzdXBlcih3aWR0aCwgaGVpZ2h0KeWcqGNvbnN0cnVjdG9y5aSW5L2/55So5bey6KKr56aB5q2i77yM5pS55Li65pu/5o2i5Lul5LiL5pa55byP5a6e546w55u45a+55aSa5oCBXHJcbiAgICAgICAgICAgIHN1cGVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSArPSBgc2l6ZSBpcyB3aWR0aCAke3RoaXMud2lkdGh9IGFuZCBoZWlnaHQgJHt0aGlzLmhlaWdodH1gO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgQVJDVVMgZXh0ZW5kcyBPcmJtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vIHN1cGVyKCnlnKhjb25zdHJ1Y3RvcuW/hemhu+WcqHRoaXPosIPnlKjliY3miafooYxcclxuICAgICAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aCB8fCA1MDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgNTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyDku6XliY3nmoTkvKrlpJrmgIHlhpnms5XvvJpPcmJtZW50LnByb3RvdHlwZS5zZXRTaXplLmFwcGx5KHRoaXMsIFt3aWR0aCwgaGVpZ2h0XSlcclxuICAgICAgICAgICAgLy8g5rOo5oSP5Ye654mI5Lmm5LiK55qEc3VwZXIod2lkdGgsIGhlaWdodCnlnKhjb25zdHJ1Y3RvcuWkluS9v+eUqOW3suiiq+emgeatou+8jOaUueS4uuabv+aNouS7peS4i+aWueW8j+WunueOsOebuOWvueWkmuaAgVxyXG4gICAgICAgICAgICBzdXBlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gYHNpemUgaXMgd2lkdGggJHt0aGlzLndpZHRofSBhbmQgaGVpZ2h0ICR7dGhpcy5oZWlnaHR9YDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBFTklHTUFfSSA9IG5ldyBBUkNVUygnRU5JR01BX0knKTtcclxuICAgIGxldCBFTklHTUFfSV9TSVpFX01FU1NBR0UgPSBFTklHTUFfSVxyXG4gICAgICAgIC5zZXRTaXplKClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGxldCBBUkNVU19JID0gbmV3IEFSQ1VTKCdBUkNVU19JJyk7XHJcbiAgICBsZXQgQVJDVVNfSV9TSVpFX01FU1NBR0UgPSBBUkNVU19JXHJcbiAgICAgICAgLnNldFNpemUoMTAwLCA3MClcclxuICAgICAgICAuZ2V0TWVzc2FnZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKEVOSUdNQV9JX1NJWkVfTUVTU0FHRSk7XHJcbiAgICBjb25zb2xlLmxvZyhBUkNVU19JX1NJWkVfTUVTU0FHRSk7XHJcbn1cclxuXHJcbntcclxuICAgIC8qIGNsYXNz5bm25LiN5piv6Z2Z5oCB77yM5Y+q5piv5LiA5LiqcHJvdG90eXBl55qE6K+t5rOV57OW77yM5L2/55SocHJvdG90eXBl5LuN5Y+v5L+u5pS5ICovXHJcbiAgICBjbGFzcyBSYW5kb20ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLm51bSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByYW5kKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByMSA9IG5ldyBSYW5kb20oKTtcclxuICAgIHIxLnJhbmQoKTtcclxuXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLnJhbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bSAqIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcjIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICByMi5yYW5kKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UxLTIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG4gKiBAQXV0aG9yOiBTZWxsZW5pdGVcclxuICogQERhdGU6ICAgMjAxOC0wMS0xNiAxMjoyMzoxMFxyXG4gKiBATGFzdCBNb2RpZmllZCBieTogICBTZWxsZW5pdGVcclxuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxOC0wMS0yMCAxNToyNToxOVxyXG4gKi9cclxuXHJcbntcclxuXHQvKiB0eXBlb2YgbnVsbCBPYmplY3QgQXJyYXkg6YO95Lya6L+U5ZueICdvYmplY3QnICAqL1xyXG5cdGxldCBhID0gbnVsbDtcclxuXHRsZXQgYiA9IHtcclxuXHRcdG5hbWU6ICd5dXVoZWknXHJcblx0fTtcclxuXHRsZXQgYyA9IFsxLCAzXTtcclxuXHRjb25zb2xlLmxvZyh0eXBlb2YgYSwgdHlwZW9mIGIsIHR5cGVvZiBjKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOWkjeWQiOadoeS7tuajgOa1i251bGwgKi9cclxuXHRsZXQgYSA9IG51bGw7XHJcblx0Y29uc29sZS5sb2coIWEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKTsgLy8gdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0Lyog5Ye95pWw5a+56LGh55qEbGVuZ3Ro5piv5aOw5piO5Y+C5pWw55qE5Liq5pWwICovXHJcblx0bGV0IGZvbyA9IGZ1bmN0aW9uKGEsIGIsIGMpIHt9O1xyXG5cdGNvbnNvbGUubG9nKGZvby5sZW5ndGgpOyAvLyAzXHJcbn1cclxuXHJcbntcclxuXHQvKiDlo7DmmI7kuobov5jmsqHotYvlgLzlsZ7kuo51bmRlZmluZWQgKi9cclxuXHQvKiDov5jmsqHlo7DmmI7lsZ7kuo51bmRlY2xhcmVk77yIamF2YXNjcmlwdOi/mOaYr+S8muaJk+WNsHVuZGVmaW5lZO+8iSAqL1xyXG59XHJcblxyXG57XHJcblx0LyogdHlwZW9m5LiA5LiqdmFy5aOw5piO5LqG5L2G5pyq5a6a5LmJ5YC855qE6K+d5Lya5omT5Y2wdW5kZWZpbmVkICovXHJcblx0LyogdHlwZW9m5LiA5Liq5a6M5YWo5rKh5pyJ5aOw5piO5Y+K5a6a5LmJ5YC855qE6K+d5ZCM5qC35Lmf5Lya5omT5Y2wdW5kZWZpbmVkICovXHJcbn1cclxuXHJcbntcclxuXHRsZXQgSUlGRSA9IDI7XHJcblx0LyogdHlwZW9m5Yik5pat5b2T5YmN5L2c55So5Z+f5Y+Y6YeP5piv5ZCm6KKr5a6a5LmJICovXHJcblx0bGV0IGhlbHBlciA9ICh0eXBlb2YgSUlGRSAhPT0gJ3VuZGVmaW5lZCcpID8gSUlGRSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Lyogc29tZXRoaW5ncyAqL1xyXG5cdH07XHJcblx0Lyog5L2/55SodHlwZW9m5p2l5qOA5p+l5Y+Y6YeP5piv6aaW6YCJ55qE6YCJ5oupICovXHJcblx0Y29uc29sZS5sb2coaGVscGVyKTsgLy8gMlxyXG59XHJcblxyXG57XHJcblx0Lyog55So5L6d6LWW5rOo5YWl6K6+6K6h5qih5byP5p2l6aqM6K+B5b2T5YmN5L2c55So5Z+f5Y+Y6YeP5piv5ZCm6KKr5a6a5LmJICovXHJcblx0bGV0IGhlbHBlciA9IGZ1bmN0aW9uKElJRkUpIHtcclxuXHRcdGxldCBoZWxwZXIyID0gSUlGRSB8fCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Lyogc29tZXRoaW5ncyAqL1xyXG5cdFx0fTtcclxuXHR9O1xyXG59XHJcblxyXG57XHJcblx0Lyog5Yib5bu656iA55aP5pWw57uE77yM56m655m955qE5Zyw5pa55Lya6KKr5pi+5byP6LWL5YC85Li6dW5kZWZpbmVkICovXHJcblx0bGV0IGFyciA9IFtdO1xyXG5cdGFyclswXSA9IDA7XHJcblx0YXJyWzRdID0gNDtcclxuXHRjb25zb2xlLmxvZyhhcnIubGVuZ3RoKTsgLy8gNVxyXG59XHJcblxyXG57XHJcblx0Lyog5pWw57uE5Lmf5piv5a+56LGh77yM5Y+v5Lul5YyF5ZCr5a2X56ym5Liy6ZSu5YC85ZKM5bGe5oCn77yM5L2G5LiN6K6h5YWl5LqO5pWw57uE55qE6ZW/5bqmICovXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRhcnJbJ25hbWUnXSA9ICd5dXVoZWknO1xyXG5cdGFyclsnYWdlJ10gPSAyMztcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyci5sZW5ndGgpOyAvLyAzXHJcbn1cclxuXHJcbntcclxuXHQvKiDms6jmhI/vvIzlpoLmnpzlrZfnrKbkuLLplK7lgLzog73lpJ/ovazmjaLkuLrljYHov5vliLbmlbDlrZfvvIzkvJrooqvlvZPkvZzmlbDlrZfntKLlvJXlpITnkIYgKi9cclxuXHRsZXQgYXJyID0gWzEsIDMsIDVdO1xyXG5cdGFyclsnNSddID0gMTAwO1xyXG5cdGNvbnNvbGUubG9nKGFycik7XHJcbn1cclxuXHJcbntcclxuXHQvKiDnsbvmlbDnu4Tlj4rmlbDnu4Tlia/mnKzlu7rnq4sgKi9cclxuXHQvLyDnsbvmlbDnu4TovazmjaJcclxuXHRsZXQgZm9vID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRcdGNvbnNvbGUubG9nKGFycilcclxuXHR9XHJcblx0Zm9vKClcclxuXHJcblx0Ly8g5pWw57uE5Ymv5pysXHJcblx0bGV0IGFyciA9IFsxLCAzLCA1XTtcclxuXHRsZXQgYXJyQ29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycilcclxuXHRhcnIucHVzaCgxMDApO1xyXG5cdGFyckNvcHkucHVzaCgyMDApO1xyXG5cdGNvbnNvbGUubG9nKGFyciwgYXJyQ29weSk7XHJcblxyXG5cdC8vIEVTNueahEFycmF5LmZyb23kuZ/og73lpJ/lu7rnq4vlia/mnKxcclxuXHRsZXQgYXJyMiA9IFsyLCA0LCA2XTtcclxuXHRsZXQgYXJyQ29weTIgPSBBcnJheS5mcm9tKGFycjIpO1xyXG5cdGFycjIucHVzaCgxMDApO1xyXG5cdGFyckNvcHkyLnB1c2goMjAwKTtcclxuXHRjb25zb2xlLmxvZyhhcnIsIGFyckNvcHkyKTtcclxufVxyXG5cclxue1xyXG5cdC8qIOiuv+mXruWtl+espuS4suafkOS4quS4i+agh+W6lOivpeeUqC5jaGFyQXQoKe+8jOiAgeeJiOacrElF5LiN5YWB6K64c3RyaW5nW2luZGV4Xei/meagt+iuv+mXriAqL1xyXG5cdC8qIOS7peS4iuWPquiDveWkn+i/m+ihjOWtl+espuS4suiuv+mXru+8jOaXoOazlei/m+ihjOWtl+espuS4suS/ruaUuSAqL1xyXG5cdGxldCBzdHJpbmcgPSAnZm9vJztcclxuXHRjb25zb2xlLmxvZyhzdHJpbmdbMF0pO1xyXG5cdGNvbnNvbGUubG9nKHN0cmluZy5jaGFyQXQoMikpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5pWw5a2X5YC85Y+v55So5oyH5pWw6KGo56S6ICovXHJcblx0bGV0IGEgPSA1RTEwO1xyXG5cdGNvbnNvbGUubG9nKGEpO1xyXG59XHJcblxyXG57XHJcblx0bGV0IGEgPSA0Mi41OTtcclxuXHQvKiAudG9GaXhlZCgp55So5LqO5oyH5a6a5bCP5pWw5pi+56S65aSa5bCR5LiqICovXHJcblx0Y29uc29sZS5sb2coYS50b0ZpeGVkKDQpKTtcclxuXHQvKiAudG9QcmVjaXNpb24oKeeUqOS6juaMh+WumuWkmuWwkeS4quacieaViOaVsOS9jSAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9QcmVjaXNpb24oNSkpO1xyXG59XHJcblxyXG57XHJcblx0LyogRVM277yM5Lil5qC85qih5byP5LiN5YaN5pSv5oyBMOW8gOWktOeahOWFq+i/m+WItuaVsCAqL1xyXG5cdC8vIGxldCBhID0gMDM2MztcclxuXHQvLyBjb25zb2xlLmxvZyhhKTsgIFN5bnRheEVycm9yXHJcblxyXG5cdC8qIEVTNuWSjOS4peagvOaooeW8j+S4i+eahOWFq+i/m+WItuaYr+eUqDBv5YmN57yA6KGo56S6ICovXHJcblx0bGV0IGEgPSAwbzM2MztcclxuXHRjb25zb2xlLmxvZyhhKTsgLy8gMjQzXHJcbn1cclxuXHJcbntcclxuXHQvKiDms6jmhI8wLjErMC4y5LiN562J5LqOMC4z77yM5a2Y5Zyo57K+5bqm6Zeu6aKYICovXHJcblx0bGV0IGEgPSAwLjEgKyAwLjI7XHJcblx0bGV0IGIgPSAwLjNcclxuXHRjb25zb2xlLmxvZyhhID09PSBiKSAvLyBmYWxzZVxyXG59XHJcblxyXG57XHJcblx0LyogTmFO5LiN5LiOTmFO55u4562J77yMdHlwZW9mIE5hTueahOWAvOS4uidudW1iZXInICovXHJcblx0Y29uc29sZS5sb2codHlwZW9mIE5hTik7IC8vIG51bWJlclxyXG5cdGNvbnNvbGUubG9nKE5hTiA9PT0gTmFOKTsgLy8gZmFsc2VcclxufVxyXG5cclxue1xyXG5cdC8qIHdpbmRvd+acieS4gOS4quWFqOWxgOaWueazlWlzTmFOKCnvvIzkvYbov5nkuKrmnIlidWfvvIzkvJrlsIZOYU7lkozlrZfnrKbkuLLkuZ/kvJrliKTmlq3kuLp0cnVlICovXHJcblx0LyogRVM255qETnVtYmVyLmlzTmFOKCnkv67lpI3kuobov5nkuKrpl67popjvvIzku5bkvJrlhYjnlKh0eXBlb2bliKTmlq3kuLpudW1iZXLlho3miafooYzmraTmlrnms5VcclxuXHTvvIjkuIrpnaLmj5DliLB0eXBlb2YgTmFO6L+U5Zue55qE5pivJ251bWJlcifvvIkgKi9cclxuXHRsZXQgYSA9ICdmb28nO1xyXG5cdGxldCBiID0gMTAgLyAnZm9vJztcclxuXHRjb25zb2xlLmxvZyh3aW5kb3cuaXNOYU4oYSkpOyAvLyB0cnVlLCBidWdcclxuXHRjb25zb2xlLmxvZyh3aW5kb3cuaXNOYU4oYikpOyAvLyB0cnVlXHJcblxyXG5cdGNvbnNvbGUubG9nKE51bWJlci5pc05hTihhKSk7IC8vIGZhbHNl77yM5L+u5aSN5LqGXHJcblx0Y29uc29sZS5sb2coTnVtYmVyLmlzTmFOKGIpKTsgLy8gdHJ1ZVxyXG5cclxuXHQvKiDliKTmlq3mmK/lkKZOYU7nmoTmm7TnroDljZXmlrnms5UgKi9cclxuXHRsZXQgSXNOYU4gPSBmdW5jdGlvbihuKSB7XHJcblx0XHRyZXR1cm4gbiAhPT0gbjtcclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKElzTmFOKGIpKTsgLy8gdHJ1ZVxyXG59XHJcblxyXG57XHJcblx0Lyog5YWz5LqOLTDvvIwwID09PSAtMOaYr3RydWUgKi9cclxuXHQvKiDmlbDlrZfovazkuLrlrZfnrKbkuLLvvIwt5Y+35raI5aSx77yb5a2X56ym5Liy6L2s5Li65pWw5a2X77yMLeWPt+S/neeVmSAqL1xyXG5cdC8qIEpTT04uc3RyaW5naWZ5KC0wKSDov5Tlm55cIjBcIu+8jOiAjEpTT04ucGFyc2UoXCItMFwiKSDov5Tlm54tMCAqL1xyXG5cdGNvbnNvbGUubG9nKDAgPT09IC0wKTsgLy8gdHJ1ZVxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KC0wKSwgSlNPTi5wYXJzZSgnLTAnKSk7XHJcblxyXG5cdC8qIOWIpOaWreaYr+WQpuS4uui0nzDnmoTmlrnms5UgKi9cclxuXHRsZXQgaXNNaW5aZXJvID0gZnVuY3Rpb24obikge1xyXG5cdFx0biA9IE51bWJlcihuKTtcclxuXHRcdHJldHVybiAobiA9PT0gMCkgJiYgKDEgLyBuID09PSAtSW5maW5pdHkpO1xyXG5cdH1cclxuXHJcblx0Y29uc29sZS5sb2coaXNNaW5aZXJvKC0wKSk7IC8vIHRydWVcclxufVxyXG5cclxue1xyXG5cdC8qIOWOn+eUn+WHveaVsCAqL1xyXG5cdC8vIFN0cmluZygpXHJcblx0Ly8gTnVtYmVyKClcclxuXHQvLyBPYmplY3QoKVxyXG5cdC8vIEFycmF5KClcclxuXHQvLyBCb29sZWFuKClcclxuXHQvLyBGdW5jdGlvbigpXHJcblx0Ly8gUmVnRXhwKClcclxuXHQvLyBFcnJvcigpXHJcblx0Ly8gRGF0ZSgpXHJcblx0Ly8gU3ltYm9sKClcclxufVxyXG5cclxue1xyXG5cdC8qIHR5cGVvZiBuZXcgU3RyaW5nKCcxMjMnKeS8mui/lOWbnm9iamVjdCAqL1xyXG5cdGxldCBhID0gbmV3IFN0cmluZygnSGVsbG8nKTtcclxuXHRjb25zb2xlLmxvZyhhKTsgLy8gU3RyaW5nIHtcIkhlbGxvXCJ9XHJcblxyXG5cdC8qIOS9v+eUqFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcoKeiDveWkn+i/lOWbnnN0cmluZ+Wtl+espuS4siAqL1xyXG5cdGNvbnNvbGUubG9nKGEudG9TdHJpbmcoKSk7IC8vIFwiSGVsbG9cIlxyXG5cdGNvbnNvbGUubG9nKFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSk7IC8vIFwiSGVsbG9cIlxyXG5cclxuXHQvKiDkuI7mnKzouqvmnoTpgKDlh73mlbDnmoR2YWx1ZU9mKCnlip/og73nm7jlkIwgKi9cclxuXHRjb25zb2xlLmxvZyhhLnZhbHVlT2YoKSk7IC8vIFwiSGVsbG9cIlxyXG5cdGNvbnNvbGUubG9nKFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKGEpKTsgLy8gXCJIZWxsb1wiXHJcblxyXG5cdC8qIE9iamVjdC5wcm90b3R5cGXmmK/kuI3lkIznmoQgKi9cclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBbb2JqZWN0IFN0cmluZ11cclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuY2FsbChhKSk7IC8vIFN0cmluZyB7XCJIZWxsb1wifVxyXG59XHJcblxyXG57XHJcblx0Lyog5p+l55yL5LiA5Liq5YaF6YOo5bGe5oCnW1tjbGFzc11d5L2/55SoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCkgKi9cclxuXHRsZXQgYSA9IG5ldyBCb29sZWFuKGZhbHNlKTtcclxuXHRjb25zb2xlLmxvZyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkpOyAvLyBbb2JqZWN0IEJvb2xlYW5dXHJcbn1cclxuXHJcbntcclxuXHQvKiDmg7PopoHlvpfliLDlsIHoo4Xlr7nosaHnmoTln7rmnKznsbvlnovlgLzvvIzlj6/ku6Xkvb/nlKh2YWx1ZU9mKCnlh73mlbAgKi9cclxuXHRsZXQgYSA9IG5ldyBTdHJpbmcoJ0hlbGxvJyk7XHJcblx0Y29uc29sZS5sb2coYS52YWx1ZU9mKCkpO1xyXG5cclxuXHQvKiDpmpDlvI/mi4blsIEgKi9cclxuXHRsZXQgYiA9IGEgKyBcIlwiO1xyXG5cdGNvbnNvbGUubG9nKGIpO1xyXG59XHJcblxyXG57XHJcblx0Lyog5b2TbmV3IEFycmF555qE5pe25YCZ5Y+q5Lyg5YWl5LiA5Liq5pWw77yMXHJcblx0ICAg5omn6KGM55qE5piv5Yib5bu65LiA5Liq5pWw57uE77yM6ZW/5bqm5Li6MTDvvIzkuJTlhajkuLrnqbrljZXlhYPvvIjpnZ51bmRlZmluZWTvvInloavlhYUgKi9cclxuXHQvKiDnqbrljZXlhYPlkox1bmRlZmluZWTmmK/mnInljLrliKvnmoTvvIzms6jmhI8gKi9cclxuXHRsZXQgYSA9IEFycmF5KDEwKTsgLy8gbmV35Y+v5Lul55yB55Wl77yManPkvJroh6rliqjooaXliqBcclxuXHRjb25zb2xlLmxvZyhhLCBhLmxlbmd0aCk7XHJcblxyXG5cdC8qIOa4heepuuS4gOS4quaVsOe7hOWPr+S7peS9v+eUqGFycmF5Lmxlbmd0aCA9IDAgKi9cclxuXHRsZXQgYiA9IFsyLCA0LCA2XTtcclxuXHRiLmxlbmd0aCA9IDA7XHJcblx0Y29uc29sZS5sb2coYik7XHJcblxyXG5cdC8qIOWIm+W7uuS4gOS4quWFqOaYr3VuZGVmaW5lZO+8iOmdnuepuuWNleWFg++8ieWhq+WFheeahOaVsOe7hCAqL1xyXG5cdC8qIGFycmF5Lmxlbmd0aOi/meagt+W8uuihjOS/ruaUueS8mueUqOepuuWNleWFg+Whq+WFheWkmuS9meeahOepuuS9jSAqL1xyXG5cdGxldCBjID0gQXJyYXkuYXBwbHkobnVsbCwge1xyXG5cdFx0bGVuZ3RoOiAzXHJcblx0fSk7XHJcblx0Y29uc29sZS5sb2coYyk7IC8vIFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxyXG5cclxuXHQvKiDmsLjov5zkuI3opoHliJvlu7rlkozkvb/nlKjnqbrljZXlhYPmlbDnu4QgKi9cclxufVxyXG5cclxue1xyXG5cdC8vIFN0cmluZy5wcm90b3R5cGXnmoTlkITnsbvmlrnms5XvvIzkuI3kv67mlLnljp/lrZfnrKbkuLJcclxuXHQvLyBTdHJpbmcjLmluZGV4T2ZcclxuXHQvLyBTdHJpbmcjLmNoYXJBdFxyXG5cdC8vIFN0cmluZyMuc3Vic3RyIFN0cmluZyMuc3Vic3RyaW5nIFN0cmluZyMuc2xpY2UoKVxyXG5cdC8vIFN0cmluZyMudG9VcHBlckNhc2UgU3RyaW5nIy50b0xvd2VyQ2FzZSgpXHJcblx0Ly8gU3RyaW5nIy50cmltXHJcbn1cclxuXHJcbntcclxuXHQvKiBTeW1ib2zkvb/nlKjljp/nlJ/mnoTpgKDlh73mlbDmnaXlrprkuYnvvIzkuI3nlKjliqBuZXcgKi9cclxuXHRsZXQgbXlvd24gPSBTeW1ib2woJ2RlbGV0ZVNvbWV0aGluZycpO1xyXG5cdGxldCBhID0ge307XHJcblx0YVtTeW1ib2woJ2RlbGV0ZVNvbWV0aGluZycpXSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0LyogZG9Tb21ldGhpbmcgKi9cclxuXHR9XHJcblx0Y29uc29sZS5sb2coYSk7XHJcblx0Y29uc29sZS5sb2coT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhhKSk7XHJcblxyXG5cdC8qIOWFt+acieWUr+S4gOaAp++8jOW+iOWkmuW8gOWPkeWWnOasouS9v+eUqOi/meS4queUqOS6juengeacieWxnuaAp+S7o+abv19mdW5jdGlvbiAqL1xyXG59XHJcblxyXG57XHJcblx0LyogSlNPTi5zdHJpbmdpZnkoKeWcqOmBh+WIsHVuZGVmaW5lZO+8jGZ1bmN0aW9u77yMc3ltYm9s6L+Z5LiJ5Liq5LiN5a6J5YWo5YC85pe277yMXHJcblx0ICAg5Zyo5a+56LGh5Lya5bCG5YW26Ieq5Yqo5b+955Wl77yM5Zyo5pWw57uE5Lit6L+U5ZuebnVsbO+8jOWcqOS4gOiIrOiwg+eUqOS8mui/lOWbnnVuZGVmaW5lZCAqL1xyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVuZGVmaW5lZCkpOyAvLyB1bmRlZmluZWRcclxuXHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShmdW5jdGlvbigpIHt9KSk7IC8vIHVuZGVmaW5lZFxyXG5cdC8vIFwie1wiYVwiOiAyfVwiXHJcblx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0YTogMixcclxuXHRcdGI6IGZ1bmN0aW9uKCkge31cclxuXHR9KSk7XHJcblx0Ly8gXCJbXCJ5dXVoZWlcIiwgbnVsbCwgbnVsbCwgNF1cIlxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFsneXV1aGVpJywgdW5kZWZpbmVkLCBmdW5jdGlvbigpIHt9LCA0XSkpO1xyXG59XHJcblxyXG57XHJcblx0LyogSlNPTi5zdHJpbmdpZnnmnInkuIDkuKrlvojlrp7nlKjnmoRyZXBsYWNlcu+8jOWPr+S7peWvueaVsOaNrui/m+ihjOetm+mAieWkhOeQhiAqL1xyXG5cdC8vIOWPr+S7peaYr+aVsOe7hOaIluWHveaVsFxyXG5cdGxldCBvYmogPSB7XHJcblx0XHRhOiAyLFxyXG5cdFx0YjogXCIyMlwiLFxyXG5cdFx0YzogWzEsIDIsIDNdXHJcblx0fVxyXG5cdC8vIHJlcGxhY2Vy5Li65pWw57uE5pe255qE5L2c55SoXHJcblx0bGV0IGpzb24xID0gSlNPTi5zdHJpbmdpZnkob2JqLCBbXCJhXCIsIFwiYlwiXSk7IC8vIOWPquW6j+WIl+WMlmtleeWAvOS4umHlkoxi55qEXHJcblx0Y29uc29sZS5sb2coanNvbjEpOyAvLyBcIntcImJcIjpcIjIyXCIsXCJjXCI6WzEsMiwzXX1cIlxyXG5cclxuXHQvLyByZXBsYWNlcuS4umZ1bmN0aW9u5pe255qE5L2c55SoXHJcblx0bGV0IGpzb24yID0gSlNPTi5zdHJpbmdpZnkob2JqLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoa2V5ICE9PSBcImFcIikgcmV0dXJuIHZhbHVlO1xyXG5cdH0pO1xyXG5cdGNvbnNvbGUubG9nKGpzb24yKTtcclxuXHJcblx0Ly8g56ys5LiJ5Liq5Y+C5pWwc3BhY2XvvIzov5jlj6/ku6XosIPnvKnov5vvvIzoh6rliqjov5vooYzmoLzlvI/ljJbvvIzov5jlj6/ku6XmmK/loavlhYXlrZfnrKbkuLJcclxuXHRsZXQganNvbjMgPSBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDQpO1xyXG5cdGNvbnNvbGUubG9nKGpzb24zKTtcclxuXHQvLyB7XHJcblx0Ly8gXHQgIFwiYVwiOiAyLFxyXG5cdC8vXHQgIFwiYlwiOiBcIjIyXCIsXHJcblx0Ly9cdCAgXCJjXCI6IFtcclxuXHQvL1x0ICBcdCAgMSxcclxuXHQvL1x0XHQgIDIsXHJcblx0Ly9cdFx0ICAzXHJcblx0Ly9cdCAgXVxyXG5cdC8vIH1cclxufVxyXG5cclxue1xyXG5cdC8qIOS7peS4i+W4g+WwlOWBh+akjeWcqOW8uuWItui9rOaNoueahOaXtuWAmee7k+aenOmDveS4umZhbHNl77yM5by65Yi26L2s5o2i5pivISEgKi9cclxuXHQvLyB1bmRlZmluZWQsIG51bGwsIGZhc2xlLCArMCwgLTAsIE5hTiwgXCJcIlxyXG5cdGNvbnNvbGUubG9nKCEhdW5kZWZpbmVkIHx8ICEhbnVsbCB8fCAhIWZhbHNlIHx8ICEhMCB8fCAhIU5hTiB8fCAhIVwiXCIpOyAvLyBmYWxzZVxyXG5cdC8vIGRvY3VtZW50LmFsbOWcqOafkOS6m0lF5ZKM5p+Q5Lqb5rWP6KeI5Zmo5piv5Li655yf5YC877yM5Zyo5p+Q5Lqb5rWP6KeI5Zmo5LiL5Li65YGH5YC877yM5piv5LiA5Liq57G75pWw57uEXHJcblxyXG5cdC8qIOWBh+WAvOS5i+WklumDveaYr+ecn+WAvO+8jOi9rOaNouWQjumDveS4unRydWUgKi9cclxufVxyXG5cclxue1xyXG5cdC8qIOaYvuW8j+W8uuWItuexu+Wei+i9rOaNoiAqL1xyXG5cdC8vIOWtl+espuS4suWSjOaVsOWtl+S5i+mXtOeahOaYvuW8j+i9rOaNou+8jOS4jeimgeS9v+eUqG5ld++8jOW5tuS4jeaYr+WIm+W7uuWvueixoVxyXG5cdGxldCBhID0gMjI7XHJcblx0bGV0IGIgPSBcIjMuMTRcIjtcclxuXHJcblx0bGV0IGMgPSBTdHJpbmcoYSk7XHJcblx0bGV0IGQgPSBOdW1iZXIoYik7XHJcblxyXG5cdGNvbnNvbGUubG9nKGMsIGQpOyAvLyBcIjIyXCIsIDMuMTRcclxuXHJcblx0Ly8g5Y+m5LiA56eN5pa55rOV55qE5pi+5byP6L2s5o2iXHJcblx0bGV0IGUgPSBhLnRvU3RyaW5nKCk7IC8vIOiwg+eUqOeahOaYr051bWJlci5wcm90b3R5cGUudG9TdHJpbmdcclxuXHRsZXQgZiA9ICtiO1xyXG5cdGNvbnNvbGUubG9nKGUsIGYpOyAvLyBcIjIyXCIsIDMuMTRcclxufVxyXG5cclxue1xyXG5cdC8vIOaXpeacn+aYvuekuui9rOaNouS4uuaVsOWtl++8iOebuOW9k+S6ji5nZXRUaW1lKCnlip/og73vvIlcclxuXHRsZXQgYSA9IG5ldyBEYXRlKCk7XHJcblx0Y29uc29sZS5sb2coK2EsIGEuZ2V0VGltZSgpKTtcclxuXHJcblx0Ly8g5b2T5a6e5L6L5YyW5LiA5Liq5p6E6YCg5Ye95pWw55qE5pe25YCZ5aaC5p6c5rKh5pyJ5Y+C5pWw5Lyg5YWl77yM5Y+v5Lul5LiN5YqgKClcclxuXHRjb25zb2xlLmxvZygrbmV3IERhdGUpO1xyXG5cclxuXHQvLyBFUzXnmoREYXRl5pyJ5LiA5Liq6I635Y+W5b2T5YmN5pe26Ze05oiz55qEQVBJ77yM5YW2cG9seWZpbGzlsLHmmK8rbmV3IERhdGUoKVxyXG5cdGNvbnNvbGUubG9nKERhdGUubm93KCkpO1xyXG59XHJcblxyXG57XHJcblx0LyogcGFyc2VJbnTnmoTkvb/nlKggKi9cclxuXHJcblx0Ly8gcGFyc2VJbnTpkojlr7nnmoTmmK/lrZfnrKbkuLLvvIzopoHmsYLmiYDmnInlrZfnrKbpg73mmK/mlbDlrZfvvIzlkKbliJnov5Tlm55OYU5cclxuXHQvLyBOdW1iZXIoKeWPr+S7peW/veeVpeS4jeaYr+aVsOWtl+Wtl+espueahOWtl+espuS4su+8jOmBh+WIsOmdnuaVsOWtl+Wtl+espuWImeWBnOatoui9rOaNolxyXG5cdGxldCBhID0gJzEyYWE0NSc7XHJcblx0bGV0IGIgPSAnNDU2JztcclxuXHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSksIE51bWJlcihhKSk7IC8vIE5hTiwgNDY1XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYiksIE51bWJlcihiKSk7IC8vIDEyLCA0NTZcclxufVxyXG5cclxue1xyXG5cdC8qIHBhcnNlSW5055qE56ys5LqM5Liq5Y+C5pWw6L2s5Yi26Zeu6aKY77yM5bCG5b2T5YmN5pWw5YC85a6a5LmJ5Li66Ieq5a6a5LmJ6L+b5Yi277yM5LiN55So5Yqg5YmN57yAXHJcblx0ICAg54S25ZCO6L2s5o2i5Li65pWw5a2XICovXHJcblxyXG5cdC8vIOWmguaenOmcgOimgeWcqEVTNeS5i+WJjeeahOeOr+Wig+i/kOihjOW5tuS4lOayoeaciXBvbHlmaWxs77yM6ZyA6KaB5omL5Yqo5Yqg5LiK56ys5LqM5Liq5Y+C5pWwMTBcclxuXHQvLyDlvLrliLbovazmjaLkuLrljYHov5vliLbvvIzkuI3nhLbkvJrooqvovazkuLrlhavov5vliLbvvIzpgb/lhY3kuI3lv4XopoHnmoTlnZFcclxuXHJcblx0bGV0IGEgPSBcIjEwMFwiO1xyXG5cdGxldCBiID0gMjU2O1xyXG5cclxuXHRjb25zb2xlLmxvZyhwYXJzZUludChhLCAxNikpOyAvLyAyNTZcclxuXHRjb25zb2xlLmxvZyhwYXJzZUludChhLCA4KSk7IC8vIDY0XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMikpOyAvLyA0XHJcblx0Y29uc29sZS5sb2cocGFyc2VJbnQoYSwgMTApKTsgLy8gMTAwXHJcblxyXG5cdC8qIHRvU3RyaW5nKCnkvKDlhaXlj4LmlbDvvIzlj6/ku6XlsIblvZPliY3mlbDlgLzovazmjaLkuLrmjIflrprov5vliLYgKi9cclxuXHRjb25zb2xlLmxvZyhiLnRvU3RyaW5nKDE2KSk7IC8vIDEwMFxyXG59XHJcblxyXG57XHJcblx0Lyog6Ieq5a6a5LmJ6L2s5o2iICovXHJcblxyXG5cdC8vIOWNgei/m+WItuaVsOWAvOi9rOS4uuiHquWumuS5iei/m+WItu+8mlxyXG5cdGxldCBkZWNpbWFsVG9PdGhlciA9IGZ1bmN0aW9uKG51bSwgdHJhbnNmb3JtKSB7XHJcblx0XHQvKiDov5Tlm57nmoTmmK/lrZfnrKbkuLLvvIznlKjkuo7lsZXnpLogKi9cclxuXHRcdHZhciBudW0gPSArbnVtO1xyXG5cdFx0dmFyIHRyYW5zZm9ybSA9ICt0cmFuc2Zvcm07XHJcblx0XHRpZiAodHJhbnNmb3JtID09PSAxNikge1xyXG5cdFx0XHRyZXR1cm4gJzB4JyArIG51bS50b1N0cmluZygxNik7XHJcblx0XHR9IGVsc2UgaWYgKHRyYW5zZm9ybSA9PT0gOCkge1xyXG5cdFx0XHRyZXR1cm4gJzBvJyArIG51bS50b1N0cmluZyg4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudW0udG9TdHJpbmcodHJhbnNmb3JtKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKGRlY2ltYWxUb090aGVyKDEwMCwgOCkpOyAvLyBcIjBvMTQ0XCJcclxuXHJcblx0Ly8g5YW25LuW6L2s5Yi26L2s5o2i5Li65Y2B6L+b5Yi277yI5Lyg5YWl5qCH5YeG5qC85byPMFjmiJYwb+etieWtl+espuS4suagvOW8j++8ie+8mlxyXG5cdGxldCBvdGhlclRvRGVjaW1hbCA9IGZ1bmN0aW9uKG51bSkge1xyXG5cdFx0Lyog6L+U5Zue5pWw5a2XICovXHJcblx0XHR2YXIgbnVtID0gbnVtLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZiAobnVtLmluZGV4T2YoJzB4JykgPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KG51bS5yZXBsYWNlKC8weC8sICcnKSwgMTYpO1xyXG5cdFx0fSBlbHNlIGlmIChudW0uaW5kZXhPZignMG8nKSA9PT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQobnVtLnJlcGxhY2UoLzBvLywgJycpLCA4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludChudW0sIDEwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKG90aGVyVG9EZWNpbWFsKCcweDEwMCcpKTsgLy8gMjU2XHJcbn1cclxuXHJcbntcclxuXHQvKiBib29sZWFu5pi+56S66L2s5o2i77yM5bu66K6u5L2/55SoISHnlKjmnaXovazmjaIgKi9cclxuXHRsZXQgYSA9IFwiYXNkXCI7XHJcblx0bGV0IGIgPSBbXTtcclxuXHRsZXQgYyA9IHt9O1xyXG5cclxuXHQvLyDms6jmhI/nqbrmlbDnu4Tlkoznqbrlr7nosaHpg73mmK/ov5Tlm550cnVl44CC5piv55yf5YC877yM5omA5pyJ55qE5YGH5YC85LiK6Z2i5pyJ5o+Q5YiwXHJcblx0Y29uc29sZS5sb2coQm9vbGVhbihhKSk7IC8vIHRydWVcclxuXHRjb25zb2xlLmxvZyghIWIpOyAvLyB0cnVlXHJcblx0Y29uc29sZS5sb2coISFjKTsgLy90cnVlXHJcbn1cclxuXHJcbntcclxuXHRsZXQgYXJyID0gW1xyXG5cdFx0MixcclxuXHRcdGZ1bmN0aW9uKCkge30sXHJcblx0XHQ0LFxyXG5cdFx0ZnVuY3Rpb24oKSB7fVxyXG5cdF07XHJcblxyXG5cdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFycikpO1xyXG5cclxuXHRsZXQganNvbiA9IEpTT04uc3RyaW5naWZ5KGFyciwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRjb25zb2xlLmxvZyhqc29uKTsgLy8gWzIsdHJ1ZSw0LHRydWVdXHJcbn1cclxuXHJcbntcclxuXHQvKiB8fCDmiJYgJiYg6L+U5Zue55qE5LiN5LiA5a6a5piv5biD5bCU5YC8ICovXHJcblxyXG5cdC8vIOWvueS6jnx877yM5aaC5p6c5b2T5YmN5YC85Yik5pat5Li6dHJ1Ze+8jOWwseS8mui/lOWbnuW9k+WJjeWAvFxyXG5cdGNvbnNvbGUubG9nKGZhbHNlIHx8IFwic3NcIiB8fCAxMTApOyAvLyBcInNzXCJcclxuXHJcblx0Ly8g5a+55LqOJibvvIzlj6ropoHmnInkuIDkuKrlgLzliKTmlq3kuLpmYWxzZe+8jOWwsei/lOWbnuWIpOaWreS4umZhbHNl55qE6YKj5Liq5YC877yMXHJcblx0Ly8g5ZCm5YiZ6L+U5Zue5pyA5ZCO5LiA5Liq5YC8XHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIHVuZGVmaW5lZCAmJiAxMTApOyAvLyB1bmRlZmluZWRcclxuXHRjb25zb2xlLmxvZyhcIjU1XCIgJiYgbnVsbCAmJiAxMTApOyAvLyBudWxsXHJcblx0Y29uc29sZS5sb2coXCI1NVwiICYmIGZ1bmN0aW9uKCkge30gJiYgMTEwKTsgLy8gMTEwXHJcblxyXG5cdC8vIOaJgOS7pXx85Lya5pyJ5LiA5Liq5bi455So5L2c55So77ya5Lyg5Y+C5Yik5patXHJcblx0bGV0IGZ1bmMgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRhID0gYSB8fCAnSGVsbG8nO1xyXG5cdFx0YiA9IGIgfHwgJ1dvcmxkJztcclxuXHRcdHJldHVybiBhICsgXCIgXCIgKyBiO1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScpKTsgLy8gSGkgV29ybGRcclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScsIFwiXCIpKTsgLy8g5rOo5oSP6L+Z6YeM5Lyg5YWl5LqG5YGH5YC877yM57uT5p6c5L6d54S25pivSGkgV29ybGRcclxuXHRjb25zb2xlLmxvZyhmdW5jKCdIaScsIFwiIFwiKS50cmltKCkpOyAvLyDkvKDlhaXnqbrlrZfnrKbliJnliKTmlq3kuLp0cnVl77yM6L+U5ZueSGlcclxuXHJcblx0Y29uc29sZS5sb2codHlwZW9mIFwiXCIpIC8vIHN0cmluZ++8jOWmguaciemcgOaxguWPr+S7pemAmui/h+i/meS4qui/m+ihjOWuuemUmVxyXG5cclxuXHQvLyDmiYDku6UmJuS8muacieS4gOS4quW4uOeUqOS9nOeUqO+8muWIpOaWreWPguaVsOaYr+WQpuS4unRydWXvvIzmmK/liJnmiafooYzkuIDkuKrlh73mlbBcclxuXHR0cnVlICYmIChmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzICYmIGZ1bmN0aW9uIScpO1xyXG5cdH0pKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc3RhZ2UyLTEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpO1xudmFyICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7IHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnkgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9udW1iZXIvaXMtbmFuLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5OdW1iZXIuaXNOYU47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbnVtYmVyL2lzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubnVtYmVyLmlzLW5hbi5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
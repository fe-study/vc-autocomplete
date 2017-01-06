(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vcAutocomplete"] = factory();
	else
		root["vcAutocomplete"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 4 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 8 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 9 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(27)
  , hide      = __webpack_require__(31)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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

/***/ },
/* 11 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33)
  , defined = __webpack_require__(9);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(14)
module.exports = __webpack_require__(52)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(18)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue","-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Autocomplete.vue"], function () {
var newOptions = require("-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Autocomplete.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-065f8de0&file=Autocomplete.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Autocomplete.vue", function() {
			var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-065f8de0&file=Autocomplete.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Autocomplete.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0d270100&file=Easyclearinput.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Easyclearinput.vue", function() {
			var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0d270100&file=Easyclearinput.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Easyclearinput.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".vc-autocomplete-component {\n  position: relative;\n}\n.vc-autocomplete-component .input-box {\n  display: inline-block;\n  position: relative;\n}\n.vc-autocomplete-component .input-box:hover .clear-it {\n  visibility: visible;\n}\n.vc-autocomplete-component .input-box .clear-it {\n  visibility: hidden;\n  position: absolute;\n  right: 6px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  opacity: .3;\n}\n.transition,\n.autocomplete,\n.showAll-transition,\n.autocomplete ul,\n.autocomplete ul li a {\n  transition: all 0.3s ease-out;\n  -moz-transition: all 0.3s ease-out;\n  -webkit-transition: all 0.3s ease-out;\n  -o-transition: all 0.3s ease-out;\n}\n.autocomplete ul {\n  width: auto;\n  min-width: 100%;\n  font-family: sans-serif;\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translate(-50%);\n  transform: translate(-50%);\n  list-style: none;\n  background: #fff;\n  padding: 1px;\n  margin: 0;\n  display: inline-block;\n  margin-top: 10px;\n}\n/* 三角形 */\n.autocomplete ul:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 0;\n  width: 0;\n  border: 10px solid transparent;\n  border-bottom: 10px solid rgba(0, 0, 0, 0.15);\n  left: 46%;\n  top: -20px;\n}\n.autocomplete ul:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 0;\n  width: 0;\n  border: 10px solid transparent;\n  border-bottom: 10px solid #fff;\n  left: 46%;\n  top: -19px;\n}\n.autocomplete ul li a {\n  text-decoration: none;\n  display: block;\n  color: #2b2b2b;\n  padding: 5px;\n  padding-left: 10px;\n}\n.autocomplete ul li a:hover,\n.autocomplete ul li.focus-list a {\n  color: white;\n  background: #2F9AF7;\n}\n.autocomplete ul li a span {\n  display: block;\n  margin-top: 3px;\n  color: grey;\n  font-size: 13px;\n}\n.autocomplete ul li a:hover span,\n.autocomplete ul li.focus-list a span {\n  color: white;\n}\n.showAll-transition {\n  opacity: 1;\n  height: 30px;\n  overflow: hidden;\n}\n.showAll-enter {\n  opacity: 0.3;\n  height: 0;\n}\n.showAll-leave {\n  display: none;\n}\n", ""]);

// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".vc-easyclearinput-component .label-item {\n  font-weight: normal;\n  display: table;\n  vertical-align: bottom;\n  float: left;\n  height: 34px;\n  line-height: 34px;\n}\n.vc-easyclearinput-component textarea.form-control {\n  resize: vertical;\n}\n.vc-easyclearinput-component .glyphicon {\n  z-index: 9;\n}\n.vc-easyclearinput-component .input-box {\n  display: table;\n  position: relative;\n}\n.vc-easyclearinput-component .input-box .form-control {\n  width: 100%;\n  border-radius: 4px!important;\n}\n.vc-easyclearinput-component .input-box .form-control.slot-before {\n  border-top-left-radius: 0!important;\n  border-bottom-left-radius: 0!important;\n}\n.vc-easyclearinput-component .input-box .form-control.slot-after {\n  border-top-right-radius: 0!important;\n  border-bottom-right-radius: 0!important;\n}\n.vc-easyclearinput-component .input-box:hover .clear-it {\n  visibility: visible;\n}\n.vc-easyclearinput-component .input-box .clear-it {\n  visibility: hidden;\n  position: absolute;\n  top: 50%;\n  right: 6px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  opacity: .3;\n}\n.vc-easyclearinput-component .input-box .clear-it.has-icon {\n  right: 28px;\n}\n.vc-easyclearinput-component .info-text {\n  position: absolute;\n  top: -22px;\n}\n.vc-easyclearinput-component .info-text.with-success {\n  color: #87d068;\n}\n.vc-easyclearinput-component .info-text.with-warning {\n  color: #fa0;\n}\n.vc-easyclearinput-component .info-text.with-error {\n  color: #f50;\n}\n", ""]);

// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-autocomplete-component form-group\">\n        <vc-easyclearinput\n            :name=\"name\"\n            type=\"text\"\n            :value.sync=\"shownValue\"\n            :placeholder=\"placeholder\"\n            :label=\"label\"\n            @input=\"input | debounce 300\"\n            :on-blur=\"handleBlur\"\n            :on-focus=\"handleFocus\"\n            @keydown=\"keydown\"\n            :on-clear=\"clear\"\n        >\n            <div class=\"autocomplete transition autocomplete-{{ name }}\" id=\"autocomplete-{{ name }}\" v-show=\"showList\"> \n                <ul v-if=\"jsonList && jsonList.length > 0\" class=\"dropdown-menu\"> \n                    <li v-for=\"data in jsonList\" transition=\"showAll\" :class=\"activeClass($index)\"> \n                        <a href=\"#\" @click.prevent=\"$emit('selectList',data)\" @mousemove=\"mousemove($index)\">\n                            <span class=\"vc-autocomplete-item\">{{ data[anchor] }} {{ data[anchorPlus] }}</span>\n                        </a> \n                    </li>\n                </ul> \n                <ul class=\"dropdown-menu\" v-if=\"showNoContentTip\" style=\"text-align: center;padding: 10px;\">没有匹配的{{ label }}数据</ul>\n            </div>\n        </vc-easyclearinput>\n    </div>";

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-easyclearinput-component form-group\" :class=\"[statusClass, { 'has-feedback': icon }]\" :style=\"{ 'width': optionalWidth }\">\n        <label class=\"label-item\">{{ label }}</label>\n        <div class=\"info-text\" :class=\"infoTextClass\">{{ infoText }}</div>\n        <div :class=\"{ 'input-box': true, 'input-group': (slotBefore || slotAfter)}\">\n            <slot name=\"input-before\"></slot>\n            <span v-if=\"!slot-before || !slot-after\" style=\"width: 1%;display: table-cell\">&nbsp;</span><!-- 占位元素，用于撑开宽度，原因未知 -->\n            <span v-if=\"icon\" class=\"glyphicon form-control-feedback\" :class=\"iconClass\" aria-hidden=\"true\"></span>\n            <span @click=\"handleClear\" class=\"clear-it glyphicon glyphicon-remove-circle\" :class=\"{ 'has-icon': icon, 'hide': hideClearIcon, 'slot-after': slotAfter }\" aria-hidden=\"true\"></span>\n            <input class=\"form-control\"\n                :class=\"[ 'form-control', slotBefore ? 'slot-before' : '', slotAfter ? 'slot-after' : '' ]\"\n                v-if=\"type !== 'textarea'\"\n                v-el:input\n                :type=\"type\"\n                :disabled=\"disabled\"\n                :readonly=\"readonly\"\n                v-model=\"value\"\n                :placeholder=\"placeholder\"\n                @focus=\"handleFocus\"\n                @blur=\"handleBlur\"\n            />\n            <textarea \n                v-if=\"type === 'textarea'\"\n                class=\"form-control\"\n                v-el:input\n                :type=\"type\"\n                :disabled=\"disabled\"\n                :readonly=\"readonly\"\n                v-model=\"value\"\n                :placeholder=\"placeholder\"\n                @focus=\"handleFocus\"\n                @blur=\"handleBlur\"\n            >\n            </textarea>\n            <slot></slot>\n            <slot name=\"input-after\"></slot>\n        </div>\n    </div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

var core  = __webpack_require__(0)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = __webpack_require__(0).Number.isInteger;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(48);
module.exports = __webpack_require__(0).Object.keys;

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(43)
  , toIndex   = __webpack_require__(42);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 26 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 29 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 30 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(35)
  , createDesc = __webpack_require__(39);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(1)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(24)
  , IE8_DOM_DEFINE = __webpack_require__(32)
  , toPrimitive    = __webpack_require__(45)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(30)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(25)(false)
  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(36)
  , enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(10)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ },
/* 39 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys')
  , uid    = __webpack_require__(46);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(11)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(11)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 46 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(10);

$export($export.S, 'Number', {isInteger: __webpack_require__(34)});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(44)
  , $keys    = __webpack_require__(37);

__webpack_require__(38)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(49);

var _stringify2 = _interopRequireDefault(_stringify);

var _Easyclearinput = __webpack_require__(54);

var _Easyclearinput2 = _interopRequireDefault(_Easyclearinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <template>
//     <div class="vc-autocomplete-component form-group">
//         <vc-easyclearinput
//             :name="name"
//             type="text"
//             :value.sync="shownValue"
//             :placeholder="placeholder"
//             :label="label"
//             @input="input | debounce 300"
//             :on-blur="handleBlur"
//             :on-focus="handleFocus"
//             @keydown="keydown"
//             :on-clear="clear"
//         >
//             <div class="autocomplete transition autocomplete-{{ name }}" id="autocomplete-{{ name }}" v-show="showList"> 
//                 <ul v-if="jsonList && jsonList.length > 0" class="dropdown-menu"> 
//                     <li v-for="data in jsonList" transition="showAll" :class="activeClass($index)"> 
//                         <a href="#" @click.prevent="$emit('selectList',data)" @mousemove="mousemove($index)">
//                             <span class="vc-autocomplete-item">{{ data[anchor] }} {{ data[anchorPlus] }}</span>
//                         </a> 
//                     </li>
//                 </ul> 
//                 <ul class="dropdown-menu" v-if="showNoContentTip" style="text-align: center;padding: 10px;">没有匹配的{{ label }}数据</ul>
//             </div>
//         </vc-easyclearinput>
//     </div>
// </template>

// <style lang="less">
// // container
// .vc-autocomplete-component {
//     position: relative;

//     .input-box {
//         display: inline-block;
//         position: relative; // 更内聚的relative保证

//         &:hover {
//             .clear-it {
//                 visibility: visible;
//             }
//         }

//         .clear-it {
//             visibility: hidden;
//             position: absolute;
//             right: 6px;
//             top: 50%;
//             -webkit-transform: translateY(-50%);
//             transform: translateY(-50%);
//             opacity: .3;
//         }
//     }
// }

// .transition, .autocomplete, .showAll-transition, .autocomplete ul, .autocomplete ul li a{
//     transition:all 0.3s ease-out;
//     -moz-transition:all 0.3s ease-out;
//     -webkit-transition:all 0.3s ease-out;
//     -o-transition:all 0.3s ease-out;
// }

// .autocomplete ul {
//     width: auto;
//     min-width: 100%;
//     font-family: sans-serif;
//     position: absolute;
//     left: 50%;
//     -webkit-transform: translate(-50%);
//     transform: translate(-50%);
//     list-style: none;
//     background: #fff;
//     padding: 1px;
//     margin: 0;
//     display: inline-block;
//     margin-top: 10px;
// }

// /* 三角形 */
// .autocomplete ul:before {
//     content: "";
//     display: block;
//     position: absolute;
//     height: 0;
//     width: 0;
//     border: 10px solid transparent;
//     border-bottom: 10px solid rgba(0, 0, 0, 0.15);
//     left: 46%;
//     top: -20px
// }
// .autocomplete ul:after {
//     content: "";
//     display: block;
//     position: absolute;
//     height: 0;
//     width: 0;
//     border: 10px solid transparent;
//     border-bottom: 10px solid #fff;
//     left: 46%;
//     top: -19px
// }
// .autocomplete ul li a {
//     text-decoration: none;
//     display: block;
//     color: #2b2b2b;
//     padding: 5px;
//     padding-left: 10px;
// }

// .autocomplete ul li a:hover, .autocomplete ul li.focus-list a {
//     color: white;
//     background: #2F9AF7;
// }

// .autocomplete ul li a span {
//     display: block;
//     margin-top: 3px;
//     color: grey;
//     font-size: 13px;
// }

// .autocomplete ul li a:hover span, .autocomplete ul li.focus-list a span {
//     color: white;
// }

// .showAll-transition {
//     opacity: 1;
//     height: 30px;
//     overflow: hidden;
// }

// .showAll-enter {
//     opacity: 0.3;
//     height: 0;
// }

// .showAll-leave {
//     display: none;
// }
// </style>

// <script>
var COMPONENT_NS = 'AUTOCOMPLETE';

exports.default = {
    name: 'vc-autocomplete',
    props: {
        // name for unique component identity, also as input dom's name attr
        name: String,
        // 是否聚焦
        autofocus: {
            type: Boolean,
            default: false
        },
        fallback: { // 尽量表现的像一个input输入框
            type: Boolean,
            default: true
        },
        autoSelect: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: String,

        // 用于同步父组件
        parentModelKey: String, // v-model like, 用于同步父组件model, 传进字符串作为key

        // 比较模式
        mode: {
            type: String,
            default: 'remote'
        },

        // 本地补全待比较池
        store: {
            type: Array
        },
        /**
         * @param {String} target1 比较目标1,即输入值
         * @param {String} target2 比较目标2,即比较池中的item
         * @return {Number} result 比较结果,返回相似度,越小说明越接近
         */
        comparer: Function,

        // ajax请求地址
        url: {
            type: String,
            required: true
        },
        // 请求补充参数  e.g. 'city=131&word='
        param: {
            type: String,
            default: 'word'
        },
        // 可传入解析器,不传则用内置的getDeepData
        dataParser: Function,
        // 数据层级获取目标,由于每个api设计的返回结果的数据结构不一定一样,所以要求强制设置!default仅仅是个示例
        target: {
            type: String,
            required: true,
            default: 'data.list'
        },

        // 请求limit的key名，有默认值，可配置
        limitKey: {
            type: String,
            default: 'limit'
        },
        // add 'limit' query to AJAX URL which will be fetched
        limit: {
            type: String,
            default: ''
        },
        // 数据的锚点，即ajax返回的的每一个item中你需要取出来展示的特定key
        anchor: {
            type: String,
            required: true
        },
        // 补充锚点，此处不是太好，局限了组件只能扩展一个显示锚点
        anchorPlus: {
            type: String,
            default: 'district'
        }
    }, // end of props
    data: function data() {
        return {
            shownValue: '', // 显示值 
            inputValue: "", // 输入值
            vm: null, // 用户下拉选择的item(一般为Object, fallback时为String输入值) 真正同步给外界的值
            userSelected: false,
            showList: false, // 是否显示下拉结果列表
            jsonList: [], // ajax的返回值的解析后的json列表
            json: function json(data) {
                return JSON.parse((0, _stringify2.default)(data));
            },

            showNoContentTip: false,
            focusListIndex: "" // focus的item游标
        };
    },
    created: function created() {
        // sync parent model with $data.type
        this.shownValue = this.$parent.$data[this.parentModelKey];
        this.vm = this.$parent.$data[this.parentModelKey];
    },
    ready: function ready() {
        if (this.autofocus) {
            this.focusInput();
        }
    },

    watch: {
        autofocus: function autofocus(val) {
            this.focusInput();
        },
        vm: function vm(val, old) {
            // CORE: Sync parent model with this.vm
            return this.$parent.$data[this.parentModelKey] = val;
        }
    },
    components: {
        vcEasyclearinput: _Easyclearinput2.default
    },
    methods: {
        /**
         * @param {String} a 比较目标1(item)
         * @param {String} b 比较目标2(one of compare-store item)
         * return {Number} 编辑距离 
         */
        editDistance: function editDistance(a, b) {
            if (a.indexOf(b) > -1 || b.indexOf(a) > -1) {
                return -1;
            }
            var al = a.length + 1;
            var bl = b.length + 1;
            var result = [];
            var temp = 0;
            var i = void 0,
                j = void 0

            // 创建一个二维数组
            ;for (i = 0; i < al; result[i] = [i++]) {}
            for (i = 0; i < bl; result[0][i] = i++) {}

            for (i = 1; i < al; i++) {
                for (j = 1; j < bl; j++) {
                    // 判断最上方和最左方数字是否相等
                    temp = a[i - 1] == b[j - 1] ? 0 : 1;
                    // result[i - 1][j] + 1 左方数字
                    // result[i][j - 1] + 1 上方数字
                    // result[i - 1][j - 1] + temp 左上方数字
                    result[i][j] = Math.min(result[i - 1][j] + 1, result[i][j - 1] + 1, result[i - 1][j - 1] + temp);
                }
            }

            return result[i - 1][j - 1];
        },
        fetchLocal: function fetchLocal(inputVal, storeArr) {
            var comparer = comparer || this.editDistance;
            var s = storeArr || this.store;
            var ret = [];
            for (var i = 0, len = s.length; i < len; i++) {
                var obj = {};
                obj[this.anchor] = s[i]; // since `anchor` prop is required
                obj['distance'] = comparer(inputVal, s[i]);
                ret.push(obj);
            }
            ret.sort(function (item, nextItem) {
                return item['distance'] > nextItem['distance'];
            });
            this.jsonList = ret;
        },
        fetchRemote: function fetchRemote(inputVal) {
            var _this = this;

            if (this.url != null) {
                (function () {
                    var msg = {
                        action: 'beforeAjax',
                        data: inputVal
                    };
                    _this.$dispatch(COMPONENT_NS, msg, _this.name);

                    var xhr = new XMLHttpRequest();

                    var limit = void 0;
                    if (_this.limit !== '') {
                        _this.limit = parseFloat(_this.limit);
                        limit = _this.limit !== "" ? '&' + _this.limitKey + '=' + _this.limit : '';
                    } else {
                        limit = '';
                    }

                    var fullUrl = _this.url + '?' + _this.param + '=' + inputVal + limit; // baseUrl + 请求参数 + 实时输入值 + limitQuery 
                    xhr.open('GET', fullUrl);
                    xhr.send(null);

                    xhr.addEventListener('progress', function (data) {
                        if (data.lengthComputable) {
                            var _msg = {
                                action: 'xhrProgress',
                                data: data
                            };
                            _this.$dispatch(COMPONENT_NS, _msg, _this.name);
                        }
                    });

                    xhr.addEventListener('loadend', function (data) {
                        var json = JSON.parse(xhr.responseText);
                        // 有解析器就用，没有就用内置解析器
                        if (_this.dataParser) {
                            json = _this.dataParser(json);
                        } else {
                            json = _this.getDeepData(json, _this.target);
                        }

                        var msg = {
                            action: 'xhrLoaded',
                            data: json
                        };
                        _this.$dispatch(COMPONENT_NS, msg, _this.name);
                        _this.jsonList = json;

                        if (json == null || json.length < 1) {
                            if (!_this.fallback) {
                                _this.showNoContentTip = true;
                            }
                        } else {
                            _this.showNoContentTip = false;
                        }
                    });

                    xhr.addEventListener('error', function (err) {
                        console.error(err);
                    });
                })();
            }
        },
        focusInput: function focusInput() {
            this.$els.input && this.$els.input.focus();
        },
        clear: function clear() {
            this.shownValue = '';
            this.vm = null;
        },

        // 并不是每个api返回的结构、层级都是一样的，需要接受传参配置，然后递归解析
        getDeepData: function getDeepData(data, target) {
            var levels = target.split('.');
            for (var i = 0, len = levels.length; i < len; i++) {
                data = data[levels[i]];
            }

            return data;
        },

        // DOMEvent => @input
        input: function input() {
            this.userSelected = false;
            var val = this.shownValue;
            this.inputValue = this.shownValue;
            this.showList = true;

            var msg = {
                action: 'input',
                data: val
            };
            if (this.fallback) {
                this.vm = val;
            }
            this.$dispatch(COMPONENT_NS, msg, this.name);
            this.$emit('fetchData', val);

            // return this.$parent.$data[this.parentModelKey] = val
        },

        // DOMEvent => @dblclick
        showAll: function showAll() {
            this.jsonList = [];
            this.$emit('fetchData');

            var msg = {
                action: 'show',
                data: null
            };
            this.$dispatch(COMPONENT_NS, msg, this.name);

            this.showList = true;
        },

        // DOMEvent => @blur
        hideAll: function hideAll(e) {
            var _this2 = this;

            var msg = {
                action: 'blur',
                data: e
            };
            this.$dispatch(COMPONENT_NS, msg, this.name);

            setTimeout(function () {
                _this2.showList = false;

                var msg = {
                    action: 'hide',
                    data: null
                };
                _this2.$dispatch(COMPONENT_NS, msg, _this2.name);
            }, 250);
        },
        handleBlur: function handleBlur(e) {
            if (this.shownValue !== '' && (this.vm == null || this.vm === '')) {
                if (!this.autoSelect && !this.fallback) {
                    console.info('maybe you should use `fallback` or `autoSelect` mode to make the value as what you input!');
                }
            }
            this.hideAll(e);
            if (!this.userSelected && this.autoSelect) {
                this.vm = this.jsonList && this.jsonList[0] || this.vm;
                if (typeof this.vm === 'string' || this.vm == null) {
                    this.shownValue = this.vm && this.vm[this.anchor];
                }
                this.jsonList = []; // 值得商榷
            }
        },

        // DOMEvent => @focus
        handleFocus: function handleFocus(e) {
            this.focusListIndex = 0;

            var msg = {
                action: 'focus',
                data: e
            };
            this.$dispatch(COMPONENT_NS, msg, this.name);
        },

        // DOMEvent => @mousemove
        mousemove: function mousemove(i) {
            this.focusListIndex = i;
        },

        // DOMEvent => @keydown
        keydown: function keydown(e) {
            var key = e.keyCode;

            // Disable when list isn't showing up
            if (!this.showList) return;

            switch (key) {
                case 40:
                    //down
                    this.focusListIndex++;
                    break;
                case 38:
                    //up
                    this.focusListIndex--;
                    break;
                case 13:
                    //enter
                    this.$emit('selectList', this.jsonList[this.focusListIndex]);
                    this.showList = false;
                    break;
                case 27:
                    //esc
                    this.showList = false;
                    break;
            }

            // When cursor out of range
            var listLength = this.jsonList && this.jsonList.length - 1;
            this.focusListIndex = this.focusListIndex > listLength ? 0 : this.focusListIndex < 0 ? listLength : this.focusListIndex;
        },

        // for active in all condition
        activeClass: function activeClass(i) {
            return {
                'focus-list': i === this.focusListIndex
            };
        }
    }, // end of methods
    events: {
        selectList: function selectList(data) {
            this.userSelected = true;
            data = this.json(data);

            // Put the selected data to vm(v-model) 
            this.vm = data;
            this.shownValue = data[this.anchor];
            this.showList = false;

            var msg = {
                action: 'selected',
                data: data
            };
            this.$dispatch(COMPONENT_NS, msg, this.name);
        },
        fetchData: function fetchData(inputVal) {
            if (inputVal == null || inputVal === '') return;
            if (this.mode === 'remote') {
                this.fetchRemote(inputVal);
            } else if (this.mode === 'local') {
                this.fetchLocal(inputVal);
            } else {
                console.warn('maybe no this mode!');
            }
        }
    } // end of events
};
// </script>

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(51);

var _keys2 = _interopRequireDefault(_keys);

var _isInteger = __webpack_require__(50);

var _isInteger2 = _interopRequireDefault(_isInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <template>
//     <div class="vc-easyclearinput-component form-group" :class="[statusClass, { 'has-feedback': icon }]" :style="{ 'width': optionalWidth }">
//         <label class="label-item">{{ label }}</label>
//         <div class="info-text" :class="infoTextClass">{{ infoText }}</div>
//         <div :class="{ 'input-box': true, 'input-group': (slotBefore || slotAfter)}">
//             <slot name="input-before"></slot>
//             <span v-if="!slot-before || !slot-after" style="width: 1%;display: table-cell">&nbsp;</span><!-- 占位元素，用于撑开宽度，原因未知 -->
//             <span v-if="icon" class="glyphicon form-control-feedback" :class="iconClass" aria-hidden="true"></span>
//             <span @click="handleClear" class="clear-it glyphicon glyphicon-remove-circle" :class="{ 'has-icon': icon, 'hide': hideClearIcon, 'slot-after': slotAfter }" aria-hidden="true"></span>
//             <input class="form-control"
//                 :class="[ 'form-control', slotBefore ? 'slot-before' : '', slotAfter ? 'slot-after' : '' ]"
//                 v-if="type !== 'textarea'"
//                 v-el:input
//                 :type="type"
//                 :disabled="disabled"
//                 :readonly="readonly"
//                 v-model="value"
//                 :placeholder="placeholder"
//                 @focus="handleFocus"
//                 @blur="handleBlur"
//             />
//             <textarea 
//                 v-if="type === 'textarea'"
//                 class="form-control"
//                 v-el:input
//                 :type="type"
//                 :disabled="disabled"
//                 :readonly="readonly"
//                 v-model="value"
//                 :placeholder="placeholder"
//                 @focus="handleFocus"
//                 @blur="handleBlur"
//             >
//             </textarea>
//             <slot></slot>
//             <slot name="input-after"></slot>
//         </div>
//     </div>
// </template>

// <style lang="less">
// // container
// .vc-easyclearinput-component {

//     .label-item {
//         font-weight: normal;
//         display: table;
//         vertical-align: bottom;
//         float: left;
//         height: 34px;
//         line-height: 34px;
//     }

//     textarea.form-control {
//         resize: vertical;
//     }

//     .glyphicon {
//         z-index: 9;
//     }

//     .input-box {
//         display: table;
//         position: relative;

//         .form-control {
//             width: 100%;
//             border-radius: 4px!important; 
//             &.slot-before {
//                 border-top-left-radius: 0!important;
//                 border-bottom-left-radius: 0!important;
//             }
//             &.slot-after {
//                 border-top-right-radius: 0!important;
//                 border-bottom-right-radius: 0!important;
//             }
//         }
//         &:hover {
//             .clear-it {
//                 visibility: visible;
//             }
//         }

//         .clear-it {
//             visibility: hidden;
//             position: absolute;
//             top: 50%;
//             right: 6px;
//             // css3 it more flexible
//             -webkit-transform: translateY(-50%);
//             transform: translateY(-50%);
//             opacity: .3;

//             &.slot-after {

//             }

//             &.has-icon {
//                 right: 28px;
//             }
//         }
//     }

//     @success: #87d068;
//     @warning: #fa0;
//     @error: #f50;
//     .info-text {
//         position: absolute;
//         top: -22px;

//         &.with-success {
//             color: @success;
//         }
//         &.with-warning {
//             color: @warning;
//         }
//         &.with-error {
//             color: @error;
//         }
//     }

// } // end of container
// </style>

// <script>
var EVENT_DELAY = 128;

exports.default = {
    name: 'vc-easyclearinput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            twoWay: true
        },
        label: String,
        placeholder: String,
        infoText: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: '250'
        },
        icon: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: ''
        },
        onFocus: { // focus回调
            type: Function,
            default: function _default() {}
        },
        onBlur: { // blur回调
            type: Function,
            default: function _default() {}
        },
        onClear: { // onClear回调
            type: Function,
            default: function _default() {}
        }
    },
    data: function data() {
        return {
            isClear: false,
            slotBefore: false,
            slotAfter: false
        };
    },
    created: function created() {},
    ready: function ready() {
        if (this.autofocus) {
            this.focusInput();
        }
        // 检查是否有用户自定义slot传入(input-before)
        this.checkSlot();
        // 检查用户是否内联了不该内联的事件(focus & blur)
        this.checkEvents();
    },

    computed: {
        hideClearIcon: function hideClearIcon() {
            return this.value == null || this.value === '' || this.disabled || this.readonly;
        },
        optionalWidth: function optionalWidth() {
            if (this.width == null || this.width === '') {
                return null;
            }
            if ((0, _isInteger2.default)(+this.width)) {
                return this.width + 'px';
            }
            return this.width;
        },
        statusClass: function statusClass() {
            return 'has-' + this.status;
        },
        infoTextClass: function infoTextClass() {
            return 'with-' + this.status;
        },
        iconClass: function iconClass() {
            if (this.status === 'success') {
                return 'glyphicon-ok';
            }
            if (this.status === 'warning') {
                return 'glyphicon-warning-sign';
            }
            if (this.status === 'error') {
                return 'glyphicon-remove';
            }
        }
    },
    watch: {
        autofocus: function autofocus(val) {
            if (val) {
                this.focusInput();
            }
        }
    },
    methods: {
        checkSlot: function checkSlot() {
            var keys = (0, _keys2.default)(this._slotContents);
            for (var i = 0, len = keys.length; i < len; i++) {
                if (keys[i] === 'input-before') {
                    this.slotBefore = true;
                }
                if (keys[i] === 'input-after') {
                    this.slotAfter = true;
                }
            }
        },
        checkEvents: function checkEvents() {
            var focus = this._events.focus;
            if (focus && focus.length > 0) {
                console.warn('if you want to listen on focus event, please use `:on-focus` callback!');
            }
            var blur = this._events.blur;
            if (blur && blur.length > 0) {
                console.warn('if you want to listen on blur event, please use `:on-blur` callback!');
            }
        },

        /**
         * 点击清除按钮
         * 1. blur 2. clear 3.focus again
         * 事件修正，使得小叉号成为类似系统原生的和input一体的控件，
         * 点击小叉号不应该带来input的失焦还有相应事件的响应
         */
        focusInput: function focusInput() {
            // 工具方法
            this.$els.input && this.$els.input.focus();
        },
        handleBlur: function handleBlur(e) {
            var _this = this;

            // console.log(1)
            setTimeout(function () {
                if (!_this.isClear) {
                    _this.onBlur(e);
                } else {
                    setTimeout(function () {
                        _this.focusInput();
                    }, 0);
                }
                // this.isClear = false
            }, EVENT_DELAY);
        },
        handleClear: function handleClear() {
            // console.log(2)
            // 可编辑状态下
            if (!this.disabled && !this.readonly) {
                this.isClear = true;
                this.value = '';
                this.onClear();
                this.focusInput();
            }
        },
        handleFocus: function handleFocus(e) {
            var _this2 = this;

            // console.log(3)
            setTimeout(function () {
                if (!_this2.isClear) {
                    _this2.onFocus(e);
                }
                _this2.isClear = false;
            }, EVENT_DELAY + 10);
        }
    }
};
// </script>

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(15)
module.exports = __webpack_require__(53)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(19)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue","-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Easyclearinput.vue"], function () {
var newOptions = require("-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Easyclearinput.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Easyclearinput.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Autocomplete = __webpack_require__(13);

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Autocomplete2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueComponentsName"] = factory();
	else
		root["VueComponentsName"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(3)
module.exports = __webpack_require__(10)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(6)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue","-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Autocomplete.vue"], function () {
var newOptions = require("-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Autocomplete.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Autocomplete.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0af67f43&file=Autocomplete.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Autocomplete.vue", function() {
			var newContent = require("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-0af67f43&file=Autocomplete.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Autocomplete.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".vc-autocomplete-component {\n  position: relative;\n}\n.vc-autocomplete-component .input-box {\n  display: inline-block;\n  position: relative;\n}\n.vc-autocomplete-component .input-box:hover .clear-it {\n  visibility: visible;\n}\n.vc-autocomplete-component .input-box .clear-it {\n  visibility: hidden;\n  position: absolute;\n  right: 6px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  opacity: .3;\n}\n.transition,\n.autocomplete,\n.showAll-transition,\n.autocomplete ul,\n.autocomplete ul li a {\n  transition: all 0.3s ease-out;\n  -moz-transition: all 0.3s ease-out;\n  -webkit-transition: all 0.3s ease-out;\n  -o-transition: all 0.3s ease-out;\n}\n.autocomplete ul {\n  width: auto;\n  min-width: 100%;\n  font-family: sans-serif;\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translate(-50%);\n  transform: translate(-50%);\n  list-style: none;\n  background: #fff;\n  padding: 1px;\n  margin: 0;\n  display: inline-block;\n  margin-top: 10px;\n}\n/* 三角形 */\n.autocomplete ul:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 0;\n  width: 0;\n  border: 10px solid transparent;\n  border-bottom: 10px solid rgba(0, 0, 0, 0.15);\n  left: 46%;\n  top: -20px;\n}\n.autocomplete ul:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 0;\n  width: 0;\n  border: 10px solid transparent;\n  border-bottom: 10px solid #fff;\n  left: 46%;\n  top: -19px;\n}\n.autocomplete ul li a {\n  text-decoration: none;\n  display: block;\n  color: #2b2b2b;\n  padding: 5px;\n  padding-left: 10px;\n}\n.autocomplete ul li a:hover,\n.autocomplete ul li.focus-list a {\n  color: white;\n  background: #2F9AF7;\n}\n.autocomplete ul li a span {\n  display: block;\n  margin-top: 3px;\n  color: grey;\n  font-size: 13px;\n}\n.autocomplete ul li a:hover span,\n.autocomplete ul li.focus-list a span {\n  color: white;\n}\n.showAll-transition {\n  opacity: 1;\n  height: 30px;\n  overflow: hidden;\n}\n.showAll-enter {\n  opacity: 0.3;\n  height: 0;\n}\n.showAll-leave {\n  display: none;\n}\n", ""]);

// exports


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-autocomplete-component form-group\">\n        <label class=\"\">{{ label }}</label>\n        <div class=\"input-box\">\n            <input v-el:input type=\"text\" :id=\"id\" class=\"form-control\" autocomplete=\"off\" :class=\"class\" :name=\"name\" :placeholder=\"placeholder\" v-model=\"vm\" @input=\"input(vm) | debounce 300\" @blur=\"hideAll\" @keydown=\"keydown\" @focus=\"focus\" />\n            <span class=\"clear-it glyphicon glyphicon-remove-circle\" aria-hidden=\"true\" @click=\"clear()\"></span>\n            <div class=\"autocomplete transition autocomplete-{{ name }}\" id=\"autocomplete-{{ name }}\" v-show=\"showList\"> \n                <ul v-if=\"jsonList && jsonList.length > 0\" class=\"dropdown-menu\"> \n                    <li v-for=\"data in jsonList\" transition=\"showAll\" :class=\"activeClass($index)\"> \n                        <a href=\"#\" @click.prevent=\"$emit('selectList',data)\" @mousemove=\"mousemove($index)\">\n                            <span class=\"vc-autocomplete-item\">{{ data[anchor] }} {{ data[anchorPlus] }}</span>\n                        </a> \n                    </li>\n                </ul> \n                <ul class=\"dropdown-menu\" v-if=\"showNoContentTip\" style=\"text-align: center;padding: 10px;\">没有匹配的{{ label }}数据</ul>\n            </div>\n        </div>\n    </div>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var core  = __webpack_require__(8)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ },
/* 8 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(9);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <template>
//     <div class="vc-autocomplete-component form-group">
//         <label class="">{{ label }}</label>
//         <div class="input-box">
//             <input v-el:input type="text" :id="id" class="form-control" autocomplete="off" :class="class" :name="name" :placeholder="placeholder" v-model="vm" @input="input(vm) | debounce 300" @blur="hideAll" @keydown="keydown" @focus="focus" />
//             <span class="clear-it glyphicon glyphicon-remove-circle" aria-hidden="true" @click="clear()"></span>
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
//         </div>
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
exports.default = {
    props: {
        name: String, // name for unique component identity, also as input dom's name attr
        id: String, // input dom's id attr
        class: String, // input dom's class attr
        autofocus: {
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
        // 可传入解析器,不传则用内置的getDeepData
        dataParser: Function,
        // 数据层级获取目标,由于每个api设计的返回结果的数据结构不一定一样,所以要求强制设置!default仅仅是个示例
        target: {
            type: String,
            required: true,
            default: 'data.list'
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
            vm: "", // 输入值
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
    methods: {
        focusInput: function focusInput() {
            this.$els.input && this.$els.input.focus();
        },

        clear: function clear() {
            this.vm = '';
        },
        // 并不是每个api返回的结构、层级都是一样的，需要接受传参配置，然后递归解析
        getDeepData: function getDeepData(data, target) {
            var levels = target.split('.');
            for (var i = 0, len = levels.length; i < len; i++) {
                data = data[levels[i]];
            }

            return data;
        },
        // domEvent => @input
        input: function input(val) {
            this.showList = true;

            var msg = {
                action: 'input',
                data: val
            };
            this.$dispatch('AUTOCOMPLETE', msg, this.name);
            this.$emit('fetchData', val);

            return this.$parent.$data[this.parentModelKey] = val;
        },
        // domEvent => @dblclick
        showAll: function showAll() {
            this.jsonList = [];
            this.$emit('fetchData');

            var msg = {
                action: 'show',
                data: null
            };
            this.$dispatch('AUTOCOMPLETE', msg, this.name);

            this.showList = true;
        },
        // domEvent => @blur
        hideAll: function hideAll(e) {
            var self = this;

            var msg = {
                action: 'blur',
                data: e
            };
            this.$dispatch('AUTOCOMPLETE', msg, this.name);

            setTimeout(function () {
                self.showList = false;

                var msg = {
                    action: 'hide',
                    data: null
                };
                self.$dispatch('AUTOCOMPLETE', msg, self.name);
            }, 250);
        },
        // domEvent => @focus
        focus: function focus(e) {
            this.focusListIndex = 0;

            var msg = {
                action: 'focus',
                data: e
            };
            this.$dispatch('AUTOCOMPLETE', msg, this.name);
        },
        // domEvent => @mousemove
        mousemove: function mousemove(i) {
            this.focusListIndex = i;
        },
        // domEvent => @keydown
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
            var data = this.json(data);

            // Put the selected data to vm(v-model) 
            this.vm = data[this.anchor];
            this.showList = false;

            var msg = {
                action: 'selected',
                data: data
            };
            this.$dispatch('AUTOCOMPLETE', msg, this.name);
        },
        fetchData: function fetchData(inputVal) {
            if (!inputVal) return;
            var self = this;

            if (this.url != null) {
                var msg = {
                    action: 'beforeAjax',
                    data: inputVal
                };
                this.$dispatch('AUTOCOMPLETE', msg, self.name);

                var ajax = new XMLHttpRequest();

                var limit;
                if (this.$get('limit') !== '') {
                    this.limit = parseFloat(this.limit);
                    limit = this.limit !== "" ? '&' + this.limitKey + '=' + this.limit : '';
                } else {
                    limit = '';
                }

                var fullUrl = this.url + '?' + this.param + '=' + inputVal + limit; // baseUrl + 请求参数 + 实时输入值 + limitQuery 
                ajax.open('GET', fullUrl);
                ajax.send(null);

                ajax.addEventListener('progress', function (data) {
                    if (data.lengthComputable) {
                        var msg = {
                            action: 'ajaxProgress',
                            data: data
                        };
                        self.$dispatch('AUTOCOMPLETE', msg, self.name);
                    }
                });

                ajax.addEventListener('loadend', function (data) {
                    var json = JSON.parse(this.responseText);
                    // 有解析器就用，没有就用内置解析器
                    if (self.dataParser) {
                        json = self.dataParser(json);
                    } else {
                        json = self.getDeepData(json, self.target);
                    }

                    var msg = {
                        action: 'ajaxLoaded',
                        data: json
                    };
                    self.$dispatch('AUTOCOMPLETE', msg, this.name);
                    self.jsonList = json;
                    if (json == null || json.length < 1) {
                        self.showNoContentTip = true;
                    } else {
                        self.showNoContentTip = false;
                    }
                });
            }
        }
    } // end of events
};
// </script>

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Autocomplete = __webpack_require__(1);

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Autocomplete2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map
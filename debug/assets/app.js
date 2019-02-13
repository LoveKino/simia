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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/draw.js":
/*!**********************!*\
  !*** ../src/draw.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * drawing shapes with canvas\n *\n * drawing norm:\n *\n *    (ctx, x, y, w, h, options) => void\n */\n\n/**\n * draw a rect in the target area\n *\n * options = {\n *   border: {\n *     color,\n *     lineWidth\n *   },\n *\n *   color\n * }\n */\nmodule.exports = ({\n  defaultFont = '16px serif',\n  defaultColor = 'rgba(255, 255, 255, 0)',\n  defaultTextColor = '#24292e',\n  defaultLineWidth = 1.0\n} = {}) => {\n  const rect = (ctx, x, y, w, h, {\n    border,\n    color = defaultColor\n  }) => {\n    if (border) {\n      const lineWidth = border.lineWidth || defaultLineWidth;\n      ctx.lineWidth = lineWidth;\n      ctx.strokeStyle = border.color || defaultColor;\n\n      // TODO safety\n      ctx.strokeRect(x + lineWidth / 2, y + lineWidth / 2, w - lineWidth, h - lineWidth);\n    }\n\n    ctx.fillStyle = color;\n    ctx.fillRect(x, y, w, h);\n  };\n\n  /**\n   * options = {\n   *   color,\n   *   lineWidth,\n   *   font\n   * }\n   */\n  const text = (ctx, str, x, y, w, h, {\n    font = defaultFont,\n    color = defaultTextColor,\n  } = {}) => {\n    ctx.fillStyle = color;\n    ctx.font = font;\n    ctx.textBaseline = 'top';\n    // TODO what if textLen is bigger than w\n    // const textLen = ctx.measureText(str);\n    ctx.fillText(str, x, y);\n  };\n\n  /**\n   * options = {\n   * }\n   */\n  const image = (ctx, imgSrc, x, y, w, h) => {\n    const img = new Image();\n    img.onload = () => {\n      ctx.drawImage(img, x, y, w, h);\n      // ctx.drawImage(img, x, y);\n    };\n    img.src = imgSrc;\n  };\n\n  return {\n    rect,\n    text,\n    image\n  };\n};\n\n\n//# sourceURL=webpack:///../src/draw.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\n\nfunction getRelativeCoordinates(event, element) {\n  const position = {\n    x: event.pageX,\n    y: event.pageY\n  };\n\n  const offset = {\n    left: element.offsetLeft,\n    top: element.offsetTop\n  };\n\n  let reference = element.offsetParent;\n\n  while (reference != null) {\n    offset.left += reference.offsetLeft;\n    offset.top += reference.offsetTop;\n    reference = reference.offsetParent;\n  }\n\n  return {\n    x: position.x - offset.left,\n    y: position.y - offset.top,\n  };\n}\n\nconst w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\nconst h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n\nconst canvas = document.createElement('canvas');\ndocument.getElementById('app').appendChild(canvas);\n\nconst scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.\ncanvas.width = w * scale;\ncanvas.height = h * scale;\ncanvas.style.width = `${w}px`;\ncanvas.style.height = `${h}px`;\n\ncanvas.addEventListener('click', (e) => {\n  log(getRelativeCoordinates(e, canvas));\n});\n\nconst ctx = canvas.getContext('2d');\n// Normalize coordinate system to use css pixels.\nctx.scale(scale, scale);\n\nconst {\n  rect,\n  text,\n  image\n} = __webpack_require__(/*! ../src/draw */ \"../src/draw.js\")();\n\nrect(ctx, 0.0, 10.0, 30.0, 30.0, {\n  color: 'red'\n});\n\nrect(ctx, 40.0, 10.0, 30.0, 30.0, {\n  border: {\n    color: 'blue',\n    lineWidth: 12.0\n  }\n});\n\ntext(ctx, 'hello world!', 80.0, 10.0, 30.0, 30.0);\nimage(ctx, './assets/test.png', 120, 10, 60, 60);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./index.js */\"./index.js\");\n\n\n//# sourceURL=webpack:///multi_./index.js?");

/***/ })

/******/ });
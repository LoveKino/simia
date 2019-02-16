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

eval("/**\n * drawing shapes with canvas\n *\n * drawing norm:\n *\n *    (ctx, x, y, w, h, options) => void\n */\n\n/**\n * draw a rect in the target area\n *\n * options = {\n *   border: {\n *     color,\n *     lineWidth\n *   },\n *\n *   color\n * }\n */\nmodule.exports = ({\n  defaultFont = '16px serif',\n  defaultColor = 'rgba(255, 255, 255, 0)',\n  defaultTextColor = '#24292e',\n  defaultLineWidth = 1.0\n} = {}) => {\n  const rect = (ctx, x, y, w, h, {\n    border = false,\n    color = defaultColor\n  } = {}) => {\n    if (border) {\n      const lineWidth = border.lineWidth || defaultLineWidth;\n      ctx.lineWidth = lineWidth;\n      ctx.strokeStyle = border.color || defaultColor;\n\n      // TODO safety\n      ctx.strokeRect(x + lineWidth / 2, y + lineWidth / 2, w - lineWidth, h - lineWidth);\n    }\n\n    ctx.fillStyle = color;\n    ctx.fillRect(x, y, w, h);\n  };\n\n  /**\n   * options = {\n   * text,\n   *   color,\n   *   lineWidth,\n   *   font\n   * }\n   */\n  const text = (ctx, x, y, w, h, {\n    text,\n    font = defaultFont,\n    color = defaultTextColor,\n  } = {}) => {\n    ctx.fillStyle = color;\n    ctx.font = font;\n    ctx.textBaseline = 'top';\n    // TODO what if textLen is bigger than w\n    // const textLen = ctx.measureText(str);\n    ctx.fillText(text, x, y);\n  };\n\n  /**\n   * options = {\n   * }\n   */\n  const image = (ctx, x, y, w, h, {\n    src\n  }) => {\n    const img = new Image();\n    img.onload = () => {\n      ctx.drawImage(img, x, y, w, h);\n      // ctx.drawImage(img, x, y);\n    };\n    img.src = src;\n  };\n\n  const clear = (ctx, x, y, w, h) => {\n    ctx.clearRect(ctx, x, y, w, h);\n  };\n\n  return {\n    rect,\n    text,\n    image,\n    clear\n  };\n};\n\n\n//# sourceURL=webpack:///../src/draw.js?");

/***/ }),

/***/ "../src/frame.js":
/*!***********************!*\
  !*** ../src/frame.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  isPointInRect,\n  flatten\n} = __webpack_require__(/*! ./util */ \"../src/util.js\");\n\n/**\n * define RectMeasure = (xMeasure, yMeasure, wMeasure, hMeasure)\n */\n\nfunction RectMeasure(xM, yM, wM, hM) {\n  this.xM = xM;\n  this.yM = yM;\n  this.wM = wM;\n  this.hM = hM;\n}\n\n/**\n * define Shape = (RectMeasure, Draw, Properties)\n */\nfunction Shape(rectMeasure, draw, properties) {\n  this.rectMeasure = rectMeasure;\n  this.draw = draw;\n  this.properties = properties;\n}\n\n/**\n * define Frame = ([]Shape, canvasCtx)\n */\nfunction Frame(_shapes, ctx) {\n  this.shapes = flatten(_shapes);\n  this.ctx = ctx;\n}\n\nFrame.prototype.render = function() {\n  // resolve shape rect values\n  const xcache = {},\n    ycache = {},\n    wcache = {},\n    hcache = {};\n  for (let i = 0; i < this.shapes.length; i++) {\n    const shape = this.shapes[i];\n    shape.rectMeasure.xM.resolve(xcache);\n    shape.rectMeasure.yM.resolve(ycache);\n    shape.rectMeasure.wM.resolve(wcache);\n    shape.rectMeasure.hM.resolve(hcache);\n  }\n\n  // draw on the canvas\n  for (let i = 0; i < this.shapes.length; i++) {\n    const shape = this.shapes[i];\n    shape.draw(this.ctx,\n      shape.rectMeasure.xM.value,\n      shape.rectMeasure.yM.value,\n      shape.rectMeasure.wM.value,\n      shape.rectMeasure.hM.value,\n      shape.properties);\n  }\n};\n\n// TODO use red-black tree?\nFrame.prototype.getTopShapeAtPoint = function(x0, y0) {\n  for (let i = this.shapes.length - 1; i >= 0; i--) {\n    const shape = this.shapes[i];\n    if (isPointInRect(x0, y0, shape.rectMeasure.xM.value, shape.rectMeasure.yM.value, shape.rectMeasure.wM.value, shape.rectMeasure.hM.value)) {\n      return shape;\n    }\n  }\n};\n\n// TODO get shapes at certain rect => rerender usage.\nFrame.prototype.getShapesAtRect = function(x0, y0, w0, h0) {};\n\nmodule.exports = {\n  Frame,\n  RectMeasure,\n  Shape\n};\n\n\n//# sourceURL=webpack:///../src/frame.js?");

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * (1) low level canvas drawing apis\n *\n * (2) a way to compose drawings\n */\nconst Draw = __webpack_require__(/*! ./draw */ \"../src/draw.js\");\nconst {\n  measureContext\n} = __webpack_require__(/*! ./measure */ \"../src/measure.js\");\n\nconst {\n  Frame,\n  RectMeasure,\n  Shape\n} = __webpack_require__(/*! ./frame */ \"../src/frame.js\");\n\nmodule.exports = {\n  Frame,\n  RectMeasure,\n  Shape,\n  Draw,\n  measureContext\n};\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ }),

/***/ "../src/measure.js":
/*!*************************!*\
  !*** ../src/measure.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * measure model\n *\n *   dependency, eg: shape A width is based on width B\n *\n *   DG = (V, G), F[p] <- g(0, F[G(p)]), p ∈ V. There is no cycle in DG.\n */\n\n/**\n * measure = {\n *   type,\n *   params: [],\n *   deps: []\n * }\n */\nlet measureIdCounter = 0;\n\nfunction Measure(type, params, deps) {\n  this.type = type;\n  this.params = params || [];\n  this.deps = deps || [];\n  this.id = measureIdCounter++;\n\n  this.value = null;\n}\n\nconst FIXED = 0;\nconst MORE = 1;\nconst LESS = 2;\nconst RATIO = 3;\nconst SUM = 4;\nconst REDUCE = 5;\n\n// TODO circle detection\nMeasure.prototype.resolve = function(cacheMap) {\n  // check cache first\n  if (cacheMap[this.id] !== undefined) {\n    return cacheMap[this.id];\n  }\n\n  switch (this.type) {\n    case FIXED:\n      this.value = this.params[0];\n      break;\n\n    case MORE:\n      this.value = this.deps[0].resolve(cacheMap) + this.params[0];\n      break;\n\n    case LESS:\n      this.value = this.deps[0].resolve(cacheMap) - this.params[0];\n      break;\n\n    case RATIO:\n      this.value = this.deps[0].resolve(cacheMap) * this.params[0];\n      break;\n\n    case SUM:\n      this.value = this.deps.reduce((prev, dep) => {\n        return prev + dep.resolve(cacheMap);\n      }, 0);\n      break;\n\n    case REDUCE:\n      this.value = this.params[0](this.deps.map((dep) => dep.resolve(cacheMap)));\n      break;\n\n    default:\n      throw new Error('unsupport type of measure');\n  }\n\n  // save to cache\n  cacheMap[this.id] = this.value;\n  return this.value;\n};\n\n// TODO update a measure\n\n// TODO type checking\nconst measureContext = () => {\n  // fixed size\n  const fixed = (size) => {\n    return new Measure(FIXED, [size]);\n  };\n\n  const more = (size) => {\n    return new Measure(MORE, [size]);\n  };\n\n  const less = (size) => {\n    return new Measure(LESS, [size]);\n  };\n\n  // proportion of target\n  const ratio = (target, percentage) => {\n    return new Measure(RATIO, [percentage], [target]);\n  };\n\n  // sum of targets\n  const sum = (targets) => {\n    return new Measure(SUM, [], targets);\n  };\n\n  // general reduce\n  const reduce = (targets, fn) => {\n    return new Measure(REDUCE, [fn], targets);\n  };\n\n  return {\n    fixed,\n    ratio,\n    sum,\n    reduce,\n    more,\n    less\n  };\n};\n\nmodule.exports = {\n  measureContext\n};\n\n\n//# sourceURL=webpack:///../src/measure.js?");

/***/ }),

/***/ "../src/util.js":
/*!**********************!*\
  !*** ../src/util.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const flatten = (list) => {\n  return list.reduce((prev, item) => {\n    if (Array.isArray(item)) {\n      return prev.concat(flatten(item));\n    } else {\n      prev.push(item);\n      return prev;\n    }\n  }, []);\n};\n\nconst isPointInRect = (x0, y0, x, y, w, h) => {\n  return x0 >= x && x0 <= x + w && y0 >= y && y0 <= y + h;\n};\n\nmodule.exports = {\n  flatten,\n  isPointInRect\n};\n\n\n//# sourceURL=webpack:///../src/util.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\n\nfunction getRelativeCoordinates(event, element) {\n  const position = {\n    x: event.pageX,\n    y: event.pageY\n  };\n\n  const offset = {\n    left: element.offsetLeft,\n    top: element.offsetTop\n  };\n\n  let reference = element.offsetParent;\n\n  while (reference) {\n    offset.left += reference.offsetLeft;\n    offset.top += reference.offsetTop;\n    reference = reference.offsetParent;\n  }\n\n  return {\n    x: position.x - offset.left,\n    y: position.y - offset.top,\n  };\n}\n\nconst w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\nconst h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n\nconst canvas = document.createElement('canvas');\ndocument.getElementById('app').appendChild(canvas);\n\nconst scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.\ncanvas.width = w * scale;\ncanvas.height = h * scale;\ncanvas.style.width = `${w}px`;\ncanvas.style.height = `${h}px`;\n\ncanvas.addEventListener('click', (e) => {\n  log(getRelativeCoordinates(e, canvas));\n});\n\nconst ctx = canvas.getContext('2d');\n// Normalize coordinate system to use css pixels.\nctx.scale(scale, scale);\n\nconst {\n  rect,\n  text,\n  image\n} = __webpack_require__(/*! ../src/draw */ \"../src/draw.js\")();\n\nrect(ctx, 0.0, 10.0, 30.0, 30.0, {\n  color: 'red'\n});\n\nrect(ctx, 40.0, 10.0, 30.0, 30.0, {\n  border: {\n    color: 'blue',\n    lineWidth: 12.0\n  }\n});\n\ntext(ctx, 80.0, 10.0, 30.0, 30.0, {\n  text: 'hello world!'\n});\n\nimage(ctx, 120, 10, 60, 60, {\n  src: './assets/test.png'\n});\n\nconst {\n  Frame,\n  Shape,\n  RectMeasure,\n  measureContext\n} = __webpack_require__(/*! ../src */ \"../src/index.js\");\n\nconst {\n  fixed\n} = measureContext();\n\nconst frame = new Frame([\n  new Shape(new RectMeasure(fixed(0), fixed(100), fixed(100), fixed(20)), rect, {\n    color: 'green'\n  })\n], ctx);\n\nframe.render();\n\n\n//# sourceURL=webpack:///./index.js?");

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
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

eval("const {\n  isPointInRect,\n  flatten,\n  isRectsIntersect\n} = __webpack_require__(/*! ./util */ \"../src/util/index.js\");\n\n/**\n * define RectMeasure = (xMeasure, yMeasure, wMeasure, hMeasure)\n */\n\nfunction RectMeasure(xM, yM, wM, hM) {\n  this.xM = xM;\n  this.yM = yM;\n  this.wM = wM;\n  this.hM = hM;\n}\n\n/**\n * define Shape = (RectMeasure, Draw, Properties)\n */\nfunction Shape(rectMeasure, draw, properties) {\n  this.rectMeasure = rectMeasure;\n  this.draw = draw;\n  this.properties = properties;\n}\n\n/**\n * Layout shape just contains a bunch of shapes\n */\nconst LayoutShape = function(rectMeasure, shapes) {\n  this.shapes = shapes;\n  this.rectMeasure = rectMeasure;\n};\n\nLayoutShape.prototype.flattenShapes = function() {\n  return this.shapes.reduce((prev, shape) => {\n    if (shape instanceof LayoutShape) {\n      prev.push(...shape.flattenShapes());\n    } else {\n      prev.push(shape);\n    }\n    return prev;\n  }, []);\n};\n\n/**\n * define Frame = ([]Shape, canvasCtx)\n */\nfunction Frame(shapes) {\n  this.shapes = flatten(shapes).reduce((prev, shape) => {\n    // expand layout shape\n    if (shape instanceof LayoutShape) {\n      prev.push(...shape.flattenShapes());\n    } else {\n      prev.push(shape);\n    }\n    return prev;\n  }, []);\n}\n\n// TODO use red-black tree?\nFrame.prototype.getTopShapeAtPoint = function(x0, y0) {\n  return this.shapes.find((shape) => {\n    return isPointInRect(x0, y0, shape.rectMeasure.xM.value, shape.rectMeasure.yM.value, shape.rectMeasure.wM.value, shape.rectMeasure.hM.value);\n  });\n};\n\n// TODO get shapes at certain rect => rerender usage.\n// if a shape's has intersection with rect\n\nFrame.prototype.getIntersectionShapes = function(x0, y0, w0, h0) {\n  return this.shapes.filter((shape) => {\n    return isRectsIntersect(x0, y0, w0, h0,\n      shape.rectMeasure.xM.value,\n      shape.rectMeasure.yM.value,\n      shape.rectMeasure.wM.value,\n      shape.rectMeasure.hM.value);\n  });\n};\n\nconst renderFrame = function(frame, canvas) {\n  const ctx = canvas.getContext('2d');\n\n  // resolve shape rect values\n  const xcache = {},\n    xseen = {},\n    ycache = {},\n    yseen = {},\n    wcache = {},\n    wseen = {},\n    hcache = {},\n    hseen = {};\n\n  for (let i = 0; i < frame.shapes.length; i++) {\n    const shape = frame.shapes[i];\n    shape.rectMeasure.xM.resolve(xcache, xseen);\n    shape.rectMeasure.yM.resolve(ycache, yseen);\n    shape.rectMeasure.wM.resolve(wcache, wseen);\n    shape.rectMeasure.hM.resolve(hcache, hseen);\n  }\n\n  // draw on the canvas\n  for (let i = 0; i < frame.shapes.length; i++) {\n    const shape = frame.shapes[i];\n    if (shape.draw) {\n      shape.draw(ctx,\n        shape.rectMeasure.xM.value,\n        shape.rectMeasure.yM.value,\n        shape.rectMeasure.wM.value,\n        shape.rectMeasure.hM.value,\n        shape.properties);\n    }\n  }\n};\n\nmodule.exports = {\n  Frame,\n  RectMeasure,\n  Shape,\n  renderFrame,\n  LayoutShape\n};\n\n\n//# sourceURL=webpack:///../src/frame.js?");

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * (1) low level canvas drawing apis\n *\n * (2) a way to compose drawings\n */\nconst Draw = __webpack_require__(/*! ./draw */ \"../src/draw.js\");\nconst {\n  Frame,\n  renderFrame,\n  RectMeasure,\n  Shape\n} = __webpack_require__(/*! ./frame */ \"../src/frame.js\");\nconst {\n  getRelativeCoordinates\n} = __webpack_require__(/*! ./util */ \"../src/util/index.js\");\n\nconst defW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\nconst defH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n\nconst attach = (node, w = defW, h = defH) => {\n  const canvas = document.createElement('canvas');\n\n  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.\n  canvas.width = w * scale;\n  canvas.height = h * scale;\n  canvas.style.width = `${w}px`;\n  canvas.style.height = `${h}px`;\n\n  const ctx = canvas.getContext('2d');\n  // Normalize coordinate system to use css pixels.\n  ctx.scale(scale, scale);\n\n  node.appendChild(canvas);\n  return canvas;\n};\n\nmodule.exports = {\n  attach,\n  Frame,\n  RectMeasure,\n  Shape,\n  Draw,\n  getRelativeCoordinates,\n  renderFrame\n};\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ }),

/***/ "../src/layout/index.js":
/*!******************************!*\
  !*** ../src/layout/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Shape,\n  LayoutShape,\n  RectMeasure\n} = __webpack_require__(/*! ../frame */ \"../src/frame.js\");\n\nconst {\n  fixed,\n  min,\n  max,\n  sum\n} = __webpack_require__(/*! ../measure */ \"../src/measure.js\");\n\nconst fixedShape = (draw, properties, x = 0, y = 0, w = 0, h = 0) => {\n  return new Shape(\n    new RectMeasure(fixed(x), fixed(y), fixed(w), fixed(h)),\n    draw,\n    properties\n  );\n};\n\n// row container shape\nconst row = (shapes) => {\n  return new LayoutShape(new RectMeasure(\n    min(shapes.map((shape) => shape.rectMeasure.xM)),\n    min(shapes.map((shape) => shape.rectMeasure.yM)),\n    sum(shapes.map((shape) => shape.rectMeasure.wM)),\n    max(shapes.map((shape) => shape.rectMeasure.hM))\n  ), shapes);\n};\n\nmodule.exports = {\n  fixedShape,\n  row,\n  LayoutShape\n};\n\n\n//# sourceURL=webpack:///../src/layout/index.js?");

/***/ }),

/***/ "../src/measure.js":
/*!*************************!*\
  !*** ../src/measure.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * measure model\n *\n *   dependency, eg: shape A width is based on width B\n *\n *   DG = (V, G), F[p] <- g(0, F[G(p)]), p ∈ V. There is no cycle in DG.\n */\n\n/**\n * measure = {\n *   type,\n *   params: [],\n *   deps: []\n * }\n */\nlet measureIdCounter = 0;\n\nfunction Measure(type, params) {\n  this.type = type;\n  this.params = params || [];\n  this.deps = [];\n  this.ins = [];\n  this.id = measureIdCounter++; // unique id for a Measure object\n\n  this.value = null;\n}\n\nconst FIXED = 0;\nconst MORE = 1;\nconst LESS = 2;\nconst RATIO = 3;\nconst SUM = 4;\nconst MIN = 5;\nconst MAX = 6;\nconst REDUCE = 7;\n\n// two way connections\nMeasure.prototype.connect = function(dep) {\n  this.deps.push(dep);\n  dep.ins.push(this);\n};\n\nMeasure.prototype.resolve = function(cacheMap, seen) {\n  // check cache first\n  if (cacheMap[this.id] !== undefined) {\n    return cacheMap[this.id];\n  }\n\n  if (seen[this.id]) { // cycle\n    throw new Error(`cicle detected at measure resolving. Id of current measure is ${this.id}`);\n  }\n  seen[this.id] = 1;\n\n  switch (this.type) {\n    case FIXED:\n      this.value = this.params[0];\n      break;\n\n    case MORE:\n      this.value = this.deps[0].resolve(cacheMap, seen) + this.params[0];\n      break;\n\n    case LESS:\n      this.value = this.deps[0].resolve(cacheMap, seen) - this.params[0];\n      break;\n\n    case RATIO:\n      this.value = this.deps[0].resolve(cacheMap, seen) * this.params[0];\n      break;\n\n    case SUM:\n      this.value = this.deps.reduce((prev, dep) => {\n        return prev + dep.resolve(cacheMap, seen);\n      }, 0);\n      break;\n\n    case MIN:\n      this.value = Math.min(...this.deps.map((dep) => dep.resolve(cacheMap, seen), 0));\n      break;\n\n    case MAX:\n      this.value = Math.max(...this.deps.map((dep) => dep.resolve(cacheMap, seen), 0));\n      break;\n\n    case REDUCE:\n      this.value = this.params[0](this.deps.map((dep) => dep.resolve(cacheMap, seen)));\n      break;\n\n    default:\n      throw new Error('unsupport type of measure');\n  }\n\n  // save to cache\n  cacheMap[this.id] = this.value;\n  return this.value;\n};\n\n// TODO update a measure\n\n// TODO type checking\n// fixed size\nconst fixed = (size) => {\n  return new Measure(FIXED, [size]);\n};\n\nconst more = (size) => {\n  return new Measure(MORE, [size]);\n};\n\nconst less = (size) => {\n  return new Measure(LESS, [size]);\n};\n\n// proportion of target\nconst ratio = (target, percentage) => {\n  const m = new Measure(RATIO, [percentage], [target]);\n  m.connect(target);\n  return m;\n};\n\n// sum of targets\nconst sum = (targets) => {\n  const m = new Measure(SUM, []);\n  targets.forEach((target) => {\n    m.connect(target);\n  });\n  return m;\n};\n\nconst min = (targets) => {\n  const m = new Measure(MIN, []);\n  targets.forEach((target) => {\n    m.connect(target);\n  });\n  return m;\n};\n\nconst max = (targets) => {\n  const m = new Measure(MAX, []);\n  targets.forEach((target) => {\n    m.connect(target);\n  });\n  return m;\n};\n\n// general reduce\nconst reduce = (targets, fn) => {\n  const m = new Measure(REDUCE, [fn]);\n  targets.forEach((target) => {\n    m.connect(target);\n  });\n  return m;\n};\n\nmodule.exports = {\n  fixed,\n  ratio,\n  sum,\n  reduce,\n  more,\n  less,\n  min,\n  max\n};\n\n\n//# sourceURL=webpack:///../src/measure.js?");

/***/ }),

/***/ "../src/util/index.js":
/*!****************************!*\
  !*** ../src/util/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const flatten = (list) => {\n  return list.reduce((prev, item) => {\n    if (Array.isArray(item)) {\n      return prev.concat(flatten(item));\n    } else {\n      prev.push(item);\n      return prev;\n    }\n  }, []);\n};\n\nconst isPointInRect = (x0, y0, x, y, w, h) => {\n  return x0 >= x && x0 <= x + w && y0 >= y && y0 <= y + h;\n};\n\nconst isRectsIntersect = (x0, y0, w0, h0, x, y, w, h) => {\n  return isIntervalIntersect(x0, x0 + w0, x, x + w) && isIntervalIntersect(y0, y0 + h0, y, y + h);\n};\n\n// interval [x0, x1], [x2, x3]\nconst isIntervalIntersect = (x0, x1, x2, x3) => {\n  return !(x1 < x2 || x3 < x0);\n};\n\nfunction getRelativeCoordinates(event, element) {\n  const position = {\n    x: event.pageX,\n    y: event.pageY\n  };\n\n  const offset = {\n    left: element.offsetLeft,\n    top: element.offsetTop\n  };\n\n  let reference = element.offsetParent;\n\n  while (reference) {\n    offset.left += reference.offsetLeft;\n    offset.top += reference.offsetTop;\n    reference = reference.offsetParent;\n  }\n\n  return {\n    x: position.x - offset.left,\n    y: position.y - offset.top,\n  };\n}\n\nmodule.exports = {\n  flatten,\n  isPointInRect,\n  isRectsIntersect,\n  isIntervalIntersect,\n  getRelativeCoordinates\n};\n\n\n//# sourceURL=webpack:///../src/util/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\nconst {\n  attach,\n  Frame,\n  Shape,\n  RectMeasure,\n  getRelativeCoordinates,\n  renderFrame\n} = __webpack_require__(/*! ../src */ \"../src/index.js\");\n\nconst {\n  rect,\n  text,\n  image\n} = __webpack_require__(/*! ../src/draw */ \"../src/draw.js\")();\n\nconst {\n  fixed\n} = __webpack_require__(/*! ../src/measure */ \"../src/measure.js\");\n\nconst {\n  fixedShape,\n  row\n} = __webpack_require__(/*! ../src/layout */ \"../src/layout/index.js\");\n\nconst canvas = attach(document.getElementById('app'));\n\ncanvas.addEventListener('click', (e) => {\n  const {\n    x,\n    y\n  } = getRelativeCoordinates(e, canvas);\n  const shape = frame.getTopShapeAtPoint(x, y);\n  if (shape) {\n    shape.properties.color = 'red';\n    renderFrame(frame, canvas);\n  }\n});\n\nconst frame = new Frame(\n\n  [\n\n    row([\n      fixedShape(rect, {\n        color: 'green'\n      }, 0, 100, 100, 20),\n\n      fixedShape(text, {\n        text: 'hello world!'\n      }, 0, 10, 30, 30)\n    ]),\n\n    new Shape(\n      new RectMeasure(fixed(120), fixed(10), fixed(60), fixed(60)),\n      image,\n\n      {\n        src: './assets/test.png'\n      }\n    )\n  ]\n);\n\nrenderFrame(frame, canvas);\n\n\n//# sourceURL=webpack:///./index.js?");

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
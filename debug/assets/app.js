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

/***/ "../src/frame/index.js":
/*!*****************************!*\
  !*** ../src/frame/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  draw\n} = __webpack_require__(/*! ../platform/draw */ \"../src/platform/draw.js\");\n\n/**\n * frame of canvas\n */\n\nconst drawFrame = (canvas, shapes) => {\n  const ctx = canvas.getCtx();\n\n  shapes.forEach((s) => {\n    s.resolve();\n    draw(ctx, s.getOptions());\n  });\n};\n\nmodule.exports = {\n  drawFrame\n};\n\n\n//# sourceURL=webpack:///../src/frame/index.js?");

/***/ }),

/***/ "../src/platform/draw.js":
/*!*******************************!*\
  !*** ../src/platform/draw.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const drawRect = (ctx, {\n  x,\n  y,\n  w,\n  h,\n  color = 'black'\n}) => {\n  ctx.fillStyle = color;\n  ctx.fillRect(x, y, w, h);\n};\n\n// lines = [{type, ...}]\nconst drawPath = (ctx, {\n  lines,\n  stroke = true,\n  fill = false\n}) => {\n  ctx.beginPath();\n\n  for (let i = 0; i < lines.length; i++) {\n\n    switch (lines[i].type) {\n      case 'line':\n        //{x1,y1,x2,y2,type}\n        ctx.moveTo(lines[i].x1, lines[i].y1);\n        ctx.lineTo(lines[i].x2, lines[i].y2);\n        break;\n      case 'arc':\n        ctx.arc(lines[i].x, lines[i].y, lines[i].radius, lines[i].startAngle, lines[i].endAngle, lines[i].anticlockwise);\n        break;\n      case 'arcTo':\n        ctx.arcTo(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, lines[i].radius);\n        break;\n        // TODO\n      default:\n        throw new Error(`unexpected line type ${lines[i].type}`);\n    }\n  }\n\n  ctx.closePath();\n  if (stroke) {\n    ctx.stroke();\n  }\n  if (fill) {\n    ctx.fill();\n  }\n};\n\nconst drawText = (ctx, {\n  text = '',\n  font = '16px serif',\n  x,\n  y,\n  textBaseline = 'top',\n  stroke = false,\n  fill = true,\n  color = 'black'\n}) => {\n  ctx.font = font;\n  ctx.textBaseline = textBaseline;\n  if (stroke) {\n    ctx.strokeStyle = color;\n    ctx.strokeText(text, x, y);\n  }\n  if (fill) {\n    ctx.fillStyle = color;\n    ctx.fillText(text, x, y);\n  }\n};\n\nconst drawImage = (ctx, {\n  x,\n  y,\n  w,\n  h,\n  src\n}) => {\n  const img = new Image();\n  img.onload = () => {\n    ctx.drawImage(img, x, y, w, h);\n  };\n  img.src = src;\n};\n\n// clears the specified rectangular area, making it fully transparent\nconst clearRect = (ctx, {\n  x,\n  y,\n  w,\n  h\n}) => {\n  ctx.clearRect(ctx, x, y, w, h);\n};\n\nconst draw = (ctx, opts) => {\n  switch (opts.shapeType) {\n    case 'rect':\n      drawRect(ctx, opts);\n      break;\n    case 'path':\n      drawPath(ctx, opts);\n      break;\n    case 'text':\n      drawText(ctx, opts);\n      break;\n    case 'image':\n      drawImage(ctx, opts);\n      break;\n    case 'clear':\n      clearRect(ctx, opts);\n      break;\n    default:\n      throw new Error(`unexpected shape type ${opts.shapeType}`);\n  }\n};\n\nmodule.exports = {\n  draw\n};\n\n\n//# sourceURL=webpack:///../src/platform/draw.js?");

/***/ }),

/***/ "../src/platform/index.js":
/*!********************************!*\
  !*** ../src/platform/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const defW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\nconst defH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n\nfunction CustomCanvas(oriCanvas, w, h) {\n  this.canvas = oriCanvas;\n  this.w = w;\n  this.h = h;\n}\n\nCustomCanvas.prototype.getCtx = function() {\n  return this.canvas.getContext('2d');\n};\n\nconst attach = (node, w = defW, h = defH) => {\n  const canvas = document.createElement('canvas');\n\n  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.\n  canvas.width = w * scale;\n  canvas.height = h * scale;\n  canvas.style.width = `${w}px`;\n  canvas.style.height = `${h}px`;\n\n  const ctx = canvas.getContext('2d');\n  // Normalize coordinate system to use css pixels.\n  ctx.scale(scale, scale);\n\n  node.appendChild(canvas);\n\n  return new CustomCanvas(canvas, w, h);\n};\n\nfunction getRelativeCoordinates(event, element) {\n  const position = {\n    x: event.pageX,\n    y: event.pageY\n  };\n\n  const offset = {\n    left: element.offsetLeft,\n    top: element.offsetTop\n  };\n\n  let reference = element.offsetParent;\n\n  while (reference) {\n    offset.left += reference.offsetLeft;\n    offset.top += reference.offsetTop;\n    reference = reference.offsetParent;\n  }\n\n  return {\n    x: position.x - offset.left,\n    y: position.y - offset.top,\n  };\n}\n\nmodule.exports = {\n  attach,\n  getRelativeCoordinates\n};\n\n\n//# sourceURL=webpack:///../src/platform/index.js?");

/***/ }),

/***/ "../src/shape/index.js":
/*!*****************************!*\
  !*** ../src/shape/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * shape can depend on each other\n */\n\nconst RESOLVED = 1;\nconst UNRESOLVED = 2;\n\n// depFun = (shapes...) => opts\nconst Shape = function(depFun, deps = []) {\n  this.depFun = depFun;\n  this.deps = deps;\n  this.options = {};\n  this.status = UNRESOLVED;\n};\n\nShape.prototype.resolve = function() {\n  if (this.status === UNRESOLVED) {\n    // resolve dependencies first\n    for (let i = 0; i < this.deps.length; i++) {\n      this.deps[i].resolve();\n    }\n\n    // run dep fun\n    this.options = this.depFun(...this.deps);\n\n    // mark as resolved\n    this.status = RESOLVED;\n  }\n};\n\nShape.prototype.getOption = function(name) {\n  return this.options[name];\n};\n\nShape.prototype.getOptions = function() {\n  return this.options;\n};\n\nconst shape = (depFun, deps) => {\n  return new Shape(depFun, deps);\n};\n\nmodule.exports = {\n  shape\n};\n\n\n//# sourceURL=webpack:///../src/shape/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\nconst {\n  attach\n} = __webpack_require__(/*! ../src/platform */ \"../src/platform/index.js\");\nconst {\n  drawFrame\n} = __webpack_require__(/*! ../src/frame/index.js */ \"../src/frame/index.js\");\n\nconst canvas = attach(document.getElementById('app'));\n\n/*\ncanvas.addEventListener('click', (e) => {\n  const {\n    x,\n    y\n  } = getRelativeCoordinates(e, canvas);\n});\n*/\n\nconst {\n  shape\n} = __webpack_require__(/*! ../src/shape */ \"../src/shape/index.js\");\nconst hb = shape(() => {\n  return {\n    shapeType: 'rect',\n    x: 0,\n    y: 0,\n    w: canvas.w,\n    h: 45,\n    color: 'blue'\n  };\n});\n\nconst title = shape((s) => {\n  const w = 100,\n    h = 20;\n  return {\n    shapeType: 'text',\n    x: s.getOption('x') + (s.getOption('w') - w) / 2,\n    y: s.getOption('y') + (s.getOption('h') - h) / 2,\n    w,\n    h,\n    text: 'debug for simia',\n    color: 'white'\n  };\n}, [hb]);\n\nconst s2 = shape((s) => {\n  return {\n    shapeType: 'rect',\n    x: s.getOption('x'),\n    y: s.getOption('y') + s.getOption('h') + 5,\n    w: 100,\n    h: 45,\n    color: 'black'\n  };\n}, [hb]);\n\nconst s3 = shape((s) => {\n  return {\n    shapeType: 'text',\n    x: s.getOption('x'),\n    y: s.getOption('y') + s.getOption('h') + 5,\n    w: 100,\n    h: 45,\n    text: 'hello world!'\n  };\n}, [s2]);\n\ndrawFrame(canvas, [hb, title, s2, s3]);\n\n\n//# sourceURL=webpack:///./index.js?");

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
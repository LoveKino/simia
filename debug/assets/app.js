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

/***/ "../node_modules/pcpjs/lib/pcp/defBox.js":
/*!***********************************************!*\
  !*** ../node_modules/pcpjs/lib/pcp/defBox.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  Sandbox,\n  toLazySandboxFun\n} = __webpack_require__(/*! ./sandbox */ \"../node_modules/pcpjs/lib/pcp/sandbox.js\");\n\nmodule.exports = new Sandbox({\n  'if': toLazySandboxFun((params, attachment, pcs) => {\n    if (params.length < 2 || params.length > 3) {\n      throw new Error('if grammer error. if must have at least 2 params, at most 3 params. eg: [\"if\", true, 1, 0], [\"if\", true, 1]');\n    }\n\n    const conditionExp = params[0];\n    const successExp = params[1];\n    const failExp = params[2] || null;\n\n    return pcs.executePureCallAST(\n      pcs.executePureCallAST(conditionExp, attachment) ? successExp : failExp, attachment);\n  })\n});\n\n\n//# sourceURL=webpack:///../node_modules/pcpjs/lib/pcp/defBox.js?");

/***/ }),

/***/ "../node_modules/pcpjs/lib/pcp/index.js":
/*!**********************************************!*\
  !*** ../node_modules/pcpjs/lib/pcp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * json array string as lisp code\n *\n * [\"add\", 1, 2] => (add, 1, 2)\n *\n * Sandbox = {\n *  [funName]: BoxFun\n * }\n *\n * BoxFun: (params, pcs) => Any\n */\n\nconst {\n  getPcpServer\n} = __webpack_require__(/*! ./pcpServer */ \"../node_modules/pcpjs/lib/pcp/pcpServer.js\");\n\nconst {\n  getPcpClient\n} = __webpack_require__(/*! ./pcpClient */ \"../node_modules/pcpjs/lib/pcp/pcpClient.js\");\n\nconst {\n  toSandboxFun,\n  toLazySandboxFun,\n  Sandbox\n} = __webpack_require__(/*! ./sandbox */ \"../node_modules/pcpjs/lib/pcp/sandbox.js\");\n\nmodule.exports = {\n  getPcpServer,\n  getPcpClient,\n  toSandboxFun,\n  toLazySandboxFun,\n  Sandbox\n};\n\n\n//# sourceURL=webpack:///../node_modules/pcpjs/lib/pcp/index.js?");

/***/ }),

/***/ "../node_modules/pcpjs/lib/pcp/pcpClient.js":
/*!**************************************************!*\
  !*** ../node_modules/pcpjs/lib/pcp/pcpClient.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function CallResult(result) {\n  this.result = result;\n}\n\nconst getPcpClient = () => {\n  const call = (funName, ...args) => {\n    return new CallResult(\n      [funName].concat(\n        args.map((arg) => {\n          if (arg instanceof CallResult) {\n            return arg.result;\n          } else {\n            if (Array.isArray(arg)) {\n              return ['\\''].concat(arg);\n            } else {\n              return arg;\n            }\n          }\n        })\n      )\n    );\n  };\n\n  const toJson = (callResult) => JSON.stringify(callResult.result);\n\n  return {\n    call,\n    toJson\n  };\n};\n\nmodule.exports = {\n  getPcpClient\n};\n\n\n//# sourceURL=webpack:///../node_modules/pcpjs/lib/pcp/pcpClient.js?");

/***/ }),

/***/ "../node_modules/pcpjs/lib/pcp/pcpServer.js":
/*!**************************************************!*\
  !*** ../node_modules/pcpjs/lib/pcp/pcpServer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  mergeSandboxs,\n  NORMAL_SANDBOX,\n  LAZY_SANDBOX\n} = __webpack_require__(/*! ./sandbox */ \"../node_modules/pcpjs/lib/pcp/sandbox.js\");\nconst defaultSandbox = __webpack_require__(/*! ./defBox */ \"../node_modules/pcpjs/lib/pcp/defBox.js\");\n\n/**\n * function node\n *  = {\n *    funName: Sting,\n *    params: List[Any]\n *  }\n */\nfunction FunNode(funName, params) {\n  this.funName = funName;\n  this.params = params;\n}\n\nconst parseJsonAst = (source) => {\n  if (Array.isArray(source)) {\n    if (!source.length) return source;\n\n    if (typeof source[0] === 'string') {\n      if (source[0] === '\\'') {\n        return source.slice(1); // tail as pure data, like (',1,2,3) => data list (1,2,3)\n      } else {\n        return new FunNode(source[0], source.slice(1).map(parseJsonAst));\n      }\n    } else {\n      return source;\n    }\n  } else {\n    return source;\n  }\n};\n\nfunction PcpServer(_sandbox) {\n  this.sandbox = mergeSandboxs(_sandbox, defaultSandbox);\n}\nPcpServer.prototype.parseJson = function(sourceText) {\n  return parseJsonAst(JSON.parse(sourceText));\n};\n\nPcpServer.prototype.execute = function(sourceText, attachment) {\n  return this.executePureCallAST(this.parseJson(sourceText), attachment);\n};\n\nPcpServer.prototype.executeArr = function(source, attachment) {\n  return this.executePureCallAST(parseJsonAst(source), attachment);\n};\n\nPcpServer.prototype.executePureCallAST = function(source, attachment) {\n  if (source instanceof FunNode) {\n    const boxFun = this.sandbox.getSandboxFun(source.funName);\n    if (boxFun.funType === NORMAL_SANDBOX) {\n      return boxFun.fun(\n        source.params.map((param) => this.executePureCallAST(param, attachment)),\n        attachment,\n        this);\n    } else if (boxFun.funType === LAZY_SANDBOX) {\n      // execute lazy function box\n      return boxFun.fun(source.params, attachment, this);\n    }\n  } else {\n    return source;\n  }\n};\n\nconst getPcpServer = (_sandbox) => {\n  return new PcpServer(_sandbox);\n};\n\nmodule.exports = {\n  getPcpServer,\n  parseJsonAst\n};\n\n\n//# sourceURL=webpack:///../node_modules/pcpjs/lib/pcp/pcpServer.js?");

/***/ }),

/***/ "../node_modules/pcpjs/lib/pcp/sandbox.js":
/*!************************************************!*\
  !*** ../node_modules/pcpjs/lib/pcp/sandbox.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * sandbox\n *\n * general sandbox function\n *  1. normal sandbox function\n *  2. lazy sandbox function\n */\n\n// general function\n// (params: List[Any], attachment: Any, pcpServer: PcpServe) -> Any\n\nconst NORMAL_SANDBOX = 0;\nconst LAZY_SANDBOX = 1;\n\nfunction BoxFun(funType, fun) {\n  this.funType = funType;\n  this.fun = fun;\n}\n\nconst toSandboxFun = (fun) => new BoxFun(NORMAL_SANDBOX, fun);\n\nconst toLazySandboxFun = (fun) => new BoxFun(LAZY_SANDBOX, fun);\n\n/**\n * funMap: Map[String, BoxFun]\n */\nfunction Sandbox(funMap = {}) {\n  this.funMap = funMap;\n}\n\nSandbox.prototype.getSandboxFun = function(funName) {\n  if (this.funMap[funName]) {\n    return this.funMap[funName];\n  } else {\n    throw new Error(`missing function ${funName} in our sandbox.`);\n  }\n};\n\nconst mergeSandboxs = (box1, box2) => {\n  return new Sandbox(Object.assign({}, box1.funMap, box2.funMap));\n};\n\nmodule.exports = {\n  toSandboxFun,\n  toLazySandboxFun,\n  Sandbox,\n  mergeSandboxs,\n  NORMAL_SANDBOX,\n  LAZY_SANDBOX\n};\n\n\n//# sourceURL=webpack:///../node_modules/pcpjs/lib/pcp/sandbox.js?");

/***/ }),

/***/ "../src/frame/index.js":
/*!*****************************!*\
  !*** ../src/frame/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * frame of canvas\n */\n\nconst drawFrame = (canvas, shapes) => {\n  const ctx = canvas.getCtx();\n\n  shapes.forEach((s) => {\n    s.resolve();\n    s.draw(ctx);\n  });\n};\n\nmodule.exports = {\n  drawFrame\n};\n\n\n//# sourceURL=webpack:///../src/frame/index.js?");

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
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  shape\n} = __webpack_require__(/*! ./shape */ \"../src/shape/shape.js\");\nconst shapeExp = __webpack_require__(/*! ./shapeExp */ \"../src/shape/shapeExp.js\");\n\nmodule.exports = {\n  shape,\n  shapeExp\n};\n\n\n//# sourceURL=webpack:///../src/shape/index.js?");

/***/ }),

/***/ "../src/shape/shape.js":
/*!*****************************!*\
  !*** ../src/shape/shape.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  draw\n} = __webpack_require__(/*! ../platform/draw */ \"../src/platform/draw.js\");\n\n/**\n * shape can depend on each other\n */\n\nconst RESOLVED = 1;\nconst UNRESOLVED = 2;\n\n// depFun = (shapes...) => opts\n// TODO generate a unique id for a shape?\nconst Shape = function(depFun, deps = []) {\n  this.depFun = depFun;\n  this.deps = deps;\n  this.options = {};\n  this.status = UNRESOLVED;\n};\n\nShape.prototype.resolve = function() {\n  if (this.status === UNRESOLVED) {\n    // resolve dependencies first\n    for (let i = 0; i < this.deps.length; i++) {\n      this.deps[i].resolve();\n    }\n\n    // run dep fun\n    this.options = this.depFun(...this.deps);\n\n    // mark as resolved\n    this.status = RESOLVED;\n  }\n};\n\nShape.prototype.getOption = function(name) {\n  return this.options[name];\n};\n\nShape.prototype.draw = function(ctx) {\n  return draw(ctx, this.options);\n};\n\nconst shape = (depFun, deps) => {\n  return new Shape(depFun, deps);\n};\n\nmodule.exports = {\n  shape\n};\n\n\n//# sourceURL=webpack:///../src/shape/shape.js?");

/***/ }),

/***/ "../src/shape/shapeExp.js":
/*!********************************!*\
  !*** ../src/shape/shapeExp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  shape\n} = __webpack_require__(/*! ./shape */ \"../src/shape/shape.js\");\nconst {\n  Sandbox,\n  getPcpServer,\n  toSandboxFun\n} = __webpack_require__(/*! pcpjs/lib/pcp */ \"../node_modules/pcpjs/lib/pcp/index.js\");\n\n/**\n * We can use function define a shape, but function is not a easy way to serialize. So we try to define an expression which can be converted to shape.\n */\n\n/**\n *\n * shapeExp = {\n *   [attrName]: attrExp\n * }\n *\n * attrExp := number | string | boolean | null | ( funName , ... attrExps)\n * eg: 1, \"rect\", true, null, ('+', ('get', '$1', 'x'), 5)\n */\n\nconst defBoxForShape = {\n  getOption: toSandboxFun(([shapeIdx, attrName], {\n    shapes\n  }) => {\n    return shapes[shapeIdx].getOption(attrName);\n  }),\n\n  '+': toSandboxFun(([x, y]) => {\n    return x + y;\n  }),\n  '-': toSandboxFun(([x, y]) => {\n    return x - y;\n  }),\n  '/': toSandboxFun(([x, y]) => {\n    return x / y;\n  }),\n  '*': toSandboxFun(([x, y]) => {\n    return x * y;\n  }),\n};\n\nmodule.exports = (sandbox = {}) => {\n  const pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));\n\n  const defShape = (shapeExp, deps) => {\n    return shape((...args) => {\n      const m = {};\n      for (let name in shapeExp) {\n        m[name] = pcpServer.executeArr(shapeExp[name], {\n          shapes: args\n        });\n      }\n      return m;\n    }, deps);\n  };\n\n  // c(\"+\", c(\"getOption\", 0, \"x\"), 5)\n  const c = (funName, ...args) => {\n    return [funName, ...args];\n  };\n\n\n  /**\n   *\n   * common relationships\n   */\n\n  const centerXIn = (index, w) => {\n    return c('+', c('getOption', index, 'x'), c('/', c('-', c('getOption', index, 'w'), w), 2));\n  };\n\n  const centerYIn = (index, h) => {\n    return c('+', c('getOption', index, 'y'), c('/', c('-', c('getOption', index, 'h'), h), 2));\n  };\n\n  const under = (index, offset) => {\n    return c('+', c('getOption', index, 'y'), c('+', c('getOption', index, 'h'), offset));\n  };\n\n  return {\n    defShape,\n    c,\n    centerXIn,\n    centerYIn,\n    under\n  };\n};\n\n\n//# sourceURL=webpack:///../src/shape/shapeExp.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\nconst {\n  attach\n} = __webpack_require__(/*! ../src/platform */ \"../src/platform/index.js\");\nconst {\n  drawFrame\n} = __webpack_require__(/*! ../src/frame */ \"../src/frame/index.js\");\nconst {\n  shapeExp\n} = __webpack_require__(/*! ../src/shape */ \"../src/shape/index.js\");\n\nconst canvas = attach(document.getElementById('app'));\nconst {\n  defShape,\n  c,\n  centerXIn,\n  centerYIn,\n  under\n} = shapeExp();\n\n/*\ncanvas.addEventListener('click', (e) => {\n  const {\n    x,\n    y\n  } = getRelativeCoordinates(e, canvas);\n});\n*/\n\nconst hb = defShape({\n  shapeType: 'rect',\n  x: 0,\n  y: 0,\n  w: canvas.w,\n  h: 45,\n  color: 'blue'\n});\n\nconst title = defShape({\n  shapeType: 'text',\n  x: centerXIn(0, 100),\n  y: centerYIn(0, 20),\n  w: 100,\n  h: 20,\n  text: 'debug for simia',\n  color: 'white'\n}, [hb]);\n\nconst s2 = defShape({\n  shapeType: 'rect',\n  x: c('getOption', 0, 'x'),\n  y: under(0, 5),\n  w: 100,\n  h: 45,\n  color: 'black'\n}, [hb]);\n\nconst s3 = defShape({\n  shapeType: 'text',\n  x: c('getOption', 0, 'x'),\n  y: under(0, 5),\n  w: 100,\n  h: 45,\n  text: 'hello world!'\n}, [s2]);\n\ndrawFrame(canvas, [hb, title, s2, s3]);\n\n\n//# sourceURL=webpack:///./index.js?");

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
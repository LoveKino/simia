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
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  shapeExp\n} = __webpack_require__(/*! ../shape */ \"../src/shape/index.js\");\nconst {\n  defShape\n} = shapeExp;\nconst {\n  toSandboxFun,\n  Sandbox,\n  getPcpServer,\n} = __webpack_require__(/*! pcpjs/lib/pcp */ \"../node_modules/pcpjs/lib/pcp/index.js\");\nconst {\n  isPointInRect\n} = __webpack_require__(/*! ../util */ \"../src/util/index.js\");\n\nconst defBoxForShape = {\n  getOption: toSandboxFun(([shapeIdx, attrName], {\n    shapes\n  }) => {\n    return shapes[shapeIdx].getOption(attrName);\n  }),\n\n  '+': toSandboxFun((params) => {\n    return params.reduce((prev, item) => prev + item, 0);\n  }),\n  '-': toSandboxFun((params) => {\n    return params.slice(1).reduce((prev, item) => prev - item, params[0]);\n  }),\n  '/': toSandboxFun(([x, y]) => {\n    return x / y;\n  }),\n  '*': toSandboxFun((params) => {\n    return params.reduce((prev, item) => prev * item, 1);\n  }),\n\n  'max': toSandboxFun((params) => {\n    return Math.max(...params);\n  }),\n\n  'min': toSandboxFun((params) => {\n    return Math.min(...params);\n  })\n};\n\n/**\n * frame of canvas\n */\n\nconst Frame = function(canvas, shapeExps, sandbox) {\n  this.canvas = canvas;\n  this.shapeExps = flattenShapeExps(shapeExps);\n  this.pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));\n  this.shapeExps.forEach((se) => se.parse(this.pcpServer));\n};\n\nFrame.prototype.getOutestShapeIdxAt = function(x, y) {\n  for (let i = this.shapeExps.length - 1; i >= 0; i--) {\n    const shape = this.shapeExps[i].shape;\n\n    if (isPointInRect(x, y, shape.getOption('x'), shape.getOption('y'), shape.getOption('w'), shape.getOption('h'))) {\n      return i;\n    }\n  }\n  return -1;\n};\n\nFrame.prototype.draw = function() {\n  const ctx = this.canvas.getCtx();\n  this.shapeExps.forEach((s) => {\n    s.shape.draw(ctx);\n  });\n};\n\n// TODO CRUD shapeExps\n// TODO update shapeExp\nFrame.prototype.updateShapeExp = function(shapeExpIdx, attrName, e) {\n  const upds = this.shapeExps[shapeExpIdx].update(this.pcpServer, attrName, e);\n  const ctx = this.canvas.getCtx();\n  upds.forEach((upd) => {\n    upd.shape.draw(ctx);\n  });\n};\n\nconst flattenShapeExps = (shapeExps) => {\n  const result = [];\n  const mark = {};\n\n  for (let i = 0; i < shapeExps.length; i++) {\n    flattenShapeExpsHelp(shapeExps[i], mark, result);\n  }\n  return result;\n};\n\nconst flattenShapeExpsHelp = (shapeExp, mark, result) => {\n  if (mark[shapeExp.id] !== undefined) {\n    return;\n  }\n\n  for (let i = 0; i < shapeExp.deps.length; i++) {\n    flattenShapeExpsHelp(shapeExp.deps[i], mark, result);\n  }\n\n  result.push(shapeExp);\n\n  mark[shapeExp.id] = 1;\n};\n\nconst serializeShapeExps = function(shapeExps) {\n  return JSON.stringify(flattenShapeExps(shapeExps).map((shapeExp) => {\n    return {\n      id: shapeExp.id,\n      deps: shapeExp.deps.map(({\n        id\n      }) => id),\n      exp: shapeExp.exp\n    };\n  }));\n};\n\nmodule.exports = ({\n  shapeExpSandbox = {}\n} = {}) => {\n  const getFrame = (canvas, shapeExps) => {\n    return new Frame(canvas, shapeExps, Object.assign({\n      getCanvasWidth: toSandboxFun(() => canvas.w),\n      getCanvasHeight: toSandboxFun(() => canvas.h)\n    }, shapeExpSandbox));\n  };\n\n  const deserializeToFrame = (canvas, txt) => {\n    const arr = JSON.parse(txt);\n\n    // create shapes\n    const shapeExps = arr.reduce((prev, {\n      id,\n      exp\n    }) => {\n      prev[id] = defShape(exp, [], id);\n      return prev;\n    }, {});\n\n    // build deps\n    arr.forEach(({\n      id,\n      deps\n    }) => {\n      shapeExps[id].deps = deps.map((id) => shapeExps[id]);\n    });\n\n    const ses = [];\n\n    for (let id in shapeExps) {\n      ses.push(shapeExps[id]);\n    }\n\n    return getFrame(canvas, ses);\n  };\n\n  const deserializeToFrameFromJsonObj = (canvas, arr) => {\n    // create shapes\n    const shapeExps = arr.reduce((prev, {\n      id,\n      exp\n    }) => {\n      prev[id] = defShape(exp, [], id);\n      return prev;\n    }, {});\n\n    // build deps\n    arr.forEach(({\n      id,\n      deps\n    }) => {\n      shapeExps[id].deps = deps.map((id) => shapeExps[id]);\n    });\n\n    const ses = [];\n\n    for (let id in shapeExps) {\n      ses.push(shapeExps[id]);\n    }\n\n    return getFrame(canvas, ses);\n  };\n\n  return {\n    getFrame,\n    deserializeToFrame,\n    serializeShapeExps,\n    deserializeToFrameFromJsonObj,\n  };\n};\n\n\n//# sourceURL=webpack:///../src/frame/index.js?");

/***/ }),

/***/ "../src/platform/draw.js":
/*!*******************************!*\
  !*** ../src/platform/draw.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const drawRect = (ctx, {\n  x,\n  y,\n  w,\n  h,\n  color = 'black'\n}) => {\n  if (color === null) return;\n  ctx.fillStyle = color;\n  ctx.fillRect(x, y, w, h);\n};\n\n// lines = [{type, ...}]\nconst drawPath = (ctx, {\n  lines,\n  stroke = true,\n  fill = false\n}) => {\n  ctx.beginPath();\n\n  for (let i = 0; i < lines.length; i++) {\n\n    switch (lines[i].type) {\n      case 'line':\n        //{x1,y1,x2,y2,type}\n        ctx.moveTo(lines[i].x1, lines[i].y1);\n        ctx.lineTo(lines[i].x2, lines[i].y2);\n        break;\n      case 'arc':\n        ctx.arc(lines[i].x, lines[i].y, lines[i].radius, lines[i].startAngle, lines[i].endAngle, lines[i].anticlockwise);\n        break;\n      case 'arcTo':\n        ctx.arcTo(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, lines[i].radius);\n        break;\n        // TODO\n      default:\n        throw new Error(`unexpected line type ${lines[i].type}`);\n    }\n  }\n\n  ctx.closePath();\n  if (stroke) {\n    ctx.stroke();\n  }\n  if (fill) {\n    ctx.fill();\n  }\n};\n\nconst drawText = (ctx, {\n  text = '',\n  font = '16px serif',\n  x,\n  y,\n  textBaseline = 'top',\n  stroke = false,\n  fill = true,\n  color = 'black'\n}) => {\n  ctx.font = font;\n  ctx.textBaseline = textBaseline;\n  if (stroke) {\n    ctx.strokeStyle = color;\n    ctx.strokeText(text, x, y);\n  }\n  if (fill) {\n    ctx.fillStyle = color;\n    ctx.fillText(text, x, y);\n  }\n};\n\nconst drawImage = (ctx, {\n  x,\n  y,\n  w,\n  h,\n  src\n}) => {\n  const img = new Image();\n  img.onload = () => {\n    ctx.drawImage(img, x, y, w, h);\n  };\n  img.src = src;\n};\n\n// clears the specified rectangular area, making it fully transparent\nconst clearRect = (ctx, {\n  x,\n  y,\n  w,\n  h\n}) => {\n  ctx.clearRect(ctx, x, y, w, h);\n};\n\nconst draw = (ctx, opts) => {\n  switch (opts.shapeType) {\n    case 'rect':\n      drawRect(ctx, opts);\n      break;\n    case 'path':\n      drawPath(ctx, opts);\n      break;\n    case 'text':\n      drawText(ctx, opts);\n      break;\n    case 'image':\n      drawImage(ctx, opts);\n      break;\n    case 'clear':\n      clearRect(ctx, opts);\n      break;\n    default:\n      throw new Error(`unexpected shape type ${opts.shapeType}`);\n  }\n};\n\nmodule.exports = {\n  draw\n};\n\n\n//# sourceURL=webpack:///../src/platform/draw.js?");

/***/ }),

/***/ "../src/platform/index.js":
/*!********************************!*\
  !*** ../src/platform/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const defW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\nconst defH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n\nfunction CustomCanvas(oriCanvas, w, h) {\n  this.canvas = oriCanvas;\n  this.w = w;\n  this.h = h;\n}\n\nCustomCanvas.prototype.getCtx = function() {\n  return this.canvas.getContext('2d');\n};\n\nCustomCanvas.prototype.addEventListener = function(...args) {\n  this.canvas.addEventListener(...args);\n};\n\nconst attach = (node, w = defW, h = defH) => {\n  const canvas = document.createElement('canvas');\n\n  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.\n  canvas.width = w * scale;\n  canvas.height = h * scale;\n  canvas.style.width = `${w}px`;\n  canvas.style.height = `${h}px`;\n\n  const ctx = canvas.getContext('2d');\n  // Normalize coordinate system to use css pixels.\n  ctx.scale(scale, scale);\n\n  node.appendChild(canvas);\n\n  return new CustomCanvas(canvas, w, h);\n};\n\nfunction getRelativeCoordinates(event, element) {\n  const position = {\n    x: event.pageX,\n    y: event.pageY\n  };\n\n  const offset = {\n    left: element.offsetLeft,\n    top: element.offsetTop\n  };\n\n  let reference = element.offsetParent;\n\n  while (reference) {\n    offset.left += reference.offsetLeft;\n    offset.top += reference.offsetTop;\n    reference = reference.offsetParent;\n  }\n\n  return {\n    x: position.x - offset.left,\n    y: position.y - offset.top,\n  };\n}\n\nmodule.exports = {\n  attach,\n  getRelativeCoordinates\n};\n\n\n//# sourceURL=webpack:///../src/platform/index.js?");

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

eval("const {\n  draw\n} = __webpack_require__(/*! ../platform/draw */ \"../src/platform/draw.js\");\n\n/**\n * shape can depend on each other\n */\n\n// depFun = (shapes...) => opts\n// TODO generate a unique id for a shape?\nconst Shape = function(options) {\n  this.options = options;\n};\n\nShape.prototype.getOption = function(name) {\n  return this.options[name];\n};\n\nShape.prototype.draw = function(ctx) {\n  return draw(ctx, this.options);\n};\n\nconst shape = (depFun, deps) => {\n  return new Shape(depFun, deps);\n};\n\nmodule.exports = {\n  shape\n};\n\n\n//# sourceURL=webpack:///../src/shape/shape.js?");

/***/ }),

/***/ "../src/shape/shapeExp.js":
/*!********************************!*\
  !*** ../src/shape/shapeExp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  shape\n} = __webpack_require__(/*! ./shape */ \"../src/shape/shape.js\");\n\n/**\n * We can use function define a shape, but function is not a easy way to serialize. So we try to define an expression which can be converted to shape.\n */\n\n/**\n *\n * shapeExp = {\n *   [attrName]: attrExp\n * }\n *\n * attrExp := number | string | boolean | null | ( funName , ... attrExps)\n * eg: 1, \"rect\", true, null, ('+', ('get', '$1', 'x'), 5)\n */\n\n/**\n * exp = {attr: [attr expression]}\n */\nconst ShapeExp = function(id, exp, deps) {\n  this.id = id;\n  this.exp = exp;\n  this.deps = deps;\n\n  // cache\n  this.shape = null;\n  this.depShapes = null;\n};\n\n//this.pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));\n// parse shape expression to shape, and cache the shape.\nShapeExp.prototype.parse = function(pcpServer) {\n  if (this.shape === null) {\n    this.depShapes = this.deps.map((dep) => dep.parse());\n\n    const m = {};\n    for (let name in this.exp) {\n      m[name] = pcpServer.executeArr(this.exp[name], {\n        shapes: this.depShapes\n      });\n    }\n\n    this.shape = shape(m);\n  }\n\n  return this.shape;\n};\n\nShapeExp.prototype.update = function(pcpServer, attrName, e) {\n  const result = [];\n  this._update(pcpServer, attrName, e, result);\n  return result;\n};\n\nShapeExp.prototype._update = function(pcpServer, attrName, e, result) {\n  const newAttrValue = pcpServer.executeArr(e, {\n    shapes: this.depShapes\n  });\n\n  if (newAttrValue !== this.shape.getOption(attrName)) {\n    // update shape\n    // TODO, can only resolve specific attribute?\n    this.shape.options[attrName] = newAttrValue;\n    result.push(this);\n    // TODO update depts\n  }\n\n  return result;\n};\n\nlet shapeCounter = 0;\n\nconst defShape = (exp, deps = [], id = shapeCounter++) => {\n  return new ShapeExp(id, exp, deps);\n};\n\n// c(\"+\", c(\"getOption\", 0, \"x\"), 5)\nconst c = (funName, ...args) => {\n  return [funName, ...args];\n};\n\n/**\n *\n * common relationships\n */\nconst centerXIn = (index, w) => {\n  return c('+', c('getOption', index, 'x'), c('/', c('-', c('getOption', index, 'w'), w), 2));\n};\n\nconst centerYIn = (index, h) => {\n  return c('+', c('getOption', index, 'y'), c('/', c('-', c('getOption', index, 'h'), h), 2));\n};\n\nconst underY = (index, offset) => {\n  return c('+', c('getOption', index, 'y'), c('+', c('getOption', index, 'h'), offset));\n};\n\nconst prop = (index, propName) => {\n  return c('getOption', index, propName);\n};\n\nconst canvasWidth = c('getCanvasWidth');\nconst canvasHeight = c('getCanvasHeight');\n\n// a shape is after another shape\nconst after = (shapeExp, exp) => {\n  const exps = Array.isArray(exp) ? exp : [exp];\n\n  return exps.reduce((prev, item) => {\n    return afterOne(prev, item);\n  }, shapeExp);\n};\n\nconst afterOne = (shapeExp, exp) => {\n  // TODO\n  const baseline = exp.baseline || 'bottom';\n  let xexp = 0,\n    yexp = 0;\n  if (baseline === 'bottom') {\n    xexp = c('+', c('getOption', 0, 'x'), c('getOption', 0, 'w'), exp.dx || 0);\n    yexp = c('+', c('-', c('+', c('getOption', 0, 'y'), c('getOption', 0, 'h')), exp.h), exp.dy || 0);\n  }\n\n  exp.x = xexp;\n  exp.y = yexp;\n\n  return defShape(exp, [shapeExp]);\n};\n\nconst below = (shapeExp, exp) => {\n  const yexp = c('+', c('getOption', 0, 'y'), c('+', c('getOption', 0, 'h'), exp.dy || 0));\n  exp.y = yexp;\n  exp.x = exp.x || 0;\n\n  return defShape(exp, [shapeExp]);\n};\n\nconst box = (shapeExps) => {\n  if (typeof shapeExps === 'function') {\n    return box(shapeExps());\n  }\n  const x = c('min', ...shapeExps.map((_, index) => c('getOption', index, 'x')));\n  const y = c('min', ...shapeExps.map((_, index) => c('getOption', index, 'y')));\n  const xe = c('max', ...shapeExps.map((_, index) => c('+', c('getOption', index, 'x'), c('getOption', index, 'w'))));\n  const ye = c('max', ...shapeExps.map((_, index) => c('+', c('getOption', index, 'y'), c('getOption', index, 'h'))));\n\n  return defShape({\n    shapeType: 'rect',\n    color: null,\n    x,\n    y,\n    w: c('-', xe, x),\n    h: c('-', ye, y)\n  }, shapeExps);\n};\n\nmodule.exports = {\n  defShape,\n  c,\n  centerXIn,\n  centerYIn,\n  underY,\n  below,\n  prop,\n  after,\n  box,\n  canvasWidth,\n  canvasHeight,\n};\n\n\n//# sourceURL=webpack:///../src/shape/shapeExp.js?");

/***/ }),

/***/ "../src/util/index.js":
/*!****************************!*\
  !*** ../src/util/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const flatten = (list) => {\n  return list.reduce((prev, item) => {\n    if (Array.isArray(item)) {\n      return prev.concat(flatten(item));\n    } else {\n      prev.push(item);\n      return prev;\n    }\n  }, []);\n};\n\nconst isPointInRect = (x0, y0, x, y, w, h) => {\n  return x0 >= x && x0 <= x + w && y0 >= y && y0 <= y + h;\n};\n\nconst isRectsIntersect = (x0, y0, w0, h0, x, y, w, h) => {\n  return isIntervalIntersect(x0, x0 + w0, x, x + w) && isIntervalIntersect(y0, y0 + h0, y, y + h);\n};\n\n// interval [x0, x1], [x2, x3]\nconst isIntervalIntersect = (x0, x1, x2, x3) => {\n  return !(x1 < x2 || x3 < x0);\n};\n\nmodule.exports = {\n  flatten,\n  isPointInRect,\n  isRectsIntersect,\n  isIntervalIntersect\n};\n\n\n//# sourceURL=webpack:///../src/util/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const log = console.log.bind(console); // eslint-disable-line\nconst {\n  attach,\n  getRelativeCoordinates\n} = __webpack_require__(/*! ../src/platform */ \"../src/platform/index.js\");\nconst {\n  deserializeToFrameFromJsonObj\n} = __webpack_require__(/*! ../src/frame */ \"../src/frame/index.js\")();\n\nconst ses = __webpack_require__(/*! ./index.json */ \"./index.json\");\n\nconst canvas = attach(document.getElementById('app'));\nconst frame = deserializeToFrameFromJsonObj(canvas, ses);\nframe.draw();\n\ncanvas.addEventListener('click', (e) => {\n  const {\n    x,\n    y\n  } = getRelativeCoordinates(e, canvas.canvas);\n  const shapeIdx = frame.getOutestShapeIdxAt(x, y);\n  if (shapeIdx !== -1) {\n    frame.updateShapeExp(shapeIdx, 'color', 'red');\n  }\n});\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./index.json":
/*!********************!*\
  !*** ./index.json ***!
  \********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

eval("module.exports = [{\"id\":0,\"deps\":[],\"exp\":{\"shapeType\":\"rect\",\"x\":0,\"y\":0,\"w\":[\"getCanvasWidth\"],\"h\":45,\"color\":\"blue\"}},{\"id\":1,\"deps\":[0],\"exp\":{\"shapeType\":\"text\",\"x\":[\"+\",[\"getOption\",0,\"x\"],[\"/\",[\"-\",[\"getOption\",0,\"w\"],100],2]],\"y\":[\"+\",[\"getOption\",0,\"y\"],[\"/\",[\"-\",[\"getOption\",0,\"h\"],20],2]],\"w\":100,\"h\":20,\"text\":\"debug for simia\",\"color\":\"white\"}},{\"id\":2,\"deps\":[0,1],\"exp\":{\"shapeType\":\"rect\",\"color\":null,\"x\":[\"min\",[\"getOption\",0,\"x\"],[\"getOption\",1,\"x\"]],\"y\":[\"min\",[\"getOption\",0,\"y\"],[\"getOption\",1,\"y\"]],\"w\":[\"-\",[\"max\",[\"+\",[\"getOption\",0,\"x\"],[\"getOption\",0,\"w\"]],[\"+\",[\"getOption\",1,\"x\"],[\"getOption\",1,\"w\"]]],[\"min\",[\"getOption\",0,\"x\"],[\"getOption\",1,\"x\"]]],\"h\":[\"-\",[\"max\",[\"+\",[\"getOption\",0,\"y\"],[\"getOption\",0,\"h\"]],[\"+\",[\"getOption\",1,\"y\"],[\"getOption\",1,\"h\"]]],[\"min\",[\"getOption\",0,\"y\"],[\"getOption\",1,\"y\"]]]}},{\"id\":3,\"deps\":[2],\"exp\":{\"shapeType\":\"rect\",\"w\":100,\"h\":45,\"color\":\"black\",\"y\":[\"+\",[\"getOption\",0,\"y\"],[\"+\",[\"getOption\",0,\"h\"],0]],\"x\":0}},{\"id\":4,\"deps\":[3],\"exp\":{\"shapeType\":\"text\",\"w\":100,\"h\":20,\"text\":\"hello world!\",\"x\":[\"+\",[\"getOption\",0,\"x\"],[\"getOption\",0,\"w\"],0],\"y\":[\"+\",[\"-\",[\"+\",[\"getOption\",0,\"y\"],[\"getOption\",0,\"h\"]],20],0]}},{\"id\":5,\"deps\":[4],\"exp\":{\"shapeType\":\"rect\",\"color\":null,\"x\":[\"min\",[\"getOption\",0,\"x\"]],\"y\":[\"min\",[\"getOption\",0,\"y\"]],\"w\":[\"-\",[\"max\",[\"+\",[\"getOption\",0,\"x\"],[\"getOption\",0,\"w\"]]],[\"min\",[\"getOption\",0,\"x\"]]],\"h\":[\"-\",[\"max\",[\"+\",[\"getOption\",0,\"y\"],[\"getOption\",0,\"h\"]]],[\"min\",[\"getOption\",0,\"y\"]]]}}];\n\n//# sourceURL=webpack:///./index.json?");

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
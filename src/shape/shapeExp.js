const {
  shape
} = require('./shape');
const {
  Sandbox,
  getPcpServer,
  toSandboxFun
} = require('pcpjs/lib/pcp');

/**
 * We can use function define a shape, but function is not a easy way to serialize. So we try to define an expression which can be converted to shape.
 */

/**
 *
 * shapeExp = {
 *   [attrName]: attrExp
 * }
 *
 * attrExp := number | string | boolean | null | ( funName , ... attrExps)
 * eg: 1, "rect", true, null, ('+', ('get', '$1', 'x'), 5)
 */

const defBoxForShape = {
  getOption: toSandboxFun(([shapeIdx, attrName], {
    shapes
  }) => {
    return shapes[shapeIdx].getOption(attrName);
  }),

  '+': toSandboxFun((params) => {
    return params.reduce((prev, item) => prev + item, 0);
  }),
  '-': toSandboxFun((params) => {
    return params.slice(1).reduce((prev, item) => prev - item, params[0]);
  }),
  '/': toSandboxFun(([x, y]) => {
    return x / y;
  }),
  '*': toSandboxFun((params) => {
    return params.reduce((prev, item) => prev * item, 1);
  }),
};

const ShapeExp = function(id, exp, deps, pcpServer) {
  this.id = id;
  this.exp = exp;
  this.deps = deps;
  this.pcpServer = pcpServer;

  // cache
  this.shape = null;
};

ShapeExp.prototype.parse = function() {
  if (this.shape === null) {
    this.shape = shape((...args) => {
      const m = {};
      for (let name in this.exp) {
        m[name] = this.pcpServer.executeArr(this.exp[name], {
          shapes: args
        });
      }
      return m;
    }, this.deps.map((dep) => dep.parse()));
  }

  return this.shape;
};

module.exports = (sandbox = {}) => {
  const pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));
  let shapeCounter = 0;

  const defShape = (exp, deps = [], id = shapeCounter++) => {
    return new ShapeExp(id, exp, deps, pcpServer);
  };

  // c("+", c("getOption", 0, "x"), 5)
  const c = (funName, ...args) => {
    return [funName, ...args];
  };

  /**
   *
   * common relationships
   */
  const centerXIn = (index, w) => {
    return c('+', c('getOption', index, 'x'), c('/', c('-', c('getOption', index, 'w'), w), 2));
  };

  const centerYIn = (index, h) => {
    return c('+', c('getOption', index, 'y'), c('/', c('-', c('getOption', index, 'h'), h), 2));
  };

  const under = (index, offset) => {
    return c('+', c('getOption', index, 'y'), c('+', c('getOption', index, 'h'), offset));
  };

  const prop = (index, propName) => {
    return c('getOption', index, propName);
  };

  const canvasWidth = c('getCanvasWidth');
  const canvasHeight = c('getCanvasHeight');

  // a shape is after another shape
  const after = (shapeExp, exp, {
    dx = 0,
    dy = 0,
    // TODO
    baseline = 'bottom' // middle, top
  } = {}) => {
    let xexp = 0,
      yexp = 0;
    if (baseline === 'bottom') {
      xexp = c('+', c('getOption', 0, 'x'), c('getOption', 0, 'w'), dx);
      yexp = c('+', c('-', c('+', c('getOption', 0, 'y'), c('getOption', 0, 'h')), exp.h), dy);
    }

    exp.x = xexp;
    exp.y = yexp;

    return defShape(exp, [shapeExp]);
  };

  return {
    defShape,
    c,
    centerXIn,
    centerYIn,
    under,
    prop,
    after,
    canvasWidth,
    canvasHeight,
  };
};

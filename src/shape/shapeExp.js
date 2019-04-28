const {
  shape
} = require('./shape');

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

/**
 * exp = {attr: [attr expression]}
 */
const ShapeExp = function(id, exp, deps) {
  this.id = id;
  this.exp = exp;
  this.deps = deps;

  // cache
  this.shape = null;
  this.depShapes = null;
};

//this.pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));
// parse shape expression to shape, and cache the shape.
ShapeExp.prototype.parse = function(pcpServer) {
  if (this.shape === null) {
    this.depShapes = this.deps.map((dep) => dep.parse());

    const m = {};
    for (let name in this.exp) {
      m[name] = pcpServer.executeArr(this.exp[name], {
        shapes: this.depShapes
      });
    }

    this.shape = shape(m);
  }

  return this.shape;
};

ShapeExp.prototype.update = function(pcpServer, attrName, e) {
  const result = [];
  this._update(pcpServer, attrName, e, result);
  return result;
};

ShapeExp.prototype._update = function(pcpServer, attrName, e, result) {
  const newAttrValue = pcpServer.executeArr(e, {
    shapes: this.depShapes
  });

  if (newAttrValue !== this.shape.getOption(attrName)) {
    // update shape
    // TODO, can only resolve specific attribute?
    this.shape.options[attrName] = newAttrValue;
    result.push(this);
    // TODO update depts
  }

  return result;
};

module.exports = () => {
  let shapeCounter = 0;

  const defShape = (exp, deps = [], id = shapeCounter++) => {
    return new ShapeExp(id, exp, deps);
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

  const underY = (index, offset) => {
    return c('+', c('getOption', index, 'y'), c('+', c('getOption', index, 'h'), offset));
  };

  const prop = (index, propName) => {
    return c('getOption', index, propName);
  };

  const canvasWidth = c('getCanvasWidth');
  const canvasHeight = c('getCanvasHeight');

  // a shape is after another shape
  const after = (shapeExp, exp) => {
    const exps = Array.isArray(exp) ? exp : [exp];

    return exps.reduce((prev, item) => {
      return afterOne(prev, item);
    }, shapeExp);
  };

  const afterOne = (shapeExp, exp) => {
    // TODO
    const baseline = exp.baseline || 'bottom';
    let xexp = 0,
      yexp = 0;
    if (baseline === 'bottom') {
      xexp = c('+', c('getOption', 0, 'x'), c('getOption', 0, 'w'), exp.dx || 0);
      yexp = c('+', c('-', c('+', c('getOption', 0, 'y'), c('getOption', 0, 'h')), exp.h), exp.dy || 0);
    }

    exp.x = xexp;
    exp.y = yexp;

    return defShape(exp, [shapeExp]);
  };

  const below = (shapeExp, exp) => {
    const yexp = c('+', c('getOption', 0, 'y'), c('+', c('getOption', 0, 'h'), exp.dy || 0));
    exp.y = yexp;
    exp.x = exp.x || 0;

    return defShape(exp, [shapeExp]);
  };

  const box = (shapeExps) => {
    if (typeof shapeExps === 'function') {
      return box(shapeExps());
    }
    const x = c('min', ...shapeExps.map((_, index) => c('getOption', index, 'x')));
    const y = c('min', ...shapeExps.map((_, index) => c('getOption', index, 'y')));
    const xe = c('max', ...shapeExps.map((_, index) => c('+', c('getOption', index, 'x'), c('getOption', index, 'w'))));
    const ye = c('max', ...shapeExps.map((_, index) => c('+', c('getOption', index, 'y'), c('getOption', index, 'h'))));

    return defShape({
      shapeType: 'rect',
      color: null,
      x,
      y,
      w: c('-', xe, x),
      h: c('-', ye, y)
    }, shapeExps);
  };

  return {
    defShape,
    c,
    centerXIn,
    centerYIn,
    underY,
    below,
    prop,
    after,
    box,
    canvasWidth,
    canvasHeight,
  };
};

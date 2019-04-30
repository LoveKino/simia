const defShape = require('./shapeExp');

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

module.exports = {
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

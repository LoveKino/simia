const {
  isPointInRect,
  flatten,
  isRectsIntersect
} = require('./util');

/**
 * define RectMeasure = (xMeasure, yMeasure, wMeasure, hMeasure)
 */

function RectMeasure(xM, yM, wM, hM) {
  this.xM = xM;
  this.yM = yM;
  this.wM = wM;
  this.hM = hM;
}

/**
 * define Shape = (RectMeasure, Draw, Properties)
 */
function Shape(rectMeasure, draw, properties) {
  this.rectMeasure = rectMeasure;
  this.draw = draw;
  this.properties = properties;
}

/**
 * Layout shape just contains a bunch of shapes
 */
const LayoutShape = function(rectMeasure, shapes) {
  this.shapes = shapes;
  this.rectMeasure = rectMeasure;
};

LayoutShape.prototype.flattenShapes = function() {
  return this.shapes.reduce((prev, shape) => {
    if (shape instanceof LayoutShape) {
      prev.push(...shape.flattenShapes());
    } else {
      prev.push(shape);
    }
    return prev;
  }, []);
};

/**
 * define Frame = ([]Shape, canvasCtx)
 */
function Frame(shapes) {
  this.shapes = flatten(shapes).reduce((prev, shape) => {
    // expand layout shape
    if (shape instanceof LayoutShape) {
      prev.push(...shape.flattenShapes());
    } else {
      prev.push(shape);
    }
    return prev;
  }, []);
}

// TODO use red-black tree?
Frame.prototype.getTopShapeAtPoint = function(x0, y0) {
  return this.shapes.find((shape) => {
    return isPointInRect(x0, y0, shape.rectMeasure.xM.value, shape.rectMeasure.yM.value, shape.rectMeasure.wM.value, shape.rectMeasure.hM.value);
  });
};

// TODO get shapes at certain rect => rerender usage.
// if a shape's has intersection with rect

Frame.prototype.getIntersectionShapes = function(x0, y0, w0, h0) {
  return this.shapes.filter((shape) => {
    return isRectsIntersect(x0, y0, w0, h0,
      shape.rectMeasure.xM.value,
      shape.rectMeasure.yM.value,
      shape.rectMeasure.wM.value,
      shape.rectMeasure.hM.value);
  });
};

const renderFrame = function(frame, canvas) {
  const ctx = canvas.getContext('2d');

  // resolve shape rect values
  const xcache = {},
    xseen = {},
    ycache = {},
    yseen = {},
    wcache = {},
    wseen = {},
    hcache = {},
    hseen = {};

  for (let i = 0; i < frame.shapes.length; i++) {
    const shape = frame.shapes[i];
    shape.rectMeasure.xM.resolve(xcache, xseen);
    shape.rectMeasure.yM.resolve(ycache, yseen);
    shape.rectMeasure.wM.resolve(wcache, wseen);
    shape.rectMeasure.hM.resolve(hcache, hseen);
  }

  // draw on the canvas
  for (let i = 0; i < frame.shapes.length; i++) {
    const shape = frame.shapes[i];
    if (shape.draw) {
      shape.draw(ctx,
        shape.rectMeasure.xM.value,
        shape.rectMeasure.yM.value,
        shape.rectMeasure.wM.value,
        shape.rectMeasure.hM.value,
        shape.properties);
    }
  }
};

module.exports = {
  Frame,
  RectMeasure,
  Shape,
  renderFrame,
  LayoutShape
};

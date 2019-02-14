const {
  isPointInRect
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
 * define Frame = ([]Shape, canvasCtx)
 */
function Frame(shapes, ctx) {
  this.shapes = shapes;
  this.ctx = ctx;
}

Frame.prototype.render = function() {
  // resolve shape rect values
  const xcache = {},
    ycache = {},
    wcache = {},
    hcache = {};
  for (let i = 0; i < this.shapes.length; i++) {
    const shape = this.shapes[i];
    shape.rectMeasure.xM.resolve(xcache);
    shape.rectMeasure.yM.resolve(ycache);
    shape.rectMeasure.wM.resolve(wcache);
    shape.rectMeasure.hM.resolve(hcache);
  }

  // draw on the canvas
  for (let i = 0; i < this.shapes.length; i++) {
    const shape = this.shapes[i];
    shape.draw(this.ctx,
      shape.rectMeasure.xM.value,
      shape.rectMeasure.yM.value,
      shape.rectMeasure.wM.value,
      shape.rectMeasure.hM.value,
      shape.properties);
  }
};

Frame.prototype.getTopShapeAtPoint = function(x0, y0) {
  for (let i = this.shapes.length - 1; i >= 0; i--) {
    const shape = this.shapes[i];
    if (isPointInRect(x0, y0, shape.rectMeasure.xM.value, shape.rectMeasure.yM.value, shape.rectMeasure.wM.value, shape.rectMeasure.hM.value)) {
      return shape;
    }
  }
};

module.exports = {
  Frame,
  RectMeasure,
  Shape
};

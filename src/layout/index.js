const {
  Shape,
  LayoutShape,
  RectMeasure
} = require('../frame');

const {
  fixed,
  min,
  max,
  sum
} = require('../measure');

const fixedShape = (draw, properties, x = 0, y = 0, w = 0, h = 0) => {
  return new Shape(
    new RectMeasure(fixed(x), fixed(y), fixed(w), fixed(h)),
    draw,
    properties
  );
};

// row container shape
const row = (shapes) => {
  return new LayoutShape(new RectMeasure(
    min(shapes.map((shape) => shape.rectMeasure.xM)),
    min(shapes.map((shape) => shape.rectMeasure.yM)),
    sum(shapes.map((shape) => shape.rectMeasure.wM)),
    max(shapes.map((shape) => shape.rectMeasure.hM))
  ), shapes);
};

module.exports = {
  fixedShape,
  row,
  LayoutShape
};

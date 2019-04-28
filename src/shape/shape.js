const {
  draw
} = require('../platform/draw');

/**
 * shape can depend on each other
 */

// depFun = (shapes...) => opts
// TODO generate a unique id for a shape?
const Shape = function(options) {
  this.options = options;
};

Shape.prototype.getOption = function(name) {
  return this.options[name];
};

Shape.prototype.draw = function(ctx) {
  return draw(ctx, this.options);
};

const shape = (depFun, deps) => {
  return new Shape(depFun, deps);
};

module.exports = {
  shape
};

const draw = require('../platform/draw');

const Shape = function(options) {
  this.options = options;
};

Shape.prototype.getOption = function(name) {
  return this.options[name];
};

Shape.prototype.draw = function(ctx) {
  return draw(ctx, this.options);
};

module.exports = (depFun, deps) => {
  return new Shape(depFun, deps);
};

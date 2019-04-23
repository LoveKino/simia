const {
  draw
} = require('../platform/draw');

/**
 * shape can depend on each other
 */

const RESOLVED = 1;
const UNRESOLVED = 2;

// depFun = (shapes...) => opts
// TODO generate a unique id for a shape?
const Shape = function(depFun, deps = []) {
  this.depFun = depFun;
  this.deps = deps;
  this.options = {};
  this.status = UNRESOLVED;
};

Shape.prototype.resolve = function() {
  if (this.status === UNRESOLVED) {
    // resolve dependencies first
    for (let i = 0; i < this.deps.length; i++) {
      this.deps[i].resolve();
    }

    // run dep fun
    this.options = this.depFun(...this.deps);

    // mark as resolved
    this.status = RESOLVED;
  }
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

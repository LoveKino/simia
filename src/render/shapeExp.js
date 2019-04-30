const shape = require('./shape');

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

let shapeCounter = 0;

module.exports = (exp, deps = [], id = shapeCounter++) => {
  return new ShapeExp(id, exp, deps);
};

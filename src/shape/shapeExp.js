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

  '+': toSandboxFun(([x, y]) => {
    return x + y;
  }),
  '-': toSandboxFun(([x, y]) => {
    return x - y;
  }),
  '/': toSandboxFun(([x, y]) => {
    return x / y;
  }),
  '*': toSandboxFun(([x, y]) => {
    return x * y;
  }),
};

module.exports = (sandbox = {}) => {
  const pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));

  const defShape = (shapeExp, deps) => {
    return shape((...args) => {
      const m = {};
      for (let name in shapeExp) {
        m[name] = pcpServer.executeArr(shapeExp[name], {
          shapes: args
        });
      }
      return m;
    }, deps);
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

  return {
    defShape,
    c,
    centerXIn,
    centerYIn,
    under
  };
};

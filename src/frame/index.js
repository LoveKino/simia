const {
  shapeExp
} = require('../shape');
const {
  toSandboxFun,
  Sandbox,
  getPcpServer,
} = require('pcpjs/lib/pcp');

const defBoxForShape = {
  getOption: toSandboxFun(([shapeIdx, attrName], {
    shapes
  }) => {
    return shapes[shapeIdx].getOption(attrName);
  }),

  '+': toSandboxFun((params) => {
    return params.reduce((prev, item) => prev + item, 0);
  }),
  '-': toSandboxFun((params) => {
    return params.slice(1).reduce((prev, item) => prev - item, params[0]);
  }),
  '/': toSandboxFun(([x, y]) => {
    return x / y;
  }),
  '*': toSandboxFun((params) => {
    return params.reduce((prev, item) => prev * item, 1);
  }),

  'max': toSandboxFun((params) => {
    return Math.max(...params);
  }),

  'min': toSandboxFun((params) => {
    return Math.min(...params);
  })
};

/**
 * frame of canvas
 */

const Frame = function(canvas, shapeExps, shapeUtil, sandbox) {
  this.canvas = canvas;
  this.shapeExps = flattenShapeExps(shapeExps);
  this.shapeUtil = shapeUtil;
  this.pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));
  this.shapeExps.forEach((se) => se.parse(this.pcpServer));
};

Frame.prototype.draw = function() {
  const ctx = this.canvas.getCtx();
  this.shapeExps.forEach((s) => {
    s.shape.draw(ctx);
  });
};

// TODO CRUD shapeExps
// TODO update shapeExp
Frame.prototype.updateShapeExp = function(shapeExpIdx, attrName, e) {
  const upds = this.shapeExps[shapeExpIdx].update(this.pcpServer, attrName, e);
  const ctx = this.canvas.getCtx();
  upds.forEach((upd) => {
    upd.shape.draw(ctx);
  });
};

const flattenShapeExps = (shapeExps) => {
  const result = [];
  const mark = {};

  for (let i = 0; i < shapeExps.length; i++) {
    flattenShapeExpsHelp(shapeExps[i], mark, result);
  }
  return result;
};

const flattenShapeExpsHelp = (shapeExp, mark, result) => {
  if (mark[shapeExp.id] !== undefined) {
    return;
  }

  for (let i = 0; i < shapeExp.deps.length; i++) {
    flattenShapeExpsHelp(shapeExp.deps[i], mark, result);
  }

  result.push(shapeExp);

  mark[shapeExp.id] = 1;
};

const serializeShapeExps = function(shapeExps) {
  return JSON.stringify(shapeExps.map((shapeExp) => {
    return {
      id: shapeExp.id,
      deps: shapeExp.deps.map(({
        id
      }) => id),
      exp: shapeExp.exp
    };
  }));
};

module.exports = ({
  shapeExpSandbox = {}
} = {}) => {
  const shapeUtil = shapeExp();

  const getFrame = (canvas, shapeExps) => {
    return new Frame(canvas, shapeExps, shapeUtil, Object.assign({
      getCanvasWidth: toSandboxFun(() => canvas.w),
      getCanvasHeight: toSandboxFun(() => canvas.h)
    }, shapeExpSandbox));
  };

  const deserializeToFrame = (canvas, txt) => {
    const arr = JSON.parse(txt);

    // create shapes
    const shapeExps = arr.reduce((prev, {
      id,
      exp
    }) => {
      prev[id] = shapeUtil.defShape(exp, [], id);
      return prev;
    }, {});

    // build deps
    arr.forEach(({
      id,
      deps
    }) => {
      shapeExps[id].deps = deps.map((id) => shapeExps[id]);
    });

    const ses = [];

    for (let id in shapeExps) {
      ses.push(shapeExps[id]);
    }

    return getFrame(canvas, ses);
  };

  return {
    getFrame,
    shapeUtil,
    deserializeToFrame,
    serializeShapeExps
  };
};

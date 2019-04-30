const defShape = require('./shapeExp');
const {
  toSandboxFun,
  Sandbox,
  getPcpServer,
} = require('pcpjs/lib/pcp');
const {
  isPointInRect
} = require('../util');

const defBoxForShape = {
  getOption: toSandboxFun(([shapeIdx, attrName], {
    shapes
  }) => {
    return shapes[shapeIdx].getOption(attrName);
  }),
};

/**
 * frame of canvas
 */

const Frame = function(canvas, shapeExps, sandbox) {
  this.canvas = canvas;
  this.shapeExps = flattenShapeExps(shapeExps);
  this.pcpServer = getPcpServer(new Sandbox(Object.assign({}, defBoxForShape, sandbox)));
  this.shapeExps.forEach((se) => se.parse(this.pcpServer));
};

Frame.prototype.getOutestShapeIdxAt = function(x, y) {
  for (let i = this.shapeExps.length - 1; i >= 0; i--) {
    const shape = this.shapeExps[i].shape;

    if (
      isPointInRect(x, y,
        shape.getOption('x'),
        shape.getOption('y'),
        shape.getOption('w'),
        shape.getOption('h'))) {
      return i;
    }
  }
  return -1;
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
  return JSON.stringify(flattenShapeExps(shapeExps).map((shapeExp) => {
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
  const getFrame = (canvas, shapeExps) => {
    return new Frame(canvas, shapeExps, Object.assign({
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
      prev[id] = defShape(exp, [], id);
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

  const deserializeToFrameFromJsonObj = (canvas, arr) => {
    // create shapes
    const shapeExps = arr.reduce((prev, {
      id,
      exp
    }) => {
      prev[id] = defShape(exp, [], id);
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
    deserializeToFrame,
    serializeShapeExps,
    deserializeToFrameFromJsonObj,
  };
};

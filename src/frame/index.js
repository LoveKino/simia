const {
  shapeExp
} = require('../shape');
const {
  toSandboxFun
} = require('pcpjs/lib/pcp');

/**
 * frame of canvas
 */

const Frame = function(canvas, shapeExps, shapeUtil) {
  this.canvas = canvas;
  this.shapeExps = shapeExps;
  this.shapeUtil = shapeUtil;
};

Frame.prototype.draw = function() {
  const ctx = this.canvas.getCtx();
  this.shapeExps.map((shapeExp) => shapeExp.parse()).forEach((s) => {
    s.resolve();
    s.draw(ctx);
  });
};

Frame.prototype.serialize = function() {
  return serializeHelp(this.shapeExps);
};

const serializeHelp = (shapeExps) => {
  const result = [];
  const mark = {};

  for (let i = 0; i < shapeExps.length; i++) {
    serializeHelpVisit(shapeExps[i], mark, result);
  }

  return JSON.stringify(result);
};

const serializeHelpVisit = (shapeExp, mark, result) => {
  if (mark[shapeExp.id] !== undefined) {
    return;
  }

  for (let i = 0; i < shapeExp.deps.length; i++) {
    serializeHelpVisit(shapeExp.deps[i], mark, result);
  }

  result.push({
    id: shapeExp.id,
    deps: shapeExp.deps.map(({
      id
    }) => id),
    exp: shapeExp.exp
  });

  mark[shapeExp.id] = 1;
};

module.exports = (canvas, {
  shapeExpSandbox = {}
} = {}) => {
  const shapeUtil = shapeExp(Object.assign({
    getCanvasWidth: toSandboxFun(() => canvas.w),
    getCanvasHeight: toSandboxFun(() => canvas.h)
  }, shapeExpSandbox));

  const getFrame = (shapeExps) => {
    return new Frame(canvas, shapeExps, shapeUtil);
  };

  const deserializeFrame = (txt) => {
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

    return getFrame(ses);
  };

  return {
    getFrame,
    shapeUtil,
    deserializeFrame
  };
};

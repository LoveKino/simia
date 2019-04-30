const attach = require('../src/platform/attach');
const Frame = require('../src/render/frame');

const startApp = (domNode, sesObj, options) => {
  const {
    deserializeToFrameFromJsonObj
  } = Frame(options);
  const canvas = attach(domNode);
  const frame = deserializeToFrameFromJsonObj(canvas, sesObj);
  frame.draw();

  canvas.addEventListener('click', ({
    x,
    y
  }) => {
    const shapeIdx = frame.getOutestShapeIdxAt(x, y);
    if (shapeIdx !== -1) {
      frame.updateShapeExp(shapeIdx, 'color', 'red');
    }
  });
};

module.exports = {
  startApp
};

const {
  getCtx
} = require('../platform');
const {
  draw
} = require('../platform/draw');

/**
 * frame of canvas
 */

const drawFrame = (canvas, shapes) => {
  const ctx = getCtx(canvas);

  shapes.forEach((s) => {
    s.resolve();
    draw(ctx, s.getOptions());
  });
};

module.exports = {
  drawFrame
};

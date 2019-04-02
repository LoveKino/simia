const {
  draw
} = require('../platform/draw');

/**
 * frame of canvas
 */

const drawFrame = (canvas, shapes) => {
  const ctx = canvas.getCtx();

  shapes.forEach((s) => {
    s.resolve();
    draw(ctx, s.getOptions());
  });
};

module.exports = {
  drawFrame
};

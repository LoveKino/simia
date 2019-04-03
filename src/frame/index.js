/**
 * frame of canvas
 */

const drawFrame = (canvas, shapes) => {
  const ctx = canvas.getCtx();

  shapes.forEach((s) => {
    s.resolve();
    s.draw(ctx);
  });
};

module.exports = {
  drawFrame
};

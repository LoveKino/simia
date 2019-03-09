/**
 * (1) low level canvas drawing apis
 *
 * (2) a way to compose drawings
 */
const Draw = require('./draw');
const {
  Frame,
  renderFrame,
  RectMeasure,
  Shape
} = require('./frame');
const {
  getRelativeCoordinates
} = require('./util');

const defW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const defH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const attach = (node, w = defW, h = defH) => {
  const canvas = document.createElement('canvas');

  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  canvas.width = w * scale;
  canvas.height = h * scale;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext('2d');
  // Normalize coordinate system to use css pixels.
  ctx.scale(scale, scale);

  node.appendChild(canvas);
  return canvas;
};

module.exports = {
  attach,
  Frame,
  RectMeasure,
  Shape,
  Draw,
  getRelativeCoordinates,
  renderFrame
};

const log = console.log.bind(console); // eslint-disable-line
const {
  attach,
  getRelativeCoordinates
} = require('../src/platform');
const {
  deserializeToFrameFromJsonObj
} = require('../src/frame')();

const ses = require('./index.json');

const canvas = attach(document.getElementById('app'));
const frame = deserializeToFrameFromJsonObj(canvas, ses);
frame.draw();

canvas.addEventListener('click', (e) => {
  const {
    x,
    y
  } = getRelativeCoordinates(e, canvas.canvas);
  const shapeIdx = frame.getOutestShapeIdxAt(x, y);
  if (shapeIdx !== -1) {
    frame.updateShapeExp(shapeIdx, 'color', 'red');
  }
});

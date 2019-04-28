const log = console.log.bind(console); // eslint-disable-line
const {
  attach
} = require('../src/platform');
const {
  deserializeToFrameFromJsonObj
} = require('../src/frame')();
const ses = require('./index.json');
/*
canvas.addEventListener('click', (e) => {
  const {
    x,
    y
  } = getRelativeCoordinates(e, canvas);
});
*/
const canvas = attach(document.getElementById('app'));
const frame = deserializeToFrameFromJsonObj(canvas, ses);
frame.draw();
frame.updateShapeExp(1, 'color', 'red');

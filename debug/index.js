const log = console.log.bind(console); // eslint-disable-line
const {
  attach
} = require('../src/platform');
const {
  drawFrame
} = require('../src/frame/index.js');

const canvas = attach(document.getElementById('app'));

/*
canvas.addEventListener('click', (e) => {
  const {
    x,
    y
  } = getRelativeCoordinates(e, canvas);
});
*/

const {
  shape
} = require('../src/shape');
const s1 = shape(() => {
  return {
    shapeType: 'rect',
    x: 10,
    y: 10,
    w: 100,
    h: 45,
    color: 'red'
  };
});

const s2 = shape((s1) => {
  return {
    shapeType: 'rect',
    x: s1.getOption('x') + s1.getOption('w') + 5,
    y: s1.getOption('y'),
    w: 100,
    h: 45,
    color: 'black'
  };
}, [s1]);

const s3 = shape((s) => {
  return {
    shapeType: 'text',
    x: s.getOption('x') + s.getOption('w') + 5,
    y: s.getOption('y'),
    w: 100,
    h: 45,
    text: 'hello world!'
  };
}, [s2]);

drawFrame(canvas, [s1, s2, s3]);

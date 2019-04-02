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
const hb = shape(() => {
  return {
    shapeType: 'rect',
    x: 0,
    y: 0,
    w: canvas.w,
    h: 45,
    color: 'blue'
  };
});

const title = shape((s) => {
  const w = 100,
    h = 20;
  return {
    shapeType: 'text',
    x: s.getOption('x') + (s.getOption('w') - w) / 2,
    y: s.getOption('y') + (s.getOption('h') - h) / 2,
    w,
    h,
    text: 'debug for simia',
    color: 'white'
  };
}, [hb]);

const s2 = shape((s) => {
  return {
    shapeType: 'rect',
    x: s.getOption('x'),
    y: s.getOption('y') + s.getOption('h') + 5,
    w: 100,
    h: 45,
    color: 'black'
  };
}, [hb]);

const s3 = shape((s) => {
  return {
    shapeType: 'text',
    x: s.getOption('x'),
    y: s.getOption('y') + s.getOption('h') + 5,
    w: 100,
    h: 45,
    text: 'hello world!'
  };
}, [s2]);

drawFrame(canvas, [hb, title, s2, s3]);

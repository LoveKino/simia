const log = console.log.bind(console); // eslint-disable-line
const {
  attach
} = require('../src/platform');
const {
  drawFrame
} = require('../src/frame');
const {
  shapeExp
} = require('../src/shape');

const canvas = attach(document.getElementById('app'));
const {
  defShape,
  c,
  centerXIn,
  centerYIn,
  under
} = shapeExp();

/*
canvas.addEventListener('click', (e) => {
  const {
    x,
    y
  } = getRelativeCoordinates(e, canvas);
});
*/

const hb = defShape({
  shapeType: 'rect',
  x: 0,
  y: 0,
  w: canvas.w,
  h: 45,
  color: 'blue'
});

const title = defShape({
  shapeType: 'text',
  x: centerXIn(0, 100),
  y: centerYIn(0, 20),
  w: 100,
  h: 20,
  text: 'debug for simia',
  color: 'white'
}, [hb]);

const s2 = defShape({
  shapeType: 'rect',
  x: c('getOption', 0, 'x'),
  y: under(0, 5),
  w: 100,
  h: 45,
  color: 'black'
}, [hb]);

const s3 = defShape({
  shapeType: 'text',
  x: c('getOption', 0, 'x'),
  y: under(0, 5),
  w: 100,
  h: 45,
  text: 'hello world!'
}, [s2]);

drawFrame(canvas, [hb, title, s2, s3]);

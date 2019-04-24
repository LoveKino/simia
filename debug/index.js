const log = console.log.bind(console); // eslint-disable-line
const {
  attach
} = require('../src/platform');

const canvas = attach(document.getElementById('app'));

const {
  getFrame,
  // deserializeFrame,
  shapeUtil
} = require('../src/frame')(canvas);
const {
  defShape,
  centerXIn,
  centerYIn,
  under,
  prop,
  canvasWidth,
  after,
} = shapeUtil;

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
  w: canvasWidth,
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
  x: prop(0, 'x'),
  y: under(0, 5),
  w: 100,
  h: 45,
  color: 'black'
}, [hb]);

const s3 = after(s2, {
  shapeType: 'text',
  w: 100,
  h: 20,
  text: 'hello world!'
});

const frame = getFrame([hb, title, s2, s3]);

frame.draw();

// deserializeFrame(frame.serialize()).draw();

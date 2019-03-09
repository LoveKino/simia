const log = console.log.bind(console); // eslint-disable-line
const {
  attach,
  Frame,
  Shape,
  RectMeasure,
  getRelativeCoordinates,
  renderFrame
} = require('../src');

const {
  rect,
  text,
  image
} = require('../src/draw')();

const {
  fixed
} = require('../src/measure');

const {
  fixedShape,
  row
} = require('../src/layout');

const canvas = attach(document.getElementById('app'));

canvas.addEventListener('click', (e) => {
  const {
    x,
    y
  } = getRelativeCoordinates(e, canvas);
  const shape = frame.getTopShapeAtPoint(x, y);
  if (shape) {
    shape.properties.color = 'red';
    renderFrame(frame, canvas);
  }
});

const frame = new Frame(

  [

    row([
      fixedShape(rect, {
        color: 'green'
      }, 0, 100, 100, 20),

      fixedShape(text, {
        text: 'hello world!'
      }, 0, 10, 30, 30)
    ]),

    new Shape(
      new RectMeasure(fixed(120), fixed(10), fixed(60), fixed(60)),
      image,

      {
        src: './assets/test.png'
      }
    )
  ]
);

renderFrame(frame, canvas);

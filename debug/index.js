const log = console.log.bind(console); // eslint-disable-line

function getRelativeCoordinates(event, element) {
  const position = {
    x: event.pageX,
    y: event.pageY
  };

  const offset = {
    left: element.offsetLeft,
    top: element.offsetTop
  };

  let reference = element.offsetParent;

  while (reference != null) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
  };
}

const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const canvas = document.createElement('canvas');
document.getElementById('app').appendChild(canvas);

const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = w * scale;
canvas.height = h * scale;
canvas.style.width = `${w}px`;
canvas.style.height = `${h}px`;

canvas.addEventListener('click', (e) => {
  log(getRelativeCoordinates(e, canvas));
});

const ctx = canvas.getContext('2d');
// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

const {
  rect,
  text
} = require('../src/draw')();

rect(ctx, 0.0, 10.0, 30.0, 30.0, {
  color: 'red'
});

rect(ctx, 40.0, 10.0, 30.0, 30.0, {
  border: {
    color: 'blue',
    lineWidth: 12.0
  }
});

text(ctx, 'hello world!', 80.0, 10.0, 30.0, 30.0);

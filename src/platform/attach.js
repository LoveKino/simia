const defW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const defH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

function CustomCanvas(oriCanvas, w, h) {
  this.canvas = oriCanvas;
  this.w = w;
  this.h = h;
}

CustomCanvas.prototype.getCtx = function() {
  return this.canvas.getContext('2d');
};

CustomCanvas.prototype.addEventListener = function(type, handler) {
  this.canvas.addEventListener(type, (e) => {
    const {
      x,
      y
    } = getRelativeCoordinates(e, this.canvas);

    handler({
      x,
      y,
      sourceEvt: e
    });
  });
};

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

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
  };
}

module.exports = (node, w = defW, h = defH) => {
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

  return new CustomCanvas(canvas, w, h);
};

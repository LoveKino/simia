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

module.exports = CustomCanvas;

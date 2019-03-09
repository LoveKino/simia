const flatten = (list) => {
  return list.reduce((prev, item) => {
    if (Array.isArray(item)) {
      return prev.concat(flatten(item));
    } else {
      prev.push(item);
      return prev;
    }
  }, []);
};

const isPointInRect = (x0, y0, x, y, w, h) => {
  return x0 >= x && x0 <= x + w && y0 >= y && y0 <= y + h;
};

const isRectsIntersect = (x0, y0, w0, h0, x, y, w, h) => {
  return isIntervalIntersect(x0, x0 + w0, x, x + w) && isIntervalIntersect(y0, y0 + h0, y, y + h);
};

// interval [x0, x1], [x2, x3]
const isIntervalIntersect = (x0, x1, x2, x3) => {
  return !(x1 < x2 || x3 < x0);
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

module.exports = {
  flatten,
  isPointInRect,
  isRectsIntersect,
  isIntervalIntersect,
  getRelativeCoordinates
};

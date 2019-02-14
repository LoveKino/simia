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

module.exports = {
  flatten,
  isPointInRect
};

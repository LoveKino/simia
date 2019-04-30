const {
  defShape,
  centerXIn,
  centerYIn,
  below,
  box,
  canvasWidth,
  after,
} = require('../src/shape').shapeExp;

const header = box(() => {
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

  return [
    hb, title
  ];
});

const content = box(() => {
  return [
    after(below(header, {
      shapeType: 'rect',
      w: 100,
      h: 45,
      color: 'black'
    }), {
      shapeType: 'text',
      w: 100,
      h: 20,
      text: 'hello world!'
    })
  ];
});

module.exports = [header, content];

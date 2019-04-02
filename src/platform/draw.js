const drawRect = (ctx, {
  x,
  y,
  w,
  h,
  color = 'black'
}) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

// lines = [{type, ...}]
const drawPath = (ctx, {
  lines,
  stroke = true,
  fill = false
}) => {
  ctx.beginPath();

  for (let i = 0; i < lines.length; i++) {

    switch (lines[i].type) {
      case 'line':
        //{x1,y1,x2,y2,type}
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
        break;
      case 'arc':
        ctx.arc(lines[i].x, lines[i].y, lines[i].radius, lines[i].startAngle, lines[i].endAngle, lines[i].anticlockwise);
        break;
      case 'arcTo':
        ctx.arcTo(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, lines[i].radius);
        break;
        // TODO
      default:
        throw new Error(`unexpected line type ${lines[i].type}`);
    }
  }

  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
};

const drawText = (ctx, {
  text = '',
  font = '16px serif',
  x,
  y,
  textBaseline = 'top',
  stroke = false,
  fill = true,
  color = 'black'
}) => {
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  if (stroke) {
    ctx.strokeStyle = color;
    ctx.strokeText(text, x, y);
  }
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }
};

const drawImage = (ctx, {
  x,
  y,
  w,
  h,
  src
}) => {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x, y, w, h);
  };
  img.src = src;
};

// clears the specified rectangular area, making it fully transparent
const clearRect = (ctx, {
  x,
  y,
  w,
  h
}) => {
  ctx.clearRect(ctx, x, y, w, h);
};

const draw = (ctx, opts) => {
  switch (opts.shapeType) {
    case 'rect':
      drawRect(ctx, opts);
      break;
    case 'path':
      drawPath(ctx, opts);
      break;
    case 'text':
      drawText(ctx, opts);
      break;
    case 'image':
      drawImage(ctx, opts);
      break;
    case 'clear':
      clearRect(ctx, opts);
      break;
    default:
      throw new Error(`unexpected shape type ${opts.shapeType}`);
  }
};

module.exports = {
  draw
};

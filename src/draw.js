/**
 * drawing shapes with canvas
 *
 * drawing norm:
 *
 *    (ctx, x, y, w, h, options) => void
 */

/**
 * draw a rect in the target area
 *
 * options = {
 *   border: {
 *     color,
 *     lineWidth
 *   },
 *
 *   color
 * }
 */
module.exports = ({
  defaultFont = '16px serif',
  defaultColor = 'rgba(255, 255, 255, 0)',
  defaultTextColor = '#24292e',
  defaultLineWidth = 1.0
} = {}) => {
  const rect = (ctx, x, y, w, h, {
    border = false,
    color = defaultColor
  } = {}) => {
    if (border) {
      const lineWidth = border.lineWidth || defaultLineWidth;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = border.color || defaultColor;

      // TODO safety
      ctx.strokeRect(x + lineWidth / 2, y + lineWidth / 2, w - lineWidth, h - lineWidth);
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  /**
   * options = {
   * text,
   *   color,
   *   lineWidth,
   *   font
   * }
   */
  const text = (ctx, x, y, w, h, {
    text,
    font = defaultFont,
    color = defaultTextColor,
  } = {}) => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'top';
    // TODO what if textLen is bigger than w
    // const textLen = ctx.measureText(str);
    ctx.fillText(text, x, y);
  };

  /**
   * options = {
   * }
   */
  const image = (ctx, x, y, w, h, {
    src
  }) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h);
      // ctx.drawImage(img, x, y);
    };
    img.src = src;
  };

  const clear = (ctx, x, y, w, h) => {
    ctx.clearRect(ctx, x, y, w, h);
  };

  return {
    rect,
    text,
    image,
    clear
  };
};

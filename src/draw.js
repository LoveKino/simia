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
    border,
    color = defaultColor
  }) => {
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
   *   color,
   *   lineWidth,
   *   font
   * }
   */
  const text = (ctx, str, x, y, w, h, {
    font = defaultFont,
    color = defaultTextColor,
  } = {}) => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'top';
    // TODO what if textLen is bigger than w
    // const textLen = ctx.measureText(str);
    ctx.fillText(str, x, y);
  };

  return {
    rect,
    text
  };
};

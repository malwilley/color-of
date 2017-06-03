const Color = require('color');
const diff = require('color-diff');

const colorToRgb = color => ({
  R: color.red(),
  G: color.green(),
  B: color.blue(),
});

const rgbToColor = rgbObj => Color({
  r: rgbObj.R,
  g: rgbObj.G,
  b: rgbObj.B,
});

/**
 * Wrapper for color-diff using Color objects
 * @param {Color} color
 * @param {Color[]} options
 * @returns {Color} closest color of the given options
 */
function getClosestColor(color, options) {
  return rgbToColor(
    diff.closest(
      colorToRgb(color),
      options.map(colorToRgb)));
}

module.exports = {
  colorToRgb,
  rgbToColor,
  getClosestColor,
};

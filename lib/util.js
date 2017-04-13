const Color = require('color');

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

module.exports = {
  colorToRgb,
  rgbToColor,
};

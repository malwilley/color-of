import Color from 'color';
import diff from 'color-diff';

export const colorToRgb = color => ({
  R: color.red(),
  G: color.green(),
  B: color.blue(),
});

export const rgbToColor = rgbObj => Color({
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
export function getClosestColor(color, options) {
  return rgbToColor(
    diff.closest(
      colorToRgb(color),
      options.map(colorToRgb)));
}

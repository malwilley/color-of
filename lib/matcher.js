const diff = require('color-diff');
const util = require('./util');

/**
* Gets the color which appears most in the given array.
* If no color predominates, the highest frequency colors are mixed and the
* color closest to this result is returned.
* @param {Color[]} colors the array of colors to work with
* @returns {Color} the color which appears most frequently
*/
function getHighestFrequencyColor(colors) {
  // Populate array of objects with color and number appearances
  const colorCounts = [];
  let maxCount = 1;
  colors.forEach((color) => {
    const colorCount = colorCounts
      .find(cf => cf.color.hex() === color.hex());
    if (colorCount) {
      colorCount.count += 1;
      if (colorCount.count > maxCount) {
        maxCount = colorCount.count;
      }
    } else {
      colorCounts.push({
        color,
        count: 1,
      });
    }
  });
  const highFreqColors = colorCounts.filter(c => c.count === maxCount);

  // TODO: better process for deciding between multiple colors with same count
  // for now, just take the first one
  return highFreqColors[0].color;
}

/**
* Takes an array of colors corresponding to a term and matches it to the
* closest color of the given options
* @param {Color[]} termColors colors corresponding to a given term
* @param {Color[]} colorOptions options to match the term to
* @returns {Color} Color object for the given term
*/
function matchTermToColor(termColors, colorOptions) {
  // convert both color arrays to {R,G,B} objects for use in color-diff lib
  const optionsRgb = colorOptions.map(util.colorToRgb);
  const termsRgb = termColors.map(util.colorToRgb);

  // match each of the term's color results to the color it is closest to
  const closestColorOptions = termsRgb
    .map(termColor => diff.closest(termColor, optionsRgb))
    .map(util.rgbToColor);

  // find and return the color most highly represented
  return getHighestFrequencyColor(closestColorOptions);
}

module.exports = {
  getHighestFrequencyColor,
  matchTermToColor,
};

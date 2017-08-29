import { getClosestColor } from './util';

/**
* Gets the color which appears most in the given array.
* If no color predominates, the highest frequency colors are mixed and the
* color closest to this result is returned.
* @param {Color[]} colors the array of colors to work with
* @returns {Color} the color which appears most frequently
*/
export function getHighestFrequencyColor(colors) {
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

  // TODO: better process for deciding between multiple colors with same count
  // for now, just take the first one
  return colorCounts.reduce((a, b) => (a.count > b.count ? a : b)).color;
}

/**
* Takes an array of colors corresponding to a term and matches it to the
* closest color of the given options
* @param {Color[]} termColors colors corresponding to a given term
* @param {Color[]} palette options to match the term to
* @returns {Color} Color object for the given term
*/
export function matchTermToColor(termColors, palette) {
  // convert each term color to the closest palette color
  const termPaletteColors = termColors
    .map(c => getClosestColor(c, palette));

  // find and return the color most highly represented
  return getHighestFrequencyColor(termPaletteColors);
}

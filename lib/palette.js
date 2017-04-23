const Color = require('color');

/**
* Gets an array of colors containing all combinations of the given hsl values
* @param {number[]} hues hue values (0-360)
* @param {number[]} sats saturation values (0-100)
* @param {number[]} lights lightness values (0-100)
* @returns {Color[]} array of Color objects of all h/s/l combinations
*/
const getColorOptions = (hues, sats, lights) => {
  const colors = [];
  hues.forEach((h) => {
    sats.forEach((s) => {
      lights.forEach((l) => {
        colors.push(Color({ h, s, l }));
      });
    });
  });
  return colors;
};

/**
* Gets values evenly spaced between 0 and maxValue
* @param {number} numVals number of values to return
* @param {number} maxVal maximum value to return values between
* @returns {number[]} the array of values
*/
const getEvenlySpacedValues = (numVals, maxVal) => {
  const step = maxVal / numVals;
  const halfstep = step / 2;
  return [...Array(numVals).keys()]
    .map(i => Math.round((i * step) + halfstep));
};

/**
* Creates the default palette
* @ returns {Color[]} an array of Color objects evenly spaced in the hue,
*                     saturation, and lightness dimensions
*/
const createDefaultPalette = () => {
  // get 144 colors (36 hue, 2 saturation 2 lightness values)
  getColorOptions(
    getEvenlySpacedValues(36, 360),
    [60, 80],
    [40, 60])
    // add black/white
  .concat([{ h: 0, s: 0, l: 20 }, { h: 0, s: 0, l: 80 }].map(hsl => Color(hsl)));
};

module.exports = {
  getColorOptions,
  getEvenlySpacedValues,
  createDefaultPalette,
};

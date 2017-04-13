const Color = require('color');
const diff = require('color-diff');
const getBingApi = require('node-bing-api');

/**
* Fetches the primary colors used in images returned by the given search query
* @param {string} query the query to get colors for
* @param {count} count the number of image results to get colors for (max 50)
* @returns {Promise<Color[]>} promise which resolves to an array of Colors
*/
function fetchQueryColors(bingApi, query, count = 50) {
  return new Promise((resolve, reject) => {
    bingApi.images(query, {
      count,
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      const results = body.value;
      const accents = results
        .map(r => r.accentColor)
        .map(a => Color(`#${a}`));
      // console.log(`${query}: ${accents}`);
      resolve(accents);
    });
  });
}

/**
* Gets an array of colors containing all combinations of the given hsl values
* @param {number[]} hues hue values (0-360)
* @param {number[]} sats saturation values (0-100)
* @param {number[]} lights lightness values (0-100)
* @returns {Color[]} array of Color objects of all h/s/l combinations
*/
function getColorOptions(hues, sats, lights) {
  const colors = [];
  hues.forEach((h) => {
    sats.forEach((s) => {
      lights.forEach((l) => {
        colors.push(Color({ h, s, l }));
      });
    });
  });
  // console.log(`Options: ${colors}`);
  return colors;
}

/**
* Gets values evenly spaced between 0 and maxValue
* @param {number} numVals number of values to return
* @param {number} maxVal maximum value to return values between
* @returns {number[]} the array of values
*/
function getEvenlySpacedValues(numVals, maxVal) {
  const step = maxVal / numVals;
  const halfstep = step / 2;
  return [...Array(numVals).keys()]
    .map(i => Math.round((i * step) + halfstep));
}

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
  let maxCount = 0;
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
  console.log(`Colors: ${colorCounts.map(c => c.color.hex())}`);
  console.log(`Counts: ${colorCounts.map(c => c.count)}`);
  const highFreqColors = colorCounts.filter(c => c.count === maxCount);

  // TODO: if multiple entries in array, do averaging

  return highFreqColors[0].color;
}

function colorToRgb(color) {
  return {
    R: color.red(),
    G: color.green(),
    B: color.blue(),
  };
}

function rgbToColor(rgbObj) {
  return Color({
    r: rgbObj.R,
    g: rgbObj.G,
    b: rgbObj.B,
  });
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
  const optionsRgb = colorOptions.map(colorToRgb);
  const termsRgb = termColors.map(colorToRgb);

  // match each of the term's color results to the color it is closest to
  const closestColorOptions = termsRgb
    .map(termColor => diff.closest(termColor, optionsRgb))
    .map(rgbToColor);

  // find and return the color most highly represented
  return getHighestFrequencyColor(closestColorOptions);
}

const ColorClassifier = {
  classify: (term, options) => {
    if (!term || (typeof term !== 'string') || term.length === 0) {
      throw new Error('Must provide a valid search term string');
    }
    if (!options) {
      throw new Error('Must provide an options object');
    }
    if (!options.bingApiKey) {
      throw new Error('Must provide a Bing search API string');
    }

    const bingApi = getBingApi({ accKey: options.bingApiKey });
    const numResults = options.numResults || 50;
    const pallette = options.pallette || getColorOptions(
      getEvenlySpacedValues(36, 360),
      [60, 80],
      [40, 60]);

    return fetchQueryColors(bingApi, term, numResults)
      .then(colors => matchTermToColor(colors, pallette));
  },
};

module.exports = ColorClassifier;

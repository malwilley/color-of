const bing = require('node-bing-api')({ accKey: '' });
const Color = require('color');

/**
* Fetches the primary colors used in images returned by the given search query
* @param {string} query the query to get colors for
* @param {count} count the number of image results to get colors for (max 50)
* @returns {Promise<Color[]>} promise which resolves to an array of Colors
*/
function fetchQueryColors(query, count = 50) {
  return new Promise((resolve, reject) => {
    bing.images(query, {
      count,
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
      const results = body.value;
      const accents = results
        .map(r => r.accentColor)
        .map(a => Color(a));
      resolve(accents);
    });
  });
}

/**
* Gets an array of colors containing all combinations of the given hsl values
* @param {number[]} hues hue values (0-255)
* @param {number[]} sats saturation values (0-255)
* @param {number[]} lights lightness values (0-255)
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
  return colors;
}

/**
* Gets values evenly spaced between 0 and 255
* @param {number} num number of values to return
* @returns {number[]} the array of values
*/
function getEvenlySpacedHslValues(num) {
  const step = 255 / num;
  const halfstep = step / 2;
  return [...Array(num).keys()]
    .map(i => Math.round((i * step) + halfstep));
}

function indexOfMin(arr) {
  if (arr.length === 0) {
    return -1;
  }
  let min = arr[0];
  let minIndex = 0;
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < min) {
      min = arr[i];
      minIndex = i;
    }
  }
  return minIndex;
}

/**
* Takes an array of colors corresponding to a term and matches it to the
* closest color of the given options
* @param {number[][]} termColors HSL colors corresponding to a given term
* @param {ColorBin[]} colorOptions options to match the term to
* @returns {number[]} HSL color for the given term
*/
function matchTermToColor(termColors, colorOptions) {

}

const queries = ['chocolate', 'grape juice', 'strawberry', 'banana'];
Promise.all(queries.map(q => fetchQueryColors(q)))
.then((colors) => {
  const bins = getColorBins(20);
  const ret = colors.map(c => matchTermToColor(c, bins));
  console.log(ret);
});

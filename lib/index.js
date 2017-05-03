const Color = require('color');
const fetchImageUrls = require('./bing').fetchImageUrls;
const matchTermToColor = require('./matcher').matchTermToColor;
const getImageColor = require('./imageColor').getImageColor;
const palettes = require('./palettes');

/**
* Parses the user-defined entry in options.palette
*/
function parsePalette(palette) {
  if (!palette) {
    return palettes.MATERIAL;
  }
  if (typeof palette === 'string') {
    if (palette.toUpperCase() === 'MATERIAL') {
      return palettes.MATERIAL;
    } else if (palette.toUpperCase() === 'W3C') {
      return palettes.W3C;
    }
    throw new Error('options.palette string must be "material" or "w3c"');
  }
  if (!Array.isArray(palette)) {
    throw new Error('options.palette must be an array of colors or a palette name');
  }
  if (palette.length < 1) {
    throw new Error('options.palette array cannot be empty');
  }
  return palette;
}

/**
* Main API function
* @param {string} term the search term to find the color of
* @param {object} options the options object, see readme for details
* @returns {Color} a color object most representative of the given term
*/
function colorOf(term, options) {
  if (!term || (typeof term !== 'string') || term.length === 0) {
    throw new Error('Must provide a valid search term string');
  }
  if (!options) {
    throw new Error('Must provide an options object');
  }
  if (!options.bingApiKey) {
    throw new Error('Must provide a Bing search API string');
  }

  const numResults = options.numResults || 50;
  const palette = parsePalette(options.palette).map(c => Color(c));

  return fetchImageUrls(options.bingApiKey, term, numResults)
      .then(imageUrls => Promise.all(imageUrls.map(getImageColor)))
      .then(colors => matchTermToColor(colors, palette))
      .catch(err => console.log(err)); // eslint-disable-line
}

colorOf.palettes = palettes;

module.exports = colorOf;

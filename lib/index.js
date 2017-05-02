const Color = require('color');
const fetchImageUrls = require('./bing').fetchImageUrls;
const createDefaultPalette = require('./palette').createDefaultPalette;
const matchTermToColor = require('./matcher').matchTermToColor;
const getImageColor = require('./imageColor').getImageColor;

const colorOf = (term, options) => {
  if (!term || (typeof term !== 'string') || term.length === 0) {
    throw new Error('Must provide a valid search term string');
  }
  if (!options) {
    throw new Error('Must provide an options object');
  }
  if (!options.bingApiKey) {
    throw new Error('Must provide a Bing search API string');
  }
  if (options.palette) {
    if (!Array.isArray(options.palette)) {
      throw new Error('options.palette must be an array of colors');
    } else if (options.palette.length < 1) {
      throw new Error('options.palette array cannot be empty');
    }
  }

  const numResults = options.numResults || 50;
  const palette = options.palette ? options.palette.map(c => Color(c))
      : createDefaultPalette();

  return fetchImageUrls(options.bingApiKey, term, numResults)
      .then(imageUrls => Promise.all(imageUrls.map(getImageColor)))
      .then(colors => matchTermToColor(colors, palette));
};

module.exports = colorOf;

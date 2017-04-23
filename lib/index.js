const Color = require('color');
const fetchQueryColors = require('./bing').fetchQueryColors;
const createDefaultPalette = require('./palette').createDefaultPalette;
const matchTermToColor = require('./matcher').matchTermToColor;

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
  if (options.pallette) {
    if (Array.isArray(options.pallette)) {
      throw new Error('options.pallette must be an array of colors');
    } else if (options.pallette.length < 1) {
      throw new Error('options.pallette array cannot be empty');
    }
  }

  const numResults = options.numResults || 50;
  const palette = options.palette ? options.palette.map(c => Color(c))
      : createDefaultPalette();

  return fetchQueryColors(options.bingApiKey, term, numResults)
      .then(colors => matchTermToColor(colors, palette));
};

module.exports = colorOf;

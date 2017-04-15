const fetchQueryColors = require('./bing').fetchQueryColors;
const createDefaultPalette = require('./palette').createDefaultPalette;
const matchTermToColor = require('./matcher').matchTermToColor;

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

    const numResults = options.numResults || 50;
    const palette = options.palette || createDefaultPalette();

    return fetchQueryColors(options.bingApiKey, term, numResults)
      .then(colors => matchTermToColor(colors, palette));
  },
};

module.exports = ColorClassifier;

import Color from 'color';
import bingFetchImageUrls from './bing';
import googleFetchImageUrls from './google';
import { matchTermToColor } from './matcher';
import requestImageColor from './requestImageColor';
import palettes from './palettes/palette';

/**
* Parses the user-defined entry in options.palette
*/
function parsePalette(palette) {
  if (typeof palette === 'string') {
    if (palette.toUpperCase() === 'MATERIAL') {
      return palettes.MATERIAL;
    } else if (palette.toUpperCase() === 'W3C') {
      return palettes.W3C;
    } else if (palette.toUpperCase() === 'CSS') {
      return palettes.CSS;
    }
    throw new Error('options.palette string must be "material", "w3c", or "css"');
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
 * Returns the fetchImageUrls promise for either bing or google depending on the
 * provided options
 * @param {string} term user-defined search term
 * @param {object} options user-defined options containing bing/google keys
 * @returns {Promise<string[]>} resolves to an array of image urls
 */
function fetchImageUrls(term, options) {
  if (options.bingApiKey) {
    return bingFetchImageUrls(options.bingApiKey, term, options.numResults);
  }
  if (options.googleCseId && options.googleApiKey) {
    return googleFetchImageUrls(options.googleCseId, options.googleApiKey, term, options.numResults);
  }
  throw new Error('Options object must contain either bingApiKey or both googleCseId and googleApiKey');
}

/**
 * Validates and merges the user-defined options with library defaults
 * @param {object} options user-defined options object
 * @return {object} merged options object
 */
function mergeOptions(options) {
  if (!options) {
    throw new Error('Must provide an options object');
  }

  // merge user-defined options object with defaults
  return Object.assign({}, {
    numResults: 50,
    palette: 'material',
  }, options);
}

/**
* Main API function
* @param {string} term the search term to find the color of
* @param {object} options the options object, see readme for details
* @returns {Color} a color object most representative of the given term
*/
export default function colorOf(term, options) {
  if (!term || (typeof term !== 'string') || term.length === 0) {
    throw new Error('Must provide a valid search term string');
  }

  const mergedOptions = mergeOptions(options);

  // parse and create color objects from defined palette
  const palette = parsePalette(mergedOptions.palette).map(c => Color(c));

  return fetchImageUrls(term, mergedOptions)
    .then(imageUrls => Promise.all(imageUrls.map(requestImageColor)))
    .then(colors => matchTermToColor(colors, palette))
    .catch(err => console.log(err)); // eslint-disable-line
}

/**
 * Export the palettes as well if users want to modify them
 */
export const PALETTES = palettes;

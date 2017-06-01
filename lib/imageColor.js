const request = require('request');
const Color = require('color');
const Vibrant = require('node-vibrant');

/**
* Takes a palette and returns the color of the Swatch with the greatest
* population.
* @param {Palette} palette a Palette object from the Vibrant.js library
* @returns {Color} the color of the Swatch with the greatest population
*/
function getBestSwatchColor(palette) {
  const colorKey = Object.keys(palette).reduce((a, b) => {
    if (!palette[a]) { // swatches can sometimes be null
      return b;
    } else if (!palette[b]) {
      return a;
    }
    return palette[a].getPopulation() > palette[b].getPopulation() ? a : b;
  });
  return Color(palette[colorKey].getRgb());
}

/**
 * Requests the buffer for a given image URL
 * @param {string} imgUrl the url to the image
 * @returns {Promise<Buffer>} the image buffer
 */
function requestImageBuffer(imgUrl) {
  return new Promise((resolve, reject) => {
    request(imgUrl, { encoding: null }, (err, resp, body) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
}

/**
* Gets the dominant color of the given image url. Downloads the file to a
* temporary location and uses Vibrant.js to determine the best color.
* @param {string} imgUrl the url to the image
* @returns {Promise<Color>} promise which resolves to the dominant color
*/
function requestImageColor(imgUrl) {
  return requestImageBuffer(imgUrl)
    .then(buffer => Vibrant.from(buffer).getPalette())
    .then(palette => getBestSwatchColor(palette));
}

module.exports = {
  requestImageColor,
};

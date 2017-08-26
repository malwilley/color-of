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
* Gets the dominant color of the given image url. Downloads the file
* and uses Vibrant.js to determine the best color.
* @param {string} imgUrl the url to the image
* @returns {Promise<Color>} promise which resolves to the dominant color
*/
function requestImageColor(imgUrl) {
  return Vibrant.from(imgUrl).getPalette()
    .then(getBestSwatchColor);
}

module.exports = {
  requestImageColor,
};

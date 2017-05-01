const fs = require('fs');
const tmp = require('tmp');
const request = require('request');
const Color = require('color');
const Vibrant = require('node-vibrant');

/**
* Takes a palette and returns the color of the Swatch with the greatest
* population.
* @param {Palette} palette a Palette object from the Vibrant.js library
* @returns {Color} the color of the Swatch with the greatest population
*/
const getBestSwatchColor = (palette) => {
  const colorKey = Object.keys(palette).reduce((a, b) => {
    if (!palette[a]) { // swatches can sometimes be null
      return b;
    } else if (!palette[b]) {
      return a;
    }
    return palette[a].getPopulation() > palette[b].getPopulation() ? a : b;
  });
  return Color(palette[colorKey].getRgb());
};

/**
* Gets the dominant color of the given image url. Downloads the file to a
* temporary location and uses Vibrant.js to determine the best color.
* @param {string} imgUrl the url to the image
* @returns {Promise<Color>} promise which resolves to the dominant color
*/
function getImageColor(imgUrl) {
  return new Promise((resolve, reject) => {
    tmp.file((err, path, fd) => {
      if (err) {
        return reject(err.message);
      }
      request(imgUrl)
      .pipe(fs.createWriteStream(null, { fd }))
      .on('finish', () => {
        Vibrant.from(path)
          .getPalette()
          .then(palette => resolve(getBestSwatchColor(palette)));
      })
      .on('error', e => reject(e.message));
    });
  });
}

module.exports = {
  getImageColor,
};

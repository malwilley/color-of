const fs = require('fs');
const tmp = require('tmp');
const request = require('request');
const dc = require('dominant-color');
const Color = require('color');

/**
* Gets the dominant color of the given image url
*
*/
const getImageColor = imgUrl => new Promise((resolve, reject) => {
  tmp.file((err, path, fd) => {
    if (err) {
      reject(err);
      return;
    }
    request(imgUrl)
    .pipe(fs.createWriteStream(null, { fd }))
    .on('finish', () => {
      dc(path, (e, hex) => {
        if (e) {
          reject(e.message);
          return;
        }
        resolve(Color(`#${hex}`));
      });
    });
  });
});

module.exports = {
  getImageColor,
};

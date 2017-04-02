const bing = require('node-bing-api')({ accKey: 'insert key here' });
const convert = require('color-convert');

// Returns an array of HSL values for the images corresponding to the given query
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
        .map(a => a.accentColor)
        .map(a => convert.hex.hsl(a));
      resolve(accents);
    });
  });
}

// returns an array of color bins with constant saturation/lightness but
// variable hue
function getColorBins(numBins) {
  const step = 255 / numBins;
  const halfstep = step / 2;
  return [...Array(numBins).keys()]
    .map(i => ({
      hue: Math.round((i * step) + halfstep),
      saturation: 150,
      lightness: 150,
      count: 0,
    }));
}

const queries = ['chocolate', 'grape juice'];
Promise.all(queries.map(q => fetchQueryColors(q, 1))).then((colors) => {
  console.log(colors);
});

console.log(getColorBins(3));

// populate bins with n accent color results

// assign bin with largest number

const getBingApi = require('node-bing-api');
const Color = require('color');

/**
* Fetches the primary colors used in images returned by the given search query
* @param {string} bingApiKey the Microsfot Cognitive Services search API key
* @param {string} query the query to get colors for
* @param {count} count the number of image results to get colors for (max 50)
* @returns {Promise<Color[]>} promise which resolves to an array of Colors
*/
const fetchQueryColors = (bingApiKey, query, count = 50) => new Promise((resolve, reject) => {
  const bingApi = getBingApi({ accKey: bingApiKey });
  bingApi.images(query, {
    count,
  }, (err, res, body) => {
    if (err) {
      reject(err);
      return;
    }
    const results = body.value;
    const accents = results
        .map(r => r.accentColor)
        .map(a => Color(`#${a}`));
    resolve(accents);
  });
});

module.exports = {
  fetchQueryColors,
};

const getBingApi = require('node-bing-api');

/**
* Fetches the primary colors used in images returned by the given search query
* @param {string} bingApiKey the Microsfot Cognitive Services search API key
* @param {string} query the query to get colors for
* @param {count} count the number of image results to get colors for (max 50)
* @returns {Promise<Color[]>} promise which resolves to an array of Colors
*/
const fetchImageUrls = (bingApiKey, query, count = 50) => new Promise((resolve, reject) => {
  const bingApi = getBingApi({ accKey: bingApiKey });
  if (count > 50 || count < 1) {
    reject('count must be between 1 and 50');
    return;
  }
  bingApi.images(query, { count }, (err, res, body) => {
    if (err) {
      reject(err);
      return;
    }
    const results = body.value;
    const urls = results.map(r => r.thumbnailUrl);
    resolve(urls);
  });
});

module.exports = {
  fetchImageUrls,
};

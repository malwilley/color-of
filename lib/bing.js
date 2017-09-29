import { request } from 'popsicle';

/**
 * Executes the api request with the given query, key, and number of results
 * @param {string} bingApiKey
 * @param {string} query
 * @param {number} count
 * @returns {Request} returns a popsicle Request object containing bing results on success
 */
function searchBingImages(bingApiKey, query, count) {
  return request({
    method: 'GET',
    url: `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${query}&count=${count}`,
    headers: {
      'Ocp-Apim-Subscription-Key': bingApiKey,
    },
  });
}

/**
* Uses the Cognitive Services search API to fetch image urls returned by the
* given search query
* @param {string} bingApiKey the Microsoft Cognitive Services search API key
* @param {string} query the query to get colors for
* @param {count} count the number of image results to get colors for (max 50)
* @returns {Promise<string[]>} promise which resolves to an array of image urls
*/
export default function fetchImageUrls(bingApiKey, query, count = 50) {
  if (count > 50 || count < 1) {
    throw new Error('count must be between 1 and 50');
  }

  return searchBingImages(bingApiKey, query, count)
    .then((res) => {
      const body = JSON.parse(res.body);
      const results = body.value;
      if (!Array.isArray(results)) {
        throw new Error('Invalid Bing Web Search API response');
      }
      return results.map(r => r.thumbnailUrl);
    });
}

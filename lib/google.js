import GoogleImages from 'google-images';

const RESULTS_PER_PAGE = 10;

/**
 * Creates an array of google search promises, one for each page request
 * @param {string} cseId valid Google custom search engine ID
 * @param {string} apiKey valid Google API key
 * @param {string} query query to search on
 * @param {number} count number of image url results to return
 * @returns {Promise[]} array of promises that resolve to google results by page
 */
function createSearchPromises(cseId, apiKey, query, count) {
  const client = new GoogleImages(cseId, apiKey);

  // define google search options
  const opts = {
    colorType: 'color',
    type: 'photo',
  };

  // determine number of pages needed
  const numPages = Math.ceil(count / RESULTS_PER_PAGE);

  return Array(numPages).fill().map((val, i) => i + 1) // [1,2,...,N] page numbers
    .map(n => client.search(query, Object.assign(opts, { page: n })));
}

/**
 * Uses Google custom search engine API to fetch image urls returned by the
 * given search query
 * @param {string} cseId valid Google custom search engine ID
 * @param {string} apiKey valid Google API key
 * @param {string} query query to search on
 * @param {number} count number of image url results to return
 * @returns {Promise<string[]>} promise which resolves to an array of image urls
 */
export default function fetchImageUrls(cseId, apiKey, query, count) {
  return new Promise((resolve, reject) => {
    if (count < 1) {
      reject('count must be >= 1');
      return;
    }

    // resolve all promises at once, prune results, and resolve.
    // does preserve ordering of search results
    Promise.all(createSearchPromises(cseId, apiKey, query, count))
    .then((images) => {
      resolve(
        images
        .reduce((acc, arr) => acc.concat(arr)) // flatten
        .slice(0, count) // trim off extra results
        .map(i => i.thumbnail.url));
    });
  });
}

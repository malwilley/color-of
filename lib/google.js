import GoogleImages from 'google-images';

const RESULTS_PER_PAGE = 10;

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
    const client = new GoogleImages(cseId, apiKey);

    if (count < 1) {
      reject('count must be > 1');
      return;
    }

    // define google search options
    const opts = {
      colorType: 'color',
      type: 'photo',
    };

    // determine number of pages needed
    const numPages = Math.ceil(count / RESULTS_PER_PAGE);

    // get array of all image search promises
    const promises =
      [...Array(numPages + 1).fill().keys()].slice(1) // [1,2,...,N] page numbers
      .map(n => client.search(query, Object.assign(opts, { page: n })));

    // resolve all promises at once, prune results, and resolve.
    // does preserve ordering of search results
    Promise.all(promises)
    .then((images) => {
      resolve(
        images
        .reduce((acc, arr) => acc.concat(arr)) // flatten
        .slice(0, count) // trim off extra results
        .map(i => i.thumbnail.url));
    });
  });
}

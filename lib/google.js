const GoogleImages = require('google-images');

function fetchImageUrls(cseId, apiKey, query, count = 50) {
  return new Promise((resolve) => {
    const client = new GoogleImages(cseId, apiKey);

    // define google search options
    const opts = {
      colorType: 'color',
      type: 'photo',
    };

    // determine number of pages needed (10 results per page)
    const numPages = Math.ceil(count / 10);

    // get number of extra results to trim off from the end
    const extraResults = 10 - (count % 10);

    // get array of all image search promises
    const promises =
      [...Array(numPages + 1).keys()].slice(1) // [1,2,...,N] page numbers
      .map(n => client.search(query, Object.assign(opts, { page: n })));

    // resolve all promises at once, prune results, and resolve.
    // does preserve ordering of search results
    Promise.all(promises)
    .then((images) => {
      resolve(
        images
        .reduce((acc, arr) => acc.concat(arr)) // flatten
        .slice(-extraResults) // remove extra entries from end
        .map(i => i.thumbnail.url),
      );
    });
  });
}

module.exports = {
  fetchImageUrls,
};

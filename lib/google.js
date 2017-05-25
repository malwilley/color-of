const GoogleImages = require('google-images');

function fetchImageUrls(cseId, apiKey, query, count = 50) {
  return new Promise((resolve) => {
    const client = new GoogleImages(cseId, apiKey);
    client.search(query)
    .then((images) => {
      const thumbnailUrls = images.map(i => i.thumbnail.url);
      resolve(thumbnailUrls);
    });
  });
}

module.exports = {
  fetchImageUrls,
};

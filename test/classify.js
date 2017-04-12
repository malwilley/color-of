let bingApiKey;

try {
  bingApiKey = require('./secret').bingApiKey; // eslint-disable-line global-require
} catch (e) {
  throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
}

const classifier = require('../src/index.js');

const options = {
  bingApiKey,
};

classifier.classify('Cherry', options)
.then((color) => {
  console.log(`Term color: ${color}`);
})
.catch((err) => {
  console.error(err);
});

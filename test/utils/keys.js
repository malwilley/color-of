function getBingApiKey() {
  try {
    return require('../inputs/secret').bingApiKey; // eslint-disable-line global-require
  } catch (e) {
    throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
  }
}

module.exports = {
  getBingApiKey,
};

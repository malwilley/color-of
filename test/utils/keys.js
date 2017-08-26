function getSecretKeys() {
  try {
    const secret = require('../inputs/secret'); // eslint-disable-line global-require
    return {
      bingApiKey: secret.bingApiKey,
      google: {
        cseId: secret.google.cseId,
        apiKey: secret.google.apiKey,
      },
    };
  } catch (e) {
    throw new Error('Must include a test/inputs/secret.js file that includes all api keys');
  }
}

module.exports = {
  getSecretKeys,
};

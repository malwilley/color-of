/* const google = require('../lib/google');
const secret = require('./utils/keys').getSecretKeys();

describe('google', () => {
  describe('#fetchImageUrls()', () => {
    it('should return an array with [count] image urls', () => {
      const count = 11;
      return google.fetchImageUrls(secret.google.cseId, secret.google.apiKey, 'query', count)
        .should.eventually.be.an.instanceOf(Array).and.have.lengthOf(count);
    });
    it('should reject invalid search query counts', () => {
      const promise = google.fetchImageUrls(secret.google.cseId, secret.google.apiKey, 'query', -1);
      return promise.should.be.rejected();
    });
  });
});
*/

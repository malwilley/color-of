/* require('mocha-testcheck').install();
require('should');
const bing = require('../lib/bing');
const bingApiKey = require('./utils/keys').getSecretKeys().bingApiKey;

describe('bing', () => {
  describe('#fetchImageUrls()', () => {
    it('should return an array with [count] image urls', () => {
      const count = 27;
      return bing.fetchImageUrls(bingApiKey, 'query', count)
        .should.eventually.be.instanceOf(Array).and.have.lengthOf(count);
    });
    it('should reject invalid search query counts', () => {
      const promise = bing.fetchImageUrls(bingApiKey, 'query', -1);
      return promise.should.be.rejected();
    });
  });
});
*/

require('mocha-testcheck').install();
require('should');
const bing = require('../lib/bing');

let bingApiKey;
try {
  bingApiKey = require('./secret').bingApiKey; // eslint-disable-line global-require
} catch (e) {
  throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
}

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

/* eslint-env node, mocha */

let bingApiKey;

try {
  bingApiKey = require('./secret').bingApiKey; // eslint-disable-line global-require
} catch (e) {
  throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
}

const classifier = require('../lib/index.js');
const should = require('should');

const options = {
  bingApiKey,
};

describe('classifier', () => {
  describe('#classify()', () => {
    it('should throw when no parameters are provided', () => {
      (() => classifier.classify()).should.throw();
    });
    it('should throw when no options are provided', () => {
      (() => classifier.classify('term')).should.throw();
    });
    it('should throw when no bing api key is provided', () => {
      (() => classifier.classify('term', {})).should.throw();
    });
    it('should throw when term is not a string', () => {
      (() => classifier.classify(1, options)).should.throw();
      (() => classifier.classify({}, options)).should.throw();
      (() => classifier.classify(true, options)).should.throw();
      (() => classifier.classify(undefined, options)).should.throw();
      (() => classifier.classify(null, options)).should.throw();
      (() => classifier.classify(Symbol(''), options)).should.throw();
    });
    it('should throw when term is an empty string', () => {
      (() => classifier.classify('', options)).should.throw();
    });
  });
});

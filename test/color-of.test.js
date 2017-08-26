const colorOf = require('../lib/index');

require('mocha-testcheck').install();
require('should');
const secret = require('./utils/keys').getSecretKeys();

describe('main', () => {
  describe('#colorOf()', () => {
    const options = {
      bingApiKey: secret.bingApiKey,
      palette: ['red', 'green', 'blue', 'yellow', 'orange', 'purple'],
    };
    it('should throw when no parameters are provided', () => {
      (() => colorOf()).should.throw();
    });
    it('should throw when no options are provided', () => {
      (() => colorOf('term')).should.throw();
    });
    it('should throw when no bing api key is provided', () => {
      (() => colorOf('term', {})).should.throw();
    });
    it('should throw when term is not a string', () => {
      (() => colorOf(1, options)).should.throw();
      (() => colorOf({}, options)).should.throw();
      (() => colorOf(true, options)).should.throw();
      (() => colorOf(undefined, options)).should.throw();
      (() => colorOf(null, options)).should.throw();
      (() => colorOf(Symbol(''), options)).should.throw();
    });
    it('should throw when term is an empty string', () => {
      (() => colorOf('', options)).should.throw();
    });
  });
});

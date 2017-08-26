const colorOf = require('../lib/index');

require('mocha-testcheck').install();
require('should');
const secret = require('./utils/keys').getSecretKeys();

function assertColorOf(options) {
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
}

describe('main', () => {
  describe('#colorOf()', () => {
    const palette = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    const optionsBing = {
      bingApiKey: secret.bingApiKey,
      palette,
    };
    const optionsGoogle = {
      googleCseId: secret.google.cseId,
      googleApiKey: secret.google.apiKey,
      palette,
    };

    it('should throw when no parameters are provided', () => {
      (() => colorOf()).should.throw();
    });
    it('should throw when no options are provided', () => {
      (() => colorOf('term')).should.throw();
    });
    it('should throw when no api key is provided', () => {
      (() => colorOf('term', {})).should.throw();
    });

    assertColorOf(optionsBing);
    assertColorOf(optionsGoogle);
  });
});

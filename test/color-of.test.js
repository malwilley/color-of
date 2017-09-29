import Color from 'color';
import colorOf from '..';

require('mocha-testcheck').install();
require('should');
const secret = require('./utils/keys').getSecretKeys();

function assertColorOf(providerName, options) {
  it(`should throw when term is not a string [${providerName}]`, () => {
    (() => colorOf(1, options)).should.throw();
    (() => colorOf({}, options)).should.throw();
    (() => colorOf(true, options)).should.throw();
    (() => colorOf(undefined, options)).should.throw();
    (() => colorOf(null, options)).should.throw();
    (() => colorOf(Symbol(''), options)).should.throw();
  });
  it(`should throw when term is an empty string [${providerName}]`, () => {
    (() => colorOf('', options)).should.throw();
  });
  it(`should get yellow for banana [${providerName}]`, (done) => {
    colorOf('banana', options)
      .then((color) => {
        color.should.be.an.instanceOf(Color);
        color.hex().should.be.exactly('#FFFF00');
        done();
      })
      .catch(error => done(error));
  }).timeout(10000);
}

describe('main', () => {
  describe('#colorOf()', () => {
    const palette = ['red', 'green', 'blue', 'yellow', 'black', 'white'];
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

    assertColorOf('bing', optionsBing);
    assertColorOf('google', optionsGoogle);
  });
});

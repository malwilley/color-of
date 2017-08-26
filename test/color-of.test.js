const colorOf = require('../lib/index');
const bing = require('../lib/bing');
const google = require('../lib/google');
const matcher = require('../lib/matcher');
const imageColor = require('../lib/imageColor');
const Color = require('color');
const util = require('../lib/util');

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

describe('bing', () => {
  describe('#fetchImageUrls()', () => {
    it('should return an array with [count] image urls', () => {
      const count = 27;
      bing.fetchImageUrls(secret.bingApiKey, 'query', count)
      .should.eventually.be.instanceOf(Array).and.have.lengthOf(count);
    });
    it('should reject invalid search query counts', () => {
      bing.fetchImageUrls(secret.bingApiKey, 'query', -1).should.be.rejected();
      bing.fetchImageUrls(secret.bingApiKey, 'query', 51).should.be.rejected();
    });
  });
});

describe('google', () => {
  describe('#fetchImageUrls()', () => {
    it('should return an array with [count] image urls', () => {
      const count = 25;
      google.fetchImageUrls(secret.google.cseId, secret.google.apiKey, 'query', count);
    });
  });
});

describe('util', () => {
  describe('#colorToRgb()', () => {
    it('should return an object with correct RGB values', () => {
      const color = new Color('#FFFFFF');
      const rgb = util.colorToRgb(color);
      rgb.should.have.property('R').which.is.exactly(255);
      rgb.should.have.property('G').which.is.exactly(255);
      rgb.should.have.property('B').which.is.exactly(255);
    });
  });
  describe('#rgbToColor()', () => {
    it('should return the correct Color object', () => {
      const rgb = { R: 255, G: 255, B: 255 };
      const color = util.rgbToColor(rgb);
      color.should.be.an.instanceOf(Color);
      color.hex().should.be.exactly('#FFFFFF');
    });
  });
});

describe('matcher', () => {
  describe('#getHighestFrequencyColor()', () => {
    const colors = ['#000000', '#111111', '#111111', '#222222']
      .map(c => Color(c));
    it('should return the highest frequency color', () => {
      matcher.getHighestFrequencyColor(colors).hex().should.be.exactly('#111111');
    });
  });
});

describe('imageColor', () => {
  describe('#getImageColor()', () => {
    it('should resolve to a color', () => {
      imageColor.requestImageColor('https://tse4.mm.bing.net/th?id=OIP.wCXthFqx7rTL4D0F-h29mQEzDL&pid=Api')
      .should.not.be.rejected()
      .should.eventually.be.an.instanceOf(Color);
    });
  });
});

let bingApiKey;

try {
  bingApiKey = require('./secret').bingApiKey; // eslint-disable-line global-require
} catch (e) {
  throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
}

const colorOf = require('../lib/index');
const bing = require('../lib/bing');
const matcher = require('../lib/matcher');
const palette = require('../lib/palette');
const download = require('../lib/imageColor');
const Color = require('color');
const util = require('../lib/util');

require('mocha-testcheck').install();
require('should');

describe('main', () => {
  describe('#colorOf()', () => {
    const options = {
      bingApiKey,
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
      bing.fetchImageUrls(bingApiKey, 'query', count)
      .should.eventually.be.instanceOf(Array).and.have.lengthOf(count);
    });
    it('should reject invalid search query counts', () => {
      bing.fetchImageUrls(bingApiKey, 'query', -1).should.be.rejected();
      bing.fetchImageUrls(bingApiKey, 'query', 51).should.be.rejected();
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

describe('palette', () => {
  describe('#createDefaultPalette()', () => {
    const colors = palette.createDefaultPalette();
    it('should return an array of 146 color objects', () => {
      colors.should.be.instanceOf(Array).and.have.lengthOf(146);
      colors.forEach(c => c.should.be.instanceOf(Color));
    });
  });
});

describe('download', () => {
  describe('#getImageColor()', () => {
    it('should resolve to a color', () => {
      download.getImageColor('https://tse4.mm.bing.net/th?id=OIP.wCXthFqx7rTL4D0F-h29mQEzDL&pid=Api')
      .should.not.be.rejected()
      .should.eventually.be.an.instanceOf(Color);
    });
  });
});

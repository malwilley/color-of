let bingApiKey;

try {
  bingApiKey = require('./secret').bingApiKey; // eslint-disable-line global-require
} catch (e) {
  throw new Error('Must include a test/secret.js file that exports an object with a bingApiKey property');
}

const classifier = require('../lib/index');
const bing = require('../lib/bing');
const Color = require('color');
const util = require('../lib/util');

require('mocha-testcheck').install();
require('should');

describe('classifier', () => {
  describe('#classify()', () => {
    const options = {
      bingApiKey,
      palette: ['red', 'green', 'blue', 'yellow', 'orange', 'purple'],
    };
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
    it('should resolve to an instance of Color', () => {
      classifier.classify('term', options)
      .should.not.be.rejected()
      .should.eventually.be.an.instanceOf(Color);
    });
    it('should match "strawberry" to red', () => {
      const promise = classifier.classify('strawberry', options);
      return promise.should.finally.deepEqual(Color('red'));
    });
    it('should match "lime" to green', () => {
      const promise = classifier.classify('lime', options);
      return promise.should.finally.deepEqual(Color('green'));
    });
  });
});

describe('bing', () => {
  describe('#fetchQueryColors()', () => {
    it('should return an array with [count] Color objects', () => {
      const count = 27;
      bing.fetchQueryColors(bingApiKey, 'query', count)
      .then((colors) => {
        colors.should.be.instanceOf(Array).and.have.lengthOf(count);
        colors.forEach(color => color.should.be.an.instanceOf(Color));
      });
    });
    it('should reject invalid search query counts', () => {
      bing.fetchQueryColors(bingApiKey, 'query', -1).should.be.rejected();
      bing.fetchQueryColors(bingApiKey, 'query', 51).should.be.rejected();
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

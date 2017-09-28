import Color from 'color';
import { colorToRgb, rgbToColor } from '../lib/util';

require('mocha-testcheck').install();
require('should');

describe('util', () => {
  describe('#colorToRgb()', () => {
    it('should return an object with correct RGB values', () => {
      const color = new Color('#FFFFFF');
      const rgb = colorToRgb(color);
      rgb.should.have.property('R').which.is.exactly(255);
      rgb.should.have.property('G').which.is.exactly(255);
      rgb.should.have.property('B').which.is.exactly(255);
    });
  });
  describe('#rgbToColor()', () => {
    it('should return the correct Color object', () => {
      const rgb = { R: 255, G: 255, B: 255 };
      const color = rgbToColor(rgb);
      color.should.be.an.instanceOf(Color);
      color.hex().should.be.exactly('#FFFFFF');
    });
  });
});


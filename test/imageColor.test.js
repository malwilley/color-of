import Color from 'color';
import palettes from '../lib/palettes/palette';
import requestImageColor from '../lib/requestImageColor';
import { getClosestColor } from '../lib/util';

require('mocha-testcheck').install();
require('should');

describe('imageColor', () => {
  describe('#requestImageColor()', () => {
    it('should get red from strawberry image', (done) => {
      requestImageColor('./test/inputs/strawberry.jpg')
      .then((color) => {
        color.should.be.an.instanceOf(Color);

        const compareColors = palettes.W3C.map(c => Color(c));
        const closestColor = getClosestColor(color, compareColors);
        closestColor.hex().should.be.exactly('#FF0000');
        done();
      })
      .catch(done);
    });
  });
});


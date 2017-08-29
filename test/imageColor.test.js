/* require('mocha-testcheck').install();
require('should');
const palettes = require('../lib/palettes/palette');
const imageColor = require('../lib/requestImageColor');
const util = require('../lib/util');
const Color = require('color');

describe('imageColor', () => {
  describe('#requestImageColor()', () => {
    it('should get red from strawberry image', (done) => {
      imageColor.requestImageColor('./test/inputs/strawberry.jpg')
      .then((color) => {
        color.should.be.an.instanceOf(Color);

        const compareColors = palettes.W3C.map(c => Color(c));
        const closestColor = util.getClosestColor(color, compareColors);
        closestColor.hex().should.be.exactly('#FF0000');
        done();
      })
      .catch(done);
    });
  });
});
*/

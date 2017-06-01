require('mocha-testcheck').install();
require('should');
const imageColor = require('../lib/imageColor');
const Color = require('color');

describe('imageColor', () => {
  describe('#requestImageColor()', () => {
    it('should resolve to a color', () => {
      const promise = imageColor.requestImageColor('https://tse4.mm.bing.net/th?id=OIP.wCXthFqx7rTL4D0F-h29mQEzDL&pid=Api');
      return promise.should.not.be.rejected()
      .should.eventually.be.an.instanceOf(Color);
    });
  });
});

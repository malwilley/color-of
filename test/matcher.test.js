require('mocha-testcheck').install();
require('should');
const matcher = require('../lib/matcher');
const Color = require('color');

describe('matcher', () => {
  describe('#getHighestFrequencyColor()', () => {
    const colors = ['#000000', '#111111', '#111111', '#222222']
      .map(c => Color(c));
    it('should return the highest frequency color', () => {
      matcher.getHighestFrequencyColor(colors).hex().should.be.exactly('#111111');
    });
  });
});

import Color from 'color';
import { getHighestFrequencyColor } from '../lib/matcher';

require('mocha-testcheck').install();
require('should');

describe('matcher', () => {
  describe('#getHighestFrequencyColor()', () => {
    const colors = ['#000000', '#111111', '#111111', '#222222']
      .map(c => Color(c));
    it('should return the highest frequency color', () => {
      getHighestFrequencyColor(colors).hex().should.be.exactly('#111111');
    });
  });
});


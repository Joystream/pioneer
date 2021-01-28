import BN from 'bn.js'
import { expect } from 'chai'
import { formatTokenValue } from '../../src/utils/formatters'

describe('formatters', () => {
  describe('formatTokenValue', () => {
    it('Formats BN', () => {
      expect(formatTokenValue(new BN('1'))).to.equal('1')
      expect(formatTokenValue(new BN('10'))).to.equal('10')
      expect(formatTokenValue(new BN('100'))).to.equal('100')
      expect(formatTokenValue(new BN('1000'))).to.equal('1,000')
      expect(formatTokenValue(new BN('10000'))).to.equal('10,000')
      expect(formatTokenValue(new BN('100000'))).to.equal('100,000')
      expect(formatTokenValue(new BN('1000000'))).to.equal('1,000,000')
      expect(formatTokenValue(new BN('12345678912345679'))).to.equal('12,345,678,912,345,679')
    })
  })
})

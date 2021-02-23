import { expect } from '@jest/globals'
import BN from 'bn.js'
import { formatTokenValue } from '../../src/utils/formatters'

describe('formatters', () => {
  describe('formatTokenValue', () => {
    it('Formats BN', () => {
      expect(formatTokenValue(new BN('1'))).toBe('1')
      expect(formatTokenValue(new BN('10'))).toBe('10')
      expect(formatTokenValue(new BN('100'))).toBe('100')
      expect(formatTokenValue(new BN('1000'))).toBe('1,000')
      expect(formatTokenValue(new BN('10000'))).toBe('10,000')
      expect(formatTokenValue(new BN('100000'))).toBe('100,000')
      expect(formatTokenValue(new BN('1000000'))).toBe('1,000,000')
      expect(formatTokenValue(new BN('12345678912345679'))).toBe('12,345,678,912,345,679')
    })
  })
})

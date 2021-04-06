import BN from 'bn.js'

import { formatDateString, formatTokenValue, shortenAddress } from '../../src/utils/formatters'

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

  describe('shortenAddress', () => {
    const address = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'

    it('Shortens addresses', () => {
      expect(shortenAddress(address)).toEqual('5FHneW46x...hjJM694ty')
    })

    it('Shortens to specified length', () => {
      expect(shortenAddress(address, 8)).toEqual('5FHn...94ty')
      expect(shortenAddress(address, 9)).toEqual('5FHne...94ty')
    })

    it('Empty string', () => {
      expect(shortenAddress('')).toEqual('')
    })

    it('Specified length greater than address length', () => {
      expect(shortenAddress(address, 99)).toEqual(address)
    })

    it('Specified length equal to address length', () => {
      expect(shortenAddress(address, address.length)).toEqual(address)
    })
  })

  describe('formatDateString', () => {
    const dateString = '1983-10-01T06:42:00.155Z'

    it('Default format', () => {
      expect(formatDateString(dateString)).toMatch(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}, [0-9]{2}:[0-9]{2} (AM|PM) [A-Z]+/)
    })
  })
})

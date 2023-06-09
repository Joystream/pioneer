import BN from 'bn.js'

import { AN_HOUR, A_DAY, A_MINUTE, A_SECOND } from '@/common/constants'
import {
  durationFormatter,
  formatBlocksToDuration,
  formatDateString,
  formatJoyValue,
  formatTokenValue,
  shortenAddress,
  splitDuration,
} from '@/common/model/formatters'

describe('formatters', () => {
  describe('formatTokenValue', () => {
    it('Formats numbers and BN', () => {
      expect(formatTokenValue(new BN('1'))).toBe('1')
      expect(formatTokenValue(new BN('10'))).toBe('10')
      expect(formatTokenValue(new BN('100'))).toBe('100')
      expect(formatTokenValue(new BN('1000'))).toBe('1,000')
      expect(formatTokenValue(new BN('10000'))).toBe('10,000')
      expect(formatTokenValue(new BN('100000'))).toBe('100,000')
      expect(formatTokenValue(new BN('1000000'))).toBe('1,000,000')
      expect(formatTokenValue(new BN('12345678912345679'))).toBe('12,345,678,912,345,679')

      expect(formatTokenValue(123456789)).toBe('123,456,789')
      expect(formatTokenValue(0)).toBe('0')
      expect(formatTokenValue(undefined)).toBe('-')
      expect(formatTokenValue(null)).toBe('-')
      expect(formatTokenValue(NaN)).toBe('-')
    })

    it('Formats strings', () => {
      expect(formatTokenValue('')).toBe('')
      expect(formatTokenValue('100')).toBe('100')
      expect(formatTokenValue('1000')).toBe('1,000')
      expect(formatTokenValue('10000')).toBe('10,000')
      expect(formatTokenValue('1000000')).toBe('1,000,000')
      expect(formatTokenValue('Random string')).toBe('Random string')
      expect(formatTokenValue('3120 out of 100000 dentists agree')).toBe('3,120 out of 100,000 dentists agree')
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
      expect(formatDateString(dateString)).toMatch(RegExp(String.raw`\d{2}/\d{2}/\d{4}, \d{2}:\d{2}\s[AP]M [A-Z]+$`))
    })
  })

  describe('durationFormatter', () => {
    it('Default', () => {
      const format = durationFormatter()
      const duration = 3 * A_DAY + 2 * AN_HOUR + A_MINUTE

      expect(format(duration)).toBe('3 days 2 hours 1 minute')
      expect(format(duration - 30 * A_SECOND)).toBe('3 days 2 hours')
      expect(format(-duration)).toBe('3 days 2 hours 1 minute')
      expect(format(3 * A_DAY)).toBe('3 days')
      expect(format(AN_HOUR)).toBe('1 hour')
      expect(format(0)).toBe('none')
      expect(format(A_MINUTE - 1)).toBe('none')
    })

    it('Custom units', () => {
      const format = durationFormatter([
        [60, 'minute'],
        [1, 'second'],
      ])
      expect(format(72)).toBe('1 minute 12 seconds')
      expect(format(400 * 60)).toBe('400 minutes')
    })

    it('Duration of a number of blocks', () => {
      expect(formatBlocksToDuration(100)).toBe('10 minutes')

      const blocksPerHour = 600
      const blocksPerDay = blocksPerHour * 24
      expect(formatBlocksToDuration(3 * blocksPerDay + 2 * blocksPerHour + 10)).toBe('3 days 2 hours 1 minute')
    })
  })

  describe('splitDuration', () => {
    it('Default', () => {
      const format = splitDuration([
        [A_DAY, 'day'],
        [AN_HOUR, 'hour'],
        [A_MINUTE, 'minute'],
      ])
      const duration = 3 * A_DAY + 2 * AN_HOUR + A_MINUTE

      expect(format(duration)).toEqual([
        [3, 'day'],
        [2, 'hour'],
        [1, 'minute'],
      ])
      expect(format(duration - 30 * A_SECOND)).toEqual([
        [3, 'day'],
        [2, 'hour'],
        [0, 'minute'],
      ])
      expect(format(3 * A_DAY)).toEqual([
        [3, 'day'],
        [0, 'hour'],
        [0, 'minute'],
      ])
      expect(format(AN_HOUR)).toEqual([
        [0, 'day'],
        [1, 'hour'],
        [0, 'minute'],
      ])
      expect(format(0)).toEqual([
        [0, 'day'],
        [0, 'hour'],
        [0, 'minute'],
      ])
      expect(format(A_MINUTE - 1)).toEqual([
        [0, 'day'],
        [0, 'hour'],
        [0, 'minute'],
      ])
    })
  })

  describe('formatJoyValue', () => {
    const constsMock = jest.requireMock('@/common/constants/numbers')
    constsMock.JOY_DECIMAL_PLACES = 10 // This is the actual app value

    it('Default', () => {
      expect(formatJoyValue(new BN('0'))).toBe('0')
      expect(formatJoyValue(new BN('0'), { precision: 2 })).toBe('0')
      expect(formatJoyValue(new BN('1 0000000000'))).toBe('1')
      expect(formatJoyValue(new BN('1 0000000000'), { precision: 2 })).toBe('1')

      expect(formatJoyValue(new BN('1 000 000 000 000 0000000000'))).toBe('1,000,000,000,000')
      expect(formatJoyValue(new BN('1 000 000 000 000 0000000001'))).toBe('1,000,000,000,000.0000000001')
      expect(formatJoyValue(new BN('1 000 000 000 000 0000000000'), { precision: 2 })).toBe('1,000,000,000,000')
      expect(formatJoyValue(new BN('1 000 000 000 000 0000000001'), { precision: 2 })).toBe('1,000,000,000,000')

      expect(formatJoyValue(new BN('1 0010000000'))).toBe('1.001')
      expect(formatJoyValue(new BN('1 0100000000'))).toBe('1.01')
      expect(formatJoyValue(new BN('1 0010000000'), { precision: 2 })).toBe('1')
      expect(formatJoyValue(new BN('1 0100000000'), { precision: 2 })).toBe('1.01')

      expect(formatJoyValue(new BN('1 0140000000'))).toBe('1.014')
      expect(formatJoyValue(new BN('1 0150000000'))).toBe('1.015')
      expect(formatJoyValue(new BN('1 0140000000'), { precision: 2 })).toBe('1.01')
      expect(formatJoyValue(new BN('1 0150000000'), { precision: 2 })).toBe('1.02')
      expect(formatJoyValue(new BN('1 9950000000'), { precision: 2 })).toBe('2')

      expect(formatJoyValue(new BN('1'), { precision: 2 })).toBe('< 0.01')
      expect(formatJoyValue(new BN('1'))).toBe('0.0000000001')

      expect(formatJoyValue(new BN('-1 0000000000'))).toBe('-1')
      expect(formatJoyValue(new BN('-1'))).toBe('-0.0000000001')
      expect(formatJoyValue(new BN('-1 0050000000'))).toBe('-1.005')
      expect(formatJoyValue(new BN('-1 0000000000'), { precision: 2 })).toBe('-1')
      expect(formatJoyValue(new BN('-1'), { precision: 2 })).toBe('> -0.01')
      expect(formatJoyValue(new BN('-1 0050000000'), { precision: 2 })).toBe('-1.01')

      expect(formatJoyValue(new BN('1 5000000000'), { precision: 0 })).toBe('2')
    })

    it('Unformatted integer part', () => {
      expect(formatJoyValue(new BN('0'), { formatInt: String })).toBe('0')
      expect(formatJoyValue(new BN('1 000 000 000 000 0000000000'), { formatInt: String })).toBe('1000000000000')
      expect(formatJoyValue(new BN('1 000 000 000 000 0100000001'), { formatInt: String })).toBe(
        '1000000000000.0100000001'
      )
      expect(formatJoyValue(new BN('1 000 000 000 000 0100000001'), { precision: 2, formatInt: String })).toBe(
        '1000000000000.01'
      )
    })
  })
})

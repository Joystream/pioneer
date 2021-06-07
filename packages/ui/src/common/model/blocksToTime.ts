import BN from 'bn.js'

import { significantTimeUnit } from './significantTimeUnit'

export function blocksToTime(blocks: BN) {
  const seconds = blocks.toNumber() * 7
  if (seconds < 0) {
    return 'never'
  }
  const { count, unit } = significantTimeUnit(seconds)
  if (unit) {
    const format = Intl.NumberFormat('en', { style: 'unit', unit, unitDisplay: 'long' })
    return format.format(count)
  }
  return 'less than a minute'
}

import BN from 'bn.js'

import { SECONDS_PER_BLOCK } from '../constants'

import { significantTimeUnit } from './significantTimeUnit'

export function blocksToTime(blocks: BN) {
  const seconds = blocks.toNumber() * SECONDS_PER_BLOCK
  if (seconds < 0) {
    return '–'
  }
  const { count, unit } = significantTimeUnit(seconds)
  if (unit) {
    const format = Intl.NumberFormat('en', { style: 'unit', unit, unitDisplay: 'short' })
    return format.format(count)
  }
  return '<1 min'
}

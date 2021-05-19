import { max, min } from 'date-fns'

import { PartialDateRange } from '../types/Dates'
import { isDefined } from '../utils'

export const earliest = (...dates: (Date | undefined)[]) => {
  const defDates = dates.filter(isDefined)
  return defDates.length ? min(defDates) : undefined
}
export const latest = (...dates: (Date | undefined)[]) => {
  const defDates = dates.filter(isDefined)
  return defDates.length ? max(defDates) : undefined
}

type PartialRange = { start?: Date; end?: Date }
export const fromRange = (range: PartialDateRange) => (range ?? {}) as PartialRange

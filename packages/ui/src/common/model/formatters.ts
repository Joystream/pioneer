import BN from 'bn.js'
import { parseISO, differenceInCalendarDays, differenceInMinutes } from 'date-fns'

import { AN_HOUR, A_DAY, A_MINUTE, A_SECOND, SECONDS_PER_BLOCK } from '../constants'
import { Reducer } from '../types/helpers'
import { isNumber } from '../utils'

const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g

export const formatTokenValue = (value: BN | number | undefined) => {
  return new BN(value || 0).toString().replace(NUMBER_SEPARATOR_REG_EXP, ',')
}

export function shortenAddress(address: string, length = 18) {
  return length >= address.length
    ? address
    : address.substring(0, Math.ceil(length / 2)) +
        '...' +
        address.substring(address.length - Math.floor(length / 2), address.length)
}

const DefaultDateFormatter = Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZoneName: 'short',
})

export const formatDateString = (timestamp: string) => DefaultDateFormatter.format(new Date(timestamp))

export const dateFromNow = (date: string) => ({
  days: differenceInCalendarDays(parseISO(date), new Date()),
  minutes: differenceInMinutes(parseISO(date), new Date()),
})

type TimeUnit = [number, Intl.RelativeTimeFormatUnit]
const defaultDurationUnits: TimeUnit[] = [
  [A_DAY, 'day'],
  [AN_HOUR, 'hour'],
  [A_MINUTE, 'minute'],
]
export const durationFormater = (units = defaultDurationUnits) => (duration: number | BN) => {
  const total = Math.abs(isNumber(duration) ? duration : duration.toNumber())
  const [result] = units.reduce(durationReducer, [[], total])
  return result.length ? result.join(' ') : 'none'
}
const durationReducer: Reducer<[string[], number], TimeUnit> = ([result, remaining], [unitValue, unitName]) => {
  const amount = Math.floor(remaining / unitValue)
  const formated = amount ? [formatDurationUnit(amount, unitName)] : []
  return [[...result, ...formated], remaining - amount * unitValue]
}
const formatDurationUnit = (duration: number, unit: Intl.RelativeTimeFormatUnit) =>
  duration.toLocaleString('en', { style: 'unit', unit, unitDisplay: 'long' })

const MILISECOND_PER_BLOCK = A_SECOND * SECONDS_PER_BLOCK
export const formatBlocksToDuration = durationFormater([
  [A_DAY / MILISECOND_PER_BLOCK, 'day'],
  [AN_HOUR / MILISECOND_PER_BLOCK, 'hour'],
  [A_MINUTE / MILISECOND_PER_BLOCK, 'minute'],
])

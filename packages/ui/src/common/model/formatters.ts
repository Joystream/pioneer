import BN from 'bn.js'

import { AN_HOUR, A_DAY, A_MINUTE, A_SECOND, SECONDS_PER_BLOCK } from '../constants'
import { isNumber } from '../utils'

const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g

export const formatTokenValue = (value: BN | number | undefined) => {
  return new BN(value || 0).toString().replace(NUMBER_SEPARATOR_REG_EXP, ',')
}

export const formatNumber = (value: number): string => (Number.isNaN(value) ? '-' : value.toLocaleString('en'))

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

export const formatDateString = (timestamp: string, size: 's' | 'l' = 'l') => {
  const defaultFormat = DefaultDateFormatter.format(new Date(timestamp))
  switch (size) {
    case 's':
      return defaultFormat.replace(/ ([AP]M)/, (_, preriod: string) => preriod.toLocaleLowerCase())
    default:
      return defaultFormat
  }
}

type TimeUnit = [number, Intl.RelativeTimeFormatUnit]
const defaultDurationUnits: TimeUnit[] = [
  [A_DAY, 'day'],
  [AN_HOUR, 'hour'],
  [A_MINUTE, 'minute'],
]
export const durationFormater = (units = defaultDurationUnits) => (duration: number | BN) =>
  splitDuration(units)(Math.abs(isNumber(duration) ? duration : duration.toNumber()))
    .flatMap(([duration, unit]) => (duration ? formatDurationUnit(duration, unit) : []))
    .join(' ') || 'none'

const formatDurationUnit = (duration: number, unit: Intl.RelativeTimeFormatUnit) =>
  duration.toLocaleString('en', { style: 'unit', unit, unitDisplay: 'long' })

const MILISECOND_PER_BLOCK = A_SECOND * SECONDS_PER_BLOCK
export const formatBlocksToDuration = durationFormater([
  [A_DAY / MILISECOND_PER_BLOCK, 'day'],
  [AN_HOUR / MILISECOND_PER_BLOCK, 'hour'],
  [A_MINUTE / MILISECOND_PER_BLOCK, 'minute'],
])

export const splitDuration = <T extends [number, any]>(units: T[]) => (duration: number, result: T[] = []): T[] => {
  if (!units.length) return result
  const [[unitValue, unitName], ...submultiples] = units
  const amount = Math.floor(duration / unitValue)
  return splitDuration(submultiples)(duration - amount * unitValue, [...result, [amount, unitName] as T])
}

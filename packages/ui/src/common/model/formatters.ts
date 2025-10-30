import BN from 'bn.js'

import { AN_HOUR, A_DAY, A_MINUTE, A_SECOND, JOY_DECIMAL_PLACES, SECONDS_PER_BLOCK } from '../constants'
import { isDefined, isNumber } from '../utils'
import { powerOf10 } from '../utils/bn'

export const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g

export const formatTokenValue = (value: BN | number | string | undefined | null) => {
  if (!isDefined(value) || value === null || Number.isNaN(value)) {
    return '-'
  }
  if (typeof value !== 'string') {
    value = new BN(value || 0).toString()
  }
  return value.replace(NUMBER_SEPARATOR_REG_EXP, ',')
}

export function shortenAddress(address: string, length = 18) {
  return length >= address.length
    ? address
    : address.substring(0, Math.ceil(length / 2)) +
        '...' +
        address.substring(address.length - Math.floor(length / 2), address.length)
}

export const DefaultDateFormatter = Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZoneName: 'short',
})

export const formatDateString = (timestamp: string | number | undefined) => {
  if (!isDefined(timestamp)) {
    return '-'
  }

  return DefaultDateFormatter.format(new Date(timestamp)).toUpperCase()
}

type TimeUnit = [number, Intl.RelativeTimeFormatUnit]
const defaultDurationUnits: TimeUnit[] = [
  [A_DAY, 'day'],
  [AN_HOUR, 'hour'],
  [A_MINUTE, 'minute'],
]
export const durationFormatter =
  (units = defaultDurationUnits) =>
  (duration: number | BN) =>
    splitDuration(units)(Math.abs(isNumber(duration) ? duration : duration.toNumber()))
      .flatMap(([duration, unit]) => (duration ? formatDurationUnit(duration, unit) : []))
      .join(' ') || 'none'

const formatDurationUnit = (duration: number, unit: Intl.RelativeTimeFormatUnit) =>
  duration.toLocaleString('en', { style: 'unit', unit, unitDisplay: 'long' })

export const MILLISECONDS_PER_BLOCK = A_SECOND * SECONDS_PER_BLOCK
export const formatBlocksToDuration = durationFormatter([
  [A_DAY / MILLISECONDS_PER_BLOCK, 'day'],
  [AN_HOUR / MILLISECONDS_PER_BLOCK, 'hour'],
  [A_MINUTE / MILLISECONDS_PER_BLOCK, 'minute'],
])

export const splitDuration =
  <T extends any>(units: [number, T][]) =>
  (duration: number): [number, T][] => {
    if (!units.length) return []
    const [[unitValue, unitName], ...submultiples] = units
    const amount = Math.floor(duration / unitValue)
    return [[amount, unitName], ...splitDuration(submultiples)(duration - amount * unitValue)]
  }

interface JOYFormatOption {
  precision?: number
  formatInt?: (value: BN) => string
  formatDec?: (value: BN, size: number) => string
}
const defaultJOYFormatOption = {
  precision: 10,
  formatInt: formatTokenValue,
  formatDec: (value: BN, length: number) => String(value).padStart(length, '0').replace(/0+$/, ''),
}
export const formatJoyValue = (
  value: BN,
  {
    precision = defaultJOYFormatOption.precision,
    formatInt = defaultJOYFormatOption.formatInt,
    formatDec = defaultJOYFormatOption.formatDec,
  }: JOYFormatOption = defaultJOYFormatOption
) => {
  if (value.isZero()) {
    return '0'
  }

  const safePrecision = Math.min(JOY_DECIMAL_PLACES, precision)
  const roundedValue = value.abs().divRound(powerOf10(JOY_DECIMAL_PLACES - safePrecision))

  if (roundedValue.isZero()) {
    return `${value.isNeg() ? '> -' : '< '}${Math.pow(10, -safePrecision)}`
  }

  const sign = value.isNeg() ? '-' : ''
  const intPart = formatInt(roundedValue.div(powerOf10(safePrecision)))
  const decPart = formatDec(roundedValue.mod(powerOf10(safePrecision)), safePrecision)

  return `${sign}${intPart}.${decPart}`.replace(/\.$/, '')
}

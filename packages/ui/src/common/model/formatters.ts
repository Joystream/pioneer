import BN from 'bn.js'

import { cleanInputValue } from '@/common/hooks/useNumberInput'

import { AN_HOUR, A_DAY, A_MINUTE, A_SECOND, JOY_DECIMAL_PLACES, SECONDS_PER_BLOCK } from '../constants'
import { isDefined, isNumber, last } from '../utils'
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

export const UNIT_VALUE = powerOf10(JOY_DECIMAL_PLACES)

export const formatJoyValue = (value: BN, precision = 10) => {
  if (value.isZero()) {
    return '0'
  }

  const safePrecision = Math.min(JOY_DECIMAL_PLACES, precision)
  const roundedValue = value.divRound(powerOf10(JOY_DECIMAL_PLACES - safePrecision))

  if (roundedValue.isZero()) {
    return `> ${Math.pow(10, -safePrecision)}`
  }

  const intPart = formatTokenValue(roundedValue.div(UNIT_VALUE))
  const decPart = String(roundedValue.abs().mod(UNIT_VALUE))

  return `${intPart}.${decPart}`.replace(/\.?0*$/, '')
}

export const formatToJoyValue = (joyValue: string | BN) => {
  joyValue = new BN(joyValue)
  const int = joyValue.div(new BN(UNIT_VALUE))
  const rest = joyValue.mod(new BN(UNIT_VALUE))
  return {
    decimal: rest.toString().replace(/0+$/, ''),
    integer: int.toString(),
  }
}

export const formatFromJoyValue = (joyValue: string | BN) => {
  joyValue = typeof joyValue === 'string' ? joyValue : joyValue.toString()
  const values = joyValue.split('.')
  if (values.length === 1) {
    return new BN(UNIT_VALUE).mul(new BN(cleanInputValue(values[0])))
  }

  return new BN(cleanInputValue(values[0]) + values[1].padEnd(10, '0'))
}

export const isNumberInputValid = (value: string) => {
  if (last(value) === '.') {
    value = value.slice(0, value.length - 1)
  }

  switch (true) {
    case isNaN(+value):
      return false
    case value.split('.')?.[1]?.length > 10:
      return false
    case new BN(value).ltn(0):
      return false
    default:
      return true
  }
}

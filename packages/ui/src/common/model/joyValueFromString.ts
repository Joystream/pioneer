import BN from 'bn.js'

import { JOY_DECIMAL_PLACES } from '@/common/constants'

const sanitizeJoyInput = (value?: string) => (value ? value.replace(/[,_\s]/g, '') : '0')

const JOY_UNIT = new BN(10).pow(new BN(JOY_DECIMAL_PLACES))

export const joyValueFromString = (value: string) => {
  const normalized = sanitizeJoyInput(value || '0')
  const [integer = '0', decimal = ''] = normalized.split('.')
  return new BN(integer + decimal.padEnd(JOY_DECIMAL_PLACES, '0'))
}

const toBN = (value: BN | bigint | string | number) => {
  if (BN.isBN(value)) return value
  if (typeof value === 'bigint') {
    return new BN(value.toString())
  }
  return new BN(String(value ?? 0))
}

export const joyStringToPlanckBigInt = (value: string): bigint => BigInt(joyValueFromString(value).toString())

export const planckToJoyString = (value: BN | bigint | string | number, precision = 4): string => {
  const bnValue = toBN(value)
  const { div: integerPart, mod } = bnValue.divmod(JOY_UNIT)
  const fractional = mod.abs().toString().padStart(JOY_DECIMAL_PLACES, '0').slice(0, precision).replace(/0+$/, '')

  return fractional ? `${integerPart.toString()}.${fractional}` : integerPart.toString()
}

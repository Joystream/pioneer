import BN from 'bn.js'

import { JOY_DECIMAL_PLACES } from '@/common/constants'

export const joyValueFromString = (value: string) => {
  const [integer = '0', decimal = ''] = value.split('.')
  return new BN(integer + decimal.padEnd(JOY_DECIMAL_PLACES, '0'))
}

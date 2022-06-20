import BN from 'bn.js'

import { CurrencyName } from '@/app/constants/currency'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the thread creation. You need at least ${fee?.toString()} ${
    CurrencyName.integerValue
  } on your account for this action.`
}

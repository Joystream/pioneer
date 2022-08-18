import BN from 'bn.js'

import { CurrencyName } from '@/app/constants/currency'
import { formatJoyValue } from '@/common/model/formatters'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the thread creation. You need at least ${fee ? formatJoyValue(fee) : '-'} ${
    CurrencyName.integerValue
  } on your account for this action.`
}

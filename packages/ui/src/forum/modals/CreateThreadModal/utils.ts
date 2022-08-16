import BN from 'bn.js'

import { CurrencyName } from '@/app/constants/currency'
import { BN_ZERO } from '@/common/constants'
import { formatJoyValue } from '@/common/model/formatters'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the thread creation. You need at least ${formatJoyValue(fee ?? BN_ZERO)} ${
    CurrencyName.integerValue
  } on your account for this action.`
}

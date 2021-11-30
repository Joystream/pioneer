import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'

import { ModalWithDataCall } from '@/common/providers/modal/types'

import { Account } from '../../types'

export type TransferModalCall = ModalWithDataCall<
  'TransferTokens',
  {
    from?: Account
    to?: Account
    maxValue?: BN
    minValue?: BN
    initialValue?: BN
    transactionFactory?: (amount: BN) => SubmittableExtrinsic<'rxjs', ISubmittableResult>
  }
>

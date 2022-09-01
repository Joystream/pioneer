import BN from 'bn.js'

import { LockType } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: BN
    lock: LockType
    isFeeOriented?: boolean
  }
>

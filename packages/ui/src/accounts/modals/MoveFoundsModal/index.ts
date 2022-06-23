import BN from 'bn.js'

import { LockType } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: BN
    accountsWithTransferableBalance?: Address[] | null
    accountsWithCompatibleLocks?: { [key in Address]: Address[] } | null
    lock: LockType
  }
>

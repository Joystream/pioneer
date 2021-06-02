import { Account } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

import { MoveFoundsModalType } from './constants'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: number
    type: MoveFoundsModalType
    accounts?: Account[]
    lockedFoundsAccounts?: { [key in Address]: Account[] }
  }
>

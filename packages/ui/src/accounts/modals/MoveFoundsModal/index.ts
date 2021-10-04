import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: number
    accounts?: Address[] | null
    lockedFoundsAccounts?: { [key in Address]: Address[] } | null
  }
>

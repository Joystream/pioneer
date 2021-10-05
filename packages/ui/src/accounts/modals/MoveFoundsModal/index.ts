import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: number
    accountsWithTransferableBalance?: Address[] | null
    accountsWithCompatibleLocks?: { [key in Address]: Address[] } | null
  }
>

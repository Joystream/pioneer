import { Account } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './MoveFundsModal'

export type MoveFundsModalCall = ModalWithDataCall<
  'MoveFundsModal',
  {
    requiredStake: number
    accounts?: Account[] | null
    lockedFoundsAccounts?: { [key in Address]: Account[] } | null
  }
>

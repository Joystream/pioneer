import { BalanceLock } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'

export * from './RecoverBalanceModal'
export type RecoverBalanceModalCall = ModalWithDataCall<
  'RecoverBalance',
  {
    address: Address
    lock: BalanceLock
    memberId: string
  }
>

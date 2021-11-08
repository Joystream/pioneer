import BN from 'bn.js'

import { BalanceLock } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

export * from './RecoverBalanceModal'

export type RecoverableLock =
  | {
      amount: BN
      type: 'Voting'
    }
  | {
      amount: BN
      type: 'Council Candidate'
    }

export const isRecoverableLock = (lock: BalanceLock): lock is RecoverableLock => {
  if (lock.type === 'Voting' || lock.type === 'Council Candidate') {
    return true
  }

  return false
}

export type RecoverBalanceModalCall = ModalWithDataCall<
  'RecoverBalance',
  {
    address: Address
    lock: RecoverableLock
    memberId: Member['id']
  }
>

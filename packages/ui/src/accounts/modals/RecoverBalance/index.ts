import BN from 'bn.js'

import { BalanceLock } from '@/accounts/types'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

export * from './RecoverBalanceModal'

type VotingLock = {
  amount: BN
  type: 'Voting'
}
type CouncilLock = {
  amount: BN
  type: 'Council Candidate'
}
export type RecoverableLock = VotingLock | CouncilLock

export const isRecoverableLock = (lock: BalanceLock): lock is RecoverableLock => {
  return lock.type === 'Voting' || lock.type === 'Council Candidate' || lock.type.endsWith('Worker')
}

interface RecoverableModalData {
  address: Address
  lock: RecoverableLock
  memberId?: Member['id']
  isWithdrawing?: boolean
}

export interface VotingData extends RecoverableModalData {
  address: Address
  lock: VotingLock
  memberId: undefined
}

export interface CouncilCandidateData extends RecoverableModalData {
  address: Address
  lock: CouncilLock
  memberId: Member['id']
}

export const isCouncilCandidateData = (data: RecoverableModalData): data is CouncilCandidateData => {
  return data.lock.type === 'Council Candidate'
}

export type RecoverBalanceModalCall = ModalWithDataCall<'RecoverBalance', RecoverableModalData>

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
  return lock.type === 'Voting' || lock.type === 'Council Candidate'
}

interface RecoverableModalData {
  address: Address
  lock: RecoverableLock
  memberId?: Member['id']
}

export interface VotingData extends RecoverableModalData {
  address: Address
  lock: VotingLock
  memberId: undefined
}

interface CouncilCandidateData extends RecoverableModalData {
  address: Address
  lock: CouncilLock
  memberId: Member['id']
}

export const isCouncilCandidateData = (data: RecoverableModalData): data is CouncilCandidateData => {
  return data.lock.type === 'Council Candidate'
}

export type RecoverBalanceModalCall = ModalWithDataCall<'RecoverBalance', RecoverableModalData>

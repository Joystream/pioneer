import BN from 'bn.js'

import { Address } from '@/common/types'

export type LockType =
  | 'Voting'
  | 'Council Candidate'
  | 'Councilor'
  | 'Validation'
  | 'Nomination'
  | 'Proposals'
  | 'Storage Worker'
  | 'Content Directory Worker'
  | 'Forum Worker'
  | 'Membership Worker'
  | 'Invitation'
  | 'Staking Candidate'
  | 'Bounty'

export interface BalanceLock {
  amount: BN
  type: LockType
}

export interface Balances {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
  locks: BalanceLock[]
}

export type AddressToBalanceMap = {
  [key in Address]: Balances
}

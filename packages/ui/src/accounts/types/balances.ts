import BN from 'bn.js'

import { Address } from '@/common/types'

/**
 * The default Polkadot lock ("staking ")
 */
type PolkadotStakingLock = 'Staking'

export type LockType =
  | PolkadotStakingLock
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
  | 'Bounties'
  | 'Gateway Worker'
  | 'Operations Worker'

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

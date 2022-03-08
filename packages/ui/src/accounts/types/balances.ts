import BN from 'bn.js'

import { Address } from '@/common/types'

/**
 * The default Polkadot lock ("staking ")
 */
type PolkadotStakingLock = 'Staking'
type PolkadotVestingLock = 'Vesting'

export type LockType =
  | PolkadotStakingLock
  | PolkadotVestingLock
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
  | 'Bound Staking Account'
  | 'Bounties'
  | 'Gateway Worker'
  | 'Builders Worker'
  | 'HR Worker'
  | 'Marketing Worker'
  | 'Distribution Worker'
  | 'Operations Gamma Worker'
  | 'Operations Beta Worker'
  | 'Operations Alpha Worker'

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

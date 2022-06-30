import { LockIdentifier } from '@polkadot/types/interfaces'

import { BalanceLock, LockType } from '@/accounts/types'

// Mapping from:
// - [/runtime/src/constants.rs:104](https://github.com/Joystream/joystream/blob/5a153fa18351a8fefd919a7d5230b911f180e13d/runtime/src/constants.rs#L104)
// - and the [handbook](https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks-1)
export const lockTypes: { [key: string]: LockType } = {
  ['staking ']: 'Staking',
  ['vesting ']: 'Vesting',
  ['voting  ']: 'Voting',
  ['candidac']: 'Council Candidate',
  ['councilo']: 'Councilor',
  ['proposal']: 'Proposals',
  ['wg-storg']: 'Storage Worker',
  ['wg-contt']: 'Content Directory Worker',
  ['wg-forum']: 'Forum Worker',
  ['wg-membr']: 'Membership Worker',
  ['invitemb']: 'Invitation',
  ['boundsta']: 'Bound Staking Account',
  ['bounty  ']: 'Bounties',
  ['wg-gatew']: 'Gateway Worker',
  ['wg-opera']: 'Builders Worker',
  ['wg-operb']: 'HR Worker',
  ['wg-operg']: 'Marketing Worker',
  ['wg-distr']: 'Distribution Worker',
}

const RIVALROUS: LockType[] = [
  'Council Candidate',
  'Councilor',
  'Staking',
  'Proposals',
  'Storage Worker',
  'Content Directory Worker',
  'Forum Worker',
  'Membership Worker',
  'Bounties',
  'Gateway Worker',
  'Builders Worker',
  'HR Worker',
  'Marketing Worker',
  'Distribution Worker',
]

const RECOVERABLE: LockType[] = ['Voting', 'Council Candidate']

const isRivalrous = (lockType: LockType) => RIVALROUS.includes(lockType)
const asLockTypes = (locks: BalanceLock[]): LockType[] => locks.flatMap((lock) => lock.type ?? [])
const isConflictingWith = (lockTypeA: LockType): ((lockTypeB: LockType) => boolean) => {
  if (!lockTypeA) {
    // Don't block transactions based on unknown locks
    return () => false
  }

  if (isRivalrous(lockTypeA)) {
    return isRivalrous
  }

  return (lockTypeB) => {
    if (lockTypeA === 'Voting' && lockTypeB === 'Voting') {
      // Vote stake should be reusable in next elections
      return false
    }

    return lockTypeA === lockTypeB
  }
}

export type RecoveryConditions = {
  isActiveCandidate: boolean
  isVoteStakeLocked: boolean
}

export const isRecoverable = (type: LockType, recoverConditions?: RecoveryConditions): boolean => {
  if (!RECOVERABLE.includes(type)) {
    return false
  }

  switch (type) {
    case 'Council Candidate':
      return !recoverConditions?.isActiveCandidate

    case 'Voting':
      return !recoverConditions?.isVoteStakeLocked

    default:
      return true
  }
}

export const areLocksConflicting = (lockType: LockType, existingLocks: BalanceLock[]) =>
  existingLocks.length > 0 && asLockTypes(existingLocks).some(isConflictingWith(lockType))

export const conflictingLocks = (lockType: LockType, existingLocks: BalanceLock[]) =>
  asLockTypes(existingLocks).filter(isConflictingWith(lockType))

export const lockLookup = (id: LockIdentifier): LockType => lockTypes[id.toUtf8()]

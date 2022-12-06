import { LockIdentifier } from '@polkadot/types/interfaces'

// NOTE can't run the `node-mocks` script with the `@/...` aliases here
import { BalanceLock, LockType, WorkerLocks, WorkerLockType } from '../types'

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
  ['wg-appli']: 'Apps Worker',
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
  'Apps Worker',
  'Builders Worker',
  'HR Worker',
  'Marketing Worker',
  'Distribution Worker',
]

export const isRivalrous = (lockType: LockType) => RIVALROUS.includes(lockType)
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
  isWorkerStakeLocked: boolean
}

export const isRecoverable = (type: LockType, recoveryConditions?: RecoveryConditions): boolean => {
  if (WorkerLocks.includes(type as WorkerLockType)) {
    return !recoveryConditions?.isWorkerStakeLocked
  }

  if (type === 'Council Candidate') {
    return !recoveryConditions?.isActiveCandidate
  }

  if (type === 'Voting') {
    return !recoveryConditions?.isVoteStakeLocked
  }

  return false
}

export const areLocksConflicting = (lockType: LockType, existingLocks: BalanceLock[]) =>
  existingLocks.length > 0 && asLockTypes(existingLocks).some(isConflictingWith(lockType))

export const conflictingLocks = (lockType: LockType, existingLocks: BalanceLock[]) =>
  asLockTypes(existingLocks).filter(isConflictingWith(lockType))

export const lockLookup = (id: LockIdentifier): LockType => lockTypes[id.toUtf8()]

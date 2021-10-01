import { BalanceLock, LockType } from '@/accounts/types'

export const lockTypes: { [key: string]: LockType } = {
  '0x0000000000000000': 'Voting',
  '0x0101010101010101': 'Council Candidate',
  '0x0202020202020202': 'Councilor',
  '0x0303030303030303': 'Validation',
  '0x0404040404040404': 'Nomination',
  '0x0505050505050505': 'Proposals',
  '0x0606060606060606': 'Storage Worker',
  '0x0707070707070707': 'Content Directory Worker',
  '0x0808080808080808': 'Forum Worker',
  '0x0909090909090909': 'Membership Worker',
  '0x0a0a0a0a0a0a0a0a': 'Invitation',
  '0x0b0b0b0b0b0b0b0b': 'Staking Candidate',
  '0x0c0c0c0c0c0c0c0c': 'Bounty',
  '0x0d0d0d0d0d0d0d0d': 'Gateway Worker',
  '0x0e0e0e0e0e0e0e0e': 'Operations Worker',
}

const ANY_WORKER: LockType[] = [
  'Forum Worker',
  'Storage Worker',
  'Content Directory Worker',
  'Gateway Worker',
  'Membership Worker',
  'Operations Worker',
]

const STAKING_INVITATION_VOTING: LockType[] = ['Staking Candidate', 'Invitation', 'Voting']
const COMPATIBLE_LOCKS: Record<LockType, Set<LockType>> = {
  'Staking Candidate': new Set<LockType>([
    'Invitation',
    'Voting',
    'Council Candidate',
    'Councilor',
    'Validation',
    'Nomination',
    'Proposals',
    'Bounty',
    ...ANY_WORKER,
  ]),
  Invitation: new Set([
    'Staking Candidate',
    'Voting',
    'Council Candidate',
    'Councilor',
    'Validation',
    'Nomination',
    'Proposals',
    'Bounty',
    ...ANY_WORKER,
  ]),
  Voting: new Set([
    'Staking Candidate',
    'Invitation',
    'Council Candidate',
    'Councilor',
    'Validation',
    'Nomination',
    'Proposals',
    'Bounty',
    ...ANY_WORKER,
  ]),
  'Council Candidate': new Set([...STAKING_INVITATION_VOTING, 'Councilor']),
  Councilor: new Set([...STAKING_INVITATION_VOTING, 'Council Candidate']),
  Validation: new Set(STAKING_INVITATION_VOTING),
  Nomination: new Set(STAKING_INVITATION_VOTING),
  Proposals: new Set(STAKING_INVITATION_VOTING),
  Bounty: new Set(['Staking Candidate', 'Voting']),
  'Content Directory Worker': new Set(STAKING_INVITATION_VOTING),
  'Forum Worker': new Set(STAKING_INVITATION_VOTING),
  'Gateway Worker': new Set(STAKING_INVITATION_VOTING),
  'Membership Worker': new Set(STAKING_INVITATION_VOTING),
  'Operations Worker': new Set(STAKING_INVITATION_VOTING),
  'Storage Worker': new Set(STAKING_INVITATION_VOTING),
}

export const isRecoverable = (type: LockType): boolean => type === 'Council Candidate'

export const areLocksConflicting = (lock: LockType, existingLocks: BalanceLock[]) => {
  if (existingLocks.length < 1) {
    return false
  }

  return existingLocks.some(({ type }) => !COMPATIBLE_LOCKS[lock].has(type))
}

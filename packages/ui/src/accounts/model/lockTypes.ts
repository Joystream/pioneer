import { LockType } from '@/accounts/types'

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

export const isRecoverable = (type: LockType): boolean => type === 'Council Candidate'

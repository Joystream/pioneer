import { createType } from '@joystream/types'

export const lockTypes = [
  {
    id: 0,
    type: createType('LockIdentifier', Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0])),
    reason: 'Voting',
  },
  {
    id: 1,
    type: createType('LockIdentifier', Uint8Array.from([1, 1, 1, 1, 1, 1, 1, 1])),
    reason: 'Council Candidate',
  },
  {
    id: 2,
    type: createType('LockIdentifier', Uint8Array.from([2, 2, 2, 2, 2, 2, 2, 2])),
    reason: 'Councilor',
  },
  {
    id: 3,
    type: createType('LockIdentifier', Uint8Array.from([3, 3, 3, 3, 3, 3, 3, 3])),
    reason: 'Validation',
  },
  {
    id: 4,
    type: createType('LockIdentifier', Uint8Array.from([4, 4, 4, 4, 4, 4, 4, 4])),
    reason: 'Nomination',
  },
  {
    id: 5,
    type: createType('LockIdentifier', Uint8Array.from([5, 5, 5, 5, 5, 5, 5, 5])),
    reason: 'Proposals',
  },
  {
    id: 6,
    type: createType('LockIdentifier', Uint8Array.from([6, 6, 6, 6, 6, 6, 6, 6])),
    reason: 'Storage Worker',
  },
  {
    id: 7,
    type: createType('LockIdentifier', Uint8Array.from([7, 7, 7, 7, 7, 7, 7, 7])),
    reason: 'Content Directory Worker',
  },
  {
    id: 8,
    type: createType('LockIdentifier', Uint8Array.from([8, 8, 8, 8, 8, 8, 8, 8])),
    reason: 'Forum Worker',
  },
  {
    id: 9,
    type: createType('LockIdentifier', Uint8Array.from([9, 9, 9, 9, 9, 9, 9, 9])),
    reason: 'Membership Worker',
  },
  {
    id: 10,
    type: createType('LockIdentifier', Uint8Array.from([10, 10, 10, 10, 10, 10, 10, 10])),
    reason: 'Invitation',
  },
  {
    id: 11,
    type: createType('LockIdentifier', Uint8Array.from([11, 11, 11, 11, 11, 11, 11, 11])),
    reason: 'Staking Candidate',
  },
]

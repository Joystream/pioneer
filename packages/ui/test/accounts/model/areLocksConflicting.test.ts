import BN from 'bn.js'

import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { LockType } from '@/accounts/types'

const stubLock = (type: LockType) => ({
  amount: new BN(10),
  type: type,
})

describe('areLocksConflicting', () => {
  it('No locks', () => {
    expect(areLocksConflicting('Storage Worker', [])).toBe(false)
  })

  it('Same lock', () => {
    expect(areLocksConflicting('Storage Worker', [stubLock('Storage Worker')])).toBe(true)
  })

  it('Conflicting lock', () => {
    expect(areLocksConflicting('Storage Worker', [stubLock('Forum Worker')])).toBe(true)
  })

  it('Compatible lock', () => {
    expect(areLocksConflicting('Content Directory Worker', [stubLock('Voting')])).toBe(false)
  })

  it('Compatible & conflicting locks', () => {
    expect(areLocksConflicting('Content Directory Worker', [stubLock('Voting'), stubLock('Storage Worker')])).toBe(true)
  })
})

import BN from 'bn.js'

import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { LockType } from '@/accounts/types'

const stubLock = (type: LockType) => ({
  amount: new BN(10),
  type: type,
  isRecoverable: false,
})

describe('areLocksConflicting', () => {
  it('No locks', () => {
    expect(areLocksConflicting('Storage Worker', [])).toBe(false)
  })

  it('Same lock', () => {
    expect(areLocksConflicting('Storage Worker', [stubLock('Storage Worker')])).toBe(true)
  })
})

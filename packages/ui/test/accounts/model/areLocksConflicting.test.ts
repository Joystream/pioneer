import BN from 'bn.js'

import { areLocksConflicting } from '@/accounts/model/lockTypes'

describe('areLocksConflicting', () => {
  it('No locks', () => {
    expect(areLocksConflicting('Storage Worker', [])).toBe(false)
  })

  it('Same lock', () => {
    expect(
      areLocksConflicting('Storage Worker', [
        {
          amount: new BN(10),
          type: 'Storage Worker',
          isRecoverable: false,
        },
      ])
    ).toBe(false)
  })
})

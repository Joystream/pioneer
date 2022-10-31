import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { toBalances } from '@/accounts/model/toBalances'
import { Balances } from '@/accounts/types'

import { createBalance, createBalanceLock, EMPTY_BALANCES } from '../../_mocks/chainTypes'
import { zeroBalance } from '../../setup'

describe('toBalances', () => {
  it('Empty', () => {
    testBalances(EMPTY_BALANCES, {
      ...zeroBalance,
    })
  })

  it('Available balance', () => {
    testBalances(
      {
        ...EMPTY_BALANCES,
        availableBalance: createBalance(1234),
        freeBalance: createBalance(1234),
        votingBalance: createBalance(1234),
      },
      {
        ...zeroBalance,
        total: new BN(1234),
        transferable: createBalance(1234).toBn(),
      }
    )
  })

  it('Locked and available', () => {
    testBalances(
      {
        ...EMPTY_BALANCES,
        availableBalance: createBalance(187),
        freeBalance: createBalance(387),
        frozenFee: createBalance(200),
        frozenMisc: createBalance(200),
        lockedBalance: createBalance(200),
        lockedBreakdown: [createBalanceLock(200, 'Voting')],
        votingBalance: createBalance(387),
      },
      {
        ...zeroBalance,
        locked: createBalance(200).toBn(),
        locks: [
          {
            amount: createBalance(200).toBn(),
            type: 'Voting',
          },
        ],
        recoverable: new BN(200),
        total: new BN(387),
        transferable: createBalance(187).toBn(),
      }
    )
  })

  it('All locked', () => {
    testBalances(
      {
        ...EMPTY_BALANCES,
        freeBalance: createBalance(200),
        frozenFee: createBalance(200),
        frozenMisc: createBalance(200),
        lockedBalance: createBalance(200),
        lockedBreakdown: [createBalanceLock(200, 'Bound Staking Account')],
        votingBalance: createBalance(200),
      },
      {
        ...zeroBalance,
        locked: createBalance(200).toBn(),
        locks: [
          {
            amount: createBalance(200).toBn(),
            type: 'Bound Staking Account',
          },
        ],
        total: new BN(200),
      }
    )
  })

  it('Recoverable', () => {
    testBalances(
      {
        ...EMPTY_BALANCES,
        availableBalance: createBalance(500),
        freeBalance: createBalance(10_500),
        frozenFee: createBalance(10_000),
        frozenMisc: createBalance(10_000),
        lockedBalance: createBalance(10_000),
        lockedBreakdown: [createBalanceLock(10_000, 'Voting'), createBalanceLock(200, 'Bound Staking Account')],
        votingBalance: createBalance(10_500),
      },
      {
        ...zeroBalance,
        locked: createBalance(10_000).toBn(),
        locks: [
          {
            amount: createBalance(10_000).toBn(),
            type: 'Voting',
          },
          {
            amount: createBalance(200).toBn(),
            type: 'Bound Staking Account',
          },
        ],
        recoverable: new BN(9_800),
        total: new BN(10_500),
        transferable: createBalance(500).toBn(),
      }
    )
  })
})

function testBalances(balances: DeriveBalancesAll, expected: Balances) {
  const actual = toBalances(balances)
  expect(actual.locked.toNumber()).toBe(expected.locked.toNumber())
  expect(actual.recoverable.toNumber()).toBe(expected.recoverable.toNumber())
  expect(actual.total.toNumber()).toBe(expected.total.toNumber())
  expect(actual.transferable.toNumber()).toBe(expected.transferable.toNumber())
  expect(actual.locks.length).toEqual(expected.locks.length)
  expect(actual.locks).toEqual(expected.locks)
}

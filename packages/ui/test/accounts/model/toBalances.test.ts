import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { lockTypes } from '@/accounts/model/lockTypes'
import { toBalances } from '@/accounts/model/toBalances'
import { Balances } from '@/accounts/types'

import { createBalance, getBalanceLock } from '../../_mocks/chainTypes'
import { EMPTY_BALANCES } from '../../_mocks/transactions'

describe('toBalances', () => {
  it('Empty', () => {
    testBalances(EMPTY_BALANCES, {
      locked: new BN(0),
      locks: [],
      recoverable: new BN(0),
      total: new BN(0),
      transferable: new BN(0),
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
        locked: new BN(0),
        locks: [],
        recoverable: new BN(0),
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
        lockedBreakdown: [getBalanceLock(200)],
        votingBalance: createBalance(387),
      },
      {
        locked: createBalance(200).toBn(),
        locks: [
          {
            amount: createBalance(200).toBn(),
            type: lockTypes['0x0909090909090909'],
            isRecoverable: false,
          },
        ],
        recoverable: new BN(0),
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
        lockedBreakdown: [getBalanceLock(200)],
        votingBalance: createBalance(200),
      },
      {
        locked: createBalance(200).toBn(),
        locks: [
          {
            amount: createBalance(200).toBn(),
            type: lockTypes['0x0909090909090909'],
            isRecoverable: false,
          },
        ],
        recoverable: new BN(0),
        total: new BN(200),
        transferable: new BN(0),
      }
    )
  })

  it('Recoverable', () => {
    testBalances(
      {
        ...EMPTY_BALANCES,
        availableBalance: createBalance(187),
        freeBalance: createBalance(10_187),
        frozenFee: createBalance(10_000),
        frozenMisc: createBalance(10_000),
        lockedBalance: createBalance(10_000),
        lockedBreakdown: [getBalanceLock(200, 11), getBalanceLock(10_000, 9)],
        votingBalance: createBalance(10_187),
      },
      {
        locked: createBalance(10_000).toBn(),
        locks: [
          {
            amount: createBalance(200).toBn(),
            type: lockTypes['0x0b0b0b0b0b0b0b0b'],
            isRecoverable: true,
          },
          {
            amount: createBalance(10_000).toBn(),
            type: lockTypes['0x0909090909090909'],
            isRecoverable: false,
          },
        ],
        recoverable: new BN(200),
        total: new BN(10_187),
        transferable: createBalance(187).toBn(),
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

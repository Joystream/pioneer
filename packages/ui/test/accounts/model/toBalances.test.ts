import { createType } from '@joystream/types'
import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { lockTypes } from '@/accounts/model/lockTypes'
import { toBalances } from '@/accounts/model/toBalances'
import { Balances } from '@/accounts/types'

const createBalance = (value: number) => {
  return createType('Balance', new BN(value))
}

const EMPTY_BALANCES = {
  accountId: createType('AccountId', '0x00'),
  accountNonce: createType('Index', 1),
  availableBalance: createBalance(0),
  freeBalance: createBalance(0),
  frozenFee: createBalance(0),
  frozenMisc: createBalance(0),
  isVesting: false,
  lockedBalance: createBalance(0),
  lockedBreakdown: [],
  reservedBalance: createBalance(0),
  vestedBalance: createBalance(0),
  vestedClaimable: createBalance(0),
  vestingEndBlock: createType('BlockNumber', 1234),
  vestingLocked: createBalance(0),
  vestingPerBlock: createBalance(0),
  vestingTotal: createBalance(0),
  votingBalance: createBalance(0),
}

const getBalanceLock = (amount: number) =>
  createType('BalanceLock', {
    id: createType('LockIdentifier', new Uint8Array([11, 11, 11, 11, 11, 11, 11, 11])),
    amount: createBalance(amount),
    reasons: createType('Reasons', 'all'),
  })

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
            type: lockTypes['0x0b0b0b0b0b0b0b0b'],
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
            type: lockTypes['0x0b0b0b0b0b0b0b0b'],
          },
        ],
        recoverable: new BN(0),
        total: new BN(200),
        transferable: new BN(0),
      }
    )
  })
})

function testBalances(balances: DeriveBalancesAll, expected: Balances) {
  const actual = toBalances(balances)
  expect(actual.locked.eq(expected.locked)).toBeTruthy()
  expect(actual.recoverable.eq(expected.recoverable)).toBeTruthy()
  expect(actual.total.eq(expected.total)).toBeTruthy()
  expect(actual.transferable.eq(expected.transferable)).toBeTruthy()
  expect(actual.locks.length).toEqual(expected.locks.length)
  expect(actual.locks).toEqual(expected.locks)
}

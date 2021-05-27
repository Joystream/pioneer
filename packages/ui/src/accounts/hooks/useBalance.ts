import { createType } from '@joystream/types'
import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { LockIdentifier } from '@polkadot/types/interfaces'
import BN from 'bn.js'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'

import { DetailedBalances } from '../types'

const lockTypes = [
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

function lockLookup(id: LockIdentifier) {
  const foundLock = lockTypes.find((lockType) => id.eq(lockType.type))

  return foundLock ? foundLock : { reason: <string>id.toHuman() }
}

export function toBalances(balances: DeriveBalancesAll): DetailedBalances {
  const { lockedBalance, availableBalance } = balances

  const locks = balances.lockedBreakdown
    ? balances.lockedBreakdown.map((lock) => {
        return {
          amount: new BN(lock.amount),
          info: lockLookup(lock.id),
        }
      })
    : []

  const maxLockAmount = new BN(locks.length ? Math.max(...locks.map((lock) => lock.amount.toNumber())) : 0)
  const recoverableBalance = new BN(0)

  return {
    total: availableBalance.add(lockedBalance),
    transferable: availableBalance.add(maxLockAmount),
    locked: lockedBalance,
    recoverable: recoverableBalance,
    locks,
  }
}

export const useBalance = (address?: Address): DetailedBalances | null => {
  const { api } = useApi()

  const balances = useObservable(address ? api?.derive.balances.all(address) : undefined, [api, address])

  if (balances === undefined) {
    return null
  }

  return toBalances(balances)
}

import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { LockIdentifier } from '@polkadot/types/interfaces'
import BN from 'bn.js'

import { lockTypes } from '@/accounts/model/lockTypes'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'

import { DetailedBalances } from '../types'

function lockLookup(id: LockIdentifier) {
  const foundLock = lockTypes.find((lockType) => id.eq(lockType.type))

  return foundLock ? { id: foundLock.id, reason: foundLock.reason } : { reason: <string>id.toHuman() }
}

export function toBalances(balances: DeriveBalancesAll): DetailedBalances {
  const { lockedBalance, availableBalance } = balances

  const locks = balances.lockedBreakdown
    ? balances.lockedBreakdown.map((lock) => {
        return {
          amount: new BN(lock.amount),
          ...lockLookup(lock.id),
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

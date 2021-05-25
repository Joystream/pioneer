import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { Address } from '@/common/types'

import { Balances } from '../types'

export function toBalances(balances: DeriveBalancesAll): Balances {
  const { lockedBalance, availableBalance } = balances

  const locks = balances.lockedBreakdown.map((lock) => {
    return {
      amount: new BN(lock.amount),
      reason: <string>lock.id.toHuman(),
    }
  })
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

export const useBalance = (address?: Address): Balances | null => {
  const { api } = useApi()

  const balances = useObservable(address ? api?.derive.balances.all(address) : undefined, [api, address])

  if (balances === undefined) {
    return null
  }

  return toBalances(balances)
}

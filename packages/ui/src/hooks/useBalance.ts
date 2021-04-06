import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { Address, Balances } from '../common/types'
import { useApi } from './useApi'
import { useObservable } from './useObservable'

export function toBalances(balances: DeriveBalancesAll): Balances {
  const { lockedBalance, availableBalance } = balances

  return {
    total: availableBalance.add(lockedBalance),
    transferable: availableBalance,
    locked: lockedBalance,
    recoverable: new BN(0),
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

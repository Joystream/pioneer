import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'
import { Account, Balances } from './types'
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

export function useBalance(account: Account | undefined): Balances | null {
  const { api } = useApi()
  const balances = useObservable(account && api?.derive.balances.all(account?.address), [api, account])

  if (balances === undefined) {
    return null
  }

  return toBalances(balances)
}

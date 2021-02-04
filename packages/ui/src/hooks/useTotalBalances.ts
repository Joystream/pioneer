import BN from 'bn.js'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { useAccounts } from './useAccounts'
import { useApi } from './useApi'
import { toBalances, UseBalance } from './useBalance'
import { useObservable } from './useObservable'

export const zeroBalance = () => ({
  recoverable: new BN(0),
  locked: new BN(0),
  transferable: new BN(0),
  total: new BN(0),
})

const addBalances = (a: UseBalance, b: UseBalance) => ({
  recoverable: a.recoverable.add(b.recoverable),
  locked: a.locked.add(b.locked),
  transferable: a.transferable.add(b.transferable),
  total: a.total.add(b.total),
})

export function useTotalBalances(): UseBalance {
  const { hasAccounts, allAccounts } = useAccounts()
  const { isConnected, api } = useApi()

  const addresses = allAccounts.map((account) => account.address)
  const balancesObs = api ? addresses.map((address) => api.derive.balances.all(address).pipe(map(toBalances))) : []
  const observable = combineLatest(balancesObs).pipe(map((balances) => balances.reduce(addBalances, zeroBalance())))

  const result = useObservable(observable, [api, JSON.stringify(addresses)])

  if (hasAccounts && isConnected && result) {
    return result
  }

  return zeroBalance()
}

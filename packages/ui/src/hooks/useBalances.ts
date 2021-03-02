import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { Address } from '../common/types'
import { useAccounts } from './useAccounts'
import { useApi } from './useApi'
import { Balances, toBalances } from './useBalance'
import { useObservable } from './useObservable'

export type AddressToBalanceMap = {
  [key in Address]: Balances
}

export function useBalances() {
  const { hasAccounts, allAccounts } = useAccounts()
  const { isConnected, api } = useApi()

  const addresses = allAccounts.map((account) => account.address)
  const balancesObs = api ? addresses.map((address) => api.derive.balances.all(address).pipe(map(toBalances))) : []

  const result = useObservable(combineLatest(balancesObs), [api, JSON.stringify(addresses)])

  if (hasAccounts && isConnected && result) {
    return result.reduce((acc, balance, index) => {
      return {
        ...{ [addresses[index]]: balance },
        ...acc,
      }
    }, {} as AddressToBalanceMap)
  }

  return {}
}

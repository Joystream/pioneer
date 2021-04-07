import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { useApi } from '../../common/hooks/useApi'
import { useObservable } from '../../common/hooks/useObservable'
import { AddressToBalanceMap } from '../../common/types'

import { useAccounts } from './useAccounts'
import { toBalances } from './useBalance'

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

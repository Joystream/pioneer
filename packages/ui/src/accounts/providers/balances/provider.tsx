import React, { ReactNode, useMemo } from 'react'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { AddressToBalanceMap } from '../../types'

import { BalancesContext } from './context'

interface Props {
  children: ReactNode
}
export const BalancesContextProvider = (props: Props) => {
  const { allAccounts, isLoading } = useMyAccounts()
  const { api } = useApi()

  const addresses = allAccounts.map((account) => account.address)
  const result = useObservable(
    () => combineLatest(api ? addresses.map((address) => api.derive.balances.all(address).pipe(map(toBalances))) : []),
    [api?.isConnected, JSON.stringify(addresses)]
  )

  const balances = useMemo(() => {
    if (!addresses.length) return {}

    if (!isLoading && result)
      return result.reduce((acc, balance, index) => {
        return {
          ...{ [addresses[index]]: balance },
          ...acc,
        }
      }, {} as AddressToBalanceMap)
  }, [result, addresses])

  return <BalancesContext.Provider value={balances}>{props.children}</BalancesContext.Provider>
}

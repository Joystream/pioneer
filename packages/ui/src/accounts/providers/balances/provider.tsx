import React, { ReactNode, useMemo } from 'react'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { toBalances } from '@/accounts/model/toBalances'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { AddressToBalanceMap } from '../../types'

import { BalancesContext } from './context'

interface Props {
  children: ReactNode
}
export const BalancesContextProvider = (props: Props) => {
  const { allAccounts } = useMyAccounts()
  const { isConnected, api } = useApi()

  const addresses = allAccounts.map((account) => account.address)
  const balancesObs = api ? addresses.map((address) => api.derive.balances.all(address).pipe(map(toBalances))) : []

  const result = useObservable(combineLatest(balancesObs), [isConnected, JSON.stringify(addresses)])

  const balances = useMemo(
    () =>
      (result ?? []).reduce((acc, balance, index) => {
        return {
          ...{ [addresses[index]]: balance },
          ...acc,
        }
      }, {} as AddressToBalanceMap),
    [result]
  )

  return <BalancesContext.Provider value={balances}>{props.children}</BalancesContext.Provider>
}

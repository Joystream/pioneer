import { useEffect, useState } from 'react'
import { useApi } from './useApi'
import { Account, Address } from './types'
import BN from 'bn.js'
import { AccountInfo } from '@polkadot/types/interfaces'

interface Balance {
  total: BN
}

type AddressToBalanceMap = {
  [key in Address]: Balance
}

export interface UseBalances {
  hasBalances: boolean
  map: AddressToBalanceMap
}

export function useBalances(accounts: Account[]): UseBalances {
  const [balances, setBalances] = useState<AddressToBalanceMap>({})
  const [hasBalances, setHasBalances] = useState(false)
  const { isConnected, api } = useApi()

  useEffect(() => {
    let unsubscribeAll: any

    if (isConnected && api) {
      const addresses = accounts.map((account) => account.address)

      api.query.system.account
        .multi<AccountInfo>(addresses, (balances) => {
          const balancesMap = addresses.reduce((acc, address, index) => {
            const accountInfo = balances[index]
            const free = accountInfo.data.free

            return {
              ...acc,
              [address]: {
                total: free.toBn(),
              },
            }
          }, {})

          setBalances(balancesMap)
          setHasBalances(true)
        })
        .then((unsub) => (unsubscribeAll = unsub))
    }

    return () => unsubscribeAll && unsubscribeAll()
  }, [api, isConnected, accounts])

  return {
    hasBalances: hasBalances,
    map: balances,
  }
}

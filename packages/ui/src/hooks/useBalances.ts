import { useEffect, useState } from 'react'
import { AccountInfo } from '@polkadot/types/interfaces'
import { Account } from './useAccounts'
import { useApi } from './useApi'

interface Balance {
  total: string
}

interface AddressToBalanceMap {
  [key: string]: Balance
}

interface UseBalances {
  hasBalances: boolean
  map: AddressToBalanceMap
}

export function useBalances(accounts: Account[]): UseBalances {
  const [balances, setBalances] = useState<AddressToBalanceMap>({})
  const [hasBalances, setHasBalances] = useState(false)
  const { isConnected, api } = useApi()

  useEffect(() => {
    if (isConnected && api) {
      const addresses = accounts.map((account) => account.address)

      api.query.system.account.multi<AccountInfo>(addresses, (balances) => {
        const balancesMap = addresses.reduce(
          (acc, address, index) => ({
            ...acc,
            [address]: {
              total: balances[index].data.free.toHuman(),
            },
          }),
          {}
        )

        setBalances(balancesMap)
        setHasBalances(true)
      })
    }
  }, [isConnected])

  return {
    hasBalances: hasBalances,
    map: balances,
  }
}

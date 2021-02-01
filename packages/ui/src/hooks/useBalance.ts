import { useEffect, useState } from 'react'
import { useApi } from './useApi'
import { Account } from './types'
import BN from 'bn.js'

export interface UseBalance {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}

export function useBalance(account: Account): UseBalance | null {
  const [balance, setBalance] = useState<UseBalance | null>(null)
  const { isConnected, api } = useApi()

  useEffect(() => {
    let unsubscribeAll: any

    if (isConnected && api) {
      const address = account?.address

      api.derive.balances.all(address, ({ freeBalance, lockedBalance }) => {
        setBalance({
          total: freeBalance.add(lockedBalance),
          transferable: freeBalance,
          locked: lockedBalance,
          recoverable: new BN(0),
        })
      })
    }

    return () => unsubscribeAll && unsubscribeAll()
  }, [api, isConnected, account])

  return balance
}

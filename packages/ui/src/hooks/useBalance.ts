import { useEffect, useState } from 'react'
import { useApi } from './useApi'
import { Account } from './types'
import BN from 'bn.js'
import { Subscription } from 'rxjs'

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
    let subscription: Subscription

    if (isConnected && api) {
      const address = account?.address

      subscription = api.derive.balances.all(address).subscribe(({ freeBalance, lockedBalance }) => {
        setBalance({
          total: freeBalance.add(lockedBalance),
          transferable: freeBalance,
          locked: lockedBalance,
          recoverable: new BN(0),
        })
      })
    }

    return () => subscription && subscription.unsubscribe()
  }, [api, isConnected, account])

  return balance
}

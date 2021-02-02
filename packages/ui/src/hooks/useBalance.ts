import BN from 'bn.js'

import { useApi } from './useApi'
import { useObservable } from './useObservable'
import { Account } from './types'

export interface UseBalance {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}

export function useBalance(account: Account): UseBalance | null {
  const { api } = useApi()
  const [balances] = useObservable(api?.derive.balances.all(account?.address), [api, account])

  if (balances === undefined) {
    return null
  }

  const { freeBalance, lockedBalance } = balances

  return {
    total: freeBalance.add(lockedBalance),
    transferable: freeBalance,
    locked: lockedBalance,
    recoverable: new BN(0),
  }
}

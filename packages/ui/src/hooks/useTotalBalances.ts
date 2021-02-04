import BN from 'bn.js'
import { useAccounts } from './useAccounts'
import { useApi } from './useApi'

export interface UseBalance {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}

export function useTotalBalances(): UseBalance {
  const { hasAccounts } = useAccounts()
  const { isConnected } = useApi()

  if (!hasAccounts || !isConnected) {
    return {
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
    }
  }

  return {
    total: new BN(100_000),
    transferable: new BN(50_000),
    locked: new BN(50_000),
    recoverable: new BN(0),
  }
}

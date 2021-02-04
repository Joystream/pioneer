import BN from 'bn.js'

export interface UseBalance {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}

export function useTotalBalances(): UseBalance | null {
  return {
    total: new BN(0),
    transferable: new BN(0),
    locked: new BN(0),
    recoverable: new BN(0),
  }
}

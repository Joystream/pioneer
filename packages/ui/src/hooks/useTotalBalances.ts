import BN from 'bn.js'
import { UseBalance } from './useBalance'
import { useBalances } from './useBalances'

export const zeroBalance = () => ({
  recoverable: new BN(0),
  locked: new BN(0),
  transferable: new BN(0),
  total: new BN(0),
})

const addBalances = (a: UseBalance, b: UseBalance) => ({
  recoverable: a.recoverable.add(b.recoverable),
  locked: a.locked.add(b.locked),
  transferable: a.transferable.add(b.transferable),
  total: a.total.add(b.total),
})

export function useTotalBalances(): UseBalance {
  const balances = useBalances()

  return [...Object.values(balances)].reduce(addBalances, zeroBalance())
}

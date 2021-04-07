import BN from 'bn.js'

import { Balances } from '../types'

import { useBalances } from './useBalances'

export const zeroBalance = () => ({
  recoverable: new BN(0),
  locked: new BN(0),
  transferable: new BN(0),
  total: new BN(0),
})

const addBalances = (a: Balances, b: Balances) => ({
  recoverable: a.recoverable.add(b.recoverable),
  locked: a.locked.add(b.locked),
  transferable: a.transferable.add(b.transferable),
  total: a.total.add(b.total),
})

export function useTotalBalances(): Balances {
  const balances = useBalances()

  return [...Object.values(balances)].reduce(addBalances, zeroBalance())
}

import { BN_ZERO } from '@/common/constants'

import { Balances } from '../types'

import { useMyBalances } from './useMyBalances'

export const zeroBalance = {
  recoverable: BN_ZERO,
  locked: BN_ZERO,
  transferable: BN_ZERO,
  total: BN_ZERO,
  locks: [],
  vestingTotal: BN_ZERO,
  vestedClaimable: BN_ZERO,
  vestedBalance: BN_ZERO,
  vesting: [],
  vestingLocked: BN_ZERO,
}

const addBalances = (a: Balances, b: Balances) => ({
  recoverable: a.recoverable.add(b.recoverable),
  locked: a.locked.add(b.locked),
  transferable: a.transferable.add(b.transferable),
  total: a.total.add(b.total),
  locks: a.locks.concat(b.locks),
  vestingTotal: a.vestingTotal?.add(b.vestingTotal) ?? BN_ZERO,
  vestedClaimable: a.vestedClaimable?.add(b.vestedClaimable) ?? BN_ZERO,
  vestedBalance: a.vestedBalance?.add(b.vestedBalance) ?? BN_ZERO,
  vesting: a.vesting?.concat(b.vesting) ?? [],
  vestingLocked: a.vestingLocked?.add(b.vestingLocked) ?? BN_ZERO,
})

export function useMyTotalBalances(): Balances {
  const balances = useMyBalances()

  return Object.values(balances ?? {}).reduce(addBalances, zeroBalance)
}

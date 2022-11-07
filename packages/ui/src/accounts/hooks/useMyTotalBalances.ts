import { BN_ZERO } from '@/common/constants'
import { sumBN } from '@/common/utils/bn'

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
  total: sumBN(a.total, b.total),
  locks: a.locks.concat(b.locks),
  locked: sumBN(a.locked, b.locked),
  transferable: sumBN(a.transferable, b.transferable),
  recoverable: sumBN(a.recoverable, b.recoverable),
  vestingTotal: sumBN(a.vestingTotal, b.vestingTotal),
  vestedClaimable: sumBN(a.vestedClaimable, b.vestedClaimable),
  vestedBalance: sumBN(a.vestedBalance, b.vestedBalance),
  vesting: a.vesting.concat(b.vesting),
  vestingLocked: sumBN(a.vestingLocked, b.vestingLocked),
})

export function useMyTotalBalances(): Balances {
  const balances = useMyBalances()

  return Object.values(balances ?? {}).reduce(addBalances, zeroBalance)
}

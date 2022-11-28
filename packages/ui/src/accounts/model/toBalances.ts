import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import BN from 'bn.js'

import { isRecoverable, lockLookup } from '@/accounts/model/lockTypes'
import { BalanceLock, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'

const max = (max: BN, { amount }: BalanceLock) => {
  return max.gt(amount) ? max : amount
}

export const toBalances = (balances: DeriveBalancesAll): Balances => {
  const {
    lockedBalance,
    availableBalance,
    lockedBreakdown,
    freeBalance,
    reservedBalance,
    vesting,
    vestingTotal,
    vestedClaimable,
    vestedBalance,
    vestingLocked,
  } = balances

  const locks: BalanceLock[] = lockedBreakdown.map((lock) => {
    const lockType = lockLookup(lock.id)

    return {
      amount: lock.amount.toBn(),
      type: lockType,
    }
  })

  const transferable = availableBalance.toBn()
  const locked = lockedBalance.toBn()
  const total = freeBalance.toBn().add(reservedBalance)

  // case: 1M recoverable vote stake, 2M locked nomination => user recovers 1M to vote 2M next time.
  const recoverableLockMax = locks.filter(({ type }) => isRecoverable(type)).reduce(max, BN_ZERO)
  //const nonRecoverableMax = locks.filter(({ type }) => !isRecoverable(type)).reduce(max, BN_ZERO)
  // The 1M is recoverable in full despite the nomination not just BN_ZERO,
  // however not transferable after recovering due to the nomination lock. Was this the idea behind:
  //const recoverable = recoverableLockMax.lte(nonRecoverableMax) ? BN_ZERO : recoverableLockMax.sub(nonRecoverableMax)

  // totals being lower than vesting causes confusing UI
  return {
    locked: vestingLocked > locked ? vestingLocked : locked,
    locks,
    recoverable: recoverableLockMax.add(vestedClaimable),
    total: vestingTotal > total ? vestingTotal : total,
    transferable,
    vesting,
    vestingTotal,
    vestedClaimable,
    vestedBalance,
    vestingLocked,
  }
}

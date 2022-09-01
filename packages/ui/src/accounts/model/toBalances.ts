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

  const recoverableLockMax = locks.filter(({ type }) => isRecoverable(type)).reduce(max, BN_ZERO)
  const nonRecoverableMax = locks.filter(({ type }) => !isRecoverable(type)).reduce(max, BN_ZERO)
  const recoverable = recoverableLockMax.lte(nonRecoverableMax) ? BN_ZERO : recoverableLockMax.sub(nonRecoverableMax)

  return {
    locked,
    locks,
    recoverable,
    total,
    transferable,
    vesting,
    vestingTotal,
    vestedClaimable,
    vestedBalance,
    vestingLocked,
  }
}

import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { LockIdentifier } from '@polkadot/types/interfaces'
import BN from 'bn.js'

import { isRecoverable, lockTypes } from '@/accounts/model/lockTypes'
import { BalanceLock, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'

const lockLookup = (id: LockIdentifier) => {
  return lockTypes[id.toHex()] || capitalizeFirstLetter(<string>id.toHuman()).trim()
}

const max = (max: BN, { amount }: BalanceLock) => {
  return max.gt(amount) ? max : amount
}

export function toBalances(balances: DeriveBalancesAll): Balances {
  const { lockedBalance, availableBalance, lockedBreakdown, freeBalance, reservedBalance } = balances

  const locks = lockedBreakdown.map((lock) => {
    const lockType = lockLookup(lock.id)

    return {
      amount: lock.amount,
      type: lockType,
      isRecoverable: isRecoverable(lockType),
    }
  })

  const transferable = availableBalance.toBn()
  const locked = lockedBalance.toBn()
  const total = freeBalance.toBn().add(reservedBalance)

  const recoverableLockMax = locks.filter(({ isRecoverable }) => isRecoverable).reduce(max, BN_ZERO)
  const nonRecoverableMax = locks.filter(({ isRecoverable }) => !isRecoverable).reduce(max, BN_ZERO)
  const recoverable = recoverableLockMax.lte(nonRecoverableMax) ? BN_ZERO : recoverableLockMax.sub(nonRecoverableMax)

  return {
    locked,
    locks,
    recoverable,
    total,
    transferable,
  }
}

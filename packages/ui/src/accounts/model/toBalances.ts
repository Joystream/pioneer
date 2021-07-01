import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { LockIdentifier } from '@polkadot/types/interfaces'
import BN from 'bn.js'

import { isRecoverable, lockTypes } from '@/accounts/model/lockTypes'
import { Balances } from '@/accounts/types'
import { capitalizeFirstLetter } from '@/common/helpers'

function lockLookup(id: LockIdentifier) {
  return lockTypes[id.toHex()] || capitalizeFirstLetter(<string>id.toHuman()).trim()
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
  const recoverable = locks
    .filter(({ isRecoverable }) => isRecoverable)
    .reduce((acc, { amount }) => acc.add(amount), new BN(0))

  return {
    locked,
    locks,
    recoverable,
    total,
    transferable,
  }
}

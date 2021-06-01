import { DeriveBalancesAll } from '@polkadot/api-derive/types'
import { LockIdentifier } from '@polkadot/types/interfaces'
import BN from 'bn.js'

import { lockTypes } from '@/accounts/model/lockTypes'
import { Balances } from '@/accounts/types'
import { capitalizeFirstLetter } from '@/common/helpers'

function lockLookup(id: LockIdentifier) {
  return lockTypes[id.toHex()] || capitalizeFirstLetter(<string>id.toHuman()).trim()
}

export function toBalances(balances: DeriveBalancesAll): Balances {
  const { lockedBalance, availableBalance, lockedBreakdown, freeBalance, reservedBalance } = balances

  const locks = lockedBreakdown.map((lock) => ({
    amount: lock.amount,
    type: lockLookup(lock.id),
  }))

  const transferable = availableBalance.toBn()
  const locked = lockedBalance.toBn()
  const total = freeBalance.toBn().add(reservedBalance)

  return {
    locked,
    locks,
    recoverable: new BN(0),
    total,
    transferable,
  }
}

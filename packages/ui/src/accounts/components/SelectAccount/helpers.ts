import BN from 'bn.js'

import { areLocksConflicting } from '../../model/lockTypes'
import { Account, Balances, LockType } from '../../types'

export function filterByText(accounts: Account[], text: string) {
  return accounts.filter(
    (item) => item.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.address.includes(text)
  )
}

export const filterByRequiredStake = (requiredStake: BN, stakeLock: LockType, balances?: Balances) => {
  return !!balances && balances.transferable.gte(requiredStake) && !areLocksConflicting(stakeLock, balances.locks)
}

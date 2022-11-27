import { Comparator } from '@/common/model/Comparator'

import { Account, AddressToBalanceMap, Balances } from '../types'

import { BalanceComparator } from './BalanceComparator'

export type SortKey = keyof Omit<Balances, 'locks' | 'vesting'> | 'name'

export function sortAccounts(
  accounts: Account[],
  balanceMap: AddressToBalanceMap | undefined,
  key: SortKey,
  isDescending = false
) {
  return key === 'name'
    ? [...accounts].sort(Comparator<Account>(isDescending, key).string)
    : balanceMap
    ? [...accounts].sort(BalanceComparator(balanceMap, key, isDescending))
    : accounts
}

export const addClaimable = (b: Balances | null) => {
  if (b?.recoverable && b?.vestedClaimable) {
    return { ...b, recoverable: b.recoverable.add(b.vestedClaimable) }
  }
  return b
}

export function updateRecoverable(a2b: AddressToBalanceMap | undefined) {
  if (!a2b) return
  const updated: AddressToBalanceMap = {}
  Object.keys(a2b).forEach((key) => {
    const newBalances = addClaimable(a2b[key])
    if (newBalances) {
      updated[key] = newBalances
    }
  })
  return updated
}

export function setOrder(
  key: SortKey,
  sortBy: SortKey,
  setSortBy: (k: SortKey) => void,
  reversed: boolean,
  setDescending: (d: boolean) => void
) {
  if (key === sortBy) {
    setDescending(!reversed)
  } else {
    setDescending(key !== 'name')
    setSortBy(key)
  }
}

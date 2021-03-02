import { Account, AddressToBalanceMap } from 'src/common/types'
import BN from 'bn.js'
import { Balances } from '../common/types'

export type SortKey = keyof Balances | 'name'

const Comparator = {
  name: (descending: boolean) => (accountA: Account, accountB: Account) => {
    const a = accountA.name || ''
    const b = accountB.name || ''
    if (a === b) {
      return 0
    }
    return (a < b ? -1 : 1) * (descending ? -1 : 1)
  },
  balance: (balanceMap: AddressToBalanceMap, key: keyof Balances, descending: boolean) => (
    accountA: Account,
    accountB: Account
  ) => {
    const a = balanceMap[accountA.address]?.[key] || new BN(0)
    const b = balanceMap[accountB.address]?.[key] || new BN(0)
    return a.cmp(b) * (descending ? -1 : 1)
  },
}

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: SortKey, descending = false) {
  return key === 'name'
    ? accounts.sort(Comparator.name(descending))
    : accounts.sort(Comparator.balance(balanceMap, key, descending))
}

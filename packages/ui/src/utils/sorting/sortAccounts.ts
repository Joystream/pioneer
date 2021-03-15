import BN from 'bn.js'
import { Account, AddressToBalanceMap } from 'src/common/types'
import { Balances } from '../../common/types'

export type SortKey = keyof Balances | 'name'

const applyOrder = (order: number, isDescending: boolean) => order * (isDescending ? -1 : 1)

const Comparator = {
  name: (isDescending: boolean) => (accountA: Account, accountB: Account) => {
    const a = accountA.name || ''
    const b = accountB.name || ''
    return applyOrder(a.localeCompare(b), isDescending)
  },
  balance: (balanceMap: AddressToBalanceMap, key: keyof Balances, isDescending: boolean) => (
    accountA: Account,
    accountB: Account
  ) => {
    const a = balanceMap[accountA.address]?.[key] || new BN(0)
    const b = balanceMap[accountB.address]?.[key] || new BN(0)
    return applyOrder(a.cmp(b), isDescending)
  },
}

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: SortKey, isDescending = false) {
  return key === 'name'
    ? accounts.sort(Comparator.name(isDescending))
    : accounts.sort(Comparator.balance(balanceMap, key, isDescending))
}

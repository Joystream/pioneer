import { Account } from 'src/common/types'
import { AddressToBalanceMap } from 'src/hooks/useBalances'
import BN from 'bn.js'
import { Balances } from 'src/hooks/useBalance'

export type SortKey = keyof Balances | 'name'

const Comparator = {
  name: (accountA: Account, accountB: Account) => {
    const a = accountA.name || ''
    const b = accountB.name || ''
    if (a < b) {
      return -1
    }
    return a > b ? 1 : 0
  },
  balance: (balanceMap: AddressToBalanceMap, key: keyof Balances) => (accountA: Account, accountB: Account) => {
    const a = balanceMap[accountA.address]?.[key] || new BN(0)
    const b = balanceMap[accountB.address]?.[key] || new BN(0)
    return a.cmp(b)
  },
}

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: SortKey) {
  return key === 'name' ? accounts.sort(Comparator.name) : accounts.sort(Comparator.balance(balanceMap, key))
}

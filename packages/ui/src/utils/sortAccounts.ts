import { Account } from 'src/common/types'
import { AddressToBalanceMap } from 'src/hooks/useBalances'
import BN from 'bn.js'
import { Balances } from 'src/hooks/useBalance'

export type sortKey = keyof Balances | 'name'

const Comparator = {
  name: (_a: Account, _b: Account) => {
    const a = _a.name || ''
    const b = _b.name || ''
    if (a < b) {
      return -1
    }
    return a > b ? 1 : 0
  },
  balance: (balanceMap: AddressToBalanceMap, key: keyof Balances) => (_a: Account, _b: Account) => {
    const a = balanceMap[_a.address]?.[key] || new BN(0)
    const b = balanceMap[_b.address]?.[key] || new BN(0)
    return a.cmp(b)
  },
}

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: sortKey) {
  return key === 'name' ? accounts.sort(Comparator.name) : accounts.sort(Comparator.balance(balanceMap, key))
}

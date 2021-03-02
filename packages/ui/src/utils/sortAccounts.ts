import { Account } from 'src/common/types'
import { AddressToBalanceMap } from 'src/hooks/useBalances'
import BN from 'bn.js'

type Comparator = (balanceMap: AddressToBalanceMap) => (a: Account, b: Account) => number

export const accountComparator = {
  name: () => (_a: Account, _b: Account) => {
    const a = _a.name || ''
    const b = _b.name || ''
    if (a < b) {
      return -1
    }
    return a > b ? 1 : 0
  },
  totalBalance: (balanceMap: AddressToBalanceMap) => (_a: Account, _b: Account) => {
    const a = balanceMap[_a.address]?.total || new BN(0)
    const b = balanceMap[_b.address]?.total || new BN(0)
    return a.cmp(b)
  },
}

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, comparator: Comparator) {
  return accounts.sort(comparator(balanceMap))
}

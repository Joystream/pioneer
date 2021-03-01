import { Account } from 'src/common/types'

type Comparator = (a: Account, b: Account) => number

export const accountComparator = {
  name: (_a: Account, _b: Account) => {
    const a = _a.name || ''
    const b = _b.name || ''
    if (a < b) {
      return -1
    }
    return a > b ? 1 : 0
  },
}

export function sortAccounts(accounts: Account[], comparator: Comparator) {
  return accounts.sort(comparator)
}

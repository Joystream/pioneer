import { Account, AddressToBalanceMap } from 'src/common/types'
import { Balances } from '../../common/types'
import { BalanceComparator, Comparator } from './Comparator'

export type SortKey = keyof Balances | 'name'

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: SortKey, isDescending = false) {
  return key === 'name'
    ? accounts.sort(Comparator<Account>(isDescending, key).string)
    : accounts.sort(BalanceComparator(balanceMap, key, isDescending))
}

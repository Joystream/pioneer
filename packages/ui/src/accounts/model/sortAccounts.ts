import { Comparator } from '../../common/model/Comparator'
import { Account, AddressToBalanceMap, Balances } from '../types'

import { BalanceComparator } from './BalanceComparator'

export type SortKey = keyof Balances | 'name'

export function sortAccounts(accounts: Account[], balanceMap: AddressToBalanceMap, key: SortKey, isDescending = false) {
  return key === 'name'
    ? accounts.sort(Comparator<Account>(isDescending, key).string)
    : accounts.sort(BalanceComparator(balanceMap, key, isDescending))
}

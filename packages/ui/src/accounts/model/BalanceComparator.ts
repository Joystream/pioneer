import BN from 'bn.js'

import { applyOrder } from '@/common/model/Comparator'

import { Account, AddressToBalanceMap, Balances } from '../types'

export const BalanceComparator =
  (balanceMap: AddressToBalanceMap, key: keyof Omit<Balances, 'locks' | 'vesting'>, isDescending: boolean) =>
  (accountA: Account, accountB: Account) => {
    const a = balanceMap[accountA.address]?.[key] || new BN(0)
    const b = balanceMap[accountB.address]?.[key] || new BN(0)
    return applyOrder(a.cmp(b), isDescending)
  }

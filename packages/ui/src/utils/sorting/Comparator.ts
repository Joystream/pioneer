import BN from 'bn.js'
import { Account, AddressToBalanceMap, Balances } from '../../common/types'

const applyOrder = (order: number, isDescending: boolean) => order * (isDescending ? -1 : 1)

export const Comparator = <T>(isDescending: boolean, key: keyof T) => ({
  string: (itemA: T, itemB: T) => {
    const a = ((itemA[key] as unknown) as string) || ''
    const b = ((itemB[key] as unknown) as string) || ''
    return applyOrder(a.localeCompare(b), isDescending)
  },
  bigNumber: (itemA: T, itemB: T) => {
    const a = ((itemA[key] as unknown) as BN) || new BN(0)
    const b = ((itemB[key] as unknown) as BN) || new BN(0)
    return applyOrder(a.cmp(b), isDescending)
  },
})

export const BalanceComparator = (balanceMap: AddressToBalanceMap, key: keyof Balances, isDescending: boolean) => (
  accountA: Account,
  accountB: Account
) => {
  const a = balanceMap[accountA.address]?.[key] || new BN(0)
  const b = balanceMap[accountB.address]?.[key] || new BN(0)
  return applyOrder(a.cmp(b), isDescending)
}

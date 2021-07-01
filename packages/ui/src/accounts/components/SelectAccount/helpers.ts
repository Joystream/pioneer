import BN from 'bn.js'

import { Account, Balances } from '../../types'

export function filterByText(accounts: Account[], text: string) {
  return accounts.filter(
    (item) => item.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.address.includes(text)
  )
}

export const filterByMinBalance = (minBalance: BN, balances?: Balances) => {
  return !!balances && balances.transferable.gte(minBalance)
}

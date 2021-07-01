import BN from 'bn.js'

import { Account, AddressToBalanceMap } from '../../types'

export function filterByText(accounts: Account[], text: string) {
  return accounts.filter(
    (item) => item.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.address.includes(text)
  )
}

export function filterByMinBalance(accounts: Account[], balances: AddressToBalanceMap, minBalance: BN) {
  return accounts.filter(
    (account) => balances[account.address] && balances[account.address].transferable.gte(minBalance)
  )
}

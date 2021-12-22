import BN from 'bn.js'

import { Account, AddressToBalanceMap } from '../types'

export const filterAccounts = (allAccounts: Account[], isDisplayAll: boolean, balances: AddressToBalanceMap) =>
  isDisplayAll
    ? allAccounts
    : allAccounts.filter(({ address }) => balances[address] && balances[address].transferable.gt(new BN(0)))

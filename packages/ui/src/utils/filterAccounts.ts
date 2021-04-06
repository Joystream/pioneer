import BN from 'bn.js'

import { Account, AddressToBalanceMap } from '../common/types'

export const filterAccounts = (allAccounts: Account[], isDisplayAll: boolean, balances: AddressToBalanceMap) =>
  isDisplayAll
    ? allAccounts
    : allAccounts.filter(({ address }) => balances[address] && balances[address].total.gt(new BN(0)))

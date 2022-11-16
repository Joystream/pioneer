import BN from 'bn.js'

import { Account, AddressToBalanceMap } from '../types'

export const filterAccounts = (
  allAccounts: Account[],
  isDisplayAll: boolean,
  balances: AddressToBalanceMap | undefined
) =>
  isDisplayAll || !balances
    ? allAccounts
    : allAccounts.filter(({ address }) => balances[address]?.transferable.gt(new BN(0)))

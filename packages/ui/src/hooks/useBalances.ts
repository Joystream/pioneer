import { Account } from './useAccounts'

interface Balances {
  [key: string]: string
}

export function useBalances(accounts: Account[]) {
  const balances: Balances = accounts.reduce((acc, account) => {
    return {
      ...acc,
      [account.address]: '1000 JOY',
    }
  }, {})

  return balances
}

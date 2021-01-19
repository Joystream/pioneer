import { Account } from './useAccounts'

interface Balance {
  total: string
}

interface Balances {
  [key: string]: Balance
}

export function useBalances(accounts: Account[]) {
  const balances: Balances = accounts.reduce((acc, account) => {
    return {
      ...acc,
      [account.address]: {
        total: '1000 JOY',
      },
    }
  }, {})

  return balances
}

import { useContext } from 'react'

import { BalancesContext } from '@/accounts/providers/balances/context'

export function useMyBalances() {
  return useContext(BalancesContext)
}

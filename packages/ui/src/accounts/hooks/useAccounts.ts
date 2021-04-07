import { useContext } from 'react'

import { AccountsContext } from '../../app/providers/accounts/context'
import { UseAccounts } from '../../app/providers/accounts/provider'

export function useAccounts(): UseAccounts {
  return useContext(AccountsContext)
}

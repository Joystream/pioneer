import { useContext } from 'react'

import { AccountsContext } from '../providers/accounts/context'
import { UseAccounts } from '../providers/accounts/provider'

export function useAccounts(): UseAccounts {
  return useContext(AccountsContext)
}

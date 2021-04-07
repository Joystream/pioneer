import { createContext } from 'react'

import { UseAccounts } from './provider'

export const AccountsContext = createContext<UseAccounts>({
  hasAccounts: false,
  allAccounts: [],
})

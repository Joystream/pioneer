import { createContext } from 'react'

import { AddressToBalanceMap } from '@/accounts/types'

export const BalancesContext = createContext<AddressToBalanceMap | undefined>(undefined)

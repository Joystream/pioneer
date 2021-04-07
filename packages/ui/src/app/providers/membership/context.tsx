import { createContext } from 'react'

import { UseMembership } from './provider'

export const MembershipContext = createContext<UseMembership>({
  active: undefined,
  setActive: () => {
    /**/
  },
})

import { createContext } from 'react'

import { MyMemberships } from './provider'

export const MembershipContext = createContext<MyMemberships>({
  active: undefined,
  setActive: () => {
    /**/
  },
  members: [],
  isLoading: true,
})

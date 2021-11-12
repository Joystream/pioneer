import { createContext } from 'react'

import { MyMemberships } from './provider'

export const MembershipContext = createContext<MyMemberships>({
  active: undefined,
  setActive: () => undefined,
  members: [],
  hasMembers: false,
  isLoading: true,
  helpers: {
    getMemberIdByBoundAccountAddress: () => undefined,
  },
})

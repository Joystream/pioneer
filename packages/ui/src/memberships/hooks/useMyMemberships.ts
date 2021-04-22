import { useContext } from 'react'

import { MembershipContext } from '../providers/membership/context'

export const useMyMemberships = () => useContext(MembershipContext)

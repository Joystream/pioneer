import React, { ReactNode, useState } from 'react'
import { MemberFieldsFragment } from '../../api/queries'
import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}
export interface UseMembership {
  active?: MemberFieldsFragment
  setActive: (member: MemberFieldsFragment) => void
}

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<MemberFieldsFragment>()

  const value = {
    active,
    setActive,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}

import React, { ReactNode, useState } from 'react'

import { Member } from '../../types'

import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}

export interface UseMembership {
  active?: Member
  setActive: (member: Member) => void
}

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<Member>()

  const value = {
    active,
    setActive,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}

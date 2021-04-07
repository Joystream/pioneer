import React, { ReactNode, useState } from 'react'

import { BaseMember } from '../../../common/types'
import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}
export interface UseMembership {
  active?: BaseMember
  setActive: (member: BaseMember) => void
}

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<BaseMember>()

  const value = {
    active,
    setActive,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}

import React, { ReactNode, useState } from 'react'

import { MemberInternal } from '../../types'

import { MembershipContext } from './context'

interface Props {
  children: ReactNode
}

export interface UseMembership {
  active?: MemberInternal
  setActive: (member: MemberInternal) => void
}

export const MembershipContextProvider = (props: Props) => {
  const [active, setActive] = useState<MemberInternal>()

  const value = {
    active,
    setActive,
  }

  return <MembershipContext.Provider value={value}>{props.children}</MembershipContext.Provider>
}

import React, { useState } from 'react'

import { Confirm2Props } from '@/common/providers/confirm2/types'

import { Confirm2Context } from './context'

export const Confirm2Provier = ({ children }: { children: React.ReactNode }) => {
  const [isConfirmed, setConfrimAction] = useState<Confirm2Props>(null)

  const setIsConfirmed = (confirmAction: Confirm2Props) => {
    setConfrimAction(confirmAction)
  }

  return <Confirm2Context.Provider value={{ isConfirmed, setIsConfirmed }}>{children}</Confirm2Context.Provider>
}

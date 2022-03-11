import React, { useState } from 'react'

import { RefetchContext, UseRefetch } from './context'

interface Props {
  children: React.ReactNode
}

export const RefetchProvider = ({ children }: Props) => {
  const [refetch, setRefetch] = useState<UseRefetch[0]>()
  return (
    <RefetchContext.Provider value={[refetch, (payload) => setRefetch(() => payload)]}>
      {children}
    </RefetchContext.Provider>
  )
}

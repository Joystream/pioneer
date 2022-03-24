import React, { useState } from 'react'

import { RefetchQuery } from '@/common/types/queries'

import { RefetchContext } from './context'

interface Props {
  children: React.ReactNode
}

const fireRefetch = (obj: any, hook: string) => {
  const fn = obj[hook]

  if (fn) {
    fn()
  }
}

export const RefetchProvider = ({ children }: Props) => {
  const [refetch, setRefetch] = useState<Record<string, RefetchQuery>>({})

  return (
    <RefetchContext.Provider
      value={[
        refetch,
        (hook: string, action: RefetchQuery) => setRefetch((prev) => ({ ...prev, [hook]: action })),
        (hook: string) => fireRefetch(refetch, hook),
      ]}
    >
      {children}
    </RefetchContext.Provider>
  )
}

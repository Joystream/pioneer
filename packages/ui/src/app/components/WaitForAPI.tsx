import React, { ReactNode } from 'react'

import { Loading } from '@/common/components/Loading'
import { useApi } from '@/common/hooks/useApi'

export const WaitForAPI = ({ children }: { children: ReactNode }) => {
  const { connectionState } = useApi()

  if (connectionState === 'connecting') {
    return <Loading text="Waiting for API initialization" />
  }

  return <>{children}</>
}

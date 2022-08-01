import React, { ReactNode } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { Loading } from '@/common/components/Loading'

export const WaitForAPI = ({ children }: { children: ReactNode }) => {
  const { connectionState } = useApi()

  if (connectionState === 'connecting') {
    return <Loading text="Waiting for API initialization..." />
  }

  return <>{children}</>
}

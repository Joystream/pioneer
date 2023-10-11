import React, { FC } from 'react'

import { BackendContext, BackendContextValue } from '@/app/providers/backend/context'

export type MockBackendProps = {
  backend?: {
    notificationsSettingsMap?: BackendContextValue['notificationsSettingsMap']
    onSetMemberSettings?: (memberId: string, settings: any) => void
  }
}

export const MockBackendProvider: FC<MockBackendProps> = ({ children, backend }) => {
  return (
    <BackendContext.Provider
      value={{
        backendClient: undefined,
        notificationsSettingsMap: backend?.notificationsSettingsMap,
        setMemberSettings: (memberId, settings) => backend?.onSetMemberSettings?.(memberId, settings),
      }}
    >
      {children}
    </BackendContext.Provider>
  )
}

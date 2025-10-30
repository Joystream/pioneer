import React, { FC } from 'react'

import { BackendContext, BackendContextValue } from '@/app/providers/backend/context'

export type MockBackendProps = {
  backend?: {
    notificationsSettingsMap?: BackendContextValue['notificationsSettingsMap']
    onSetMemberSettings?: (memberId: string, settings: any) => void
    authToken?: string
  }
}

export const MockBackendProvider: FC<MockBackendProps> = ({ children, backend }) => {
  return (
    <BackendContext.Provider
      value={{
        backendClient: { mocked: true } as any, // so that backendClient checks don't skip queries
        notificationsSettingsMap: backend?.notificationsSettingsMap,
        setMemberSettings: (memberId, settings) => backend?.onSetMemberSettings?.(memberId, settings),
        authToken: backend?.authToken,
      }}
    >
      {children}
    </BackendContext.Provider>
  )
}

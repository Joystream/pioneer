import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'

import { BackendContext, MemberNotificationSettingsData, MemberNotificationsRecord } from './context'

export const BackendProvider = (props: { children: ReactNode }) => {
  const [backendClient, setBackendClient] = useState<ApolloClient<any>>()
  const [endpoints] = useNetworkEndpoints()
  const [notificationsSettingsMap, setNotificationsSettingsMap] =
    useLocalStorage<MemberNotificationsRecord>('notificationSettings')

  useEffect(() => {
    if (backendClient || !endpoints.backendEndpoint) return

    const client = new ApolloClient({
      link: new HttpLink({ uri: endpoints.backendEndpoint }),
      cache: new InMemoryCache(),
    })
    setBackendClient(client)
  }, [endpoints.backendEndpoint])

  const setMemberSettings = useCallback((memberId: string, settings: Partial<MemberNotificationSettingsData>) => {
    setNotificationsSettingsMap((prev) => ({
      ...prev,
      [memberId]: {
        ...prev?.[memberId],
        ...settings,
      },
    }))
  }, [])

  return (
    <BackendContext.Provider
      value={{
        backendClient,
        notificationsSettingsMap,
        setMemberSettings,
      }}
      {...props}
    />
  )
}

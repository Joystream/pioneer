import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, makeVar, useReactiveVar } from '@apollo/client'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { BackendContext, MemberNotificationSettingsData, MemberNotificationsRecord } from './context'

const backendAuthTokenVar = makeVar<string | null>(null)

export const BackendProvider = (props: { children: ReactNode }) => {
  const [backendClient, setBackendClient] = useState<ApolloClient<any>>()
  const [endpoints] = useNetworkEndpoints()
  const [notificationsSettingsMap, setNotificationsSettingsMap] =
    useLocalStorage<MemberNotificationsRecord>('notificationSettings')
  const { active: activeMember } = useMyMemberships()
  const activeMemberSettings = activeMember?.id ? notificationsSettingsMap?.[activeMember.id] : null

  useEffect(() => {
    if (backendClient || !endpoints.backendEndpoint) return

    const httpLink = new HttpLink({ uri: endpoints.backendEndpoint })

    const authLink = new ApolloLink((operation, forward) => {
      const token = backendAuthTokenVar()

      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      return forward(operation)
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
    setBackendClient(client)
  }, [endpoints.backendEndpoint])

  // update Apollo client auth token when active member changes
  useEffect(() => {
    if (!backendClient || !activeMemberSettings?.accessToken) return

    backendAuthTokenVar(activeMemberSettings.accessToken)
  }, [backendClient, activeMemberSettings?.accessToken])

  const authToken = useReactiveVar(backendAuthTokenVar)

  // Refetch backend queries after Apollo client auth token changes (warning: the changes are async).
  useEffect(() => {
    backendClient?.refetchQueries({ include: 'active' })
  }, [authToken])

  const setMemberSettings = useCallback(
    (memberId: string, settings: Partial<MemberNotificationSettingsData>) => {
      setNotificationsSettingsMap((prev) => ({
        ...prev,
        [memberId]: {
          ...prev?.[memberId],
          ...settings,
        },
      }))

      if (activeMember?.id === memberId && settings.accessToken) {
        backendAuthTokenVar(settings.accessToken)
      }
    },
    [activeMember?.id]
  )

  return (
    <BackendContext.Provider
      value={{
        backendClient,
        notificationsSettingsMap,
        setMemberSettings,
        authToken: authToken ?? undefined,
      }}
      {...props}
    />
  )
}

import { ApolloClient } from '@apollo/client'
import { createContext } from 'react'

export type MemberNotificationSettingsData = {
  hasBeenAskedForEmail?: boolean
  accessToken?: string
}

export type MemberNotificationsRecord = Record<string, MemberNotificationSettingsData>

export type BackendContextValue = {
  backendClient?: ApolloClient<any>
  notificationsSettingsMap?: MemberNotificationsRecord
  setMemberSettings: (memberId: string, settings: Partial<MemberNotificationSettingsData>) => void
  authToken?: string
}

export const BackendContext = createContext<BackendContextValue>({ setMemberSettings: () => null })

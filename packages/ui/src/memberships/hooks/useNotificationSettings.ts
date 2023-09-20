import { useContext } from 'react'

import { BackendContext } from '@/app/providers/backend/context'

import { useGetBackendMemberExistsQuery } from '../queries/__generated__/backend.generated'

import { useMyMemberships } from './useMyMemberships'

export const useNotificationSettings = () => {
  const { active: activeMember } = useMyMemberships()
  const backendContext = useContext(BackendContext)
  if (!backendContext) throw new Error('Missing backend context')
  const { backendClient, notificationsSettingsMap, setMemberSettings } = backendContext
  const memberExistsQueryEnabled = !!backendClient && !!activeMember?.id
  const { data } = useGetBackendMemberExistsQuery({
    client: backendClient,
    variables: { id: parseInt(activeMember?.id || '0') },
    skip: !memberExistsQueryEnabled,
  })
  const isNotRegistered = data && !data.memberExist

  const activeMemberSettings = activeMember?.id ? notificationsSettingsMap?.[activeMember.id] : null

  return {
    activeMemberSettings,
    activeMemberNotRegistered: isNotRegistered,
    setMemberSettings,
  }
}

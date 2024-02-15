import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { MemberRole } from '../types'

export const useAllMemberRoles = () => {
  const { groups, isLoading } = useWorkingGroups()

  const roles = groups.flatMap(({ name: groupName }): MemberRole[] => [
    { id: '0', groupName, isLead: true, isActive: true },
    { id: '1', groupName, isLead: false, isActive: true },
  ])

  return { roles, isLoading }
}

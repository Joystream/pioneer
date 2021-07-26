import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { MemberRole } from '../types'

export const useAllMemberRoles = () => {
  const { groups, isLoading } = useWorkingGroups()

  const roles = groups.flatMap(({ name: groupName }): MemberRole[] => [
    { groupName, isLead: true },
    { groupName, isLead: false },
  ])

  return { roles, isLoading }
}

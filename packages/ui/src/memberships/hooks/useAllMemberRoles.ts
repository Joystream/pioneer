import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { MemberRole } from '../types'

export const useAllMemberRoles = () => {
  const { groups, isLoading } = useWorkingGroups()

  const roles = groups.flatMap(({ name: groupName }): MemberRole[] => [
    { groupName, isLeader: true },
    { groupName, isLeader: false },
  ])

  return { roles, isLoading }
}

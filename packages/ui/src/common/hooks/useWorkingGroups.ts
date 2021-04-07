import { useGetWorkingGroupsQuery } from '../api/queries/__generated__/workingGroups.generated'
import { WorkingGroup } from '../common/types'

interface UseWorkingGroups {
  isLoading: boolean
  groups: WorkingGroup[]
}

export const useWorkingGroups = (): UseWorkingGroups => {
  const { data, loading } = useGetWorkingGroupsQuery()
  const groups = data?.workingGroups ?? []
  return {
    isLoading: loading,
    groups,
  }
}

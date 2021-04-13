import { useGetWorkingGroupsQuery } from '../queries'
import { asWorkingGroup, WorkingGroup } from '../types'

interface UseWorkingGroups {
  isLoading: boolean
  groups: WorkingGroup[]
}

export const useWorkingGroups = (): UseWorkingGroups => {
  const { data, loading } = useGetWorkingGroupsQuery()
  const groups = data?.workingGroups ?? []

  return {
    isLoading: loading,
    groups: groups.map(asWorkingGroup),
  }
}

import { useGetWorkingGroupQuery } from '../queries'
import { asWorkingGroup } from '../types'

export function useWorkingGroup(id: string) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { id } })
  const group = data?.workingGroup

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

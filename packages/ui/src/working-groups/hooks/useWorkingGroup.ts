import { useGetWorkingGroupQuery } from '../queries'
import { asWorkingGroup } from '../types'

interface Variables {
  name_eq?: string | undefined
}

export function useWorkingGroup(variables: Variables) {
  const { data, loading } = useGetWorkingGroupQuery({ variables })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

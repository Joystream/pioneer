import { useGetWorkingGroupQuery } from '../queries'
import { asDetailedWorkingGroup } from '../types'

interface WhereInput {
  name?: string
}

export function useWorkingGroup(where: WhereInput) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { where } })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: where.name && group ? asDetailedWorkingGroup(group) : undefined,
  }
}

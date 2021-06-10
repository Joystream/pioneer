import { useGetWorkingGroupQuery } from '../queries'
import { asWorkingGroup } from '../types'

interface WhereInput {
  name?: string | undefined
}

export function useWorkingGroup(where: WhereInput) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { where: where } })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

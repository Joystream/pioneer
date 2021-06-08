import {
  useGetWorkersConnectionQuery,
  useGetWorkingGroupOpeningsConnectionQuery,
  useGetWorkingGroupQuery,
} from '../queries'
import { asWorkingGroup } from '../types'

interface WhereInput {
  name?: string | undefined
}

export function useCountWorkers(groupId: string) {
  const { data, loading } = useGetWorkersConnectionQuery({
    variables: { groupId, onlyActive: true },
  })

  return loading ? 0 : data?.workersConnection.totalCount
}

export function useCountOpenings(groupId: string) {
  const { data, loading } = useGetWorkingGroupOpeningsConnectionQuery({
    variables: { groupId_eq: groupId, onlyOpened: true },
  })

  return loading ? 0 : data?.workingGroupOpeningsConnection.totalCount
}

export function useWorkingGroup(where: WhereInput) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { where: where } })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

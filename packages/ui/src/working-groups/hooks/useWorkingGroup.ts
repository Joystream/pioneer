import {
  useCountWorkingGroupOpeningsQuery,
  useCountWorkingGroupWorkersQuery,
  useGetWorkingGroupQuery,
} from '../queries'
import { asWorkingGroup, WorkerStatusTypename } from '../types'

interface WhereInput {
  name?: string | undefined
}

export function useCountOpenings(groupId: string) {
  const { data, loading } = useCountWorkingGroupOpeningsQuery({
    variables: { groupId_eq: groupId, status_json: { isTypeOf_eq: 'OpeningStatusOpen' } },
  })

  return { isLoading: loading, openings: data?.workingGroupOpeningsConnection.totalCount }
}

export function useCountWorkers(groupId: string) {
  const { data, loading } = useCountWorkingGroupWorkersQuery({
    variables: { groupId_eq: groupId, status_json: { isTypeOf_eq: WorkerStatusTypename['active'] } },
  })

  return { isLoading: loading, workers: data?.workersConnection.totalCount }
}

export function useWorkingGroup(where: WhereInput) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { where: where } })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

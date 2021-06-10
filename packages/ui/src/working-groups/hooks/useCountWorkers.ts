import { useCountWorkingGroupWorkersQuery } from '@/working-groups/queries'
import { WorkerStatusTypename } from '@/working-groups/types'

export function useCountWorkers(groupId: string) {
  const { data, loading } = useCountWorkingGroupWorkersQuery({
    variables: { groupId_eq: groupId, status_json: { isTypeOf_eq: WorkerStatusTypename['active'] } },
  })

  return { isLoading: loading, workers: data?.workersConnection.totalCount }
}

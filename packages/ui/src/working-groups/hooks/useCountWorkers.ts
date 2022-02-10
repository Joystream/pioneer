import { getWorkersWhere } from '@/working-groups/hooks/utils/queries'
import { useCountWorkingGroupWorkersQuery } from '@/working-groups/queries'

export function useCountWorkers(groupId?: string) {
  const { data, loading } = useCountWorkingGroupWorkersQuery({
    variables: {
      groupId_eq: groupId,
      ...getWorkersWhere('active'),
    },
  })

  return { isLoading: loading, workers: data?.workersConnection.totalCount }
}

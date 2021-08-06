import { getOpeningsWhere } from '@/working-groups/hooks/utils/queries'
import { useCountWorkingGroupOpeningsQuery } from '@/working-groups/queries'

export function useCountOpenings(groupId?: string) {
  const { data, loading } = useCountWorkingGroupOpeningsQuery({
    variables: { where: { group: { id_eq: groupId }, ...getOpeningsWhere('open') } },
  })

  return { isLoading: loading, openings: data?.workingGroupOpeningsConnection.totalCount ?? 0 }
}

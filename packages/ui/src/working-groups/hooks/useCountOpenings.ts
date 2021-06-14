import { useCountWorkingGroupOpeningsQuery } from '@/working-groups/queries'

export function useCountOpenings(groupId?: string) {
  const { data, loading } = useCountWorkingGroupOpeningsQuery({
    variables: { groupId_eq: groupId, status_json: { isTypeOf_eq: 'OpeningStatusOpen' } },
  })

  return { isLoading: loading, openings: data?.workingGroupOpeningsConnection.totalCount ?? 0 }
}

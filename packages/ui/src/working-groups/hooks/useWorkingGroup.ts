import { useCountWorkingGroupOpeningsQuery, useGetWorkingGroupQuery } from '../queries'
import { asWorkingGroup } from '../types'

interface WhereInput {
  name?: string | undefined
}

export function useCountOpenings(groupId: string) {
  const { data, loading } = useCountWorkingGroupOpeningsQuery({
    variables: { groupId_eq: groupId, status_json: { isTypeOf_eq: 'OpeningStatusOpen' } },
  })

  return { isLoading: loading, openings: data?.workingGroupOpeningsConnection.totalCount }
}

export function useWorkingGroup(where: WhereInput) {
  const { data, loading } = useGetWorkingGroupQuery({ variables: { where: where } })
  const group = data?.workingGroupByUniqueInput

  return {
    isLoading: loading,
    group: group ? asWorkingGroup(group) : undefined,
  }
}

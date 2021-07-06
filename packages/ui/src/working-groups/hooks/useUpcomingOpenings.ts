import { useMemo } from 'react'

import { useGetUpcomingWorkingGroupOpeningsQuery } from '../queries'
import { asUpcomingWorkingGroupOpening } from '../types'

interface UseOpeningsParams {
  groupId?: string
}

export const useUpcomingOpenings = (params?: UseOpeningsParams) => {
  const options = params?.groupId ? { variables: { where: { group: { id_eq: params.groupId } } } } : undefined

  const { loading, data } = useGetUpcomingWorkingGroupOpeningsQuery(options)

  const groups = data?.upcomingWorkingGroupOpenings ?? []
  const upcomingOpenings = useMemo(() => groups.map(asUpcomingWorkingGroupOpening), [loading, data])

  return {
    isLoading: loading,
    upcomingOpenings,
  }
}

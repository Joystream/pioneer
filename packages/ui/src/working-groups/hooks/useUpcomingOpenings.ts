import { useMemo } from 'react'

import { useGetUpcomingWorkingGroupOpeningsQuery } from '../queries'
import { asUpcomingWorkingGroupOpening } from '../types'

interface UseOpeningsParams {
  groupId?: string
}

export const useUpcomingOpenings = ({ groupId }: UseOpeningsParams) => {
  const { loading, data } = useGetUpcomingWorkingGroupOpeningsQuery({ variables: { where: { groupId_eq: groupId } } })

  const groups = data?.upcomingWorkingGroupOpenings ?? []
  const upcomingOpenings = useMemo(() => groups.map(asUpcomingWorkingGroupOpening), [loading, data])

  return {
    isLoading: loading,
    upcomingOpenings,
  }
}

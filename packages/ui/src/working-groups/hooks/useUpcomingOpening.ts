import { useMemo } from 'react'

import { useGetUpcomingWorkingGroupOpeningQuery } from '../queries'
import { asUpcomingWorkingGroupOpening } from '../types'

export const useUpcomingOpening = (id: string) => {
  const { loading, data, error } = useGetUpcomingWorkingGroupOpeningQuery({ variables: { where: { id } } })

  const rawOpening = data?.upcomingWorkingGroupOpeningByUniqueInput
  const opening = useMemo(() => rawOpening && asUpcomingWorkingGroupOpening(rawOpening), [rawOpening?.id])

  return {
    isLoading: loading,
    opening,
    error,
  }
}

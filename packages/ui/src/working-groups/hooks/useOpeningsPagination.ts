import { useMemo } from 'react'

import { error as logError } from '@/common/logger'
import { getStatusWhere, UseOpeningsParams } from '@/working-groups/hooks/useOpenings'

import { useCountWorkingGroupOpeningsQuery, useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening } from '../types'

export const OPENINGS_PER_PAGE = 5

interface UseOpeningsPaginationParams extends UseOpeningsParams {
  page?: number
}

export const useOpeningsPagination = ({ groupId: group_eq, statusIn, page = 1 }: UseOpeningsPaginationParams) => {
  const variables = {
    limit: OPENINGS_PER_PAGE,
    offset: (page - 1) * OPENINGS_PER_PAGE,
    where: {
      group_eq,
      status_json: getStatusWhere(statusIn),
    },
  }

  const { data, loading, error } = useGetWorkingGroupOpeningsQuery({ variables })
  const { data: countData } = useCountWorkingGroupOpeningsQuery({ variables: variables.where })

  if (error) {
    logError(error)
  }

  const totalCount = countData?.workingGroupOpeningsConnection.totalCount ?? 0

  const openings = useMemo(() => data?.workingGroupOpenings.map((opening) => asWorkingGroupOpening(opening)) ?? [], [
    loading,
    data,
  ])

  return {
    isLoading: loading,
    openings,
    pageCount: totalCount && Math.ceil(totalCount / OPENINGS_PER_PAGE),
  }
}

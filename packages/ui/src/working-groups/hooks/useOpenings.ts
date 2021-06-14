import { useEffect, useMemo, useState } from 'react'

import { error as logError } from '@/common/logger'

import { useCountWorkingGroupOpeningsQuery, useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening, WorkingGroupOpeningStatus, WorkingGroupOpeningStatusTypename } from '../types'

export const OPENINGS_PER_PAGE = 5

interface UseOpeningsParams {
  groupId?: string
  statusIn?: WorkingGroupOpeningStatus[]
  page?: number
}

const getStatusWhere = (statusIn?: WorkingGroupOpeningStatus[]) => {
  if (!statusIn) {
    return
  }

  return { isTypeOf_in: statusIn.map((status) => WorkingGroupOpeningStatusTypename[status]) }
}

export const useOpenings = ({ groupId: group_eq, statusIn, page = 1 }: UseOpeningsParams) => {
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

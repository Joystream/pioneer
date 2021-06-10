import { useEffect, useMemo, useState } from 'react'

import { error as logError } from '@/common/logger'

import { useGetWorkingGroupOpeningsConnectionQuery } from '../queries'
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

export const useOpenings = ({ groupId: group_eq, statusIn, page }: UseOpeningsParams) => {
  const variables = {
    first: page !== undefined ? page * OPENINGS_PER_PAGE : undefined,
    last: page !== undefined && page > 1 ? OPENINGS_PER_PAGE : undefined,
    group_eq,
    status_json: getStatusWhere(statusIn),
  }

  const { loading, data, error } = useGetWorkingGroupOpeningsConnectionQuery({ variables })
  const [totalCount, setTotalCount] = useState<number>()

  if (error) {
    logError(error)
  }

  useEffect(() => {
    if (!totalCount && data?.workingGroupOpeningsConnection.totalCount) {
      setTotalCount(data?.workingGroupOpeningsConnection.totalCount)
    }
  }, [data])

  const groups = data?.workingGroupOpeningsConnection.edges ?? []
  const openings = useMemo(() => groups.map(({ node }) => asWorkingGroupOpening(node)), [loading, data])

  return {
    isLoading: loading,
    openings,
    pageCount: totalCount && Math.ceil(totalCount / OPENINGS_PER_PAGE),
  }
}

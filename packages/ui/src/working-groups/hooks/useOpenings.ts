import { useEffect, useMemo, useState } from 'react'

import { error as logError } from '@/common/logger'

import { isOpeningOpen } from '../model/isOpeningOpen'
import { useGetWorkingGroupOpeningsConnectionQuery } from '../queries'
import { asWorkingGroupOpening, WorkingGroupOpening } from '../types'

export const OPENINGS_PER_PAGE = 5

type OpeningType = 'open' | 'past'

interface UseOpeningsParams {
  groupId?: string
  type: OpeningType
  page?: number
}

export const getTypeFilter = (type: OpeningType) => {
  if (type === 'open') {
    return isOpeningOpen
  }
  return (opening: WorkingGroupOpening) => !isOpeningOpen(opening)
}

export const useOpenings = ({ groupId, type, page }: UseOpeningsParams) => {
  const variables = {
    first: page !== undefined ? page * OPENINGS_PER_PAGE : undefined,
    last: page !== undefined && page > 1 ? OPENINGS_PER_PAGE : undefined,
    groupId_eq: groupId,
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
  const openings = useMemo(() => groups.map(({ node }) => asWorkingGroupOpening(node)).filter(getTypeFilter(type)), [
    loading,
    data,
  ])

  return {
    isLoading: loading,
    openings,
    pageCount: totalCount && Math.ceil(totalCount / OPENINGS_PER_PAGE),
  }
}

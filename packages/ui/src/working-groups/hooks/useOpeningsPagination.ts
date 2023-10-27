import { useMemo } from 'react'

import { WorkingGroupOpeningOrderByInput } from '@/common/api/queries'
import { error as logError } from '@/common/logger'
import { UseOpeningsParams } from '@/working-groups/hooks/useOpenings'
import { getOpeningsWhere } from '@/working-groups/hooks/utils/queries'

import {
  GetWorkingGroupOpeningsQueryVariables,
  useCountWorkingGroupOpeningsQuery,
  useGetWorkingGroupOpeningsQuery,
} from '../queries'
import { asWorkingGroupOpening } from '../types'

export const OPENINGS_PER_PAGE = 10

interface UseOpeningsPaginationParams extends UseOpeningsParams {
  page?: number
}

export const useOpeningsPagination = ({ groupId, type, page = 1 }: UseOpeningsPaginationParams) => {
  const where = {
    group: { id_eq: groupId },
    ...getOpeningsWhere(type),
  }
  const variables: GetWorkingGroupOpeningsQueryVariables = {
    limit: OPENINGS_PER_PAGE,
    offset: (page - 1) * OPENINGS_PER_PAGE,
    where,
    order: [WorkingGroupOpeningOrderByInput.CreatedAtDesc, WorkingGroupOpeningOrderByInput.RuntimeIdDesc],
  }

  const { data, loading, error } = useGetWorkingGroupOpeningsQuery({ variables })
  const { data: countData } = useCountWorkingGroupOpeningsQuery({ variables: { where } })

  if (error) {
    logError(error)
  }

  const totalCount = countData?.workingGroupOpeningsConnection.totalCount ?? 0

  const openings = useMemo(
    () => data?.workingGroupOpenings.map((opening) => asWorkingGroupOpening(opening)) ?? [],
    [loading, data]
  )

  return {
    isLoading: loading,
    openings,
    pageCount: totalCount && Math.ceil(totalCount / OPENINGS_PER_PAGE),
  }
}

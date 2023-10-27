import { useMemo } from 'react'

import { WorkingGroupOpeningOrderByInput } from '@/common/api/queries'
import { error } from '@/common/logger'
import {
  getOpeningsPositionType,
  getOpeningsWhere,
  OpeningPositionType,
  OpeningType,
} from '@/working-groups/hooks/utils/queries'
import { GetWorkingGroupOpeningsQueryVariables, useGetWorkingGroupOpeningsQuery } from '@/working-groups/queries'
import {
  asWorkingGroupOpening,
  WorkingGroupOpeningStatus,
  WorkingGroupOpeningStatusTypename,
} from '@/working-groups/types'

export interface UseOpeningsParams {
  groupId?: string
  type: OpeningType
  openingsPositionType?: OpeningPositionType
}

export const getStatusWhere = (statusIn?: WorkingGroupOpeningStatus[]) => {
  if (!statusIn) {
    return
  }

  return { isTypeOf_in: statusIn.map((status) => WorkingGroupOpeningStatusTypename[status]) }
}

export const useOpenings = ({ groupId: group_eq, type, openingsPositionType }: UseOpeningsParams) => {
  const where = {
    group: { id_eq: group_eq },
    ...getOpeningsPositionType(openingsPositionType),
    ...getOpeningsWhere(type),
  }

  const variables: GetWorkingGroupOpeningsQueryVariables = {
    where,
    order: [WorkingGroupOpeningOrderByInput.CreatedAtDesc, WorkingGroupOpeningOrderByInput.RuntimeIdDesc],
  }

  const { data, loading, error: err } = useGetWorkingGroupOpeningsQuery({ variables })
  err && error(err)

  const openings = useMemo(
    () => data?.workingGroupOpenings.map((opening) => asWorkingGroupOpening(opening)) ?? [],
    [loading, data]
  )
  return {
    openings,
    isLoading: loading,
  }
}

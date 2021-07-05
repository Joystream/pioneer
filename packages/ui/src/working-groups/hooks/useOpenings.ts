import { useMemo } from 'react'

import { error } from '@/common/logger'
import { useGetWorkingGroupOpeningsQuery } from '@/working-groups/queries'
import {
  asWorkingGroupOpening,
  WorkingGroupOpeningStatus,
  WorkingGroupOpeningStatusTypename,
} from '@/working-groups/types'

export interface UseOpeningsParams {
  groupId?: string
  statusIn?: WorkingGroupOpeningStatus[]
}

export const getStatusWhere = (statusIn?: WorkingGroupOpeningStatus[]) => {
  if (!statusIn) {
    return
  }

  return { isTypeOf_in: statusIn.map((status) => WorkingGroupOpeningStatusTypename[status]) }
}

export const useOpenings = ({ groupId: group_eq, statusIn }: UseOpeningsParams) => {
  const where = {
    group: { id_eq: group_eq },
    status_json: getStatusWhere(statusIn),
  }
  const { data, loading, error: err } = useGetWorkingGroupOpeningsQuery({ variables: { where } })
  err && error(err)

  const openings = useMemo(() => data?.workingGroupOpenings.map((opening) => asWorkingGroupOpening(opening)) ?? [], [
    loading,
    data,
  ])

  return {
    openings,
    isLoading: loading,
  }
}

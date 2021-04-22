import { useMemo } from 'react'

import { isOpeningOpen } from '../model/isOpeningOpen'
import { useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening, WorkingGroupOpening } from '../types'

interface UseOpeningsParams {
  groupId?: string
  type: 'open' | 'past'
}

export const useOpenings = ({ groupId, type }: UseOpeningsParams) => {
  const { loading, data } = useGetWorkingGroupOpeningsQuery({ variables: { group_eq: groupId } })

  const getTypeFilter = (t = type) => {
    if (t === 'open') return isOpeningOpen
    else return (opening: WorkingGroupOpening) => !isOpeningOpen(opening)
  }

  const groups = data?.workingGroupOpenings ?? []
  const openings = useMemo(() => groups.map(asWorkingGroupOpening).filter(getTypeFilter()), [loading, data])

  return {
    isLoading: loading,
    openings,
  }
}

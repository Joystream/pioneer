import { useMemo } from 'react'

import { isOpeningOpen } from '../model/isOpeningOpen'
import { useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening, WorkingGroupOpening } from '../types'

type OpeningType = 'open' | 'past'

interface UseOpeningsParams {
  groupId?: string
  type: OpeningType
}

const getTypeFilter = (type: OpeningType) => {
  if (type === 'open') {
    return isOpeningOpen
  }
  return (opening: WorkingGroupOpening) => !isOpeningOpen(opening)
}

export const useOpenings = ({ groupId, type }: UseOpeningsParams) => {
  const { loading, data } = useGetWorkingGroupOpeningsQuery({ variables: { groupId_eq: groupId } })

  const groups = data?.workingGroupOpenings ?? []
  const openings = useMemo(() => groups.map(asWorkingGroupOpening).filter(getTypeFilter(type)), [loading, data])

  return {
    isLoading: loading,
    openings,
  }
}

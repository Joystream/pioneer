import { useMemo } from 'react'

import { isOpeningOpen } from '../model/isOpeningOpen'
import { useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening, WorkingGroupOpening } from '../types'

interface UseOpeningsParams {
  groupId?: string
  type?: 'open' | 'past'
}

export const useOpenings = ({ groupId, type }: UseOpeningsParams = {}) => {
  const { loading, data } = useGetWorkingGroupOpeningsQuery({ variables: { group_eq: groupId } })

  const typeFilter: (opening: WorkingGroupOpening) => boolean = useMemo(() => {
    switch (type) {
      case 'open':
        return (opening) => isOpeningOpen(opening)
      case 'past':
        return (opening) => !isOpeningOpen(opening)
      default:
        return () => true
    }
  }, [type])

  const groups = data?.workingGroupOpenings ?? []
  const openings = useMemo(() => groups.map(asWorkingGroupOpening).filter(typeFilter), [loading, data])

  return {
    isLoading: loading,
    openings,
  }
}

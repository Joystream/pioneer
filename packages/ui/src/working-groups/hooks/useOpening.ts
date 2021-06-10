import { useMemo } from 'react'

import { useGetWorkingGroupOpeningQuery } from '../queries'
import { asWorkingGroupDetailedOpening } from '../types'

export const useOpening = (id: string) => {
  const { loading, data } = useGetWorkingGroupOpeningQuery({ variables: { where: { id } } })

  const rawOpening = data?.workingGroupOpeningByUniqueInput
  const opening = useMemo(() => rawOpening && asWorkingGroupDetailedOpening(rawOpening), [rawOpening?.id])

  return {
    isLoading: loading,
    opening,
  }
}

import { useMemo } from 'react'

import { useGetWorkingGroupOpeningQuery } from '../queries'
import { asWorkingGroupOpening } from '../types'

export const useOpening = (id: string) => {
  const { loading, data } = useGetWorkingGroupOpeningQuery({ variables: { id } })

  const rawOpening = data?.workingGroupOpening
  const opening = useMemo(() => rawOpening && asWorkingGroupOpening(rawOpening), [data?.workingGroupOpening?.id])

  return {
    isLoading: loading,
    opening,
  }
}

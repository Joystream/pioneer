import { useMemo } from 'react'

import { useGetWorkingGroupOpeningQuery } from '../queries'
import { asWorkingGroupOpening } from '../types'

const useOpening = (id: string) => {
  const { loading, data } = useGetWorkingGroupOpeningQuery({ variables: { where: { id } } })

  const rawOpening = data?.workingGroupOpeningByUniqueInput
  const opening = useMemo(() => rawOpening && asWorkingGroupOpening(rawOpening), [rawOpening?.id])

  return {
    isLoading: loading,
    opening,
  }
}

export default useOpening

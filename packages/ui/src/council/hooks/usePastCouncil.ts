import { useMemo } from 'react'

import { useGetCouncilBlockRangeQuery, useGetPastCouncilQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({ variables: { id } })
  const { fromBlock, toBlock } = useMemo(() => {
    return {
      fromBlock: rangeData?.council?.electedAtBlock ?? 0,
      toBlock: rangeData?.council?.endedAtBlock ?? 0,
    }
  }, [loadingRange, JSON.stringify(rangeData)])

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({ variables: { id, fromBlock, toBlock } })

  return {
    isLoading: loadingRange || loadingData,
    council:
      councilData?.council &&
      councilData?.budgetSpendingEvents &&
      asPastCouncilWithDetails(councilData.council, councilData.budgetSpendingEvents),
  }
}

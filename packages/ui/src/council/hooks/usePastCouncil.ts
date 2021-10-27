import { useMemo } from 'react'

import { useGetCouncilBlockRangeQuery, useGetPastCouncilQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({ variables: { id } })
  const { fromBlock, toBlock } = useMemo(() => {
    return {
      fromBlock: rangeData?.electedCouncilByUniqueInput?.electedAtBlock ?? 0,
      toBlock: rangeData?.electedCouncilByUniqueInput?.endedAtBlock ?? 0,
    }
  }, [loadingRange, JSON.stringify(rangeData)])

  const { loading: loadingData, data: councilData } = useGetPastCouncilQuery({ variables: { id, fromBlock, toBlock } })
  return {
    isLoading: loadingRange || loadingData,
    council:
      councilData?.electedCouncilByUniqueInput &&
      councilData?.budgetSpendingEvents &&
      asPastCouncilWithDetails(councilData.electedCouncilByUniqueInput, councilData.budgetSpendingEvents),
  }
}

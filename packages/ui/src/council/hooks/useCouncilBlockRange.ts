import { useMemo } from 'react'

import { useGetCouncilBlockRangeQuery } from '@/council/queries'

export const useCouncilBlockRange = (cycleId: number) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: { where: { cycleId } },
  })

  const { fromBlock, toBlock } = useMemo(() => {
    return {
      fromBlock: rangeData?.electedCouncilByUniqueInput?.electedAtBlock ?? 0,
      toBlock: rangeData?.electedCouncilByUniqueInput?.endedAtBlock ?? 0,
    }
  }, [loadingRange, JSON.stringify(rangeData)])

  return { loadingRange, fromBlock, toBlock }
}

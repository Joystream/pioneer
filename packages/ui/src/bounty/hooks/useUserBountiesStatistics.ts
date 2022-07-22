import BN from 'bn.js'
import { useMemo } from 'react'

import { useGetUserBountyStatisticsQuery } from '@/bounty/queries'
import { BN_ZERO } from '@/common/constants'

export const useUserBountiesStatistics = (memberId: string) => {
  const { data, loading } = useGetUserBountyStatisticsQuery({
    variables: {
      memberId,
    },
  })

  const statistics = useMemo(() => {
    const amountEarned = data?.bountyEntries.reduce((prev, current) => {
      if (current.status.__typename === 'BountyEntryStatusWinner') {
        return prev.add(new BN(current.status.reward))
      }
      return prev
    }, BN_ZERO)

    const amountContributed = data?.bountyContributions.reduce(
      (prev, current) => prev.add(new BN(current.amount)),
      BN_ZERO
    )

    return {
      amountContributed,
      amountEarned,
      entriesSubmitted: data?.bountyEntries.length || 0,
    }
  }, [data])

  return {
    isLoading: loading,
    statistics,
  }
}

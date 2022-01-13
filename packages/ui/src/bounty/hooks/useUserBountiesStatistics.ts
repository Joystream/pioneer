import { useMemo } from 'react'

import { useGetUserBountyStatisticsQuery } from '@/bounty/queries'

export const useUserBountiesStatistics = (memberId: string) => {
  const { data, loading } = useGetUserBountyStatisticsQuery({
    variables: {
      memberId,
    },
  })

  const statistics = useMemo(() => {
    const amountEarned = data?.bountyEntries.reduce((prev, current) => {
      if (current.status.__typename === 'BountyEntryStatusWinner') {
        return prev + current.status.reward
      }
      return prev
    }, 0)

    const amountContributed = data?.bountyContributions.reduce((prev, current) => prev + current.amount, 0)

    return {
      amountContributed,
      amountEarned,
    }
  }, [data])

  return {
    isLoading: loading,
    statistics,
  }
}

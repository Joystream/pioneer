import React from 'react'

import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextInlineBig, TextInlineMedium, TextSmall } from '@/common/components/typography'
import { useMyPastVotesStats } from '@/council/hooks/useMyPastVotesStats'

export const PastVotesStats = () => {
  const { votesTotal, votesForWinners } = useMyPastVotesStats()
  const votesForWinnerPercent = votesForWinners && votesTotal && Math.round((votesForWinners / votesTotal) * 100)
  return (
    <Statistics>
      <StatisticItem title="Times Voted">
        <TextInlineBig>{votesTotal}</TextInlineBig>
        <TextInlineMedium> votes</TextInlineMedium>
      </StatisticItem>
      <StatisticItem title="Times voted for winner">
        <TextInlineBig>{votesForWinners}</TextInlineBig>
        <TextInlineMedium> votes</TextInlineMedium>
        <TextSmall lighter>{votesForWinnerPercent}% of all votes</TextSmall>
      </StatisticItem>
    </Statistics>
  )
}

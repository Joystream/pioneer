import React from 'react'

import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextBig, TextMedium } from '@/common/components/typography'
import { useMyPastVotesStats } from '@/council/hooks/useMyPastVotesStats'

export const PastVotesStats = () => {
  const { votesTotal } = useMyPastVotesStats()
  return (
    <Statistics>
      <StatisticItem title="Times Voted">
        <TextBig>{votesTotal}</TextBig>
        <TextMedium> votes</TextMedium>
      </StatisticItem>
    </Statistics>
  )
}

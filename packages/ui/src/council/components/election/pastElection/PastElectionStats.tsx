import React from 'react'

import { NumericValueStat, StatisticBar, StatisticItem, Statistics, StatsBlock } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'
import { formatDateString } from '@/common/model/formatters'

interface PastElectionStatsProps {
  finishedAt: string
  cycleId: number
  totalCandidates: number
  revealedVotes: number
  totalVotes: number
}

export const PastElectionStats = ({
  finishedAt,
  cycleId,
  totalCandidates,
  revealedVotes,
  totalVotes,
}: PastElectionStatsProps) => (
  <Statistics>
    <StatisticItem title="Ended at">{formatDateString(finishedAt)}</StatisticItem>
    <StatisticItem title="Election round" tooltipText="Lorem ipsum...">
      <TextHuge bold>{cycleId} round</TextHuge>
    </StatisticItem>
    <NumericValueStat title="Total candidates" value={totalCandidates} />
    <StatsBlock>
      <StatisticBar
        title="Revealed votes"
        tooltipText="Lorem ipsum..."
        value={revealedVotes / totalVotes}
        numerator={revealedVotes}
        denominator={totalVotes + ' votes'}
      />
    </StatsBlock>
  </Statistics>
)

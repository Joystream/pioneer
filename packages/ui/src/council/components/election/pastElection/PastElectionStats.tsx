import React from 'react'

import { NumericValueStat, StatisticBar, StatisticItem, Statistics, StatsBlock } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'
import { formatDateString } from '@/common/model/formatters'
import { Block } from '@/common/types'

interface PastElectionStatsProps {
  finishedAtBlock?: Block
  cycleId: number
  totalCandidates: number
  revealedVotes: number
  totalVotes: number
}

export const PastElectionStats = ({
  finishedAtBlock,
  cycleId,
  totalCandidates,
  revealedVotes,
  totalVotes,
}: PastElectionStatsProps) => (
  <Statistics>
    <StatisticItem title="Ended at">
      {finishedAtBlock ? formatDateString(finishedAtBlock.timestamp) : '-'}
    </StatisticItem>
    <StatisticItem
      title="Election round"
      tooltipText="Ordinal number of the election round since the genesis block of the network."
      tooltipLinkText="Learn more"
      tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/council#election"
    >
      <TextHuge bold>{cycleId}</TextHuge>
    </StatisticItem>
    <NumericValueStat title="Total candidates" value={totalCandidates} />
    <StatsBlock>
      <StatisticBar
        title="Revealed votes"
        tooltipText="Votes are kept anonymous and get revealed during the reveal period, after voting is complete. Only revealed votes are counted."
        value={revealedVotes / totalVotes}
        numerator={revealedVotes}
        denominator={totalVotes + ' votes'}
      />
    </StatsBlock>
  </Statistics>
)

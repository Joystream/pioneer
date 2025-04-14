import BN from 'bn.js'
import React from 'react'

import { NumericValueStat, StatisticBar, StatisticItem, Statistics, StatsBlock } from '@/common/components/statistics'
import { TextHuge, ValueInMJoys } from '@/common/components/typography'
import { formatDateString, formatJoyValue } from '@/common/model/formatters'
import { Block } from '@/common/types'

interface PastElectionStatsProps {
  finishedAtBlock?: Block
  cycleId: number
  totalCandidates: number
  revealedVotes: number
  totalVotes: number
  totalRevealedVoteStake: BN
  totalVoteStake: BN
}

export const PastElectionStats = ({
  finishedAtBlock,
  cycleId,
  totalCandidates,
  revealedVotes,
  totalVotes,
  totalRevealedVoteStake,
  totalVoteStake,
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
    <StatsBlock>
      <StatisticBar
        title="Revealed stake"
        value={totalRevealedVoteStake.divn(1e6).toNumber() / totalVoteStake.divn(1e6).toNumber()}
        figureWidth={152}
        numerator={
          <ValueInMJoys as={'span'} size="xs">
            {formatJoyValue(totalRevealedVoteStake.divn(1e6), { precision: 2 })}
          </ValueInMJoys>
        }
        denominator={
          <ValueInMJoys as={'span'} size="xs">
            {formatJoyValue(totalVoteStake.divn(1e6), { precision: 2 })}
          </ValueInMJoys>
        }
      />
    </StatsBlock>
  </Statistics>
)

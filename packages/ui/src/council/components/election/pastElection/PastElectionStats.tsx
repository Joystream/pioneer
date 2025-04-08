import BN from 'bn.js'
import React from 'react'

import {
  FractionValue,
  NumericValueStat,
  StatisticBar,
  StatisticItem,
  Statistics,
  StatsBlock,
} from '@/common/components/statistics'
import { TextHuge, TextSmall, ValueInJoys } from '@/common/components/typography'
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
    <StatisticItem title="Revealed Stake">
      <TextSmall>
        <FractionValue
          numerator={<ValueInJoys size="xs">{formatJoyValue(totalRevealedVoteStake, { precision: 2 })}</ValueInJoys>}
          denominator={<ValueInJoys size="xs">{formatJoyValue(totalVoteStake, { precision: 2 })}</ValueInJoys>}
        />
      </TextSmall>
    </StatisticItem>
  </Statistics>
)

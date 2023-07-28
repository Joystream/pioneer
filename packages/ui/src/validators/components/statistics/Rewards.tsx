import BN from 'bn.js'
import React from 'react'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { TokenValue } from '@/common/components/typography'

interface RewardsProps {
  totalRewards: BN | undefined
  lastRewards: BN | undefined
}

export const Rewards = ({ totalRewards, lastRewards }: RewardsProps) => {
  return (
    <StatisticItem
      title="Rewards"
      tooltipText="After each era rewards can be claimed and minted for 30 days."
      tooltipTitle="Staking Rewards"
      tooltipLinkText="Handbook"
      tooltipLinkURL="https://handbook.joystream.org/system/nomination#risks-and-rewards"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel>Month</StatisticLabel>
        <TokenValue size="l" value={totalRewards} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Last </StatisticLabel>
        <TokenValue size="l" value={lastRewards} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

import React from 'react'
import BN from 'bn.js'
import { Colors } from '@/common/constants'

import { TokenValue } from '@/common/components/typography'
import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import {useStakingStatistics} from '@/validators/hooks/useStakingStatistics'

export const Rewards = () => {
  const {totalRewards, lastRewards}= useStakingStatistics()

  return (
    <StatisticItem
      title="Rewards"
      tooltipText="tooltip text..."
      tooltipTitle="Rewards tooltip title"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Total </StatisticLabel>
        <TokenValue size='l' value={new BN(totalRewards ?? 0)} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Last </StatisticLabel>
        <TokenValue size='l' value={lastRewards} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

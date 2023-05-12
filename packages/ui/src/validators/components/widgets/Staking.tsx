import React from 'react'
import BN from 'bn.js'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { TokenValue } from '@/common/components/typography'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'

export const Staking = () => {
  const {idealStaking, currentStaking}=useStakingStatistics()
  return (
    <StatisticItem
      title="staking"
      tooltipText="tooltip text..."
      tooltipTitle="staking tooltip title"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Ideal </StatisticLabel>
        <TokenValue size='l' value={new BN(idealStaking ?? 0)} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Current </StatisticLabel>
        <TokenValue size='l' value={new BN(currentStaking ?? 0)} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

import React from 'react'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { TokenValue } from '@/common/components/typography'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'
import { Colors } from '@/common/constants'

export const Staking = () => {
  const { idealStaking, currentStaking, stakingPercentage } = useStakingStatistics()
  const Percentage = (
    <StatisticLabel>
      Percentage <span style={{ color: Colors.Blue[400], fontSize: 16 }}> {stakingPercentage} </span>%
    </StatisticLabel>
  )
  return (
    <StatisticItem
      title="staking"
      tooltipText="tooltip text..."
      tooltipTitle="staking tooltip title"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
      actionElement={Percentage}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Ideal </StatisticLabel>
        <TokenValue size="l" value={idealStaking} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Current </StatisticLabel>
        <TokenValue size="l" value={currentStaking} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

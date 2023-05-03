import React from 'react'
import BN from 'bn.js'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { TokenValue } from '@/common/components/typography'

export const Staking = () => {
  const { ideal, current } = {
    ideal: '200000000000000',
    current: '8000000000000',
  }
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
        <TokenValue size='l' value={new BN(ideal ?? 0)} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Current </StatisticLabel>
        <TokenValue size='l' value={new BN(current ?? 0)} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

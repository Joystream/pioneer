import BN from 'bn.js'
import React, { FC } from 'react'
import { Colors } from '@/common/constants'

import { TextSmall, TokenValue } from '@/common/components/typography'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { PageHeaderRow } from '@/app/components/PageLayout'
import { size } from 'lodash'

export const Rewards = () => {
  const { total, last, apr } = {
    total: '20000000000000',
    last: '8000000000000',
    apr: 4,
  }
  const Apr = (
    <StatisticLabel>
      APR<span style={{ color: Colors.Blue[400], fontSize:16 }}> {apr} </span>%
    </StatisticLabel>
  )

  return (
    <StatisticItem
      title="Rewards"
      tooltipText="tooltip text..."
      tooltipTitle="Rewards tooltip title"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
      actionElement={Apr}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Active </StatisticLabel>
        <TokenValue value={new BN(total ?? 0)} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Waiting </StatisticLabel>
        <TokenValue value={new BN(last ?? 0)} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

import React from 'react'

import { StatisticItem, Statistics, TokenValueStat } from '@/common/components/statistics'

interface Props {
  destination: {
    account: string
    amount: number
  }
}

export const FundingRequestDetails = ({ destination }: Props) => {
  return (
    <Statistics>
      <TokenValueStat title="Amount" value={destination.amount} />
      <StatisticItem title="Account">{destination.account}</StatisticItem>
    </Statistics>
  )
}

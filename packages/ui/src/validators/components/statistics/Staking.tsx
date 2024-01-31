import { BN } from '@polkadot/util'
import React from 'react'

import { StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface StakingProps {
  idealStaking: BN
  currentStaking: BN
  stakingPercentage: number
}

export const Staking = ({ idealStaking, currentStaking, stakingPercentage }: StakingProps) => {
  const Percentage = (
    <StatisticLabel>
      Percentage <span style={{ color: Colors.Blue[400], fontSize: 16 }}> {stakingPercentage} </span>%
    </StatisticLabel>
  )
  return (
    <StatisticItem
      title="staking"
      tooltipText="The ideal staking amount is 50% of the total tokens."
      tooltipTitle="Staking Amount"
      tooltipLinkText="Handbook"
      tooltipLinkURL="https://handbook.joystream.org/system/accounts-and-staking"
      actionElement={Percentage}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Ideal </StatisticLabel>
        <TokenValue size="l" mjoy value={idealStaking} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Current </StatisticLabel>
        <TokenValue size="l" mjoy value={currentStaking} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}

import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { Colors } from '@/common/constants'

export interface EarnedAndRewardProps {
  earnedTitle: string
  rewardTitle: string
  earnedValue?: BN | null
  rewardValue?: BN | null
}

export const EarnedAndReward = ({ earnedTitle, rewardTitle, earnedValue, rewardValue }: EarnedAndRewardProps) => {
  return (
    <Statistics>
      <TokenValueStat title={earnedTitle} value={earnedValue} dotElement={<EarnedDot />} />
      <TokenValueStat title={rewardTitle} value={rewardValue} dotElement={<RewardDot />} />
    </Statistics>
  )
}

export const EarnedDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${Colors.Green[500]};
  margin: 3px;
`

export const RewardDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${Colors.Blue[500]};
  margin: 3px;
`

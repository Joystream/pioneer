import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface StakingPolicyAndRewardDetailsParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

export interface CreateWorkingGroupLeadOpeningProps extends StakingPolicyAndRewardDetailsParameters {
  setStakingAmount(stakingAmount: BN): void
  setLeavingUnstakingPeriod(leavingUnstakingPeriod: number): void
  setRewardPerBlock(rewardPerBlockId: BN): void
}

export const StakingPolicyAndReward = ({
  stakingAmount,
  leavingUnstakingPeriod,
  rewardPerBlock,
  setStakingAmount,
  setLeavingUnstakingPeriod,
  setRewardPerBlock,
}: CreateWorkingGroupLeadOpeningProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}></RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useBlockInput } from '@/common/hooks/useBlockInput'
import { formatBlocksToDuration } from '@/common/model/formatters'

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
  const [block, updateBlock] = useBlockInput(0, 100_000)

  useEffect(() => {
    setLeavingUnstakingPeriod(block.toNumber())
  }, [block.toNumber()])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            units="blocks"
            inputSize="s"
            tooltipText="Lorem ipsum..."
            message={`≈ ${leavingUnstakingPeriod ? formatBlocksToDuration(leavingUnstakingPeriod) : ''}`}
          >
            <InputNumber
              id="leavingUnstakingPeriod"
              value={leavingUnstakingPeriod?.toString()}
              onChange={(event) => updateBlock(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

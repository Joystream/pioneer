import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useBlockInput } from '@/common/hooks/useBlockInput'
import { formatBlocksToDuration } from '@/common/model/formatters'
import { StakingPolicyAndRewardParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'

interface Props extends StakingPolicyAndRewardParameters {
  setStakingAmount(stakingAmount: BN): void
  setLeavingUnstakingPeriod(leavingUnstakingPeriod: number): void
  setRewardPerBlock(rewardPerBlockId: BN): void
}

export const StakingPolicyAndReward = ({
  stakingAmount,
  leavingUnstakingPeriod,
  setStakingAmount,
  setLeavingUnstakingPeriod,
  setRewardPerBlock,
  rewardPerBlock,
}: Props) => {
  const [block, updateBlock] = useBlockInput(0, 100_000, new BN(leavingUnstakingPeriod || 0))

  useEffect(() => setLeavingUnstakingPeriod(block.toNumber()), [block.toNumber()])

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
            id="staking-amount"
            label="Staking amount"
            tooltipText="Pleas type the minimum number of tokens required to stake"
            units="JOY"
            tight
            required
          >
            <InputNumber
              id="staking-amount"
              isTokenValue
              value={stakingAmount?.toString()}
              placeholder="0"
              onChange={(_, value) => setStakingAmount(new BN(value))}
            />
          </InputComponent>
          <InputComponent
            id="leaving-unstaking-period"
            label="Leaving unstaking period"
            units="blocks"
            inputSize="s"
            tooltipText="Lorem ipsum..."
            message={leavingUnstakingPeriod ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}` : ''}
            tight
          >
            <InputNumber
              id="leaving-unstaking-period"
              value={leavingUnstakingPeriod?.toString()}
              onChange={(event) => updateBlock(event.target.value)}
            />
          </InputComponent>
          <InputComponent id="reward-per-block" label="Reward amount per Block" units="JOY" tight required>
            <InputNumber
              id="reward-per-block"
              isTokenValue
              value={rewardPerBlock?.toString()}
              placeholder="0"
              onChange={(_, value) => setRewardPerBlock(new BN(value))}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

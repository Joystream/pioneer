import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useBlockInput } from '@/common/hooks/useBlockInput'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatBlocksToDuration, formatTokenValue } from '@/common/model/formatters'
import { StakingPolicyAndRewardParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'

interface Props extends StakingPolicyAndRewardParameters {
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
}: Props) => {
  const [block, updateBlock] = useBlockInput(0, 100_000, new BN(leavingUnstakingPeriod || 0))

  const [amount, setAmount] = useNumberInput(0, stakingAmount)
  const [reward, setReward] = useNumberInput(0, rewardPerBlock)

  useEffect(() => setLeavingUnstakingPeriod(block.toNumber()), [block.toNumber()])
  useEffect(() => setStakingAmount(new BN(amount)), [amount])
  useEffect(() => setRewardPerBlock(new BN(reward)), [reward])

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
            label="Staking amount *"
            tooltipText="Minimum staking requirement for all applicants to this role"
            units="JOY"
            tight
          >
            <InputNumber
              id="staking-amount"
              value={formatTokenValue(amount)}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
          <InputComponent
            id="leaving-unstaking-period"
            label="Leaving unstaking period"
            units="blocks"
            inputSize="s"
            tooltipText="Number of blocks that need to pass from the ending block of the active role of member, for the stake to be recoverable."
            message={leavingUnstakingPeriod ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}` : ''}
            tight
          >
            <InputNumber
              id="leaving-unstaking-period"
              value={leavingUnstakingPeriod?.toString()}
              onChange={(event) => updateBlock(event.target.value)}
            />
          </InputComponent>
          <InputComponent
            id="reward-per-block *"
            label="Reward in Joy tokens for the Working group lead."
            units="JOY"
            tight
          >
            <InputNumber
              id="reward-per-block"
              value={formatTokenValue(reward)}
              placeholder="0"
              onChange={(event) => setReward(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

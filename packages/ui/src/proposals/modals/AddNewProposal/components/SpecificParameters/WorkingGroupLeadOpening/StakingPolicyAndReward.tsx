import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useBlockInput } from '@/common/hooks/useBlockInput'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatBlocksToDuration, formatTokenValue } from '@/common/model/formatters'

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
  const [block, updateBlock] = useBlockInput(0, 100_000, new BN(leavingUnstakingPeriod || 0))

  const [amount, setAmount] = useNumberInput(
    0,
    stakingAmount?.lt(new BN(Number.MAX_SAFE_INTEGER)) ? stakingAmount?.toNumber() : 0
  )

  useEffect(() => setLeavingUnstakingPeriod(block.toNumber()), [block.toNumber()])
  useEffect(() => setStakingAmount(new BN(amount)), [amount])

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
            tight
            units="JOY"
            required
            tooltipText="Pleas type the minimum number of tokens required to stake"
          >
            <InputNumber
              id="staking-amount"
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
          <InputComponent
            id="leaving-unstaking-period"
            label="Leaving unstaking period"
            units="blocks"
            inputSize="s"
            tooltipText="Lorem ipsum..."
            message={leavingUnstakingPeriod ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}` : ''}
          >
            <InputNumber
              id="leaving-unstaking-period"
              value={leavingUnstakingPeriod?.toString()}
              onChange={(event) => updateBlock(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

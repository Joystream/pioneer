import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useBlockInput } from '@/common/hooks/useBlockInput'
import { useSchema } from '@/common/hooks/useSchema'
import { formatBlocksToDuration } from '@/common/model/formatters'
import { ExecutionProps } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { StakingPolicyAndRewardParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'
import { GroupIdName } from '@/working-groups/types'

interface Props extends StakingPolicyAndRewardParameters, ExecutionProps {
  setStakingAmount(stakingAmount: BN): void
  setLeavingUnstakingPeriod(leavingUnstakingPeriod: number): void
  setRewardPerBlock(rewardPerBlockId: BN): void
  workingGroupId?: string
}

const baseSchema = Yup.object().shape({
  block: Yup.number(),
  rewardPerBlock: Yup.number().min(1, 'Amount must be greater than zero'),
  stakingAmount: Yup.number(),
})

export const StakingPolicyAndReward = ({
  stakingAmount,
  leavingUnstakingPeriod,
  setStakingAmount,
  setLeavingUnstakingPeriod,
  setRewardPerBlock,
  rewardPerBlock,
  setIsExecutionError,
  workingGroupId = 'forumWorkingGroup',
}: Props) => {
  const { api } = useApi()
  const [block, updateBlock] = useBlockInput(0, 100_000, new BN(leavingUnstakingPeriod || 0))
  const workingGroupConsts = api?.consts[workingGroupId as GroupIdName]

  const schema = useMemo(() => {
    if (workingGroupConsts) {
      baseSchema.fields.stakingAmount = baseSchema.fields.stakingAmount.min(
        workingGroupConsts.leaderOpeningStake.toNumber(),
        'Input must be greater than ${min} for proposal to execute'
      )
      baseSchema.fields.block = baseSchema.fields.block.min(
        workingGroupConsts.minUnstakingPeriodLimit.toNumber() + 1,
        'Input must be greater than ${min} for proposal to execute'
      )
    }
    return baseSchema
  }, [workingGroupConsts])

  const { errors } = useSchema(
    {
      block: block.toNumber() === 0 ? undefined : block.toNumber(),
      rewardPerBlock: rewardPerBlock?.toNumber(),
      stakingAmount: stakingAmount?.toNumber(),
    },
    schema
  )

  useEffect(() => setLeavingUnstakingPeriod(block.toNumber()), [block.toNumber()])
  useEffect(() => {
    setIsExecutionError(!!errors.length && errors[0].path !== 'rewardPerBlock')
  }, [errors])

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
            units="tJOY"
            tight
            validation={hasError('stakingAmount', errors) ? 'invalid' : undefined}
            message={hasError('stakingAmount', errors) ? getErrorMessage('stakingAmount', errors) : ' '}
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
            tooltipText="Number of blocks that need to pass from the ending block of the active role of member, for the stake to be recoverable."
            validation={hasError('block', errors) ? 'invalid' : undefined}
            message={
              hasError('block', errors)
                ? getErrorMessage('block', errors)
                : leavingUnstakingPeriod
                ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}`
                : ' '
            }
            tight
          >
            <InputNumber
              id="leaving-unstaking-period"
              value={leavingUnstakingPeriod?.toString()}
              onChange={(event) => updateBlock(event.target.value)}
            />
          </InputComponent>
          <InputComponent
            id="reward-per-block"
            label="Reward amount per Block"
            units="tJOY"
            tooltipText="Reward in tJOY tokens for the Working group lead"
            tight
            validation={hasError('rewardPerBlock', errors) ? 'invalid' : undefined}
            message={hasError('rewardPerBlock', errors) ? getErrorMessage('rewardPerBlock', errors) : ' '}
            required
          >
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

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { formatBlocksToDuration } from '@/common/model/formatters'

export const StakingPolicyAndReward = () => {
  const { watch } = useFormContext()
  const leavingUnstakingPeriod = watch('stakingPolicyAndReward.leavingUnstakingPeriod')

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
            units={CurrencyName.integerValue}
            tight
            name="stakingPolicyAndReward.stakingAmount"
          >
            <TokenInput id="staking-amount" placeholder="0" name="stakingPolicyAndReward.stakingAmount" />
          </InputComponent>
          <InputComponent
            id="leaving-unstaking-period"
            label="Role cooldown period"
            sublabel="Period where candidate remains in the role with full access after resigning"
            units="blocks"
            inputSize="s"
            tooltipText='Role cooldown period, also referred to as "unstaking period" sets a block count, during which the most recent member is retained in the role, but staking status is set to unstaking - where final removal of worker and staking lock occurs after leaving unstaking period'
            tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/working-groups#leave-worker-role"
            tooltipLinkText="Learn more"
            message={leavingUnstakingPeriod ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}` : ' '}
            name="stakingPolicyAndReward.leavingUnstakingPeriod"
            tight
          >
            <InputNumber id="leaving-unstaking-period" name="stakingPolicyAndReward.leavingUnstakingPeriod" isInBN />
          </InputComponent>
          <InputComponent
            id="reward-per-block"
            label="Reward amount per Block"
            units={CurrencyName.integerValue}
            tooltipText={`Reward in ${CurrencyName.integerValue} tokens for the Working group lead`}
            tight
            name="stakingPolicyAndReward.rewardPerBlock"
            required
          >
            <TokenInput id="reward-per-block" name="stakingPolicyAndReward.rewardPerBlock" placeholder="0" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

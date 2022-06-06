import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { LinkSymbol } from '@/common/components/icons/symbols/LinkSymbol'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { formatBlocksToDuration } from '@/common/model/formatters'

export const StakingPolicyAndReward = () => {
  const { watch } = useFormContext()
  const leavingUnstakingPeriod = watch('stakingPolicyAndReward.leavingUnstakingPeriod')

  const maxAllowedForStakingAmount = 200
  const [stakingAmount, setStakingAmount] = useState(0)
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
            name="stakingPolicyAndReward.stakingAmount"
            validation={stakingAmount < maxAllowedForStakingAmount ? 'invalid' : undefined}
            message={
              stakingAmount < maxAllowedForStakingAmount
                ? 'Staking Amount have to be bigger than ${maxAllowedForStakingAmount}.'
                : undefined
            }
          >
            <InputNumber
              id="staking-amount"
              isTokenValue
              placeholder="0"
              name="stakingPolicyAndReward.stakingAmount"
              isInBN
              maxAllowedValue={maxAllowedForStakingAmount}
              onChange={(e: any) => {
                setStakingAmount(e.target.value)
              }}
            />
          </InputComponent>
          <InputComponent
            id="leaving-unstaking-period"
            label="Role cooldown period"
            sublabel="Period where candidate remains in the role with full access after resigning"
            units="blocks"
            inputSize="s"
            tooltipText={
              <>
                Role cooldown period, also referred to as "unstaking period" sets a block count, during which the most
                recent member is retained in the role, but staking status is set to unstaking - where final removal of
                worker and staking lock occurs after leaving unstaking period{' '}
                <TooltipExternalLink
                  href="https://joystream.gitbook.io/testnet-workspace/system/working-groups#leave-worker-role"
                  target="_blank"
                >
                  <TextMedium>Learn more</TextMedium> <LinkSymbol />
                </TooltipExternalLink>
              </>
            }
            message={leavingUnstakingPeriod ? `≈ ${formatBlocksToDuration(leavingUnstakingPeriod)}` : ' '}
            name="stakingPolicyAndReward.leavingUnstakingPeriod"
            tight
          >
            <InputNumber id="leaving-unstaking-period" name="stakingPolicyAndReward.leavingUnstakingPeriod" isInBN />
          </InputComponent>
          <InputComponent
            id="reward-per-block"
            label="Reward amount per Block"
            units="tJOY"
            tooltipText="Reward in tJOY tokens for the Working group lead"
            tight
            name="stakingPolicyAndReward.rewardPerBlock"
            required
          >
            <InputNumber
              id="reward-per-block"
              isTokenValue
              name="stakingPolicyAndReward.rewardPerBlock"
              placeholder="0"
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

import BN from 'bn.js'
import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { AmountButton, AmountButtons, Row, TransactionAmount } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const DecreaseWorkingGroupLeadStake = () => {
  const { setValue, watch } = useFormContext()
  const [groupId] = watch(['decreaseWorkingGroupLeadStake.groupId'])
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const setStakingAmount = useCallback(
    (value: BN) => setValue('decreaseWorkingGroupLeadStake.stakingAmount', value, { shouldValidate: true }),
    [setValue]
  )

  const byHalf = () => setStakingAmount(group && group.leadWorker ? group.leadWorker.stake.divn(2) : BN_ZERO)
  const byThird = () => setStakingAmount(group && group.leadWorker ? group.leadWorker.stake.divn(3) : BN_ZERO)

  const isDisabled = !group || (group && !group.leadId)

  useEffect(() => {
    setStakingAmount(BN_ZERO)
    setValue('decreaseWorkingGroupLeadStake.workerId', group?.leadWorker?.runtimeId)
  }, [groupId, group?.leadWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Decrease Working Group Lead Stake</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Working Group"
          >
            <SelectWorkingGroup
              selectedGroupId={groupId}
              onChange={(selected) =>
                setValue('decreaseWorkingGroupLeadStake.groupId', selected.id, { shouldValidate: true })
              }
              disableNoLead
            />
          </InputComponent>
          <SelectedMember label="Working Group Lead" member={lead} disabled />
          {group && (
            <Info>
              <TextMedium>
                The actual stake for {capitalizeFirstLetter(group.name)} Working Group Lead is{' '}
                <TextInlineMedium bold>{formatTokenValue(group.leadWorker?.stake)} tJOY</TextInlineMedium>.
              </TextMedium>
            </Info>
          )}
          <TransactionAmount>
            <InputComponent
              label="Decrease Stake Amount"
              tight
              units="tJOY"
              inputWidth="s"
              tooltipText="Amount by which to decrease stake."
              required
              disabled={isDisabled}
              message="Amount must be greater than zero"
            >
              <InputNumber
                id="amount-input"
                name="decreaseWorkingGroupLeadStake.stakingAmount"
                isTokenValue
                isInBN
                placeholder="0"
                disabled={isDisabled}
              />
            </InputComponent>
            <AmountButtons>
              <AmountButton size="small" onClick={byHalf} disabled={isDisabled}>
                By half
              </AmountButton>
              <AmountButton size="small" onClick={byThird} disabled={isDisabled}>
                By 1/3
              </AmountButton>
            </AmountButtons>
          </TransactionAmount>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const SlashWorkingGroupLead = () => {
  const { setValue, watch } = useFormContext()
  const [groupId] = watch(['slashWorkingGroupLead.groupId'])
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)
  const isDisabled = !group || (group && !group.leadId)

  useEffect(() => {
    setValue('slashWorkingGroupLead.slashingAmount', BN_ZERO, { shouldValidate: true })
    setValue('slashWorkingGroupLead.workerId', group?.leadWorker?.runtimeId, { shouldValidate: true })
  }, [groupId, group?.leadWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Slash Working Group Lead</TextMedium>
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
              onChange={(selected) => setValue('slashWorkingGroupLead.groupId', selected.id)}
              disableNoLead
            />
          </InputComponent>
          <SelectedMember label="Working Group Lead" member={lead} disabled />
          {group?.leadWorker?.stake && group?.name && (
            <Info>
              <TextMedium>
                The actual stake for {group?.name} Working Group Lead is{' '}
                {<TokenValue value={group?.leadWorker?.stake} />}
              </TextMedium>
            </Info>
          )}
          <InputComponent
            label="Decrease Stake Amount"
            tight
            units={CurrencyName.integerValue}
            inputWidth="s"
            tooltipText="Amount to be slashed"
            name="slashWorkingGroupLead.slashingAmount"
            message="Amount must be greater than zero"
            required
            disabled={isDisabled}
          >
            <InputNumber
              id="amount-input"
              name="slashWorkingGroupLead.slashingAmount"
              isTokenValue
              isInBN
              placeholder="0"
              disabled={isDisabled}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

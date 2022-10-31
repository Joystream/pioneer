import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const SetWorkingGroupLeadReward = () => {
  const { setValue, watch } = useFormContext()
  const [groupId] = watch(['setWorkingGroupLeadReward.groupId'])
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const isDisabled = !group || (group && !group.leadId)

  useEffect(() => {
    if (group) {
      setValue('setWorkingGroupLeadReward.workerId', group?.leadWorker?.runtimeId, { shouldValidate: true })
    }
  }, [group?.leadWorker?.runtimeId])
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Working Group Lead Reward</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="working-group-input"
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Working Group"
          >
            <SelectWorkingGroup
              id="working-group"
              selectedGroupId={groupId}
              onChange={(selected) =>
                setValue('setWorkingGroupLeadReward.groupId', selected.id, { shouldValidate: true })
              }
              disableNoLead
            />
          </InputComponent>
          {lead && <SelectedMember label="Working Group Lead" member={lead} disabled />}
          {group && (
            <Info>
              <TextMedium>
                Current reward per block for {group?.name} Working Group Lead is{' '}
                {<TokenValue value={group?.leadWorker?.rewardPerBlock} />}
              </TextMedium>
            </Info>
          )}

          <InputComponent
            label="Reward Amount Per Block"
            tight
            units={CurrencyName.integerValue}
            inputWidth="s"
            tooltipText="Reward per block amount that is awarded to working group lead’s reward account"
            name="setWorkingGroupLeadReward.rewardPerBlock"
            message="Amount must be greater than zero"
            required
            disabled={isDisabled}
          >
            <TokenInput
              id="amount-input"
              name="setWorkingGroupLeadReward.rewardPerBlock"
              placeholder="0"
              disabled={isDisabled}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

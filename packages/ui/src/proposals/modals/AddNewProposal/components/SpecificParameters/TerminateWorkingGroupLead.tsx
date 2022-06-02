import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const TerminateWorkingGroupLead = () => {
  const { setValue, watch } = useFormContext()
  const [groupId] = watch(['terminateWorkingGroupLead.groupId'])
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const isDisabled = !group || (group && !group.leadId)

  const [showSlash, setShowSlash] = useState(false)

  useEffect(() => {
    setValue('terminateWorkingGroupLead.slashingAmount', BN_ZERO, { shouldValidate: true })
    setValue('terminateWorkingGroupLead.workerId', group?.leadWorker?.runtimeId, { shouldValidate: true })
  }, [groupId, group?.leadWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Terminate Working Group Lead</TextMedium>
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
                setValue('terminateWorkingGroupLead.groupId', selected.id, { shouldValidate: true })
              }
              disableNoLead
            />
          </InputComponent>
          <SelectedMember label="Working Group Lead" member={lead} disabled />

          <InlineToggleWrap>
            <Label>Slash: </Label>
            <ToggleCheckbox
              falseLabel="No"
              trueLabel="Yes"
              checked={showSlash}
              onChange={(isSet) => setShowSlash(isSet)}
            />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>

          {showSlash && (
            <InputComponent
              label="Optional slashing Amount"
              tight
              units="tJOY"
              inputWidth="s"
              tooltipText="Optional amount to be slashed"
              disabled={isDisabled}
            >
              <InputNumber
                id="amount-input"
                name="terminateWorkingGroupLead.slashingAmount"
                isTokenValue
                isInBN
                placeholder="0"
                disabled={isDisabled}
              />
            </InputComponent>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { CurrencyName } from '@/app/constants/currency'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
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
    if (group) {
      setValue('terminateWorkingGroupLead.slashingAmount', undefined, { shouldValidate: true })
      setValue('terminateWorkingGroupLead.workerId', group.leadWorker?.runtimeId, {
        shouldValidate: true,
      })
    }
  }, [!group])

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      setShowSlash(value)
      setValue('terminateWorkingGroupLead.slashingAmount', undefined, { shouldValidate: true })
    },
    [setValue]
  )

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
            <ToggleCheckbox falseLabel="No" trueLabel="Yes" checked={showSlash} onChange={handleSwitchChange} />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>

          {showSlash && (
            <InputComponent
              label="Optional slashing Amount"
              tight
              units={CurrencyName.integerValue}
              inputWidth="s"
              tooltipText="Optional amount to be slashed"
              name="terminateWorkingGroupLead.slashingAmount"
              disabled={isDisabled}
            >
              <TokenInput
                id="amount-input"
                name="terminateWorkingGroupLead.slashingAmount"
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

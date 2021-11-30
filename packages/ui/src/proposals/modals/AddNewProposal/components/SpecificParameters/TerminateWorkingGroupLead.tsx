import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { GroupIdName } from '@/working-groups/types'

export interface TerminateWorkingGroupLeadParameters {
  slashingAmount?: BN
  groupId?: GroupIdName
  workerId?: number
}

interface TerminateWorkingGroupLeadProps extends TerminateWorkingGroupLeadParameters {
  setSlashingAmount: (amount: BN) => void

  setGroupId(groupId: GroupIdName): void

  setWorkerId(workerId?: number): void
}

export const TerminateWorkingGroupLead = ({
  slashingAmount,
  groupId,
  setSlashingAmount,
  setGroupId,
  setWorkerId,
}: TerminateWorkingGroupLeadProps) => {
  const [amount, setAmount] = useNumberInput(0, slashingAmount)

  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const isDisabled = !group || (group && !group.leadId)

  const [showSlash, setShowSlash] = useState(false)

  useEffect(() => setSlashingAmount(new BN(amount)), [amount])
  useEffect(() => {
    setSlashingAmount(BN_ZERO)
    setWorkerId(group?.leadWorker?.runtimeId)
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
              onChange={(selected) => setGroupId(selected.id)}
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
              units="JOY"
              inputWidth="s"
              tooltipText="Optional amount to be slashed"
              disabled={isDisabled}
            >
              <InputNumber
                id="amount-input"
                value={formatTokenValue(new BN(amount))}
                placeholder="0"
                onChange={(event) => setAmount(event.target.value)}
                disabled={isDisabled}
              />
            </InputComponent>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

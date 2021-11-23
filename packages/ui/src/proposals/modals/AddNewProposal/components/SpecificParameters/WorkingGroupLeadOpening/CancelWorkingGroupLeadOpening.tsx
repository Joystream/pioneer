import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export interface DecreaseWorkingGroupLeadStakeParameters {
  groupId?: string
  openingId?: string
}

interface DecreaseWorkingGroupLeadStakeProps extends DecreaseWorkingGroupLeadStakeParameters {
  setGroupId(groupId: string): void
  setOpeningId(openingId?: string): void
}

export const CancelWorkingGroupLeadOpening = ({
  openingId,
  groupId,
  setGroupId,
  setOpeningId,
}: DecreaseWorkingGroupLeadStakeProps) => {
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const isDisabled = !group || (group && !group.leadId)

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Cancel Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>{' '}
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
              onChange={(selected) => setGroupId(selected.id)}
              disableNoLead
            />
          </InputComponent>
          {/*<SelectedMember label="Working Group Opening" member={lead} disabled />*/}
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Opening"
            required
            inputSize="l"
            tooltipText="Please select an opening ID for Working Group"
          >
            <SelectWorkingGroupOpening
              onChange={(selected) => setOpeningId(selected.id)}
              selectedOpeningId={openingId}
            />
          </InputComponent>
          {/*<SelectedMember label="Working Group Opening" member={lead} disabled />*/}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

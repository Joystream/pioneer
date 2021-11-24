import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'

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
            id="working-group-select-input"
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Working Group"
          >
            <SelectWorkingGroup
              id="working-group-select"
              selectedGroupId={groupId}
              onChange={(selected) => setGroupId(selected.id)}
              disableNoLead
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="opening-input"
            label="Opening"
            required
            inputSize="l"
            tooltipText={
              groupId ? 'Please select an opening ID for Working Group' : 'Please first select Working Group'
            }
            disabled={!groupId}
          >
            <SelectWorkingGroupOpening
              id="opening"
              onChange={(selected) => setOpeningId(selected.id)}
              selectedOpeningId={openingId}
              disabled={!groupId}
              groupId={groupId}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

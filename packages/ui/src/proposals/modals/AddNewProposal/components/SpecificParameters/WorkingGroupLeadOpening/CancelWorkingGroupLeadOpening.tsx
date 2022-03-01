import React from 'react'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'

export interface CancelWorkingGroupLeadStakeParameters {
  groupId?: string
  openingId?: number
}

interface CancelWorkingGroupLeadStakeProps extends CancelWorkingGroupLeadStakeParameters {
  setGroupId(groupId: string): void
  setOpeningId(openingId?: number): void
}

export const CancelWorkingGroupLeadOpening = ({
  openingId,
  groupId,
  setOpeningId,
  setGroupId,
}: CancelWorkingGroupLeadStakeProps) => {
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
            id="opening-input"
            label="Opening"
            required
            inputSize="l"
            tooltipText={
              groupId ? 'Please select an opening ID for Working Group' : 'Please first select Working Group'
            }
          >
            <SelectWorkingGroupOpening
              id="opening"
              openingsPositionType="LEADER"
              onChange={(selected) => {
                setGroupId(selected.groupId)
                setOpeningId(selected.runtimeId)
              }}
              selectedOpeningId={openingId}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

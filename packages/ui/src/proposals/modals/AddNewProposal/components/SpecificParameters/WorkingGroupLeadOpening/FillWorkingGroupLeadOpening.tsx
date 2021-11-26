import React from 'react'

import { WorkingGroupOpeningType } from '@/common/api/queries'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/SelectWorkingGroupApplication'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'

export interface FillWorkingGroupLeadOpeningParameters {
  openingId?: number
  applicationId?: number
}

interface Props {
  openingId?: number
  setOpeningId: (openingId: number) => void
  applicationId?: number
  setApplicationId: (applicationId: number) => void
}

export const FillWorkingGroupLeadOpening = ({ openingId, setOpeningId, applicationId, setApplicationId }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Fill Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Opening" required inputSize="l" tooltipText="Please select an identifier for Opening">
            <SelectWorkingGroupOpening
              selectedOpeningId={openingId}
              onChange={(selected) => setOpeningId(selected.runtimeId)}
              openingsPositionType={WorkingGroupOpeningType.Leader}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Application"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Application"
            disabled={!openingId}
          >
            <SelectWorkingGroupApplication
              selectedApplicationId={applicationId}
              onChange={(selected) => setApplicationId(selected.runtimeId)}
              disabled={!openingId}
              openingId={openingId}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

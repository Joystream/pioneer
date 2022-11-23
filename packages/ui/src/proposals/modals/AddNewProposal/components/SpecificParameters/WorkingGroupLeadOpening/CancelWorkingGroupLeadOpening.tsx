import React from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'

export const CancelWorkingGroupLeadOpening = () => {
  const { watch, setValue } = useFormContext()
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
              watch('cancelWorkingGroupLeadOpening.groupId')
                ? 'Please select an opening ID for Working Group'
                : 'Please first select Working Group'
            }
          >
            <SelectWorkingGroupOpening
              id="opening"
              placeholder="Choose opening to cancel"
              openingsPositionType="LEADER"
              onChange={(selected) => {
                setValue('cancelWorkingGroupLeadOpening.groupId', selected.groupId, { shouldValidate: true })
                setValue('cancelWorkingGroupLeadOpening.openingId', selected.id, { shouldValidate: true })
              }}
              selectedOpeningId={watch('cancelWorkingGroupLeadOpening.openingId')}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

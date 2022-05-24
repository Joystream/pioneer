import React, { Children, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { WorkingGroupOpeningType } from '@/common/api/queries'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { SelectWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/SelectWorkingGroupApplication'
import { SelectWorkingGroupOpening } from '@/working-groups/components/SelectWorkingGroupOpening/SelectWorkingGroupOpening'
import { ApplicationAnswer, WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

export const FillWorkingGroupLeadOpening = () => {
  const [answers, setAnswer] = useState<ApplicationAnswer[]>([])
  const { setValue, watch } = useFormContext()
  const [openingId, applicationId] = watch([
    '.fillWorkingGroupLeadOpening.openingId',
    'fillWorkingGroupLeadOpening.applicationId',
  ])

  const selectApplication = (selected: WorkingGroupApplication) => {
    setValue('fillWorkingGroupLeadOpening.applicationId', selected.id, { shouldValidate: true })
    setAnswer(selected.answers)
  }

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
          <InputComponent
            id="opening-input"
            label="Opening"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Opening"
          >
            <SelectWorkingGroupOpening
              id="opening"
              placeholder="Choose opening to fill"
              selectedOpeningId={openingId}
              onChange={(selected) => {
                setValue('fillWorkingGroupLeadOpening.openingId', selected.id, { shouldValidate: true })
                setValue('fillWorkingGroupLeadOpening.groupId', selected.groupId, { shouldValidate: true })
              }}
              openingsPositionType={WorkingGroupOpeningType.Leader}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="application-input"
            label="Application"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Application"
            disabled={typeof openingId !== 'string'}
          >
            <SelectWorkingGroupApplication
              id="application"
              selectedApplicationId={applicationId}
              placeholder={'Choose application'}
              onChange={selectApplication}
              disabled={typeof openingId !== 'string'}
              openingId={openingId}
              applicationsStatus="pending"
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <StyledText>Applicant's Details</StyledText>
          {Children.toArray(
            answers.map((userInfo) => (
              <>
                <StyledInformation>{userInfo.question}</StyledInformation>
                <StyledInformation>{userInfo.answer}</StyledInformation>
              </>
            ))
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const StyledText = styled(TextMedium)`
  font-size: 14px;
  color: ${Colors.Black[900]};
  font-weight: 700;
`

const StyledInformation = styled(TextMedium)`
  font-size: 14px;
  color: ${Colors.Black[400]};
`

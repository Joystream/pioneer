import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { OpeningDuration } from '@/common/components/OpeningDuration/OpeningDuration'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'

interface Props {
  noHeader?: boolean
}

export const DurationAndProcess = ({ noHeader = false }: Props) => {
  return (
    <RowGapBlock gap={24}>
       {noHeader || (
        <Row>
          <RowGapBlock gap={8}>
            <h4>Specific parameters</h4>
            <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
          </RowGapBlock>
        </Row>
      )}
      <Row>
        <RowGapBlock gap={20}>
          <TextBig bold value>
            Opening Duration
          </TextBig>
          <OpeningDuration label="Expected length of the application period" />

          <InputComponent
            label="Application process"
            required
            inputSize="auto"
            id="field-details"
            name="durationAndProcess.details"
          >
            <CKEditor id="field-details" name="durationAndProcess.details" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

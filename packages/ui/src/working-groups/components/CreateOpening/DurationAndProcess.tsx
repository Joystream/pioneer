import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { OpeningDuration } from '@/common/components/OpeningDuration/OpeningDuration'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'

interface Props {
  hasHiringTarget?: boolean
}

export const DurationAndProcess = ({ hasHiringTarget }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <TextBig bold value>
            Opening Duration
          </TextBig>
          <OpeningDuration label="Expected length of the application period" />

          {hasHiringTarget && (
            <InputComponent
              label="Hiring Target"
              id="hiring-target"
              required
              inputSize="m"
              name="durationAndProcess.target"
              tight
            >
              <InputNumber id="hiring-target" placeholder="0" name="durationAndProcess.target" />
            </InputComponent>
          )}

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

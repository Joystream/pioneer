import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { OpeningDuration, OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { DurationAndProcessParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'

interface Props extends DurationAndProcessParameters {
  setDetails(details: string): void
  setDuration(duration: OpeningDurationProps['value']): void
}

export const DurationAndProcess = ({ duration, setDuration, details, setDetails }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <TextBig bold value>
            Opening Duration
          </TextBig>
          <OpeningDuration
            label="Expected length of the application period"
            value={duration}
            onChange={(value) => setDuration(value || undefined)}
          />

          <InputComponent label="Application process" required inputSize="auto" id="field-details">
            <CKEditor
              id="field-details"
              onReady={(editor) => editor.setData(details || '')}
              onChange={(event, editor) => setDetails(editor.getData())}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

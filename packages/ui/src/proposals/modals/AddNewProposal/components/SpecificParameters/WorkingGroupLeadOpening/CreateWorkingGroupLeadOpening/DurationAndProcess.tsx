import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { DurationAndProcessParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'

interface Props extends DurationAndProcessParameters {
  setDetails(details: string): void
  setDuration(duration: number | undefined): void
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
          <InputComponent
            label="Duration"
            inputSize="m"
            tight
            units="blocks"
            id="field-duration"
            message={duration ? `≈ ${inBlocksDate(duration)}` : ''}
          >
            <InputNumber
              isTokenValue
              id="field-duration"
              placeholder="0"
              onChange={(_, value) => setDuration(value || undefined)}
              value={duration?.toString()}
            />
          </InputComponent>
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

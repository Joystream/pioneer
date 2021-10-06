import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface SummaryAndBannerStepProps {
  summary?: string
  banner?: string
  setSummary: (summary?: string) => void
  setBanner: (banner?: string) => void
}

export const SummaryAndBannerStep = ({ summary, banner, setSummary, setBanner }: SummaryAndBannerStepProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Candidate profile</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Summary" required inputSize="auto" id="field-summary">
            <CKEditor
              id="field-summary"
              onChange={(event, editor) => setSummary(editor.getData())}
              onReady={(editor) => editor.setData(summary || '')}
            />
          </InputComponent>
          <InputComponent label="Banner" disabled inputSize="s">
            <InputText
              disabled
              placeholder="Image URL"
              value={banner}
              onChange={(event) => setBanner(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

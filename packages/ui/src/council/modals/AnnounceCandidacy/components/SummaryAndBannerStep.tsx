import React, { ReactNode } from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface Props {
  previewButton: ReactNode
}

export const SummaryAndBannerStep = ({ previewButton }: Props) => (
  <RowGapBlock gap={24}>
    <Row>
      <RowGapBlock gap={8}>
        <h4>Candidate profile</h4>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={20}>
        <InputComponent label="Summary" required inputSize="auto" id="field-summary">
          <CKEditor id="field-summary" name="summaryAndBanner.summary" />
        </InputComponent>
        <InputComponent label="Banner" inputSize="s">
          <InputText placeholder="Image URL" name="summaryAndBanner.banner" />
        </InputComponent>
        {previewButton}
      </RowGapBlock>
    </Row>
  </RowGapBlock>
)

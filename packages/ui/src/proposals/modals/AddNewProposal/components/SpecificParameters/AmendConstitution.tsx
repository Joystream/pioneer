import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface AmendConstitutionParameters {
  description?: string
}

interface Props extends AmendConstitutionParameters {
  setDescription(description: string): void
}

export const AmendConstitution = ({ description, setDescription }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Amend Constitution</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Description" required inputSize="auto" id="field-description">
            <CKEditor
              id="field-description"
              onReady={(editor) => editor.setData(description || '')}
              onChange={(event, editor) => setDescription(editor.getData())}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

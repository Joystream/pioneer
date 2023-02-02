import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'

interface Props {
  label: string
  value: string | undefined
}

export const Text = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <TextInlineMedium dark>{value ?? '-'}</TextInlineMedium>
      </TextMedium>
    </RowGapBlock>
  </Row>
)

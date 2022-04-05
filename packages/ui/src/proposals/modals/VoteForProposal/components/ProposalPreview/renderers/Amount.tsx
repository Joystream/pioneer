import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium, TokenValue } from '@/common/components/typography'

interface Props {
  label: string
  value: BN
}

export const Amount = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <TextInlineMedium dark>
          <TokenValue value={value} />
        </TextInlineMedium>
      </TextMedium>
    </RowGapBlock>
  </Row>
)

import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'

interface Props {
  label: string
  value: BN
}

export const NumberOfBlocks = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <TextInlineMedium dark>{formatTokenValue(value)}</TextInlineMedium> blocks
      </TextMedium>
    </RowGapBlock>
  </Row>
)

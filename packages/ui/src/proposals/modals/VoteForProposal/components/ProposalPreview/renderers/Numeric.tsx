import BN from 'bn.js'
import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { isDefined } from '@/common/utils'

interface Props {
  label: string
  value?: BN | number
  units?: string
}

export const Numeric = ({ label, value, units }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <TextInlineMedium dark>{value?.toString() ?? '-'}</TextInlineMedium>
        {isDefined(value) && units && ` ${units}`}
      </TextMedium>
    </RowGapBlock>
  </Row>
)

import React from 'react'

import { CopyComponent } from '@/common/components/CopyComponent'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { shortenAddress } from '@/common/model/formatters'

interface Props {
  label: string
  value: string
}

export const Address = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <CopyComponent altText={shortenAddress(value)} copyText={value} />
    </RowGapBlock>
  </Row>
)

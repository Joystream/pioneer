import React from 'react'

import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'

interface Props {
  label: string
  value: string
}

export const Markdown = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <MarkdownPreview markdown={value} size="xs" />
    </RowGapBlock>
  </Row>
)

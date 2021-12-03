import React from 'react'
import { generatePath } from 'react-router-dom'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { RouterLink } from '@/common/components/RouterLink'
import { Label, TextMedium } from '@/common/components/typography'
import { ProposalsRoutes } from '@/proposals/constants/routes'

interface Props {
  label: string
  value: {
    id: string
    title: string
  }
}

export const ProposalLink = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <RouterLink to={generatePath(ProposalsRoutes.preview, { id: value.id })} target="_blank">
          {value.title}
        </RouterLink>
      </TextMedium>
    </RowGapBlock>
  </Row>
)

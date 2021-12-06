import React from 'react'
import { generatePath } from 'react-router-dom'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { RouterLink } from '@/common/components/RouterLink'
import { Label, TextMedium } from '@/common/components/typography'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

interface Props {
  label: string
  value: string
}

export const OpeningLink = ({ label, value }: Props) => (
  <Row>
    <RowGapBlock gap={4}>
      <Label>{label}</Label>
      <TextMedium lighter>
        <RouterLink to={generatePath(WorkingGroupsRoutes.openingById, { id: value })} target="_blank">
          View the opening
        </RouterLink>
      </TextMedium>
    </RowGapBlock>
  </Row>
)

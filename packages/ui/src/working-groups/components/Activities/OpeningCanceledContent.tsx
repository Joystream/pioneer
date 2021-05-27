import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'
import { OpeningCanceledActivity } from '@/working-groups/types'

interface Props {
  activity: OpeningCanceledActivity
}

export const OpeningCanceledContent = ({ activity: { opening } }: Props) => (
  <>
    Opening "<RouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</RouterLink>" for a{' '}
    {opening.type === 'REGULAR' && 'Non-'}Lead has been cancelled by the{' '}
    {opening.type === 'REGULAR' ? `${opening.groupName} Leader` : 'Council'}.
  </>
)

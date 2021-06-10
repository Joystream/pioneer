import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningCanceledActivity } from '@/working-groups/types'

interface Props {
  activity: OpeningCanceledActivity
}

export const OpeningCanceledContent = ({ activity: { opening } }: Props) => (
  <>
    Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" for
    a {opening.type === 'REGULAR' && 'Non-'}Lead has been cancelled by the{' '}
    {opening.type === 'REGULAR' ? `${opening.groupName} Leader` : 'Council'}.
  </>
)

import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningAddedActivity } from '@/working-groups/types'

interface Props {
  activity: OpeningAddedActivity
}

export const OpeningAddedContent = ({ activity: { opening } }: Props) => (
  <>
    Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>" for
    a {opening.type === 'REGULAR' && 'Non-'}Lead has been created by the{' '}
    {opening.type === 'REGULAR' ? `${opening.groupName} Leader` : 'Council'}.
  </>
)

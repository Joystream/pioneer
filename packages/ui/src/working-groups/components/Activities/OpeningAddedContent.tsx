import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningAddedActivity } from '@/working-groups/types'

export const OpeningAddedContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { opening } = activity as OpeningAddedActivity
  return (
    <>
      Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>"
      for a {opening.type === 'REGULAR' && 'Non-'}Lead has been created by the{' '}
      {opening.type === 'REGULAR' ? `${opening.groupName} Leader` : 'Council'}.
    </>
  )
}

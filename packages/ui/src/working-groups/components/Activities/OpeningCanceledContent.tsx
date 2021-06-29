import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningCanceledActivity } from '@/working-groups/types'

interface Props {
  activity: OpeningCanceledActivity
}

export const OpeningCanceledContent: React.FC<ActivityContentProps> = ({ activity }) => {
  const { opening } = activity as OpeningCanceledActivity
  return (
    <>
      Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>"
      for a {opening.type === 'REGULAR' && 'Non-'}Lead has been cancelled by the{' '}
      {opening.type === 'REGULAR' ? `${opening.groupName} Leader` : 'Council'}.
    </>
  )
}

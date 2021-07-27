import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningAddedActivity } from '@/working-groups/types'

export const OpeningAddedContent: ActivityContentComponent<OpeningAddedActivity> = ({ activity }) => {
  const { opening } = activity
  return (
    <>
      Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>"
      for a {opening.type === 'REGULAR' && 'Non-'}Lead has been created by the{' '}
      {opening.type === 'REGULAR' ? `${opening.groupName} Lead` : 'Council'}.
    </>
  )
}

import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningCanceledActivity } from '@/working-groups/types'

export const OpeningCanceledContent: ActivityContentComponent<OpeningCanceledActivity> = ({ activity }) => {
  const { opening } = activity

  return (
    <>
      Opening "<ActivityRouterLink to={`/working-groups/openings/${opening.id}`}>{opening.title}</ActivityRouterLink>"
      for a {opening.type === 'REGULAR' && 'Non-'}Lead has been cancelled by the
      {opening.type === 'REGULAR' ? `${opening.groupName} Lead` : 'Council'}.
    </>
  )
}

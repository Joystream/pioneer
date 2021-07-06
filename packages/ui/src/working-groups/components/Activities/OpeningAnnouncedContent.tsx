import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'
import { OpeningAnnouncedActivity, OpeningFilledActivity } from '@/working-groups/types'

export const OpeningAnnouncedContent: ActivityContentComponent<OpeningAnnouncedActivity> = ({ activity }) => {
  const { openingId, groupName } = activity
  return (
    <>
      An <ActivityRouterLink to={`/working-groups/upcoming-openings/${openingId}`}>upcoming opening</ActivityRouterLink>{' '}
      for {groupName} has been announced.
    </>
  )
}

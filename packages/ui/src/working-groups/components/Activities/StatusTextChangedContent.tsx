import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'

import { StatusTextChangedActivity } from '../../types'

export const StatusTextChangedContent: ActivityContentComponent = React.memo(({ activity }) => {
  const { groupName } = activity as StatusTextChangedActivity

  return (
    <>
      Status updated by the
      <ActivityRouterLink to={`/working-groups/${groupName}`}>{groupName} Working Group</ActivityRouterLink> Lead.
    </>
  )
})

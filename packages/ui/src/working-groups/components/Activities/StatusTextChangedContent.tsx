import React from 'react'

import { ActivityRouterLink } from '@/common/components/Activities/ActivityRouterLink'

import { StatusTextChangedActivity } from '../../types'

interface Props {
  activity: StatusTextChangedActivity
}
export const StatusTextChangedContent = React.memo(({ activity }: Props) => (
  <>
    Status updated by the{' '}
    <ActivityRouterLink to={`/working-groups/${activity.groupName}`}>
      {activity.groupName} Working Group
    </ActivityRouterLink>{' '}
    Lead.
  </>
))

import React from 'react'

import { RouterLink } from '@/common/components/RouterLink'

import { StatusTextChangedActivity } from '../../types'

interface Props {
  activity: StatusTextChangedActivity
}
export const StatusTextChangedContent = React.memo(({ activity }: Props) => (
  <>
    Status updated by the{' '}
    <RouterLink to={`/working-groups/${activity.groupName}`}>{activity.groupName} Working Group</RouterLink> Lead.
  </>
))

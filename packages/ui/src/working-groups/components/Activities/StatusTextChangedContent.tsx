import React from 'react'
import { Link } from 'react-router-dom'

import { StatusTextChangedActivity } from '../../types'

interface Props {
  activity: StatusTextChangedActivity
}
export const StatusTextChangedContent = React.memo(({ activity }: Props) => (
  <>
    Status updated by the <Link to={`/working-groups/${activity.groupName}`}>{activity.groupName} Working Group</Link>{' '}
    Lead.
  </>
))

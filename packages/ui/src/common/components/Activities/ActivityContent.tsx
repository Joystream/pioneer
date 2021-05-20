import React from 'react'
import { Link } from 'react-router-dom'

import { Activity } from '../../types'

interface Props {
  activity: Activity
}

export const ActivityContent = React.memo(({ activity }: Props) => {
  switch (activity.eventType) {
    case 'AppliedOnOpeningEvent':
      return (
        <>
          <Link to="#">{activity.memberHandle}</Link> has applied on the opening{' '}
          <Link to="#">{activity.openingTitle}</Link>.
        </>
      )
    default:
      return <>{activity.eventType}</>
  }
})

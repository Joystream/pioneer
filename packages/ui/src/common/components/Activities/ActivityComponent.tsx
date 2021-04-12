import React from 'react'

import { IActivity } from './Activities'
import { ActivityIcon } from './ActivityIcon'

export const ActivityComponent = ({ activity }: { activity: IActivity }) => {
  return (
    <div>
      <ActivityIcon iconName="up" />
      <div>{activity.time}</div>
      <div>{activity.text}</div>
    </div>
  )
}

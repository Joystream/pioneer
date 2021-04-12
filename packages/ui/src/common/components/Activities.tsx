import React from 'react'

import { ArrowInsideIcon, CopyIcon } from './icons'

interface IActivity {
  id: string
  time: string
  text: string
}

export interface ActivitiesProps {
  activities: IActivity[]
}

interface ActivityIconProps {
  iconName: 'up' | 'down'
  variant?: 'error' | 'ok' | 'default'
}

const ActivityIcon = ({ iconName, variant }: ActivityIconProps) => {
  const type = variant ?? 'default'

  if (iconName === 'up') {
    return <ArrowInsideIcon />
  }

  return <CopyIcon />
}

const Activity = ({ activity }: { activity: IActivity }) => {
  return (
    <div>
      <ActivityIcon iconName="up" />
      <div>{activity.time}</div>
      <div>{activity.text}</div>
    </div>
  )
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <div>
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

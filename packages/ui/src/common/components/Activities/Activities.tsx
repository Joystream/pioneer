import React from 'react'

import { ActivityComponent } from './ActivityComponent'

export interface IActivity {
  id: string
  time: string
  text: string
}

export interface ActivitiesProps {
  activities: IActivity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <div>
      {activities.map((activity) => (
        <ActivityComponent key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

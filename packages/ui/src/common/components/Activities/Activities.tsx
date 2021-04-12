import React from 'react'

import { Activity } from '../../types'
import { TextMedium } from '../typography'

import { ActivityComponent } from './ActivityComponent'

export interface ActivitiesProps {
  activities: Activity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <div>
      {activities.map((activity) => (
        <ActivityComponent
          key={activity.id}
          type={activity.type}
          category={activity.category}
          timestamp={activity.time}
        >
          <TextMedium>{activity.text}</TextMedium>
        </ActivityComponent>
      ))}
    </div>
  )
}

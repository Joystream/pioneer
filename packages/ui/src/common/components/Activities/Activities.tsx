import React from 'react'

import { TextMedium } from '../typography'

import { ActivityComponent } from './ActivityComponent'
import { ActivityIconType, ActivityIconVariant } from './ActivityIcon'

export interface Activity {
  id: string
  time: string
  text: string
  type: ActivityIconType
  variant?: ActivityIconVariant
}

export interface ActivitiesProps {
  activities: Activity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <div>
      {activities.map((activity) => (
        <ActivityComponent key={activity.id} variant={activity.variant} timestamp={activity.time} icon={activity.type}>
          <TextMedium>{activity.text}</TextMedium>
        </ActivityComponent>
      ))}
    </div>
  )
}

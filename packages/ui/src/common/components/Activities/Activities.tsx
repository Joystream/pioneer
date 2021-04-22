import React from 'react'
import styled from 'styled-components'

import { Activity } from '../../types'

import { ActivityComponent } from './ActivityComponent'

export interface ActivitiesProps {
  activities: Activity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <ActivitiesList>
      {activities.map((activity) => (
        <ActivityComponent
          key={activity.id}
          type={activity.type}
          category={activity.category}
          timestamp={activity.time}
        >
          {activity.text}
        </ActivityComponent>
      ))}
    </ActivitiesList>
  )
}

const ActivitiesList = styled.ul`
  display: grid;
  grid-row-gap: 24px;
`

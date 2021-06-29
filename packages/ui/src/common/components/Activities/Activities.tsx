import React from 'react'
import styled from 'styled-components'

import { Activity } from '../../types'

import { ActivityComponent } from './ActivityComponent'
import { ActivityContent } from './ActivityContent'

export interface ActivitiesProps {
  activities: Activity[]
  isOwn?: boolean
}

export const Activities = ({ activities, isOwn }: ActivitiesProps) => {
  return (
    <ActivitiesList>
      {activities.map((activity) => (
        <ActivityComponent activity={activity} key={activity.eventType + activity.id}>
          <ActivityContent activity={activity} isOwn={isOwn} />
        </ActivityComponent>
      ))}
    </ActivitiesList>
  )
}

export const ActivitiesList = styled.ul`
  display: grid;
  grid-row-gap: 24px;
`

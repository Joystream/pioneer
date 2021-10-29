import React from 'react'
import styled from 'styled-components'

import { RemoveScrollbar } from '@/common/constants'

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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

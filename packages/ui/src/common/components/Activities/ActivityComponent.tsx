import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { getActivityContent } from '../../model/getActivityContent'
import { relativeTime } from '../../model/relativeTime'
import { Activity } from '../../types'
import { TextInlineSmall, TextMedium } from '../typography'

import { ActivityIcon } from './ActivityIcon'

export interface ActivityComponentProps {
  activity: Activity
}

export const ActivityComponent = React.memo(({ activity }: ActivityComponentProps) => (
  <ActivityItem>
    <ActivityIcon category={activity.eventType} />
    <ActivityTime lighter>{relativeTime(activity.createdAt)}</ActivityTime>
    <ActivityText value light>
      {getActivityContent(activity)}
    </ActivityText>
  </ActivityItem>
))

const ActivityItem = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'activityicon activitytime'
    'activityicon activitytext';
  grid-column-gap: 8px;
  grid-row-gap: 8px;
`

const ActivityTime = styled(TextInlineSmall)`
  font-size: 10px;
  line-height: 16px;
  grid-area: activitytime;
`

const ActivityText = styled(TextMedium)`
  grid-area: activitytext;
`

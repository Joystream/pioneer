import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { relativeTime } from '../../model/relativeTime'
import { ActivityCategory, ActivityType } from '../../types'
import { TextInlineSmall, TextMedium } from '../typography'

import { ActivityIcon } from './ActivityIcon'

export interface ActivityComponentProps {
  timestamp: string
  category: ActivityCategory
  type?: ActivityType
  children: ReactNode
}

export const ActivityComponent = ({ timestamp, category, type, children }: ActivityComponentProps) => (
  <ActivityItem>
    <ActivityIcon icon={category} variant={type} />
    <ActivityTime lighter>{relativeTime(timestamp)}</ActivityTime>
    <ActivityText value light>
      {children}
    </ActivityText>
  </ActivityItem>
)

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

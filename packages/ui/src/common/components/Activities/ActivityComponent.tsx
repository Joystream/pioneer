import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Colors, Transitions } from '@/common/constants'

import { relativeTime } from '../../model/relativeTime'
import { Activity } from '../../types'
import { UnreadNotificationIndicator } from '../Notifications/UnreadNotificationIndicator'
import { TextInlineSmall, TextMedium } from '../typography'

import { ActivityIcon } from './ActivityIcon'

export interface ActivityComponentProps {
  activity: Activity
  children: ReactNode
}

export const ActivityComponent = ({ activity, children }: ActivityComponentProps) => {
  return (
    <ActivityItem unread={activity.unread}>
      <UnreadNotificationIndicator unread={activity.unread} />
      <ActivityIcon category={activity.eventType} />
      <ActivityTime lighter>{relativeTime(activity.createdAt)}</ActivityTime>
      <ActivityText value light>
        {children}
      </ActivityText>
    </ActivityItem>
  )
}

export const ActivityItem = styled.div<{ unread?: boolean }>`
  display: grid;
  position: relative;
  grid-template-columns: 44px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'activityicon activitytime'
    'activityicon activitytext';
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  padding: 12px 16px;
  transition: ${Transitions.durationXL};

  ${({ unread }) =>
    unread === true &&
    css`
      background-color: ${Colors.Black[25]};
    `};
`

const ActivityTime = styled(TextInlineSmall)`
  font-size: 10px;
  line-height: 16px;
  grid-area: activitytime;
`

const ActivityText = styled(TextMedium)`
  grid-area: activitytext;
`

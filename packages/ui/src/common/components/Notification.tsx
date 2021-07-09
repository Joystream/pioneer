import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../constants'

import { BellIcon } from './icons/BellIcon'
import { UnreadIndicator, UnreadNotificationIndicator } from './Notifications/UnreadNotificationIndicator'

export interface NotificationProps {
  hasNotification?: boolean
}

export function Notification({ hasNotification }: NotificationProps) {
  return (
    <NotificationComponent>
      <UnreadNotificationIndicator unread={hasNotification} />
      <BellIcon />
    </NotificationComponent>
  )
}

export const NotificationComponent = styled.div<NotificationProps>`
  display: flex;
  position: relative;
  width: 16px;
  height: 16px;
  color: ${Colors.Black[500]};
  transition: ${Transitions.all};

  ${UnreadIndicator} {
    top: 1px;
    right: 0;
  }
`

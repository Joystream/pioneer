import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { ButtonBareGhost, ButtonInnerWrapper } from '../buttons'
import { BellFilledIcon } from '../icons/BellFilledIcon'

import { UnreadIndicator, UnreadNotificationIndicator } from './UnreadNotificationIndicator'

interface NotificationButtonProps {
  onClick?: () => void
  isNotificationsPanelOpen?: boolean
  hasNotification?: boolean
}
export const NotificationsButton = ({
  onClick,
  isNotificationsPanelOpen,
  hasNotification,
}: NotificationButtonProps) => {
  return (
    <NotificationsStyledButton
      isNotificationsPanelOpen={isNotificationsPanelOpen}
      square
      size={'small'}
      onClick={onClick}
    >
      <UnreadNotificationIndicator unread={hasNotification} />
      <BellFilledIcon />
    </NotificationsStyledButton>
  )
}

const NotificationsStyledButton = styled(ButtonBareGhost)<{ isNotificationsPanelOpen?: boolean }>`
  background-color: ${({ isNotificationsPanelOpen }) => (isNotificationsPanelOpen ? Colors.Black[700] : 'transparent')};

  &:hover,
  &:focus {
    ${ButtonInnerWrapper} > svg {
      color: ${({ isNotificationsPanelOpen }) => (isNotificationsPanelOpen ? Colors.Blue[500] : Colors.White)};
    }
    background-color: ${Colors.Black[700]};
  }

  ${ButtonInnerWrapper} > svg {
    color: ${({ isNotificationsPanelOpen }) => (isNotificationsPanelOpen ? Colors.Blue[500] : Colors.White)};
  }

  ${UnreadIndicator} {
    top: 0;
    right: 0;
  }
`

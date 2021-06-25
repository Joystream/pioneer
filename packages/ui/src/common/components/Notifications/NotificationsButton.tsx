import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { ButtonBareGhost, ButtonInnerWrapper } from '../buttons'
import { BellFilledIcon } from '../icons/BellFilledIcon'

interface NotificationButtonProps {
  onClick?: () => void
  isNotificationsPanelOpen?: boolean
}
export const NotificationsButton = ({ onClick, isNotificationsPanelOpen }: NotificationButtonProps) => {
  return (
    <NotificationsStyledButton
      isNotificationsPanelOpen={isNotificationsPanelOpen}
      square
      size={'small'}
      onClick={onClick}
    >
      <BellFilledIcon />
    </NotificationsStyledButton>
  )
}

const NotificationsStyledButton = styled(ButtonBareGhost)<{ isNotificationsPanelOpen?: boolean }>`
  background-color: ${({ isNotificationsPanelOpen }) => (isNotificationsPanelOpen ? Colors.Black[700] : 'transparent')};
  color: ${Colors.White};

  ${ButtonInnerWrapper} > svg {
    color: ${Colors.White};
  }
`

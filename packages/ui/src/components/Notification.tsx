import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../constants'
import { NotificationIcon } from './icons/NotificationIcon'

interface NotificationProps {
  hasNotification?: boolean
}

export function Notification({ hasNotification }: NotificationProps) {
  return (
    <NotificationComponent hasNotification={hasNotification}>
      <NotificationIcon />
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

  &:after {
    content: '';
    position: absolute;
    top: 1px;
    right: 0;
    width: 6px;
    height: 6px;
    border-radius: ${BorderRad.round};
    background-color: ${Colors.Red[400]};
    opacity: ${(props) => (props.hasNotification === true ? '1' : '0')};
    transition: ${Transitions.all};
  }
`

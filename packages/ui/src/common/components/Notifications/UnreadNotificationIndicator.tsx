import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'

interface IndicatorProps {
  unread?: boolean
}

export const UnreadNotificationIndicator = ({ unread }: IndicatorProps) => {
  return (
    <CSSTransition in={unread} classNames="UnreadIndicator" timeout={Transitions.durationNumericXL} unmountOnExit>
      <UnreadIndicator unread={unread} />
    </CSSTransition>
  )
}

export const UnreadIndicator = styled.div<IndicatorProps>`
  position: absolute;
  top: 12px;
  right: 16px;
  width: 6px;
  height: 6px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Red[400]};
  opacity: 1;
  z-index: 3;
  transition: ${Transitions.all};
`

import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { useOutsideClick } from '@/common/hooks/useOutsideClick'
import { useMemberNotifications } from '@/memberships/hooks/useMemberNotifications'

import { Colors, RemoveScrollbar, Shadows, Transitions } from '../../constants'
import { ActivitiesList } from '../Activities'
import { ActivitiesBlock } from '../Activities/ActivitiesBlock'
import { Close, CloseButton } from '../buttons'
import { Label } from '../typography'

interface Props {
  onClose: () => void
  isNotificationsPanelOpen: boolean
}

export const Notifications = ({ onClose, isNotificationsPanelOpen }: Props) => {
  const { activities } = useMemberNotifications()
  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick(containerRef, isNotificationsPanelOpen, onClose)

  return (
    <CSSTransition
      in={isNotificationsPanelOpen}
      classNames="NotificationsPanel"
      timeout={Transitions.durationNumeric}
      unmountOnExit
    >
      <NotificationsPanel ref={containerRef}>
        <NotificationsHeader>
          <Label>Notifications</Label>
          <CloseButton onClick={onClose} />
        </NotificationsHeader>
        <NotificationsBody>
          <ActivitiesBlock activities={activities} isOwn />
        </NotificationsBody>
      </NotificationsPanel>
    </CSSTransition>
  )
}

const NotificationsHeader = styled.div`
  position: relative;
  padding: 0 16px;

  ${Close} {
    position: absolute;
    top: 0;
    right: 16px;
  }
`

const NotificationsPanel = styled.div`
  display: flex;
  position: absolute;
  left: 226px;
  top: 0;
  flex-direction: column;
  row-gap: 12px;
  width: 286px;
  max-width: 286px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  padding-top: 16px;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.common};
  overflow: hidden;
  transition: ${Transitions.all};
  z-index: -1;

  ${ActivitiesList} {
    grid-row-gap: 0;
    padding-bottom: 16px;
  }
`

const NotificationsBody = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

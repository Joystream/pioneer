import React, { useRef } from 'react'

import { useActivities } from '../../hooks/useActivities'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { ActivitiesBlock } from '../Activities/ActivitiesBlock'
import { CloseButton } from '../buttons'
import { SidePaneHeader, SidePanelTop } from '../SidePane'

import { NotificationsBody, NotificationsPanel } from './NotificationsPanel'

interface Props {
  onClose: () => void
  isOpen: boolean
}

export const Notifications = ({ onClose, isOpen }: Props) => {
  const container = useRef<HTMLDivElement>(null)
  useOutsideClick(container, isOpen, onClose)
  const activities = useActivities()
  return (
    <NotificationsPanel ref={container}>
      <SidePaneHeader>
        <SidePanelTop>
          <h3>Notifications</h3>
          <CloseButton onClick={onClose} />
        </SidePanelTop>
      </SidePaneHeader>
      <NotificationsBody>
        <ActivitiesBlock activities={activities} />
      </NotificationsBody>
    </NotificationsPanel>
  )
}

import React from 'react'

import { useActivities } from '../../hooks/useActivities'
import { ActivitiesBlock } from '../Activities/ActivitiesBlock'
import { CloseButton } from '../buttons'
import { SidePaneHeader, SidePanelTop } from '../SidePane'
import { Label } from '../typography'

import { NotificationsBody, NotificationsPanel } from './NotificationsPanel'

interface Props {
  onClose: () => void
}

export const Notifications = ({ onClose }: Props) => {
  const activities = useActivities()
  return (
    <NotificationsPanel>
      <SidePaneHeader>
        <SidePanelTop>
          <Label>Notifications</Label>
          <CloseButton onClick={onClose} />
        </SidePanelTop>
      </SidePaneHeader>
      <NotificationsBody>
        <ActivitiesBlock activities={activities} />
      </NotificationsBody>
    </NotificationsPanel>
  )
}

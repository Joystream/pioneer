import React from 'react'

import { useActivities } from '../../hooks/useActivities'
import { ActivitiesBlock } from '../Activities/ActivitiesBlock'
import { CloseButton } from '../buttons'
import { SidePaneHeader, SidePanelTop } from '../SidePane'

import { NotificationsBody, NotificationsPanel } from './NotificationsPanel'

export const Notifications = () => {
  const activities = useActivities()
  return (
    <NotificationsPanel>
      <SidePaneHeader>
        <SidePanelTop>
          <h3>Notifications</h3>
          <CloseButton />
        </SidePanelTop>
      </SidePaneHeader>
      <NotificationsBody>
        <ActivitiesBlock activities={activities} />
      </NotificationsBody>
    </NotificationsPanel>
  )
}

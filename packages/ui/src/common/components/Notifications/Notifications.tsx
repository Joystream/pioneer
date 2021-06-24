import React from 'react'

import { useActivities } from '../../hooks/useActivities'
import { ActivitiesBlock } from '../Activities/ActivitiesBlock'
import { CloseButton } from '../buttons'
import { Label } from '../typography'

import { NotificationsBody, NotificationsHeader, NotificationsPanel } from './NotificationsPanel'

interface Props {
  onClose: () => void
}

export const Notifications = ({ onClose }: Props) => {
  const activities = useActivities()
  return (
    <NotificationsPanel>
      <NotificationsHeader>
        <Label>Notifications</Label>
        <CloseButton onClick={onClose} />
      </NotificationsHeader>
      <NotificationsBody>
        <ActivitiesBlock activities={activities} />
      </NotificationsBody>
    </NotificationsPanel>
  )
}

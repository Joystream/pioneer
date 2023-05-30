import React, { useState, useEffect, useContext, useCallback } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { NotificationContext, notificationTimeout } from '@/common/providers/Notification/context'

interface Props {
  proposalId: string
}

export const WatchProposalButton = ({ proposalId }: Props) => {
  const { addNotification, removeNotification } = useContext(NotificationContext)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [watching, setWatching] = useState<boolean>(false)

  const toggleWatching = useCallback((e) => {
    e.stopPropagation()
    setShowNotification(true)
    setWatching((prev) => !prev)
  }, [])

  useEffect(() => {
    if (showNotification) {
      const newNoti = {
        title: watching ? 'You are now watching this proposal' : 'You are no longer watching this proposa',
        message: watching
          ? 'You will receive notifications about important updates related to this proposal'
          : 'You will no longer receive any notifications about changes related to this proposal',
      }
      const notificationKey = addNotification(newNoti)
      setTimeout(() => removeNotification(notificationKey), notificationTimeout)
    }
  }, [watching])

  return (
    <ButtonGhost
      size="medium"
      onClick={(e) => {
        toggleWatching(e)
      }}
    >
      <WatchIcon />
      {watching ? 'Stop Watching' : 'Watch'}
    </ButtonGhost>
  )
}

export default WatchProposalButton

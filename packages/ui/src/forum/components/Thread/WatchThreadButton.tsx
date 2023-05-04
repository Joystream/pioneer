import React, { useState, useEffect, useContext, useCallback } from 'react'

import { WatchingNotificationProps } from '@/app/components/WatchingNotification'
import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'

interface Props {
  threadId: string
  isMuted: boolean
  muteButtonStart: boolean
}

export const WatchThreadButton = ({ threadId, isMuted, muteButtonStart }: Props) => {
  const { setNotiArr } = useContext(PageContext)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [watching, setWatching] = useState<boolean>(false)

  const toggleWatching = useCallback((e) => {
    e.stopPropagation()
    setShowNotification(true)
    setWatching((prev) => !prev)
  }, [])

  useEffect(() => {
    if (muteButtonStart === true) {
      setWatching(!isMuted)
    }
  }, [isMuted])

  useEffect(() => {
    if (muteButtonStart === true) {
      setShowNotification(true)
    }
  }, [muteButtonStart])

  useEffect(() => {
    if (showNotification) {
      const newNoti = {
        title: watching ? 'You are now watching this forum thread' : 'You are no longer watching this forum thread',
        message: watching
          ? 'You will receive notifications about important updates related to this forum thread'
          : 'You will no longer receive any notifications about changes related to this forum thread',
      }
      setNotiArr((prevList: Array<WatchingNotificationProps>) => [...prevList, newNoti])
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
      {watching ? 'Sop Wathcing' : 'Watch'}
    </ButtonGhost>
  )
}

export default WatchThreadButton

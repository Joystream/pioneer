import React, { useState, useEffect, useContext, useCallback } from 'react'

import { WatchingNotificationProps } from '@/app/components/WatchingNotification'
import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'

interface Props {
  groupName: string
}

export const WatchWorkingGroupButton = ({ groupName }: Props) => {
  const { setNotiArr } = useContext(PageContext)
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
        title: watching ? 'You are now watching this working group' : 'You are no longer watching this working group',
        message: watching
          ? 'You will receive notifications about important updates related to this working group'
          : 'You will no longer receive any notifications about changes related to this working group',
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
      {watching ? 'Stop Watching' : 'Watch'}
    </ButtonGhost>
  )
}

export default WatchWorkingGroupButton

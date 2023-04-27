import React, { useState, useContext, useCallback } from 'react'

import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'

interface Props {
  threadId: string
}

export const WatchThreadButton = ({ threadId }: Props) => {
  const hideNotificationTimeout = 4000
  const { setShowWatchingNotification, setNotiTitleStr, setNotiMesageStr } = useContext(PageContext)
  const [innerHideTimeoutId, setInnerHideTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const toggleExtensionNotification = () => {
    setShowWatchingNotification((prev) => {
      if (innerHideTimeoutId) {
        clearTimeout(innerHideTimeoutId)
        setInnerHideTimeoutId(null)
      }
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId)
        setHideTimeoutId(null)
      }

      if (prev) {
        setTimeout(() => {
          setShowWatchingNotification(true)

          const timeoutId = setTimeout(() => {
            setShowWatchingNotification(false)
          }, hideNotificationTimeout)
          setInnerHideTimeoutId(timeoutId)

        }, 10)
        return false;
      }else{
        const timeoutId = setTimeout(() => {
          setShowWatchingNotification(false)
        }, hideNotificationTimeout)
        setHideTimeoutId(timeoutId)
        return true
      }
    })
  }

  const [watching, setWatching] = useState<boolean>(false)
  const toggleWatching = useCallback(
    (e) => {
      e.stopPropagation()
      setWatching((prev) => !prev)
      toggleExtensionNotification()
    },
    [hideTimeoutId, innerHideTimeoutId]
  )
  
  if(watching){
    setNotiTitleStr('You are now watching this forum thread');
    setNotiMesageStr('You will receive notifications about important updates related to this forum thread');
    return (
      <ButtonGhost size="medium" onClick={(e) => { toggleWatching(e);}}>
        <WatchIcon />
        Stop Watching
      </ButtonGhost>
    )
  }else{
    setNotiTitleStr('You are no longer watching this forum thread');
    setNotiMesageStr('You will no longer receive any notifications about changes related to this forum thread');
    return (
      <ButtonGhost size="medium" onClick={(e) => { toggleWatching(e);}}>
        <WatchIcon />
        Watch
      </ButtonGhost>
    )
  }
}

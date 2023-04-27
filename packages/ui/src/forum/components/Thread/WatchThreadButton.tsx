import React, { useState, useEffect, useContext, useCallback } from 'react'

import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'

interface Props {
  threadId: string
}

export const WatchThreadButton = ({ threadId }: Props) => {
  const hideNotificationTimeout = 4000
  const { setShowWatchingNotification, setNotiTitleStr, setNotiMesageStr } = useContext(PageContext)
  const [innerHideTimeoutId, setInnerHideTimeoutId] = useState<any>(null)
  const [hideTimeoutId, setHideTimeoutId] = useState<any>(null)

  const toggleExtensionNotification = () => {
    setShowWatchingNotification((prev: boolean) => {
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
        return false
      } else {
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

  useEffect(() => {
    if (watching) {
      setNotiTitleStr('You are now watching this forum thread')
      setNotiMesageStr('You will receive notifications about important updates related to this forum thread')
    } else {
      setNotiTitleStr('You are no longer watching this forum thread')
      setNotiMesageStr('You will no longer receive any notifications about changes related to this forum thread')
    }
  }, [watching, setNotiTitleStr, setNotiMesageStr])

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

export default WatchThreadButton

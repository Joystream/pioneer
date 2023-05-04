import React, { useState, useEffect, useContext, useCallback } from 'react'

import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { WatchingNotificationProps } from '@/app/components/WatchingNotification'

interface Props {
  threadId: string
}

export const MuteThreadButton = ({ threadId}: Props) => {
  const {setNotiArr} = useContext(PageContext)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const toggleMute = useCallback(
    (e) => {
      setShowNotification(true);
      e.stopPropagation()
      setIsMuted((prev) => !prev)
    },
    []
  )

  useEffect(() => {
    if(showNotification){
      if (isMuted) {
        var newNoti = {
          title: 'This thread is now muted',
          message: 'You will not receive any notifications about any related to this forum thread',
        }
        setNotiArr((prevList:Array<WatchingNotificationProps>) => [...prevList, newNoti])
      } else {
        var newNoti = {
          title: 'This thread is no longer muted',
          message: 'You can now receive notifications about new changes related to this forum thread',
        }
        setNotiArr((prevList:Array<WatchingNotificationProps>) => [...prevList, newNoti])
      }
    }
  }, [isMuted])

  return (
    <ButtonGhost
      size="medium"
      onClick={(e) => {
        toggleMute(e)
      }}
    >
      <WatchIcon />
      {isMuted ? 'Unmute Thread' : 'Mute Thread'}
    </ButtonGhost>
  )
}

export default MuteThreadButton

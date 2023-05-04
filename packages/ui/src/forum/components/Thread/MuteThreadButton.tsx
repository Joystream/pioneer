import React, { useState, useEffect, useContext, useCallback, SetStateAction, Dispatch } from 'react'

import { WatchingNotificationProps } from '@/app/components/WatchingNotification'
import { PageContext } from '@/app/PageContext'
import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'

interface Props {
  threadId: string
  isMuted: boolean
  setIsMuted: Dispatch<SetStateAction<boolean>>
  onButtonStart: () => void
}

export const MuteThreadButton = ({ threadId, isMuted, setIsMuted, onButtonStart }: Props) => {
  const { setNotiArr } = useContext(PageContext)
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const toggleMute = useCallback(
    (e) => {
      setShowNotification(true)
      e.stopPropagation()
      setIsMuted((prev) => !prev)
      onButtonStart()
    },
    [onButtonStart]
  )

  useEffect(() => {
    if (showNotification) {
      if (isMuted) {
        const newNoti = {
          title: 'This thread is now muted',
          message: 'You will not receive any notifications about any related to this forum thread',
        }
        setNotiArr((prevList: Array<WatchingNotificationProps>) => [...prevList, newNoti])
      } else {
        const newNoti = {
          title: 'This thread is no longer muted',
          message: 'You can now receive notifications about new changes related to this forum thread',
        }
        setTimeout(() => {
          setNotiArr((prevList: Array<WatchingNotificationProps>) => [...prevList, newNoti])
        }, 10)
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

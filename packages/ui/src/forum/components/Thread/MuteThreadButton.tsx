import React, { useState, useEffect, useContext, useCallback, SetStateAction, Dispatch } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { useModal } from '@/common/hooks/useModal'
import { Confirm2Context } from '@/common/providers/confirm2/context'
import { NotificationContext, notificationTimeout } from '@/common/providers/Notification/context'

interface Props {
  threadId: string
  isMuted: boolean
  setIsMuted: Dispatch<SetStateAction<boolean>>
  onButtonStart: () => void
}

export const MuteThreadButton = ({ threadId, isMuted, setIsMuted, onButtonStart }: Props) => {
  const { showModal } = useModal()
  const { isConfirmed } = useContext(Confirm2Context)
  const { addNotification, removeNotification } = useContext(NotificationContext)
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const toggleMute = useCallback(
    (e) => {
      e.stopPropagation()
      if (isMuted == true) {
        const modalData = {
          headerText: 'Unmute the thread?',
          modalText: 'By watching the thread you will automatically unmute it.',
          buttonText: 'confrim And Watch',
        }
        showModal({ modal: 'ConfirmModal2', data: modalData })
      } else {
        const modalData = {
          headerText: 'Stop watching the thread?',
          modalText: 'By muting this thread you will automatically stop watching it.',
          buttonText: 'confrim And Mute',
        }
        showModal({ modal: 'ConfirmModal2', data: modalData })
      }
    },
    [onButtonStart]
  )

  useEffect(() => {
    if (isConfirmed == true) {
      setShowNotification(true)
      setIsMuted((prev) => !prev)
      onButtonStart()
    }
  }, [isConfirmed])

  useEffect(() => {
    if (showNotification) {
      if (isMuted) {
        const newNoti = {
          title: 'This thread is now muted',
          message: 'You will not receive any notifications about any related to this forum thread',
        }
        const notificationKey = addNotification(newNoti)
        setTimeout(() => removeNotification(notificationKey), notificationTimeout)
      } else {
        const newNoti = {
          title: 'This thread is no longer muted',
          message: 'You can now receive notifications about new changes related to this forum thread',
        }
        const notificationKey = addNotification(newNoti)
        setTimeout(() => removeNotification(notificationKey), notificationTimeout)
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

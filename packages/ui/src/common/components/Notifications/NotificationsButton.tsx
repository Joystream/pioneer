import React, { useRef, useState } from 'react'

import { useOutsideClick } from '../../hooks/useOutsideClick'
import { ButtonPrimary } from '../buttons'
import { HelpIcon } from '../icons'

import { Notifications } from './Notifications'

export const NotificationsButton = () => {
  const [isPanelOpen, setPanelOpen] = useState(false)
  const onClose = () => setPanelOpen(false)
  const container = useRef<HTMLDivElement>(null)
  useOutsideClick(container, isPanelOpen, onClose)
  return (
    <span ref={container}>
      <ButtonPrimary square size={'small'} onClick={() => setPanelOpen(!isPanelOpen)}>
        <HelpIcon />
      </ButtonPrimary>
      {isPanelOpen && <Notifications onClose={onClose} />}
    </span>
  )
}

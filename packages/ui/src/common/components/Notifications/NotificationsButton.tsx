
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { useOutsideClick } from '../../hooks/useOutsideClick'
import { ButtonBareGhost, ButtonInnerWrapper } from '../buttons'
import { BellFilledIcon } from '../icons/BellFilledIcon'

import { Notifications } from './Notifications'

export const NotificationsButton = () => {
  const [isPanelOpen, setPanelOpen] = useState(false)
  const onClose = () => setPanelOpen(false)
  const [container, setContainer] = useState<HTMLSpanElement | null>(null)
  useOutsideClick(container, isPanelOpen, onClose)
  return (
    <>
      <NotificationsStyledButton
        isPanelOpen={isPanelOpen}
        square
        size={'small'}
        onClick={() => setPanelOpen(!isPanelOpen)}
      >
        <BellFilledIcon />
      </NotificationsStyledButton>
      {isPanelOpen && ReactDOM.createPortal(<Notifications onClose={onClose} />, document.body)}
    </>
  )
}

const NotificationsStyledButton = styled(ButtonBareGhost)<{ isPanelOpen?: boolean }>`
  background-color: ${({ isPanelOpen }) => (isPanelOpen ? Colors.Black[700] : 'transparent')};
  color: ${Colors.White};

  ${ButtonInnerWrapper} > svg {
    color: ${Colors.White};
  }
`

import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows } from '../../constants'
import { CloseButton } from '../buttons'
import { SuccessIcon } from '../icons'
import { FailureSymbol } from '../icons/symbols'
import { Link } from '../Link'
import { TextMedium } from '../typography'

export interface NotificationProps {
  title: string
  message?: string | React.ReactElement | React.ReactNode
  link?: string
  onClick: () => void
  isError?: boolean
}

export const SideNotification = ({ title, message, link, onClick, isError }: NotificationProps) => {
  return ReactDOM.createPortal(
    <NotificationComponent isError={isError}>
      <NotificationCloseButton onClick={onClick} />
      <NotificationHeader isError={isError}>
        {isError ? <NotificationFailureSymbol /> : <NotificationSuccessIcon />}
        <NotificationTitle>{title}</NotificationTitle>
      </NotificationHeader>
      <NotificationMessage>
        {message}
        {link && ' '}
        {link && <Link href={link}>See details</Link>}
      </NotificationMessage>
    </NotificationComponent>,
    document.body
  )
}

const NotificationComponent = styled.div<{ isError?: boolean }>`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 8px;
  right: 8px;
  width: 100%;
  max-width: 438px;
  padding: 16px 24px 20px 20px;
  background-color: ${Colors.Black[800]};
  border-left: 4px solid ${({ isError }) => (isError ? Colors.Red[400] : Colors.Blue[500])};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.common};
  ${Animations.showNotification};
`

const NotificationHeader = styled.div<{ isError?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  color: ${({ isError }) => (isError ? Colors.Red[400] : Colors.White)};
  margin-bottom: 16px;
`

const NotificationTitle = styled.h5`
  color: ${Colors.White};
`

const NotificationCloseButton = styled(CloseButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
`

const NotificationMessage = styled(TextMedium)`
  color: ${Colors.Black[400]};
`

const NotificationFailureSymbol = styled(FailureSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Red[400]};
  }
`

const NotificationSuccessIcon = styled(SuccessIcon)`
  width: 24px;
  height: 24px;

  .blackPart {
    fill: ${Colors.White};
  }
`

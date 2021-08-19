import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { LinkLink } from '../buttons/Links'
import { SuccessIcon } from '../icons'
import { FailureSymbol } from '../icons/symbols'
import { TextMedium } from '../typography'

interface BasePropsProps {
  title: string
  message?: string | React.ReactElement | React.ReactNode
  link?: string
  isError?: boolean
}

interface WithCloseButton {
  showClose?: false
  onClick?: () => void
}

interface WithoutCloseButton {
  showClose: true
  onClick: () => void
}

type CloseButtonProps = WithCloseButton | WithoutCloseButton

export type NotificationProps = BasePropsProps & CloseButtonProps

interface NotificationsHolderProps {
  children: React.ReactNode | React.ReactNodeArray
}

export const NotificationsHolder = ({ children }: NotificationsHolderProps) => {
  return ReactDOM.createPortal(<NotificationsHolderWrapper>{children}</NotificationsHolderWrapper>, document.body)
}

export const SideNotification = ({ title, message, link, onClick, isError, showClose }: NotificationProps) => {
  return (
    <NotificationComponent isError={isError} message={message}>
      {showClose && <NotificationCloseButton onClick={onClick} />}
      <NotificationHeader isError={isError}>
        {isError ? <NotificationFailureSymbol /> : <NotificationSuccessIcon />}
        <NotificationTitle>{title}</NotificationTitle>
      </NotificationHeader>
      {message && (
        <NotificationMessage>
          {message}
          {link && ' '}
          {link && (
            <LinkLink href={link} accentColor size="small">
              See details
            </LinkLink>
          )}
        </NotificationMessage>
      )}
    </NotificationComponent>
  )
}

const NotificationComponent = styled.div<{
  isError?: boolean
  message?: string | React.ReactElement | React.ReactNode
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
  padding: ${({ message }) => (message ? '16px 24px 24px 20px' : '16px 24px 16px 20px')};
  background-color: ${Colors.Black[800]};
  border-left: 4px solid ${({ isError }) => (isError ? Colors.Red[400] : Colors.Blue[500])};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.select};
  ${Animations.showNotification};
`

const NotificationHeader = styled.div<{ isError?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  color: ${({ isError }) => (isError ? Colors.Red[400] : Colors.White)};
`

const NotificationTitle = styled.h5`
  color: ${Colors.White};
  transform: translateY(2px);
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

export const NotificationsHolderWrapper = styled.div`
  display: grid;
  position: absolute;
  top: 8px;
  right: 8px;
  grid-row-gap: 8px;
  width: 100%;
  max-width: 438px;
  z-index: ${ZIndex.sideNotification};
`

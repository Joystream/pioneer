import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { LinkLink } from '../buttons/Links'
import { SuccessIcon } from '../icons'
import { WarningSymbol } from '../icons/symbols'
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

export const CenterNotificationsHolder = ({ children }: NotificationsHolderProps) => {
  return ReactDOM.createPortal(<NotificationsHolderWrapper>{children}</NotificationsHolderWrapper>, document.body)
}

export const CenterNotification = ({ title, message, link, onClick, isError, showClose }: NotificationProps) => {
  return (
    <NotificationComponent isError={isError} message={message}>
      <NotificationHeader>
        {showClose && <NotificationCloseButton onClick={onClick} />}
        <NotiHeaderContainer isError={isError}>
          {isError ? <NotificationWarningSymbol /> : <NotificationSuccessIcon />}
          <NotificationTitle>{title}</NotificationTitle>
        </NotiHeaderContainer>
      </NotificationHeader>
      {message && (
        <NotificationBody>
          <NotiBodyContainer>
            <NotificationMessage>
              {message}
              {link && ' '}
              {link && (
                <LinkLink href={link} accentColor size="small">
                  See details
                </LinkLink>
              )}
            </NotificationMessage>
          </NotiBodyContainer>
        </NotificationBody>
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
  width: 60%;
  margin: auto;
  background-color: ${Colors.White};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.select};
  ${Animations.showAlert};
`
const NotificationHeader = styled.div`
  padding:12px 24px;
`
const NotiHeaderContainer = styled.div<{ isError?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
`
const NotiBodyContainer = styled.div`
  padding: 16px;
  background-color: ${Colors.Red[50]};
`

const NotificationTitle = styled.h5`
  color: ${Colors.Black[900]};
  transform: translateY(2px);
`

const NotificationCloseButton = styled(CloseButton)`
  float: right;
  margin-top: 4px;
  width: 16px;
  height: 16px;
  color: ${Colors.Black[400]};
`
const NotificationBody = styled.div`
  padding:1.5em;
  background-color: ${Colors.Black[50]};
`
const NotificationMessage = styled(TextMedium)`
  color: ${Colors.Black[600]};
`

const NotificationWarningSymbol = styled(WarningSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Blue[500]};
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
  position: absolute;
  top: 30px;
  width: 100%;
  z-index: ${ZIndex.centerNotification};
`

import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BorderRad, Colors, Shadows, Animations } from '../../constants'
import { CloseButton } from '..//buttons'
import { Text } from '..//typography'

interface NotificationProps {
  title: string
  icon?: React.ReactElement | React.ReactNode
  message?: string | React.ReactElement | React.ReactNode
  link?: string
  onClick: () => void
  isError?: boolean
}

export const SideNotification = ({ title, icon, message, link, onClick, isError }: NotificationProps) => {
  return ReactDOM.createPortal(
    <NotificationComponent isError={isError}>
      <NotificationCloseButton onClick={onClick} />
      <NotificationHeader isError={isError}>
        {icon}
        <NotificationTitle>{title}</NotificationTitle>
      </NotificationHeader>
      <NotificationMessage size={2}>
        {message}
        {link}
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

const NotificationTitle = styled.h4`
  color: ${Colors.White};
`

const NotificationCloseButton = styled(CloseButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
`

const NotificationMessage = styled(Text)`
  color: ${Colors.Black[400]};
`

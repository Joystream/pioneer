import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { FailureSymbol, SuccessSymbol } from '../icons/symbols'
import { LoadingAnimation } from '../LoadingAnimation'
import { TextHuge } from '../typography'

import { TransactionStatusStepper, TransactionStatusSteperProps } from './TransactionStatusSteps'

export interface TransactionStatusStateProps {
  state: 'loading' | 'pending' | 'successful' | 'failure'
}

interface Props {
  title: string
  message?: string | React.ReactElement | React.ReactNode
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

export type TransactionStatusProps = Props & CloseButtonProps

interface TransactionStatusNotificationsHolderProps {
  children: React.ReactNode | React.ReactNodeArray
}

export const TransactionStatusHolder = ({ children }: TransactionStatusNotificationsHolderProps) => {
  return ReactDOM.createPortal(
    <TransactionStatusHolderWrapper>{children}</TransactionStatusHolderWrapper>,
    document.body
  )
}

const TransactionStatusIcon = ({ state }: TransactionStatusStateProps) => {
  switch (state) {
    case 'loading':
      return <LoadingAnimation />
    case 'pending':
      return <PendingAnimation />
    case 'successful':
      return <StatusSuccessSymbol />
    case 'failure':
      return <StatusFailureSymbol />
    default:
      return null
  }
}

export const TransactionStatus = ({
  title,
  message,
  state,
  showClose,
  onClick,
  steps,
}: TransactionStatusProps & TransactionStatusStateProps & TransactionStatusSteperProps) => {
  return (
    <StatusComponent state={state}>
      {showClose && <StatusCloseButton onClick={onClick} />}
      {steps && <TransactionStatusStepper steps={steps} state={state} />}
      <StatusHeader>
        <TransactionStatusIcon state={state} />
        <StatusTitle>{title}</StatusTitle>
      </StatusHeader>
      {message && <StatusMessage value>{message}</StatusMessage>}
    </StatusComponent>
  )
}

const PendingAnimation = styled(LoadingAnimation)`
  .loading-stroke-1 {
    stroke: ${Colors.Orange[300]};
  }
  .loading-stroke-2 {
    stroke: ${Colors.Orange[500]};
  }
`

const StatusComponent = styled.div<TransactionStatusStateProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  row-gap: 8px;
  padding: 24px 24px 24px 20px;
  background-color: ${Colors.Black[900]}D9;
  border-left: 4px solid
    ${({ state }) => {
      switch (state) {
        case 'loading':
          return Colors.Blue[500]
        case 'pending':
          return Colors.Orange[500]
        case 'successful':
          return Colors.Green[500]
        case 'failure':
          return Colors.Red[500]
        default:
          return null
      }
    }};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.notification};
  backdrop-filter: blur(2px);
  ${Animations.showNotification};
`

const StatusHeader = styled.div<{ isError?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  color: ${({ isError }) => (isError ? Colors.Red[400] : Colors.White)};
`

const StatusTitle = styled.h3`
  color: ${Colors.White};
  transform: translateY(2px);
`

const StatusCloseButton = styled(CloseButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
`

const StatusMessage = styled(TextHuge)`
  color: ${Colors.Black[300]};
`

const StatusFailureSymbol = styled(FailureSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Red[500]};
  }
`

const StatusSuccessSymbol = styled(SuccessSymbol)`
  width: 24px;
  height: 24px;

  .blackPart,
  .primaryPart {
    fill: ${Colors.Green[500]};
  }
`

export const TransactionStatusHolderWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  bottom: 8px;
  right: 8px;
  row-gap: 8px;
  width: 100%;
  max-width: 438px;
  z-index: ${ZIndex.sideNotification};
`

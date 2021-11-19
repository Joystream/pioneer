import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { TextHuge } from '../typography'

import { TransactionStatusIcon } from './TransactionStatusIcon'
import { TransactionStatusStepper } from './TransactionStatusSteps'
import { StepNumber, TransactionState, TransactionStatusStateProps } from './types'

export interface TransactionStatusProps {
  title: string
  message: string | React.ReactElement | React.ReactNode
  onClose?: () => void
  state: TransactionState
  stepNumber?: StepNumber
}

interface TransactionStatusNotificationsHolderProps {
  children: React.ReactNode
}

const TransactionStatusHolder = ({ children }: TransactionStatusNotificationsHolderProps) => {
  return ReactDOM.createPortal(
    <TransactionStatusHolderWrapper>{children}</TransactionStatusHolderWrapper>,
    document.body
  )
}

export const TransactionStatusNotification = ({
  title,
  message,
  state,
  onClose,
  stepNumber,
}: TransactionStatusProps) => {
  return (
    <TransactionStatusHolder>
      <StatusComponent state={state}>
        {onClose && <StatusCloseButton onClick={onClose} />}
        {stepNumber && <TransactionStatusStepper stepNumber={stepNumber} state={state} />}
        <StatusHeader>
          <TransactionStatusIcon state={state} />
          <StatusTitle>{title}</StatusTitle>
        </StatusHeader>
        <StatusMessage value>{message}</StatusMessage>
      </StatusComponent>
    </TransactionStatusHolder>
  )
}

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

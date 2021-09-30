import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'

import { CheckboxIcon } from '../icons'

interface TransactionStatusStepProps {
  stepState: 'past' | 'active' | undefined
}

export interface TransactionStatusSteperProps {
  steps: Array<TransactionStatusStepProps>
  state: 'loading' | 'pending' | 'successful' | 'failure'
}

export const TransactionStatusStepper = ({ steps, state }: TransactionStatusSteperProps) => {
  return (
    <StepsWrapper state={state}>
      {steps.map(({ stepState }, index) => (
        <Step>
          <StepCircle stepState={stepState}>{stepState === 'past' ? <CheckboxIcon /> : index + 1}</StepCircle>
        </Step>
      ))}
    </StepsWrapper>
  )
}

export const StepCircle = styled.span<TransactionStatusStepProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  border: 2px solid ${Colors.Black[800]};
  border-radius: ${BorderRad.full};
  ${({ stepState }) =>
    !stepState &&
    css`
      background-color: ${Colors.Black[800]} !important;
    `};
  font-family: ${Fonts.Inter};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.White};
  transition: ${Transitions.all};
`

export const Step = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: fit-content;

  &:not(:first-child) {
    margin-left: 12px;
  }

  &:not(:last-child) {
    width: 100%;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      margin-left: 12px;
      background-color: ${Colors.Black[500]};
    }
  }
`

const StepsWrapper = styled.div<{ state: 'loading' | 'pending' | 'successful' | 'failure' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  ${StepCircle} {
    ${({ state }) => {
      switch (state) {
        case 'loading':
          return css`
            border-color: ${Colors.Blue[500]};
            background-color: ${Colors.Blue[500]};
          `
        case 'pending':
          return css`
            border-color: ${Colors.Orange[500]};
            background-color: ${Colors.Orange[500]};
          `
        case 'successful':
          return css`
            border-color: ${Colors.Green[500]};
            background-color: ${Colors.Green[500]};
          `
        case 'failure':
          return css`
            border-color: ${Colors.Red[500]};
            background-color: ${Colors.Red[500]};
          `
        default:
          return null
      }
    }};
  }
`

import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'

import { CheckboxIcon } from '../icons'

interface HorizontalStatusStepProps {
  stepState: {
    status: 'past' | 'active' | undefined
    title: string
  }
}

export interface HorizontalStepperProps {
  steps: Array<HorizontalStatusStepProps>
  state: 'start' | 'successful'
}

export const HorizontalStepper = ({ steps, state }: HorizontalStepperProps) => {
  return (
    <HorizontalStepperWrapper state={state}>
      {steps.map(({ stepState }, index) => (
        <Step>
          <StepCircle stepState={stepState}>{stepState.status === 'past' ? <CheckboxIcon /> : index + 1}</StepCircle>
          <StepBody>
            <StepTitle>{stepState.title}</StepTitle>
          </StepBody>
        </Step>
      ))}
    </HorizontalStepperWrapper>
  )
}

export const StepCircle = styled.span<HorizontalStatusStepProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  border: 2px solid ${Colors.Black[700]};
  border-radius: ${BorderRad.full};
  ${({ stepState }) =>
    !stepState &&
    css`
      background-color: ${Colors.Black[700]} !important;
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
const StepTitle = styled.h6`
  align-self: center;
  text-transform: capitalize;
  transition: ${Transitions.all};
  padding-left: 8px;
`

const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: 8px;
`

const HorizontalStepperWrapper = styled.div<{ state: 'start' | 'successful' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  ${StepCircle} {
    ${({ state }) => {
      switch (state) {
        case 'successful':
          return css`
            border-color: ${Colors.Green[500]};
            background-color: ${Colors.Green[500]};
          `
        case 'start':
          return css`
            border-color: ${Colors.Blue[500]};
            background-color: ${Colors.Blue[500]};
          `
        default:
          return null
      }
    }};
  }
`

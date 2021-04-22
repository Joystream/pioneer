import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../constants'

import { Arrow, CheckboxIcon } from './icons'
import { ScrollableModalColumn } from './Modal'
import { TextInlineSmall } from './typography'

interface Step {
  title: string
  isBabyStep?: boolean
}

interface StepToRender extends Step {
  number: null | number
  isPast: boolean
  isActive: boolean
}

export interface StepperProps {
  steps: Step[]
  active: number
}

const getStepFace = (step: StepToRender) => {
  if (step.isBabyStep) {
    return null
  }

  if (step.isActive) {
    return <Arrow direction="right" />
  }

  if (step.isPast) {
    return <CheckboxIcon />
  }

  return step.number
}

const asStepsToRender = (steps: Step[], active: number): StepToRender[] => {
  let stepCounter = 1

  return steps.map((step, index) => ({
    ...step,
    number: step.isBabyStep ? null : stepCounter++,
    isActive: index === active,
    isPast: index < active,
  }))
}

export const Stepper = ({ steps, active = 0 }: StepperProps) => {
  const stepsToRender = asStepsToRender(steps, active)

  return (
    <StepperWrap>
      {stepsToRender.map((value) => (
        <StepWrap key={value.title} {...value}>
          <StepNumber>
            <StepNumberText value>{getStepFace(value)}</StepNumberText>
          </StepNumber>
          <StepTitle>{value.title}</StepTitle>
        </StepWrap>
      ))}
    </StepperWrap>
  )
}

export const StepperWrap = styled(ScrollableModalColumn)`
  display: grid;
  grid-row-gap: 20px;
  align-content: start;
  background-color: ${Colors.Black[800]};
  color: ${Colors.White};
  padding: 24px;
`

const StepNumber = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border: 2px solid ${Colors.Black[600]};
  border-radius: ${BorderRad.round};
  font-weight: 700;
  color: ${Colors.Black[300]};
  background-color: transparent;
  transition: ${Transitions.all};
`

const StepTitle = styled.h6`
  font-weight: 400;
  align-self: center;
  color: ${Colors.Black[300]};
  -webkit-text-stroke-width: 0.05em;
  -webkit-text-stroke-color: transparent;
  transition: ${Transitions.all};
`

type StepNumberProps = Pick<StepToRender, 'isActive' | 'isPast' | 'isBabyStep'>

const StepWrap = styled.div<StepNumberProps>`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  justify-content: start;

  &:not(:first-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      bottom: calc(100% + 2px);
      left: 50%;
      width: 1px;
      height: 20px;
      transform: translateX(-50%);
      background-color: ${Colors.Black[600]};
      transition: ${Transitions.all};
    }
  }

  ${({ isBabyStep }: StepNumberProps) =>
    isBabyStep &&
    css`
      ${StepNumber} {
        color: ${Colors.Red[500]};
        border-color: ${Colors.Red[500]};
        background-color: ${Colors.White};
      }
    `};

  ${({ isActive }: StepNumberProps) =>
    isActive &&
    css`
      ${StepNumber} {
        color: ${Colors.White};
        border-color: ${Colors.Blue[500]};
        background-color: ${Colors.Blue[500]};
      }
      ${StepTitle} {
        color: ${Colors.White};
        -webkit-text-stroke-color: ${Colors.White};
      }
    `}

  ${({ isPast }: StepNumberProps) =>
    isPast &&
    css`
      ${StepNumber} {
        background-color: ${Colors.Black[500]};
        border-color: ${Colors.Black[500]};
      }
    `}
`

const StepNumberText = styled(TextInlineSmall)`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: inherit;
  line-height: 13px;
`

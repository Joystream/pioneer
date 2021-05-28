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
  position: relative;
  grid-row-gap: 20px;
  align-content: start;
  background-color: ${Colors.Black[800]};
  color: ${Colors.White};
`

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  width: 28px;
  height: 28px;
  border: 2px solid ${Colors.Black[600]};
  border-radius: ${BorderRad.round};
  font-weight: 700;
  color: ${Colors.Black[300]};
  background-color: ${Colors.Black[800]};
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
  grid-template-columns: 28px 1fr;
  grid-column-gap: 8px;
  justify-content: start;

  &:not(:last-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      top: 28px;
      left: 14px;
      width: 1px;
      height: calc(100% + 20px);
      transform: translateX(-50%);
      background-color: ${Colors.Black[600]};
      transition: ${Transitions.all};
    }
  }

  ${({ isBabyStep }: StepNumberProps) =>
    isBabyStep &&
    css`
      ${StepNumber} {
        width: 8px;
        height: 8px;
        margin-top: 4px;
        color: transparent;
        border-color: transparent;
        background-color: ${Colors.Black[300]};
      }
      ${StepTitle} {
        font-size: 12px;
        line-height: 18px;
        color: ${Colors.Black[400]};
        -webkit-text-stroke-color: transparent;
      }
      &:not(:last-child) {
        ${StepNumber}:before {
          top: 12px;
        }
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

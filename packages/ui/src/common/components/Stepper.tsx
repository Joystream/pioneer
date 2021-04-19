import React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../constants'

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
    return '▶'
  }

  if (step.isPast) {
    return '✔'
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
        <StepWrap key={value.title}>
          <StepNumber {...value}>{getStepFace(value)}</StepNumber>
          {value.title}
        </StepWrap>
      ))}
    </StepperWrap>
  )
}

export const StepperWrap = styled.div`
  background-color: ${Colors.Black[800]};
  color: ${Colors.White};
  padding: 14px;
`

const StepWrap = styled.div`
  margin: 5px 0;
  display: flex;
`

type StepNumberProps = Pick<StepToRender, 'isActive' | 'isPast' | 'isBabyStep'>

const StepNumber = styled.div<StepNumberProps>`
  display: inline-block;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  border: 2px solid ${Colors.White};
  line-height: 30px;
  text-align: center;
  margin-right: 4px;

  ${({ isBabyStep }: StepNumberProps) =>
    isBabyStep &&
    css`
      border-width: 4px;
      border-radius: 4px;
      max-height: 0;
      max-width: 0;
    `}

  ${({ isActive }: StepNumberProps) =>
    isActive &&
    css`
      background-color: ${Colors.LogoPurple};
      border-color: ${Colors.LogoPurple};
    `}

  ${({ isPast }: StepNumberProps) =>
    isPast &&
    css`
      background-color: ${Colors.Black[500]};
      border-color: ${Colors.Black[500]};
    `}
`

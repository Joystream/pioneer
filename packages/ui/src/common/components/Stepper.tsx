import React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../constants'

interface Step {
  title: string
  isBabyStep?: boolean
}

export interface StepperProps {
  steps: Step[]
  active: number
}

const getStepFace = (step: RenderStep) => {
  if (step.isBabyStep) return null
  if (step.isActive) return '▶'
  if (step.isPast) return '✔'
  return step.number
}

type RenderStep = { number: null | number; isPast: boolean; title: string; isActive: boolean; isBabyStep?: boolean }

export const Stepper = ({ steps, active = 0 }: StepperProps) => {
  let stepCounter = 1

  const stepsToRender: RenderStep[] = steps.map((step, index) => {
    return {
      ...step,
      number: step.isBabyStep ? null : stepCounter++,
      isActive: index === active,
      isPast: index < active,
    }
  })

  return (
    <StepperWrap>
      {stepsToRender.map((value) => (
        <StepWrap key={value.title}>
          <StepNumber isBaby={value.isBabyStep} isActive={value.isActive} isPast={value.isPast}>
            {getStepFace(value)}
          </StepNumber>
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

const StepNumber = styled.div<{ isBaby?: boolean; isActive: boolean; isPast: boolean }>`
  display: inline-block;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  border: 2px solid ${Colors.White};
  line-height: 30px;
  text-align: center;
  margin-right: 4px;

  ${({ isBaby }) =>
    isBaby &&
    css`
      border-width: 4px;
      border-radius: 4px;
      max-height: 0;
      max-width: 0;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${Colors.LogoPurple};
      border-color: ${Colors.LogoPurple};
    `}

  ${({ isPast }) =>
    isPast &&
    css`
      background-color: ${Colors.Black[500]};
      border-color: ${Colors.Black[500]};
    `}
`

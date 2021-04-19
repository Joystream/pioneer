import React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../constants'

import { ModalBody } from './Modal'

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
    <StepperModalWrapper>
      <StepsColumn>
        {stepsToRender.map((value) => (
          <StepWrap key={value.title}>
            <StepNumber isBaby={value.isBabyStep} isActive={value.isActive} isPast={value.isPast}>
              {getStepFace(value)}
            </StepNumber>
            {value.title}
          </StepWrap>
        ))}
      </StepsColumn>
      <StepDescriptionColumn>Col 2</StepDescriptionColumn>
      <StepperBody>Col 3</StepperBody>
    </StepperModalWrapper>
  )
}

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

export const StepperModalBody = styled(ModalBody)`
  padding: 0;
`

const StepperModalWrapper = styled.div`
  display: grid;
  grid-template-columns: 184px 336px 1fr;
  min-height: 200px;
`

const StepsColumn = styled.div`
  background-color: ${Colors.Black[800]};
  color: ${Colors.White};
  padding: 14px;
`

const StepDescriptionColumn = styled.div`
  background-color: ${Colors.Black[100]};
  padding: 14px;
`

const StepperBody = styled.div`
  padding: 14px;
`

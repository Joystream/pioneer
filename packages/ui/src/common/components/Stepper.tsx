import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { ModalBody } from './Modal'

interface StepperStep {
  title: string
  isBabyStep?: boolean
}

export interface StepperProps {
  steps: StepperStep[]
  active: number
}

export const Stepper = ({ steps, active = 0 }: StepperProps) => {
  let stepCounter = 1

  const stepsToRender = steps.map((step, index) => {
    return {
      ...step,
      number: step.isBabyStep ? null : stepCounter++,
      isActive: index === active,
      isPast: index < active,
    }
  })

  return (
    <StepperWrapper>
      <StepsColumn>
        {stepsToRender.map((value) => (
          <Step key={value.title}>
            {value.isActive && <ActiveStep> ▶ </ActiveStep>}
            {value.isPast && <DoneStep> ✔ </DoneStep>}
            {!value.isPast && !value.isActive && <StepNumber>{value.number}</StepNumber>}
            {value.title}
          </Step>
        ))}
      </StepsColumn>
      <StepDescriptionColumn>Col 2</StepDescriptionColumn>
      <StepperBody>Col 3</StepperBody>
    </StepperWrapper>
  )
}

const Step = styled.div`
  margin: 5px 0;
`

const StepNumber = styled.div`
  display: inline-block;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  border: 2px solid ${Colors.White};
  line-height: 30px;
  text-align: center;
  margin-right: 4px;
`

const ActiveStep = styled(StepNumber)`
  background-color: ${Colors.LogoPurple};
  border-color: ${Colors.LogoPurple};
`

const DoneStep = styled(StepNumber)`
  background-color: ${Colors.Black[500]};
  border-color: ${Colors.Black[500]};
`

export const StepperModalBody = styled(ModalBody)`
  padding: 0;
`

const StepperWrapper = styled.div`
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

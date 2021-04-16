import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { ModalBody } from './Modal'

export const Stepper = () => {
  const steps = [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }]

  const stepsToRender = steps.map((step, index) => {
    return {
      ...step,
      number: index + 1,
      isActive: false,
      isPast: false,
    }
  })

  stepsToRender[0].isPast = true
  stepsToRender[1].isActive = true

  return (
    <StepperWrapper>
      <StepsColumn>
        {stepsToRender.map((value) => {
          return (
            <Step>
              {value.isActive && <ActiveStep> ▶ </ActiveStep>}
              {value.isPast && <DoneStep> ✔ </DoneStep>}
              {!value.isPast && !value.isActive && <StepNumber>{value.number}</StepNumber>}
              {value.title}
            </Step>
          )
        })}
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

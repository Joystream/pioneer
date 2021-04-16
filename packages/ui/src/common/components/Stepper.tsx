import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { ModalBody } from './Modal'

export const Stepper = () => (
  <StepperWrapper>
    <StepsColumn>Col 1</StepsColumn>
    <StepDescriptionColumn>Col 2</StepDescriptionColumn>
    <StepperBody>Col 3</StepperBody>
  </StepperWrapper>
)

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

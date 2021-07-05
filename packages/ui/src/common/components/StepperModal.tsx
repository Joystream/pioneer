import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { ScrollableModalColumn, ScrolledModalBody } from './Modal'
import { Stepper as StepperComponent, StepperProps, StepperTheme } from './Stepper'

export const StepperModalWrapper = styled.div`
  display: grid;
  grid-template-columns: 184px 336px 1fr;
  min-height: 200px;
  height: 100%;
`

export const Stepper = (props: StepperProps) => (
  <StepperWrapper>
    <StepperComponent {...props} />
  </StepperWrapper>
)

const StepperWrapper = styled(ScrollableModalColumn)`
  background-color: ${StepperTheme.dark.stepperBackground};
`

export const StepperModalBody = styled(ScrolledModalBody)`
  padding: 0;
`

export const StepDescriptionColumn = styled(ScrollableModalColumn)`
  background-color: ${Colors.Black[100]};
`

export const StepperBody = styled(ScrollableModalColumn)`
  padding: 24px;
`

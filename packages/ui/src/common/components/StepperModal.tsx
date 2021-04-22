import styled from 'styled-components'

import { Colors } from '../constants'

import { ModalBody, ScrollableModalColumn } from './Modal'

export const StepperModalWrapper = styled.div`
  display: grid;
  grid-template-columns: 184px 336px 1fr;
  min-height: 200px;
`

export const StepperModalBody = styled(ModalBody)`
  padding: 0;
`

export const StepDescriptionColumn = styled(ScrollableModalColumn)`
  background-color: ${Colors.Black[100]};
`

export const StepperBody = styled(ScrollableModalColumn)`
  padding: 24px;
`

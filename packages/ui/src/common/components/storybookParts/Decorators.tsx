import React from 'react'
import styled from 'styled-components'

import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'

import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '../StepperModal'

export const AddProposalModalDecorator = (Story: CallableFunction) => (
  <ModalContainer>
    <StepperModalBody>
      <StepperModalWrapper>
        <Stepper steps={[]} />
        <StepDescriptionColumn>
          <ProposalConstantsWrapper constants={null} />
        </StepDescriptionColumn>
        <StepperBody>
          <Story />
        </StepperBody>
      </StepperModalWrapper>
    </StepperModalBody>
  </ModalContainer>
)

const ModalContainer = styled.div`
  max-width: 1240px;
`

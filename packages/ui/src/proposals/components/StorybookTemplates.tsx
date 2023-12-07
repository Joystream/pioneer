import React, { FC } from 'react'

import { Modal, ModalHeader } from '@/common/components/Modal'
import { StepperStep } from '@/common/components/Stepper'
import {
  StepDescriptionColumn,
  Stepper,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'

const steps: StepperStep[] = [
  { title: 'Proposal type', type: 'past' },
  { title: 'General parameters', type: 'past' },
  { title: 'Staking account', type: 'past', isBaby: true },
  { title: 'Proposal details', type: 'past', isBaby: true },
  { title: 'Trigger & Discussion', type: 'past', isBaby: true },
  { title: 'Specific parameters', type: 'active' },
]

export const AddNewProposalTemplate: FC<{ title: string }> = ({ title, children }) => (
  <Modal onClose={() => undefined} modalSize="l" modalHeight="xl">
    <ModalHeader onClick={() => undefined} title={`Creating new proposal: ${title}`} />
    <StepperModalBody>
      <StepperModalWrapper>
        <Stepper steps={steps} />
        <StepDescriptionColumn></StepDescriptionColumn>
        <StepperBody>{children}</StepperBody>
      </StepperModalWrapper>
    </StepperModalBody>
  </Modal>
)

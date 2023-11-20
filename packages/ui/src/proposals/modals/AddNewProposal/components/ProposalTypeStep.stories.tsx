import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  Stepper,
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/ProposalTypeStep',
  component: ProposalTypeStep,
} as Meta

const Template: Story = () => {
  return (
    <StepperModalBody>
      <StepperModalWrapper>
        <Stepper steps={[]} />
        <StepDescriptionColumn>
          <ProposalConstantsWrapper constants={null} />
        </StepDescriptionColumn>
        <StepperBody>
          <ProposalTypeStep />
        </StepperBody>
      </StepperModalWrapper>
    </StepperModalBody>
  )
}

export const Default = Template.bind({})

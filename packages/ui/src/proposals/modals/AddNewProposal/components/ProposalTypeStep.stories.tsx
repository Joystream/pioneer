import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Stepper, StepDescriptionColumn, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'
import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/ProposalTypeStep',
  component: ProposalTypeStep,
} as Meta

const Template: Story = () => {
  return (
    <StepperModalBody>
      <StepperProposalWrapper>
        <Stepper steps={[]} />
        <StepDescriptionColumn>
          <ProposalConstantsWrapper constants={null} />
        </StepDescriptionColumn>
        <StepperBody>
          <ProposalTypeStep />
        </StepperBody>
      </StepperProposalWrapper>
    </StepperModalBody>
  )
}

export const Default = Template.bind({})

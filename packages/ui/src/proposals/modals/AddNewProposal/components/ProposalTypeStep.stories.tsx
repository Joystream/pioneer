import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { MemoryRouter } from 'react-router'

import { Stepper, StepDescriptionColumn, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'
import { Constants } from '@/proposals/modals/AddNewProposal/components/Constants'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'
import { ProposalType } from '@/proposals/types'

export default {
  title: 'Proposals/AddNewProposalModal/ProposalTypeStep',
  component: ProposalTypeStep,
} as Meta

const Template: Story = () => {
  const [type, setType] = useState<ProposalType | undefined>()
  return (
    <MemoryRouter>
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={[]} />
          <StepDescriptionColumn>
            <Constants constants={null} />
          </StepDescriptionColumn>
          <StepperBody>
            <ProposalTypeStep type={type} setType={(proposalType) => setType(proposalType)} />
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})

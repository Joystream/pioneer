import { Meta, Story } from '@storybook/react'
import React from 'react'

import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'
import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'
import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/DecreaseWorkingGroupLeadStake',
  component: DecreaseWorkingGroupLeadStake,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members workingGroups workers>
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={[]} />
          <StepDescriptionColumn>
            <ProposalConstantsWrapper constants={null} />
          </StepDescriptionColumn>
          <StepperBody>
            <DecreaseWorkingGroupLeadStake />
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})

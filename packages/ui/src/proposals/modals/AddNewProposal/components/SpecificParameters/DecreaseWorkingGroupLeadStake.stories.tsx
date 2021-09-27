import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'
import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'
import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'

export default {
  title: 'Proposals/AddNewProposalModal/DecreaseWorkingGroupLeadStake',
  component: DecreaseWorkingGroupLeadStake,
} as Meta

const Template: Story = () => {
  const [stakingAmount, setStakingAmount] = useState<BN>()
  const [groupId, setGroupId] = useState<string>()
  const [, setWorkerId] = useState<number>()

  return (
    <MockApolloProvider members workingGroups workers>
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={[]} />
          <StepDescriptionColumn>
            <ProposalConstantsWrapper constants={null} />
          </StepDescriptionColumn>
          <StepperBody>
            <DecreaseWorkingGroupLeadStake
              stakingAmount={stakingAmount}
              setStakingAmount={setStakingAmount}
              groupId={groupId}
              setGroupId={setGroupId}
              setWorkerId={setWorkerId}
            />
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})

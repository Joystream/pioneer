import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ApplicationForm, DurationAndProcess, StakingPolicyAndReward, WorkingGroupAndDescription } from '.'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/CreateWorkingGroupLeadOpening',
  components: [ApplicationForm, DurationAndProcess, StakingPolicyAndReward, WorkingGroupAndDescription],
} as Meta

const WorkingGroupAndDescriptionTemplate: Story = () => {
  return (
    <MockApolloProvider members council forum proposals workers workingGroups>
      <WorkingGroupAndDescription />
    </MockApolloProvider>
  )
}

const DurationAndProcessTemplate: Story = () => {
  return (
    <MockApolloProvider>
      <DurationAndProcess />
    </MockApolloProvider>
  )
}

const ApplicationFormTemplate: Story = () => {
  return <ApplicationForm />
}

const StakingTemplate: Story = () => {
  return (
    <MockApolloProvider members workingGroups>
      <StakingPolicyAndReward />
    </MockApolloProvider>
  )
}

export const Step1WorkingGroupAndDescription = WorkingGroupAndDescriptionTemplate.bind({})

export const Step2DurationAndProcess = DurationAndProcessTemplate.bind({})

export const Step3ApplicationForm = ApplicationFormTemplate.bind({})

export const Step4StakingPolicyAndRewardStep = StakingTemplate.bind({})

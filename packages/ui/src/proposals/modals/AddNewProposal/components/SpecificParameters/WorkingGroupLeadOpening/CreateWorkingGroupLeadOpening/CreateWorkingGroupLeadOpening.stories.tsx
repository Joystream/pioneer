import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ApplicationForm, DurationAndProcess, StakingPolicyAndReward, WorkingGroupAndDescription } from '.'

export default {
  title: 'Proposals/AddNewProposalModal/CreateWorkingGroupLeadOpening',
  components: [ApplicationForm, DurationAndProcess, StakingPolicyAndReward, WorkingGroupAndDescription],
} as Meta

const WorkingGroupAndDescriptionTemplate: Story = () => {
  return (
    <MockApolloProvider members council forum proposals workers workingGroups>
      <WorkingGroupAndDescription errorMessageGetter={() => undefined} errorChecker={() => false} />
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
  const [stakingAmount, setStakingAmount] = useState(new BN(0))
  const [leavingUnstakingPeriod, setLeavingUnstakingPeriod] = useState(0)
  const [rewardPerBlock, setRewardPerBlock] = useState(new BN(0))

  return (
    <MockApolloProvider members workingGroups>
      <StakingPolicyAndReward
        stakingAmount={stakingAmount}
        setStakingAmount={setStakingAmount}
        leavingUnstakingPeriod={leavingUnstakingPeriod}
        setLeavingUnstakingPeriod={setLeavingUnstakingPeriod}
        rewardPerBlock={rewardPerBlock}
        setRewardPerBlock={setRewardPerBlock}
        setIsExecutionError={() => undefined}
      />
    </MockApolloProvider>
  )
}

export const Step1WorkingGroupAndDescription = WorkingGroupAndDescriptionTemplate.bind({})

export const Step2DurationAndProcess = DurationAndProcessTemplate.bind({})

export const Step3ApplicationForm = ApplicationFormTemplate.bind({})

export const Step4StakingPolicyAndRewardStep = StakingTemplate.bind({})

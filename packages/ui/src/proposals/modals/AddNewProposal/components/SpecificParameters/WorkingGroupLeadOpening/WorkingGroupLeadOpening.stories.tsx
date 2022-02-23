import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { StakingPolicyAndReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/StakingPolicyAndReward'
import { GroupIdName } from '@/working-groups/types'

export default {
  title: 'Proposals/AddNewProposalModal/CreateWorkingGroupLeadOpening',
  component: CreateWorkingGroupLeadOpening,
} as Meta

const OpeningTemplate: Story = () => {
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [groupId, setGroupId] = useState<GroupIdName>()

  return (
    <MockApolloProvider members council forum proposals workers workingGroups>
      <CreateWorkingGroupLeadOpening
        description={description}
        shortDescription={shortDescription}
        groupId={groupId}
        setDescription={setDescription}
        setShortDescription={setShortDescription}
        setGroupId={setGroupId}
      />
    </MockApolloProvider>
  )
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

export const WorkingGroupAndOpeningDetailsStep = OpeningTemplate.bind({})

export const StakingPolicyAndRewardStep = StakingTemplate.bind({})

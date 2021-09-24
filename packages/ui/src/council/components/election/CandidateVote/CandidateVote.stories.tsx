import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { CandidateVote, CandidateVoteProps } from './CandidateVote'

export default {
  title: 'Council/CandidateVote',
  component: CandidateVote,
  argTypes: {
    memberSize: { table: { disable: true } },
  },
} as Meta

const Template: Story<CandidateVoteProps> = (args) => <CandidateVote {...args} />

export const Default = Template.bind({})
Default.args = {
  member: {
    id: '0',
    name: 'Jennifer_123',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'Jennifer_123',
    isVerified: true,
    isFoundingMember: true,
    roles: [],
    inviteCount: 0,
    createdAt: '',
  },
  voteOwner: true,
  revealed: true,
  stake: (5000000 as unknown) as BN,
  ownStake: (500000 as unknown) as BN,
  votes: 20,
  revealedVotes: 5,
  index: 1,
}

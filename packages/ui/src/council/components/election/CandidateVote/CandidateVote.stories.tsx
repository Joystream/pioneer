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
const args: CandidateVoteProps = {
  member: {
    id: '0',
    name: 'Jennifer_123',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'Jennifer_123',
    isVerified: true,
    isFoundingMember: true,
    isCouncilMember: false,
    roles: [],
    boundAccounts: [],
    inviteCount: 0,
    createdAt: '',
  },
  candidateId: '1',
  sumOfAllStakes: new BN(5000000),
  totalStake: new BN(500000),
  votes: 20,
  index: 1,
  myStake: new BN(32000),
  myVotes: [],
}
Default.args = args

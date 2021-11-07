import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { RowGapBlock } from '@/common/components/page/PageContent'

import { VotesContainer } from './VotesPreview'
import { getVoteStatusComponent, VoteStatusComponent } from './VoteStatusComponent'

export default {
  title: 'Proposals/VoteStatusComponent',
  component: VoteStatusComponent,
} as Meta

const Template: Story = () => (
  <RowGapBlock gap={16}>
    <VoteStatusComponent voteKind={ProposalVoteKind.Abstain} />
    <VoteStatusComponent voteKind={ProposalVoteKind.Approve} />
    <VoteStatusComponent voteKind={ProposalVoteKind.Reject} />
    <VoteStatusComponent voteKind={ProposalVoteKind.Slash} />
    <VotesContainer>You voted for: {getVoteStatusComponent(ProposalVoteKind.Approve)}</VotesContainer>
  </RowGapBlock>
)

export const Default = Template.bind({})
Default.args = {}

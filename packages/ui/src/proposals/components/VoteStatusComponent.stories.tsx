import { Meta, StoryObj } from '@storybook/react'
import React, { ReactElement } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { RowGapBlock } from '@/common/components/page/PageContent'

import { VotesContainer } from './VotesPreview'
import { getVoteStatusComponent, VoteStatusComponent } from './VoteStatusComponent'

export default {
  title: 'Pages/Proposals/ProposalPreview/Components/VoteStatusComponent',
  component: VoteStatusComponent,
} as Meta

export const Default: StoryObj<() => ReactElement> = {
  name: 'VoteStatusComponent',

  render: () => (
    <RowGapBlock gap={16}>
      <VoteStatusComponent voteKind={ProposalVoteKind.Abstain} />
      <VoteStatusComponent voteKind={ProposalVoteKind.Approve} />
      <VoteStatusComponent voteKind={ProposalVoteKind.Reject} />
      <VoteStatusComponent voteKind={ProposalVoteKind.Slash} />
      <VotesContainer>You voted for: {getVoteStatusComponent(ProposalVoteKind.Approve)}</VotesContainer>
    </RowGapBlock>
  ),
}

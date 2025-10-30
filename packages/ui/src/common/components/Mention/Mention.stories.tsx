import { Meta } from '@storybook/react'
import React from 'react'

import { MentionType } from '@/common/hooks/useMentions'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { Mention, MentionProps } from './Mention'

export default {
  title: 'Common/Mention',
  component: Mention,
  render: (args) => (
    <MockApolloProvider members proposals workers workingGroups forum>
      <Mention {...args}>Mention</Mention>
    </MockApolloProvider>
  ),
} as Meta<MentionProps>

export const Proposal = {
  type: MentionType.Proposal,
  itemId: '1',
}

export const ProposalPost = {
  type: MentionType.ProposalPost,
  itemId: '1',
}

export const ForumThread = {
  type: MentionType.ForumThread,
  itemId: '1',
}

export const ForumPost = {
  type: MentionType.ForumPost,
  itemId: '1',
}

export const Member = {
  type: MentionType.Member,
  itemId: '1',
}

export const Opening = {
  type: MentionType.Opening,
  itemId: 'forumWorkingGroup-0',
}

export const Application = {
  type: MentionType.Application,
  itemId: 'forumWorkingGroup-0',
}

import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { Mention, MentionProps } from './Mention'

export default {
  title: 'Common/Mention',
  component: Mention,
} as Meta

const Template: Story<MentionProps> = (args) => (
  <MockApolloProvider members proposals workers workingGroups forum>
    <Mention {...args}>Mention</Mention>
  </MockApolloProvider>
)

export const Proposal = Template.bind({})
Proposal.args = {
  type: 'proposal',
  itemId: '1',
}

export const ProposalDiscussionEntry = Template.bind({})
ProposalDiscussionEntry.args = {
  type: 'proposalDiscussionEntry',
  itemId: '1',
}

export const ForumThread = Template.bind({})
ForumThread.args = {
  type: 'forumThread',
  itemId: '1',
}

export const ForumPost = Template.bind({})
ForumPost.args = {
  type: 'forumPost',
  itemId: '1',
}

export const Member = Template.bind({})
Member.args = {
  type: 'member',
  itemId: '1',
}

export const Opening = Template.bind({})
Opening.args = {
  type: 'opening',
  itemId: 'forumWorkingGroup-0',
}

export const Application = Template.bind({})
Application.args = {
  type: 'application',
  itemId: 'forumWorkingGroup-0',
}

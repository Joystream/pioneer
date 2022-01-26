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
};

export const Forum = Template.bind({})
Forum.args = {
  type: 'forum',
  itemId: '1',
};

export const Profile = Template.bind({})
Profile.args = {
  type: 'profile',
  itemId: '1',
};

export const Opening = Template.bind({})
Opening.args = {
  type: 'opening',
  itemId: '1',
};

export const Application = Template.bind({})
Application.args = {
  type: 'application',
  itemId: '1',
};

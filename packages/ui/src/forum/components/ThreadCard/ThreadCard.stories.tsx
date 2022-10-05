import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ForumThreadWithDetails } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Forum/Facelift/ThreadCard',
  component: ThreadCard,
} as Meta

const forumThread: ForumThreadWithDetails = {
  id: '1',
  title: 'Example Thread',
  categoryTitle: '',
  categoryId: '1',
  author: getMember('alice'),
  initialPostText: '',
  isSticky: false,
  createdInBlock: randomBlock(),
  tags: [],
  visiblePostsCount: 5,
  status: { __typename: 'ThreadStatusActive' },
}

const Template: Story = (args) => (
  <MockApolloProvider members>
    <ThreadCard thread={{ ...forumThread, ...args }} />
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  initialPostText: '',
  categoryTitle: '',
  title: 'Example Thread',
  visiblePostsCount: 5,
}

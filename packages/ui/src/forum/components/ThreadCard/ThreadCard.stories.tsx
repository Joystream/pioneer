import { Meta } from '@storybook/react'
import React from 'react'

import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ForumThreadWithDetails } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Forum/Facelift/ThreadCard',
  component: ThreadCard,
} as Meta

const forumThread: ForumThreadWithDetails = {
  id: '1',
  title: 'Example Thread',
  categoryId: '1',
  authorId: '0',
  initialPostText: '',
  isSticky: false,
  createdInBlock: randomBlock(),
  tags: [],
  visiblePostsCount: 5,
  status: { __typename: 'ThreadStatusActive' },
}

export const Default = () => (
  <MockApolloProvider members>
    <ThreadCard thread={forumThread} />
  </MockApolloProvider>
)

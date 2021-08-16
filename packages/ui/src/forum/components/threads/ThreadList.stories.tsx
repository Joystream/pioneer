import { Meta, Story } from '@storybook/react'
import React, { useMemo } from 'react'
import { MemoryRouter } from 'react-router'

import { Loading } from '@/common/components/Loading'
import { ForumThreadWithDetails } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { ThreadList } from './ThreadList'

export default {
  title: 'Forum/Threads/ThreadList',
  component: ThreadList,
  argTypes: {
    onSort: { action: 'Sort' },
  },
} as Meta

const forumThread: ForumThreadWithDetails = {
  id: '1',
  title: 'Example Thread',
  categoryId: '1',
  authorId: '0',
  isSticky: false,
  createdInBlock: randomBlock(),
  tags: [],
  visiblePostsCount: 5,
  status: 'ThreadStatusActive',
}

const Template: Story = ({ onSort }) => {
  const threads = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        ...forumThread,
        id: String(index),
        title: `${forumThread.title} ${index}`,
        createdInBlock: randomBlock(),
      })),
    []
  )

  return (
    <MockApolloProvider members workers forum>
      <MemoryRouter>{threads ? <ThreadList threads={threads} onSort={onSort} /> : <Loading />}</MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}

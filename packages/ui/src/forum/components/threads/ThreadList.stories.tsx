import { Meta, Story } from '@storybook/react'
import React, { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { Loading } from '@/common/components/Loading'
import { useSort } from '@/common/hooks/useSort'
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
  status: { __typename: 'ThreadStatusActive' },
}

const Template: Story = ({ isArchive }) => {
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

  const { getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')

  return (
    <MockApolloProvider members workers forum>
      {threads ? <ThreadList threads={threads} getSortProps={getSortProps} isArchive={isArchive} /> : <Loading />}
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
}

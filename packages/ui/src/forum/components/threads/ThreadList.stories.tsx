import { Meta, Story } from '@storybook/react'
import React, { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { Loading } from '@/common/components/Loading'
import { useSort } from '@/common/hooks/useSort'
import { ForumThreadWithDetails } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { ThreadList } from './ThreadList'

export default {
  title: 'Forum/Threads/ThreadList',
  component: ThreadList,
  argTypes: {
    onSort: { action: 'Sort' },
    type: { control: { type: 'radio' }, options: ['list', 'card'] },
  },
} as Meta

const forumThread: ForumThreadWithDetails = {
  id: '1',
  title: 'Example Thread',
  categoryId: '1',
  author: getMember('alice'),
  initialPostText: '',
  categoryTitle: '',
  isSticky: false,
  createdInBlock: randomBlock(),
  tags: [],
  visiblePostsCount: 5,
  status: { __typename: 'ThreadStatusActive' },
}

const Template: Story = ({ isArchive, type, initialPostText, categoryTitle, title }) => {
  const threads = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        ...forumThread,
        id: String(index),
        title: `${title} ${index}`,
        createdInBlock: randomBlock(),
        initialPostText,
        categoryTitle,
      })),
    [initialPostText, categoryTitle, title]
  )

  const { getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')

  return (
    <MockApolloProvider members workers forum>
      {threads ? (
        <ThreadList threads={threads} type={type} getSortProps={getSortProps} isArchive={isArchive} />
      ) : (
        <Loading />
      )}
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
  type: 'list',
  title: 'Forum Thread Title',
  initialPostText: 'Forum Thread Text',
  categoryTitle: 'Thread Category',
}

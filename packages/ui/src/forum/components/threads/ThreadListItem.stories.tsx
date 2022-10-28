import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { ThreadListItem } from './ThreadListItem'

export default {
  title: 'Forum/Threads/ThreadListItem',
  component: ThreadListItem,
} as Meta

interface Props {
  tags: string[]
  isSticky: boolean
  isArchive: boolean
  thread: ForumThread
}
const Template: Story<Props> = ({ isArchive, thread }) => {
  return (
    <MockApolloProvider forum members workers>
      <ThreadListItem thread={thread} isArchive={isArchive} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isSticky: false,
  isArchive: false,
  thread: {
    tags: [],
    visiblePostsCount: 4,
    isSticky: false,
    title: 'Title',
    id: '1',
    author: getMember('alice'),
    initialPostText: 'Post text',
    createdInBlock: randomBlock(),
    categoryId: '1',
    status: 'ThreadStatusActive',
    categoryTitle: 'Category Title',
  } as unknown as ForumThread,
}

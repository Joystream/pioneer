import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ForumThreadWithDetails } from '@/forum/types'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Forum/Threads/ThreadCard',
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

const Template: Story = (args) => <ThreadCard thread={{ ...forumThread, ...args }} />

export const Default = Template.bind({})
Default.args = {
  initialPostText: 'Example Forum Thread Initial Text',
  categoryTitle: 'Thread Category',
  title: 'Example Thread',
  visiblePostsCount: 5,
}

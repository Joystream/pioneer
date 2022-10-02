import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Network } from '@/common/api/queries'
import { asArray } from '@/common/utils'
import { asStorybookPost } from '@/forum/helpers/storybook'
import { ForumThreadFieldsFragment } from '@/forum/queries'
import { asForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { ThreadListItem } from './ThreadListItem'

export default {
  title: 'Forum/Threads/ThreadListItem',
  component: ThreadListItem,
} as Meta

const categoryId = 'ThreadListItem-category-story'
const category: RawForumCategoryMock = {
  id: categoryId,
  title: '',
  description: '',
  moderatorIds: [],
  status: { __typename: 'CategoryStatusActive' },
}

interface Props {
  tags: string[]
  isSticky: boolean
  isArchive: boolean
  rawThread: RawForumThreadMock & ForumThreadFieldsFragment
}
const Template: Story<Props> = ({ tags, isSticky, isArchive, rawThread }) => {
  const forum = { categories: [category], threads: [rawThread], posts: asArray(asStorybookPost('foo', rawThread.id)) }
  const thread = {
    ...asForumThread({ ...rawThread, isSticky }),
    tags: tags.map((title, index) => ({ id: String(index), title, threads: [], visibleThreadsCount: 0 })),
  }

  return (
    <MockApolloProvider members forum={forum}>
      <ThreadListItem thread={thread} isArchive={isArchive} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  tags: ['Governance Budget', 'Election #6'],
  isSticky: false,
  isArchive: false,
  rawThread: {
    id: 'ThreadListItem-story',
    category: {
      __typename: 'ForumCategory',
      title: 'Category title',
    },
    categoryId,
    authorId: '0',
    isSticky: false,
    title: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint',
    createdInEvent: {
      inBlock: 3385,
      createdAt: '2021-02-28T06:20:01.605Z',
      network: 'OLYMPIA' as Network,
      __typename: 'ThreadCreatedEvent',
    },
    status: { __typename: 'ThreadStatusActive' },
    visiblePostsCount: 11,
    __typename: 'ForumThread',
  },
}

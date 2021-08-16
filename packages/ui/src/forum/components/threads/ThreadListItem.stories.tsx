import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { Network } from '@/common/api/queries'
import { asArray } from '@/common/utils'
import { asStorybookPost, ThreadData } from '@/forum/helpers/storybook'
import { asForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ThreadListItem } from './ThreadListItem'

export default {
  title: 'Forum/Threads/ThreadListItem',
  component: ThreadListItem,
} as Meta

const categoryId = 'ThreadListItem-category-story'
const category = { id: categoryId, title: '', description: '', moderatorIds: [] }

interface Props {
  tags: string[]
  rawThread: ThreadData
}
const Template: Story<Props> = ({ tags, rawThread }) => {
  const forum = { categories: [category], threads: [rawThread], posts: asArray(asStorybookPost('foo', rawThread.id)) }
  const thread = {
    ...asForumThread(rawThread),
    tags: tags.map((title, index) => ({ id: String(index), title, threads: [], visibleThreadsCount: 0 })),
  }

  return (
    <MockApolloProvider members forum={forum}>
      <MemoryRouter>
        <ThreadListItem thread={thread} />
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  tags: ['Governance Budget', 'Election #6'],
  rawThread: {
    id: 'ThreadListItem-story',
    categoryId,
    authorId: '0',
    isSticky: false,
    title: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint',
    createdInEvent: {
      inBlock: 3385,
      createdAt: '2021-02-28T06:20:01.605Z',
      network: 'OLYMPIA' as Network,
    },
    status: 'ThreadStatusActive',
  },
}

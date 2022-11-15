import { Meta, Story } from '@storybook/react'
import { lorem } from 'faker'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Network } from '@/common/api/queries'
import { WhiteBlock } from '@/common/components/storybookParts/previewStyles'
import { asArray, last, repeat } from '@/common/utils'
import { asStorybookPost } from '@/forum/helpers/storybook'
import { ForumThreadFieldsFragment } from '@/forum/queries'
import { asForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import rawMembers from '@/mocks/data/raw/members.json'
import { RawForumCategoryMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { ThreadItem } from './ThreadItem'

export default {
  title: 'Forum/Threads/ThreadItem',
  component: ThreadItem,
  argTypes: {
    containerSize: { control: { type: 'radio' }, options: ['s', 'm', 'l', 'auto'] },
    breadcrumbs: { control: { type: 'range', min: 1, max: 10 } },
  },
} as Meta

const categoryId = 'ThreadItem-category-story'
const getCategory = (index: number): RawForumCategoryMock => ({
  id: `${categoryId}-${index}`,
  title: lorem.words(4),
  ...(index > 0 ? { parentId: `${categoryId}-${index - 1}` } : {}),
  description: '',
  moderatorIds: [],
  status: { __typename: 'CategoryStatusActive' },
})

interface Props {
  containerSize: 's' | 'm' | 'l' | 'auto'
  breadcrumbs: number
  thread: RawForumThreadMock & ForumThreadFieldsFragment
  halfSize: boolean
  empty: boolean
  postText: string
  tags: string[]
}
const Template: Story<Props> = ({ containerSize, breadcrumbs, thread, halfSize, empty, postText, tags }) => {
  const categories = useMemo(() => repeat(getCategory, breadcrumbs), [breadcrumbs])

  const rawThread = { ...thread, categoryId: last(categories).id }

  const forum = {
    categories,
    threads: [rawThread],
    posts: asArray(asStorybookPost(postText, rawThread.id)),
  }
  const forumthread = {
    ...asForumThread(rawThread),
    tags: tags.map((title, index) => ({ id: String(index), title, threads: [], visibleThreadsCount: 0 })),
  }

  return (
    <MockApolloProvider members forum={forum}>
      <Container size={containerSize}>
        <ThreadItem thread={forumthread} badges={tags.map((badge) => ({ badge }))} halfSize={halfSize} empty={empty} />
      </Container>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  containerSize: 'm',
  breadcrumbs: 6,
  thread: {
    id: 'ThreadItem-story',
    categoryId: '',
    authorId: '0',
    author: rawMembers[0] as any,
    isSticky: false,
    category: {
      __typename: 'ForumCategory',
      title: 'Category',
    },
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
  halfSize: false,
  empty: false,
  postText:
    'asperiores accusamus et et similique tempora odit a non maxime harum blanditiis magnam blanditiis libero ab quo inventore ipsum quo deserunt et esse et ea recusandae rerum beatae cumque non error quae et distinctio eligendi reprehenderit provident quis accusamus hic sapiente impedit natus et et sunt eligendi repudiandae sed assumenda quibusdam praesentium aut dignissimos sint qui quidem eum assumenda a repellendus et odio reprehenderit',
  tags: ['Governance Budget', 'Election #6'],
}

const Container = styled(WhiteBlock)<{ size: Props['containerSize'] }>`
  width: ${({ size }) => {
    switch (size) {
      case 's':
        return '256px'
      case 'm':
        return '397px'
      case 'l':
        return '852px'
      case 'auto':
      default:
        'auto'
    }
  }};
`

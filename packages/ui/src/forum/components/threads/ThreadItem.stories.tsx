import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Network } from '@/common/api/queries'
import { WhiteBlock } from '@/common/components/storybookParts/previewStyles'
import { ForumThreadFieldsFragment } from '@/forum/queries'
import { asForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumThreadMock } from '@/mocks/data/seedForum'

import { ThreadItem } from './ThreadItem'

export default {
  title: 'Forum/Threads/ThreadItem',
  component: ThreadItem,
  argTypes: {
    containerSize: { control: { type: 'radio' }, options: ['s', 'm', 'l', 'auto'] },
  },
} as Meta

interface Props {
  containerSize: 's' | 'm' | 'l' | 'auto'
  thread: RawForumThreadMock & ForumThreadFieldsFragment
  empty: boolean
}
const Template: Story<Props> = ({ containerSize, thread, empty }) => {
  const forumthread = asForumThread(thread)

  return (
    <MockApolloProvider members>
      <MemoryRouter>
        <Container size={containerSize}>
          <ThreadItem thread={forumthread} empty={empty} />
        </Container>
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  containerSize: 'm',
  thread: {
    id: 'ThreadItem-story',
    categoryId: '',
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
  empty: false,
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

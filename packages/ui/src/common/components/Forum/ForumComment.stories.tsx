import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import styled from 'styled-components'

import { PostReaction } from '@/common/api/queries'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { A_MINUTE } from '@/common/constants'
import { ForumPost } from '@/common/types'
import { repeat } from '@/common/utils'

import { ForumComment } from './ForumComment'

export default {
  title: 'Common/Forum/ForumComment',
  component: ForumComment,
} as Meta

interface Props {
  post: Omit<ForumPost, 'text'>
  likes?: number
  edited?: number
  text: string
  replyText: string
}

const Template: Story<Props> = ({ post, text, edited = -1, likes = -1, replyText }) => {
  const updatedAt = edited >= 0 ? new Date(Date.now() - edited * A_MINUTE).toISOString() : undefined
  const reaction = likes >= 0 ? repeat(() => PostReaction.Like, likes) : undefined
  const repliesTo: ForumPost | undefined = replyText
    ? { ...post, id: '1', link: '#post-0', text: replyText, author: { ...post.author, handle: 'abby_12' } }
    : undefined

  return (
    <MemoryRouter>
      <Container>
        <ForumComment post={{ ...post, updatedAt, text, reaction, repliesTo }} />
      </Container>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  likes: 1,
  text: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
consequat sunt nostrud.`,
  edited: 3,
  replyText: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit.
Exercitation veniam consequat sunt nostrud amet.`,
  post: {
    id: '0',
    link: '#post-0',
    createdAtBlock: {
      id: '100',
      number: 1000,
      network: 'OLYMPIA',
      timestamp: '2012-01-26T13:51:50.417-07:00',
    },
    author: {
      id: '0',
      name: 'Alice member',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      handle: 'alice',
      isVerified: false,
      isFoundingMember: false,
      roles: [],
      inviteCount: 0,
    },
  },
}

const Container = styled(TemplateBlock)`
  margin: 24px;
  max-width: 813px;
  width: fit-content;
`

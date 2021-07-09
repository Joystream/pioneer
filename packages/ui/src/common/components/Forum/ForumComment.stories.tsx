import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import styled from 'styled-components'

import { PostReaction } from '@/common/api/queries'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
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
  text: string
}

const Template: Story<Props> = ({ post, text, likes = -1 }) => {
  const reaction = likes >= 0 ? repeat(() => PostReaction.Like, likes) : undefined

  return (
    <MemoryRouter>
      <Container>
        <ForumComment post={{ ...post, text, reaction }} />
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
  post: {
    id: '0',
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

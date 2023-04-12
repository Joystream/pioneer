import { Meta, Story } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { A_MINUTE } from '@/common/constants'
import { repeat } from '@/common/utils'
import { PostListItem } from '@/forum/components/PostList/PostListItem'
import { ForumPost, PostReaction } from '@/forum/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { forumPostMock } from '@/mocks/data/commonMocks'
import { getMember } from '@/mocks/helpers'

export default {
  title: 'Forum/PostList',
  component: PostListItem,
} as Meta

interface Props {
  post: Omit<ForumPost, 'text'>
  likes?: number
  edited?: number
  text: string
  replyText: string
  isThreadActive: boolean
}

const Template: Story<Props> = ({ post, text, edited = -1, likes = -1, replyText, isThreadActive }) => {
  const lastEditedAt = edited >= 0 ? new Date(Date.now() - edited * A_MINUTE).toISOString() : undefined
  const reaction = likes >= 0 ? repeat(() => PostReaction.Like, likes) : undefined
  const repliesTo: ForumPost | undefined = replyText
    ? ({
        ...post,
        id: '1',
        link: '#post-0',
        text: replyText,
        authorId: post?.author?.id ?? '',
        author: { ...post.author, handle: 'abby_12' },
      } as unknown as ForumPost)
    : undefined

  const membershipContext = {
    active: getMember('alice'),
    setActive: () => undefined,
    members: [getMember('alice')],
    hasMembers: false,
    isLoading: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  return (
    <MockApolloProvider members workers forum>
      <MembershipContext.Provider value={membershipContext}>
        <Container>
          <PostListItem
            isFirstItem={true}
            post={{ ...post, lastEditedAt, text, reaction, repliesTo }}
            isThreadActive={isThreadActive}
            type="forum"
            link="#"
            repliesToLink=""
          />
        </Container>
      </MembershipContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  likes: 1,
  text: `[@abby_12](#mention?member-id=12) Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
consequat sunt nostrud.`,
  edited: 3,
  replyText: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit.
Exercitation veniam consequat sunt nostrud amet.`,
  post: forumPostMock,
  isThreadActive: true,
}

export const ModeratedPost = Template.bind({})
ModeratedPost.args = {
  likes: 1,
  text: `[@abby_12](#mention?member-id=12) Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
consequat sunt nostrud.`,
  edited: 3,
  replyText: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
Velit officia consequat duis enim velit mollit.
Exercitation veniam consequat sunt nostrud amet.`,
  post: {
    ...forumPostMock,
    moderator: {
      id: '0',
      name: 'Alice member',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      handle: 'alice',
      isVerified: false,
      isFoundingMember: false,
      isCouncilMember: false,
      roles: [],
      boundAccounts: [],
      inviteCount: 0,
      createdAt: '',
    },
    status: 'PostStatusModerated',
  },
  isThreadActive: true,
}

const Container = styled(TemplateBlock)`
  margin: 24px;
  max-width: 813px;
  width: fit-content;
`

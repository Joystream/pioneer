import React from 'react'
import styled from 'styled-components'

import { TextMedium, TextSmall } from '@/common/components/typography'
import { relativeTime } from '@/common/model/relativeTime'
import { spacing } from '@/common/utils/styles'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

interface PostInfoProps {
  post: ForumPost
}
export const PostInfo = ({ post }: PostInfoProps) => (
  <PostInfoStyles>
    <TextMedium as="h6" bold>
      {post.text.slice(0, 100)}
    </TextMedium>
    <TextSmall as="div" lighter>
      <span>by</span>
      <MemberInfo member={post.author} size="s" memberSize="s" showGroup={false} />
    </TextSmall>
    <TextSmall lighter>{relativeTime(post.createdAt)}</TextSmall>
  </PostInfoStyles>
)

const PostInfoStyles = styled.div`
  & > ${TextMedium} {
    margin-bottom: ${spacing(1)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > ${TextSmall}:nth-child(2) {
    display: flex;
    align-items: center;
    gap: ${spacing(1)};
    margin-bottom: ${spacing(3 / 2)};
  }
`

import React from 'react'
import styled from 'styled-components'

import { TextExtraSmall, TextMedium } from '@/common/components/typography'
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
    <TextExtraSmall as="div" lighter>
      <span>by</span>
      <MemberInfo member={post.author} size="s" memberSize="s" showGroup={false} />
    </TextExtraSmall>
    <TextExtraSmall lighter>{relativeTime(post.createdAt)}</TextExtraSmall>
  </PostInfoStyles>
)

const PostInfoStyles = styled.div`
  & > ${TextMedium} {
    margin-bottom: ${spacing(1)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > ${TextExtraSmall}:nth-child(2) {
    display: flex;
    align-items: center;
    gap: ${spacing(1)};
    margin-bottom: ${spacing(3 / 2)};
  }
`

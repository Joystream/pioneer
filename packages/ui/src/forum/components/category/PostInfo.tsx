import React from 'react'
import styled from 'styled-components'

import { TextInlineExtraSmall } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { spacing } from '@/common/utils/styles'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

interface PostInfoProps {
  post: ForumPost
}
export const PostInfo = ({ post }: PostInfoProps) => (
  <PostInfoStyles>
    <h6>{post.text.slice(0, 100)}</h6>
    <TextInlineExtraSmall as="div" lighter>
      <span>by</span>
      <MemberInfo member={post.author} size="s" memberSize="s" showGroup={false} />
    </TextInlineExtraSmall>
    <TextInlineExtraSmall lighter>{relativeTime(post.createdAt)}</TextInlineExtraSmall>
  </PostInfoStyles>
)

const PostInfoStyles = styled.div`
  & > h6 {
    margin-bottom: ${spacing(1)};
    ${Overflow.FullDots};
  }
  & > ${TextInlineExtraSmall}:nth-child(2) {
    display: flex;
    align-items: center;
    gap: ${spacing(1)};
    margin-bottom: ${spacing(3 / 2)};
  }
`

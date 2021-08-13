import React, { memo } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextInlineExtraSmall } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { useCategoryLatestPost } from '@/forum/hooks/useCategoryLatestPost'
import { MemberInfo } from '@/memberships/components'

import { CategoryItemFieldProps } from './CategoryListItem'

export const LatestPost = memo(({ categoryId }: CategoryItemFieldProps) => {
  const { post } = useCategoryLatestPost(categoryId)

  if (!post) return <Loading />

  return (
    <PostInfoStyles>
      <h6>{post.text.slice(0, 100)}</h6>
      <TextInlineExtraSmall as="div" lighter>
        <span>by</span>
        <MemberInfo member={post.author} size="s" memberSize="s" showGroup={false} />
      </TextInlineExtraSmall>
      <TextInlineExtraSmall lighter>{relativeTime(post.createdAt)}</TextInlineExtraSmall>
    </PostInfoStyles>
  )
})

const PostInfoStyles = styled.div`
  & > h6 {
    margin-bottom: 8px;
    ${Overflow.FullDots};
  }
  & > ${TextInlineExtraSmall}:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
`

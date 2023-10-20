import React, { memo } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumRoutes } from '@/forum/constant'
import { useCategoryLatestPost } from '@/forum/hooks/useCategoryLatestPost'
import { MemberInfo } from '@/memberships/components'

import { CategoryItemFieldProps } from './CategoryListItem'

export const LatestPost = memo(({ categoryId }: CategoryItemFieldProps) => {
  const { post, thread } = useCategoryLatestPost(categoryId)

  if (!post) return <TextMedium>-</TextMedium>

  return (
    <PostInfoStyles>
      <LatestPostLink to={`${generatePath(ForumRoutes.thread, { id: thread?.id ?? '' })}?post=${post.id}`}>
        Re: {post.text.slice(0, 100)}
      </LatestPostLink>
      <TextInlineExtraSmall as="div" lighter>
        <span>by</span>
        <MemberInfo member={post.author} size="s" memberSize="s" hideGroup />
      </TextInlineExtraSmall>
      <TextInlineExtraSmall lighter>{relativeTime(post.createdAt)}</TextInlineExtraSmall>
    </PostInfoStyles>
  )
})

export const PostInfoStyles = styled.div`
  & > ${TextInlineExtraSmall}:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
`

const LatestPostLink = styled(GhostRouterLink)`
  display: inline-block;
  font-family: ${Fonts.Grotesk};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  padding-bottom: 8px;
  transition: ${Transitions.all};
  ${Overflow.FullDots};

  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};
  }
`

import React, { memo } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextExtraSmall, TextMedium } from '@/common/components/typography'
import { Overflow, Fonts, Transitions, Colors } from '@/common/constants'
import { plural } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { ForumRoutes } from '@/forum/constant'
import { useForumPopularThreads } from '@/forum/hooks/useForumPopularThreads'

import { CategoryItemFieldProps } from './CategoryListItem'

export const PopularThread = memo(({ categoryId }: CategoryItemFieldProps) => {
  const { threads } = useForumPopularThreads({ categoryId })

  if (!threads?.[0]) return <TextMedium>-</TextMedium>

  const thread = threads[0]

  return (
    <ThreadInfoStyles>
      <ThreadTitleLink to={generatePath(ForumRoutes.thread, { id: thread?.id ?? '' })}>{thread.title}</ThreadTitleLink>
      {isDefined(thread.visiblePostsCount) && (
        <TextExtraSmall lighter>
          {thread.visiblePostsCount} Post{plural(thread.visiblePostsCount)}
        </TextExtraSmall>
      )}
    </ThreadInfoStyles>
  )
})

export const ThreadInfoStyles = styled.div`
  & > h6 {
    margin-bottom: 12px;
    ${Overflow.FullDots};
  }
`

const ThreadTitleLink = styled(GhostRouterLink)`
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

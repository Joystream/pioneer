import React, { memo } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextExtraSmall } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { plural } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { useForumPopularThread } from '@/forum/hooks/useForumPopularThread'

import { CategoryItemFieldProps } from './CategoryListItem'

export const PopularThread = memo(({ categoryId }: CategoryItemFieldProps) => {
  const thread = useForumPopularThread({ categoryId }).threads?.[0]

  if (!thread) return <Loading />

  return (
    <ThreadInfoStyles>
      <h6>{thread.title}</h6>
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

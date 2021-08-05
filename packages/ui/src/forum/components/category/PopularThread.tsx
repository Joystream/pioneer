import React, { memo } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextExtraSmall } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { plural } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { spacing } from '@/common/utils/styles'
import { useForumPopularThread } from '@/forum/hooks/useForumPopularThread'

import { CategoryItemFieldProps } from './CategoryListItem'

export const PopularThread = memo(({ categoryId }: CategoryItemFieldProps) => {
  const { thread, postCount } = useForumPopularThread(categoryId)

  if (!thread) return <Loading />

  return (
    <ThreadInfoStyles>
      <h6>{thread.title}</h6>
      {isDefined(postCount) && (
        <TextExtraSmall lighter>
          {postCount} Post{plural(postCount)}
        </TextExtraSmall>
      )}
    </ThreadInfoStyles>
  )
})

const ThreadInfoStyles = styled.div`
  & > h6 {
    margin-bottom: ${spacing(3 / 2)};
    ${Overflow.FullDots};
  }
`

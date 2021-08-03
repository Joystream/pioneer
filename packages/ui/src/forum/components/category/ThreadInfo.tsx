import React from 'react'
import styled from 'styled-components'

import { TextExtraSmall } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { plural } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { spacing } from '@/common/utils/styles'
import { ForumThread } from '@/forum/types'

interface ThreadInfoProps {
  thread: ForumThread & { postCount?: number }
}
export const ThreadInfo = ({ thread }: ThreadInfoProps) => (
  <ThreadInfoStyles>
    <h6>{thread.title}</h6>
    {isDefined(thread.postCount) && (
      <TextExtraSmall lighter>
        {thread.postCount} Post{plural(thread.postCount)}
      </TextExtraSmall>
    )}
  </ThreadInfoStyles>
)
const ThreadInfoStyles = styled.div`
  & > h6 {
    margin-bottom: ${spacing(3 / 2)};
    ${Overflow.FullDots};
  }
`
